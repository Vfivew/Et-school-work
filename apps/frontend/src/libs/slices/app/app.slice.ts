import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { type AppRoute } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

type State = {
	redirectTo: ValueOf<typeof AppRoute> | null;
};

const initialState: State = {
	redirectTo: null,
};

const { reducer } = createSlice({
	initialState,
	name: "app",
	reducers: {
		navigate: (
			state,
			action: PayloadAction<ValueOf<typeof AppRoute> | null>,
		) => {
			state.redirectTo = action.payload;
		},
	},
});

export { reducer };
