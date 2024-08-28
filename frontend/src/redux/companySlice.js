import { createSlice } from '@reduxjs/toolkit';

const companySlice = createSlice({
    name: "company",
    initialState:{
        singleCompany: null,
    },
    reducers:{
        setsingleCompany:(state, action) => {
            state.singleCompany = action.payload;  
        },
    }
})

export const {setsingleCompany} = companySlice.actions;
export default companySlice.reducer;