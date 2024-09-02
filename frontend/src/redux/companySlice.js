import { createSlice } from '@reduxjs/toolkit';

const companySlice = createSlice({
    name: "company",
    initialState:{
        singleCompany: null,
        multipleCompany: [],
        searchCompanyByText: ""
    },
    reducers:{
        setsingleCompany:(state, action) => {
            state.singleCompany = action.payload;  
        },
        setmultipleCompany:(state, action) => {
            state.multipleCompany = action.payload;
        },
        setSearchCompanyByText:(state, action) => {
            state.searchCompanyByText = action.payload;
        }
    }
})

export const {setsingleCompany, setmultipleCompany, setSearchCompanyByText} = companySlice.actions;
export default companySlice.reducer;