import { type EventResponseDto, type EventUserResponseDto } from "@etschool/shared";
import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { createUser, getAllEvents, getEventUsers } from "./actions.js";

type State = {
	creatUserDataStatus: ValueOf<typeof DataStatus>;
	dataStatus: ValueOf<typeof DataStatus>;
	events: [] | EventResponseDto[];
	users: [] | EventUserResponseDto[];
	usersTotal: number;
};

const initialState: State = {
	creatUserDataStatus: DataStatus.IDLE,
	dataStatus: DataStatus.IDLE,
	events: [],
	users: [],
	usersTotal: 0,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getAllEvents.fulfilled, (state, action) => {
			state.events = action.payload;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getAllEvents.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getAllEvents.rejected, (state) => {
			state.events = [];
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(getEventUsers.fulfilled, (state, action) => {
			state.users = action.payload.items;
			state.usersTotal = action.payload.total;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getEventUsers.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getEventUsers.rejected, (state) => {
			state.users = [];
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(createUser.fulfilled, (state, action) => {
			const updatedEvent = action.payload;
			state.events = state.events.map((event) =>
				event.id === updatedEvent.id ? updatedEvent : event,
			);

			state.creatUserDataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(createUser.pending, (state) => {
			state.creatUserDataStatus = DataStatus.PENDING;
		});
		builder.addCase(createUser.rejected, (state) => {
			state.creatUserDataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "event",
	reducers: {},
});

export { actions, name, reducer };
