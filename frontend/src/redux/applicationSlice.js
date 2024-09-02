import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    applicants: [],
    appliedJob:[]
  },
  reducers: {
    //actions
    setApplicants: (state, action) => {
      state.applicants = action.payload;
    },
    setAppliedJob: (state, action) => {
      state.appliedJob = action.payload;
    }
  },
});

export const { setApplicants, setAppliedJob } = applicationSlice.actions;
export default applicationSlice.reducer;
