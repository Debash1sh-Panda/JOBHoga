import { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL_API_COMPANY } from '../utils/baseUrl';
import { useDispatch } from "react-redux";
import { setmultipleCompany } from '../redux/companySlice';

const useGetAllCompaniesDetails = () => {
    const dispatch = useDispatch();
    
    useEffect(()=>{
        const fetchAllCompanies = async () => {
            try {
                const res = await axios.get(`${BASE_URL_API_COMPANY}/company-details`, {withCredentials:true});
                if (res.data.success) {
                    dispatch(setmultipleCompany(res.data.companies)) ; 
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllCompanies();
    },[]);
}

export default useGetAllCompaniesDetails
