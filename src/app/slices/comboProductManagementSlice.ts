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
    comboId: "",
    catId: "",
  },
};

const comboProductManagementSlice = createSlice({
  name: "combo",
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
  comboProductManagementSlice.actions;
export default comboProductManagementSlice.reducer;
