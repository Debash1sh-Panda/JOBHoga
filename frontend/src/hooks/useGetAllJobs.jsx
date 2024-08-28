import React, { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL_JOB } from '../utils/baseUrl';
import { useDispatch } from "react-redux";
import { setAllJobs } from '../redux/jobSlice';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    
    useEffect(()=>{
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${BASE_URL_JOB}/all-jobDetails`, {withCredentials:true});
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs)) ; 
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllJobs();
    },[]);
}

export default useGetAllJobs
