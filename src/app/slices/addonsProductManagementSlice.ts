import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pagination: {
    page: 0,
    pageSize: 10,
  },
  filterData: {
    productName: "",
    startDate: "",
    endDate: "",
    grade: "",
  },
};

const addonsProductManagementSlice = createSlice({
  name: "addons",
  initialState,
  reducers: {
    paginationSlice: (state, action) => {
      state.pagination = action.payload;
    },
    filterSlice: (state, action) => {
      state.filterData = action.payload;
    },
  },
});

export const { paginationSlice, filterSlice } =
  addonsProductManagementSlice.actions;
export default addonsProductManagementSlice.reducer;
