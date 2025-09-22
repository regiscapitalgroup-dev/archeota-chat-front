import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedCategory {
    id: string;
    name: string;
}

interface SelectedCategoryState {
    current: SelectedCategory | null;
}

const initialState: SelectedCategoryState = {
    current: null,
};

const selectedCategorySlice = createSlice({
    name: "selectedCategory",
    initialState,
    reducers: {
        setSelectedCategory: (state, action: PayloadAction<SelectedCategory>) => {
            state.current = action.payload;
        },
        clearSelectedCategory: (state) => {
            state.current = null;
        },
    },
});

export const { setSelectedCategory, clearSelectedCategory } = selectedCategorySlice.actions;

export default selectedCategorySlice.reducer;
