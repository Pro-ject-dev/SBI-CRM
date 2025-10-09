import { createSlice, createAsyncThunk, isPending, isRejected } from '@reduxjs/toolkit';
import type { LeadData, Estimation, LeadFormData } from '../../features/salesManager/leads/types';

// --- STATE DEFINITION ---
interface LeadsState {
  leads: LeadData[];
  estimations: Estimation[];
  selectedLead: LeadData | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  actionInProgressId: number | null;
  estimationActionId: number | null;
}

const initialState: LeadsState = {
  leads: [],
  estimations: [],
  selectedLead: null,
  status: 'idle',
  error: null,
  actionInProgressId: null,
  estimationActionId: null,
};

const token = localStorage.getItem("authToken");

// --- ASYNC THUNKS (API CALLS) ---

export const fetchLeads = createAsyncThunk('leads/fetchLeads', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('https://sbiapi.ssengineeringworks.online/api/admin/getAllLeads', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Server responded with an error!');
    const data = await response.json();
    if (data.success === "true") return data.data as LeadData[];
    throw new Error(data.message || 'Failed to fetch leads.');
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

export const fetchLeadById = createAsyncThunk('leads/fetchLeadById', async (id: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://sbiapi.ssengineeringworks.online/api/admin/getLeadsById?id=${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to fetch lead details.');
      const apiResponse = await response.json();
      if (apiResponse.success === "true" && apiResponse.data) {
        return apiResponse.data as LeadData;
      }
      throw new Error(apiResponse.message || 'Could not find the specified lead.');
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const addLead = createAsyncThunk('leads/addLead', async (formData: LeadFormData, { rejectWithValue, dispatch }) => {
  try {
    const response = await fetch('https://sbiapi.ssengineeringworks.online/api/admin/addLeads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    
    // --- FIX: More robust success check ---
    // This allows the thunk to be FULFILLED, preventing the false error message in the form.
    if (!response.ok || result.success === "false" || !result.success) {
      throw new Error(result.message || 'Failed to add lead.');
    }

    // --- FIX: Immediately refetch all leads on success to update the table ---
    dispatch(fetchLeads());
    return result; 
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

export const editLead = createAsyncThunk('leads/editLead', async (payload: { formData: LeadFormData, id: number }, { rejectWithValue }) => {
    const body = { ...payload.formData, id: String(payload.id), isOrder: '0' };
    try {
        const response = await fetch(`https://sbiapi.ssengineeringworks.online/api/admin/editLeads`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(body),
        });
        const result = await response.json();

        // --- FIX: More robust success check ---
        if (!response.ok || result.success === "false" || !result.success) {
            throw new Error(result.message || 'Failed to update lead.');
        }

        return { ...payload.formData, id: payload.id } as Partial<LeadData>;
    } catch (err: any) {
        return rejectWithValue(err.message);
    }
});

export const deleteLead = createAsyncThunk('leads/deleteLead', async (id: number, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://sbiapi.ssengineeringworks.online/api/admin/deleteLead?id=${id}`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const result = await response.json();

    // --- FIX: More robust success check ---
    if (!response.ok || result.success === "false" || !result.success) {
      throw new Error(result.message || 'Failed to delete lead.');
    }
    
    // On success, return the ID of the deleted lead
    return id;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

// ... other thunks like convertToOrder, fetchEstimations, deleteEstimation are fine ...
export const convertToOrder = createAsyncThunk('leads/convertToOrder', async (id: number, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://sbiapi.ssengineeringworks.online/api/admin/convertLeadsToOrder?id=${id}`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const result = await response.json();
    if (!response.ok || result.success !== "true") throw new Error(result.message || 'Failed to convert lead.');
    return id;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

export const fetchEstimations = createAsyncThunk('leads/fetchEstimations', async (leadId: number, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://sbiapi.ssengineeringworks.online/api/admin/getEstimation?leadId=${leadId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Failed to fetch estimations.');
    const data = await response.json();
    return (Array.isArray(data) ? data : []) as Estimation[];
  } catch(err: any) {
    return rejectWithValue(err.message);
  }
});

export const deleteEstimation = createAsyncThunk('leads/deleteEstimation', async (estimationId: number, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://sbiapi.ssengineeringworks.online/api/admin/deleteEstimation?id=${estimationId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const result = await response.json();
    if (!response.ok || result.success !== "true") throw new Error(result.message || 'Failed to delete estimation.');
    return estimationId;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});


// --- SLICE DEFINITION ---
const leadsSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedLead: (state) => {
      state.selectedLead = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // --- FULFILLED STATES ---
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.leads = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchLeadById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedLead = action.payload;
      })
       // The addLead thunk now triggers a refetch, so we just need to handle the state.
      .addCase(addLead.fulfilled, (state) => {
          state.status = 'succeeded';
      })
      // --- FIX for TS Error 2: Correctly handle the payload ---
      .addCase(editLead.fulfilled, (state, action) => {
          const index = state.leads.findIndex(lead => lead.id === action.payload.id);
          if (index !== -1) {
              state.leads[index] = { ...state.leads[index], ...action.payload };
          }
          state.status = 'succeeded';
      })
      // --- FIX: Immediately update the table on delete ---
      // This reducer now runs correctly because the thunk is fulfilled.
      .addCase(deleteLead.fulfilled, (state, action) => {
        state.leads = state.leads.filter((lead) => lead.id !== action.payload);
        state.actionInProgressId = null;
        state.status = 'succeeded';
      })
      .addCase(convertToOrder.fulfilled, (state, action) => {
        const lead = state.leads.find((l) => l.id === action.payload);
        if (lead) lead.isOrder = '1';
        state.actionInProgressId = null;
        state.status = 'succeeded';
      })
      .addCase(fetchEstimations.fulfilled, (state, action) => {
        state.estimations = action.payload;
        state.status = 'succeeded';
      })
      .addCase(deleteEstimation.fulfilled, (state, action) => {
        state.estimations = state.estimations.filter((est) => est.id !== action.payload);
        state.estimationActionId = null;
        state.status = 'succeeded';
      })

      // --- MATCHERS FOR PENDING/REJECTED STATES ---

      // --- FIX for TS Error 1: Use matcher to get type-safe access to action.meta ---
      .addMatcher(isPending(fetchLeads, fetchLeadById, deleteLead, convertToOrder, fetchEstimations, deleteEstimation), (state, action) => {
        state.status = 'loading';
        state.error = null;
        const id = action.meta.arg;
        if (typeof id === 'number') {
            if (action.type.startsWith('leads/deleteLead') || action.type.startsWith('leads/convertToOrder')) {
                state.actionInProgressId = id;
            } else if (action.type.startsWith('leads/deleteEstimation')) {
                state.estimationActionId = id;
            }
        }
      })
      .addMatcher(isRejected(fetchLeads, fetchLeadById, addLead, editLead, deleteLead, convertToOrder, fetchEstimations, deleteEstimation), (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || 'An unknown error occurred';
        state.actionInProgressId = null;
        state.estimationActionId = null;
      });
  },
});

export const { clearError, clearSelectedLead } = leadsSlice.actions;
export default leadsSlice.reducer;