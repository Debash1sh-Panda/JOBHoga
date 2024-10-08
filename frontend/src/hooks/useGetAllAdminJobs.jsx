import { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL_JOB } from '../utils/baseUrl';
import { useDispatch } from "react-redux";
import { setAllAdminJobs } from '../redux/jobSlice';

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    
    useEffect(()=>{
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(`${BASE_URL_JOB}/adminsJob`, {withCredentials:true});
                if (res.data.success) {
                    dispatch(setAllAdminJobs(res.data.jobs)) ; 
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllAdminJobs();
    },[]);
}

export default useGetAllAdminJobs
