import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr'

export default function useUser(){
    const {data, error} = useSWR("api/user/me")
    const router = useRouter();
 
    useEffect(()=>{
        if(data && !data.ok){
         router.replace("/create-account")
        }
    },[data, router])
    return {user:data?.user, isLoading: !data && !error};
}