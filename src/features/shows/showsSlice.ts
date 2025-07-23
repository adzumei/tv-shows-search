import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Show {
    show: {
        id: number;
        name: string;
    };
}

interface ShowsState {
    query: string;
    results: Show[];
    loading: boolean;
}

const initialState: ShowsState = {
    query: "",
    results: [],
    loading: false,
};

export const fetchShows = createAsyncThunk(
    "shows/fetchShows",
    async (query: string) => {
        const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
        return response.data;
    }
);

const showsSlice = createSlice({
    name: "shows",
    initialState,
    reducers: {
        setQuery: (state, action) => {
            state.query = action.payload;
        },
        clearResults: (state) => {
            state.results = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchShows.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchShows.fulfilled, (state, action) => {
                state.results = action.payload;
                state.loading = false;
            })
            .addCase(fetchShows.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { setQuery, clearResults } = showsSlice.actions;
export default showsSlice.reducer;
