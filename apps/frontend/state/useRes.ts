import { create } from "zustand"

export const useRes = create((set)=>({
    data:[],
    newData: (newData:any) => set({ data : newData})
}))