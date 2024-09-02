import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BASE_URL_API_COMPANY } from '../utils/baseUrl'
import { setsingleCompany } from '../redux/companySlice'

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchSingleCompany = async () => {
            try {
                const res = await axios.get(`${BASE_URL_API_COMPANY}/company-details/${companyId}`,{withCredentials:true});
                console.log(res.data.company);
                if(res.data.success){
                    dispatch(setsingleCompany(res.data.company));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleCompany();
    },[companyId, dispatch])
}

export default useGetCompanyById