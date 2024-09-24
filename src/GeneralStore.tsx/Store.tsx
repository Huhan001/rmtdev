import {create} from "zustand";
import React from "react";
import {webDomain} from "../constant/sharedConstant";
import toast from "react-hot-toast";

export interface ApiData {
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

// 📌 like protocal oriented programing
interface LoadStoreTypes {
   searchText: string;
   setSearchText: (event:React.ChangeEvent<HTMLInputElement>) => void;
   fetchingData: (search:string) => Promise<ApiData[]> | undefined;
   webJoblistId: number;
   getwebJoblistId: () => void;
   idApiFetching: (url:string) => Promise<IdFetch | null>;
   debouncedSearch: string;
   firstApiDataCount: number;
   fetchedData: ApiData[] | null
   isLoading: boolean;
   paginationBreak: (word:string) => void;
   paginationIndex: [a: number, b: number];
   paginationPage: [a: number, b: number];
   sortByRelevance: () => void;
   sortByRecent: () => void
   SortedfetchedData: ApiData[] | null
   sortActive: string;
}

export const LoadStore = create<LoadStoreTypes>()((set, get) => ({
    searchText: '',
    isLoading: false,
    webJoblistId: 0,
    debouncedSearch:"",
    firstApiDataCount: 0,
    fetchedData: null,
    SortedfetchedData: null,
    paginationIndex: [0, 7],
    paginationPage: [1,2],
    sortActive:"",
    setSearchText: (event:React.ChangeEvent<HTMLInputElement>) => set({searchText: event.target.value}),
    fetchingData: async (search:string) => {
        if (!get().searchText) return; //kills application 🔥

        const data = await fetch(`${webDomain}?search=${search}`)

        if (!data.ok) {
            const errorData = await data.json();
            toast.error(errorData.description) // Toaster library.
        }

        const respone = await data.json()
        return respone.jobItems
    },
    // adding + is called unary operator that changes string to number +window.location.hash.substring(2)
    getwebJoblistId: () => set({webJoblistId: +window.location.hash.substring(4)}),
    idApiFetching: async (url:string) => {
            const data = await fetch(url);
            const response =  await data.json();
        return response.jobItem
    },
    paginationBreak: (word: string) => set((state) => {
        if(word === 'next') {
            return {paginationIndex: [state.paginationIndex[0] + 7, state.paginationIndex[1] + 7], paginationPage: [state.paginationPage[0] + 1, state.paginationPage[1] + 1]} }
        else {
             return {paginationIndex: [state.paginationIndex[0] - 7, state.paginationIndex[1] - 7], paginationPage: [state.paginationPage[0] - 1, state.paginationPage[1] -1]} }
    }),
    sortByRelevance: () => { !!get().fetchedData && set({sortActive:'relevant', SortedfetchedData: [...get().fetchedData].sort((a, b) => a.relevanceScore - b.relevanceScore)}) },
    sortByRecent: () => { !!get().fetchedData && set({sortActive: 'recent', SortedfetchedData: [...get().fetchedData].sort((a, b) => a.daysAgo - b.daysAgo)}) }
}));