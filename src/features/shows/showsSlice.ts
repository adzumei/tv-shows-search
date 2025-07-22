import { createSlice } from "@reduxjs/toolkit";

interface ShowsState {
    query: string;
}

const initialState: ShowsState = {
    query: "",
};

const showsSlice = createSlice({
    name: "shows",
    initialState,
    reducers: {
        setQuery: (state, action) => {
            state.query = action.payload;
        },
    },
});

export const { setQuery } = showsSlice.actions;
export default showsSlice.reducer;
