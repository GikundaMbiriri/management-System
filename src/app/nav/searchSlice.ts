import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { Search } from "@/types";
type SliceState =  { search:Search|null }

const searchSlice = createSlice({
  name: "search",
  initialState: { search: null },
  reducers: {
    setSearch: (state:SliceState, action:PayloadAction<Search>) => {

      const  search = action.payload;
      state.search = search;
      console.log('currentSearch',state.search)

    },
  
  },
});

export const { setSearch } = searchSlice.actions;

export default searchSlice.reducer;

export const selectSearch = (state:any) => state.search.search;
