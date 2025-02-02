import {create} from "zustand";
import { persist, createJSONStorage} from 'zustand/middleware'
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

interface recordedID {
    bookmark: boolean;
    id:number
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
   setbookMarkClick: (id: number) => void;
   recordedIDs:recordedID[];
   openPopUp: boolean;
   setopenPopUp: () => void;
   getRecordedID: (units: number[]) => Promise<ApiData[]>;
}

export const LoadStore = create<LoadStoreTypes>()(persist((set, get) => ({
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
    recordedIDs: [],
    openPopUp: false,
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
    sortByRelevance: () => { !!get().fetchedData && set((state) => ({sortActive:'relevant', SortedfetchedData: [...state.fetchedData!].sort((a, b) => a.relevanceScore - b.relevanceScore)})) },
    sortByRecent: () => { !!get().fetchedData && set((state) => ({sortActive: 'recent', SortedfetchedData: [...state.fetchedData!].sort((a, b) => a.daysAgo - b.daysAgo)})) },
    setbookMarkClick: (id:number) => {
        const bookmarked:boolean = false;
        const bookmarks: recordedID = {bookmark: !bookmarked, id: id};

        get().recordedIDs.find(data => (data.id === id)) ?
            set((state) => ({recordedIDs: state.recordedIDs.
                map(data => data.id === id ? {...data, bookmark: !data.bookmark} : data) })) :
            set((state)  => ({recordedIDs: [...state.recordedIDs, bookmarks]}))
        set({recordedIDs:  get().recordedIDs.filter(data => data.bookmark)}) //last filter
    },
    setopenPopUp: () => set((state) => ({openPopUp: !state.openPopUp})),
    getRecordedID: async (units:number[]):Promise<ApiData[]> => {

        const response = await Promise.all(units.map(unit => fetch(`${webDomain}/${unit}`)))

//        checking for an error ❌
        if (response.filter(response => !response.ok).length > 0) {
            const error = await Promise.all(response.map(response => response.json()));
            error.forEach(error => toast.error(error))
        }

        const data = await Promise.all(response.map(response => response.json()))
        return data.map(data => data.jobItem)
    }
}),{
            storage: createJSONStorage(() => localStorage),
            name: 'bookmarks',
            partialize: (state) => ({recordedIDs: state.recordedIDs})
        }
    )
);
