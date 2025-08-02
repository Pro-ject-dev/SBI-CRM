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

const standardProductManagementSlice = createSlice({
  name: "standard",
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
  standardProductManagementSlice.actions;
export default standardProductManagementSlice.reducer;
