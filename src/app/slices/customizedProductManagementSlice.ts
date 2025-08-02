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

const customizedProductManagementSlice = createSlice({
  name: "customized",
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
  customizedProductManagementSlice.actions;
export default customizedProductManagementSlice.reducer;
