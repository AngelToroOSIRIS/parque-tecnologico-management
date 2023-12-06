import { CategoryComplete } from "@/types/d";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: { data: CategoryComplete[] } = { data: [] };

export const categoriesSlice = createSlice({
	name: "categories",
	initialState,
	reducers: {
		setCategories: (state, action: PayloadAction<CategoryComplete[]>) => {
			state.data = action.payload ?? [];
		},
	},
});

export const { setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;