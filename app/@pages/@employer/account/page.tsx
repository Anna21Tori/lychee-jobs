'use client'

import { useData} from '@/app/services/companies/use-message';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import AddEditForm from './_components/add_edit_form.componet';

export interface ICompany {
    name: string,
    size: number,
    description: string,
    industry: string,
    id?: number,
    user_id?: string
}

const defaultCompany: ICompany = {
    name: "",
    size: 0,
    description: "",
    industry: ""
}

export default function Page() {
    const [company, setCompany] = useState<ICompany>(defaultCompany);
    const [isDone, setIsDone] = useState(false);

    const data = useData<ICompany[]>({
        url: `/api/employers`,
        method: "GET",
        headers: {
          "content-type": "application/json",
        }
    });
    
    useEffect(() => {
        if(data.response && data.response.isSuccess && data.response.data){
            if(data.response.data.length > 0 && !isDone){
                setCompany({... data.response.data[0]});
                setIsDone(true);
            }
                
        }
        console.log(2);
    }, [data, isDone]);

    const handleData = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const el = e.target;
        const value = el.value;
        const name = el.name;
        console.log(1);
        setCompany((prev) => {
            return {... prev, [name]: value}
        })
    }

    const handleSubmit = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        
        fetch("/api/employers", {
            method: company.id ? "PATCH" : "POST",
            body: JSON.stringify(company),
            headers: {
                "Content-Type": "application/json",
              },
        })
    }
    return (
        <>
            {data.response.isLoading ? "Loading ..." : data.response.isSuccess ? <AddEditForm data={company} handleData={handleData} handleSubmit={handleSubmit}/> : data.response.error}
        </>
    )
}



