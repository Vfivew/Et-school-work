import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";

import {
	type EventResponseDto,
	type EventSortDto,
	type EventUserListRequestQueryDto,
	type EventUserRequestDto,
	type EventUserResponseDto,
	type PaginationResponseDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./events.slice.js";

const createUser = createAsyncThunk<
	EventResponseDto,
	EventUserRequestDto,
	AsyncThunkConfig
>(`${sliceName}/create-user`, async (payload, { extra }) => {
	const { eventApi } = extra;

	return await eventApi.createUser(payload);
});

const getAllEvents = createAsyncThunk<
	EventResponseDto[],
	EventSortDto,
	AsyncThunkConfig
>(`${sliceName}/get-all-events`, async (query, { extra }) => {
	const { eventApi } = extra;

	return await eventApi.getAllEvents(query);
});

const getEventUsers = createAsyncThunk<
	PaginationResponseDto<EventUserResponseDto>,
	EventUserListRequestQueryDto,
	AsyncThunkConfig
>(`${sliceName}/get-all-event-users`, async (query, { extra }) => {
	const { eventApi } = extra;

	return await eventApi.getEventUsers(query);
});

export { createUser, getAllEvents, getEventUsers };
