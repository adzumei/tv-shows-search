import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Show {
    id: number;
    name: string;
    summary: string;
    image: {
        medium: string;
        original: string;
    };
    genres: string[];
    rating: {
        average: number;
    };
    premiered: string;
}

interface ShowsState {
    query: string;
    results: { show: { id: number; name: string } }[];
    loading: boolean;
    selectedShow: Show | null;
    detailsLoading: boolean;
}

const initialState: ShowsState = {
    query: "",
    results: [],
    loading: false,
    selectedShow: null,
    detailsLoading: false,
};

export const fetchShows = createAsyncThunk(
    "shows/fetchShows",
    async (query: string) => {
        const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
        return response.data;
    }
);

export const fetchShowById = createAsyncThunk(
    "shows/fetchShowById",
    async (id: string) => {
        const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);
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
            })
            .addCase(fetchShowById.pending, (state) => {
                state.detailsLoading = true;
            })
            .addCase(fetchShowById.fulfilled, (state, action) => {
                state.selectedShow = action.payload;
                state.detailsLoading = false;
            })
            .addCase(fetchShowById.rejected, (state) => {
                state.detailsLoading = false;
            });
    },
});

export const { setQuery, clearResults } = showsSlice.actions;
export default showsSlice.reducer;
