import {create} from "zustand";
import React from "react";

interface ApiData {
    badgeLetters: string;
    company: string;
    daysAgo: number;
    id: number;
    relevanceScore: number;
    title: string
}

export interface IdFetch extends ApiData {
    description: string;
    qualifications: string[];
    reviews: string[];
    duration: string;
    salary:string;
    location:string;
    coverImgURL: string;
    companyURL: string
}

interface LoadStoreTypes {
   searchText: string;
   setSearchText: (event:React.ChangeEvent<HTMLInputElement>) => void;
   fetchedData: ApiData[];
   fetchingData: () => Promise<void> | undefined;
   isLoading:boolean;
   webJoblistId: number;
   getwebJoblistId: () => void;
   idApiFetchedData: IdFetch | null;
   idApiFetching: () => Promise<void>;
   isApiLoading:boolean
}

export const LoadStore = create<LoadStoreTypes>()((set, get) => ({
    searchText: '',
    fetchedData: [],
    isLoading: false,
    webJoblistId: 0,
    idApiFetchedData: {
        badgeLetters: '',
        company: '',
        daysAgo: 0,
        id: 0,
        relevanceScore: 0,
        title: '',
        description: '',
        qualifications: [],
        reviews: [],
        duration: '',
        salary: '',
        location: '',
        coverImgURL: '',
        companyURL: ''
    },
    isApiLoading:false,
    setSearchText: (event:React.ChangeEvent<HTMLInputElement>) => set({searchText: event.target.value}),
    fetchingData: () => {
        if (!get().searchText) return; //kills application 🔥
        set({isLoading: true});
       return fetch(`https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${get().searchText}`).
            then(data => data.json()).then(data => set({fetchedData: data.jobItems, isLoading: false}));
    },
    // adding + is called unary operator that changes string to number +window.location.hash.substring(2)
    getwebJoblistId: () => set({webJoblistId: +window.location.hash.substring(4)}), 
    idApiFetching: async () => {
        if (get().webJoblistId === 0) return //kills application 🔥
        set({isApiLoading: true})
        try {
            const data = await fetch(`https://bytegrad.com/course-assets/projects/rmtdev/api/data/${get().webJoblistId}`);
            if (!data.ok) {throw new Error('failed to fetch')} //kills application 🔥
            const dataid = await data.json();
            set({idApiFetchedData: dataid.jobItem, isApiLoading: false})
        } catch (error) {
            console.log(error)
        }
    }
}))