import {
	type ThunkMiddleware,
	type Tuple,
	type UnknownAction,
} from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

import { AppEnvironment } from "~/libs/enums/enums.js";
import { type Config } from "~/libs/modules/config/config.js";
import { notification } from "~/libs/modules/notification/notification.js";
import { reducer as appReducer } from "~/libs/slices/app/app.js";
import { eventApi, reducer as eventsReducer } from "~/modules/events/events.js";

import { storage } from "../storage/storage.js";
import { handleError } from "./middlewares/middlewares.js";

type RootReducer = {
	app: ReturnType<typeof appReducer>;
	events: ReturnType<typeof eventsReducer>;
};

type ExtraArguments = {
	eventApi: typeof eventApi;
	notification: typeof notification;
	storage: typeof storage;
};

class Store {
	public instance: ReturnType<
		typeof configureStore<
			RootReducer,
			UnknownAction,
			Tuple<[ThunkMiddleware<RootReducer, UnknownAction, ExtraArguments>]>
		>
	>;

	public constructor(config: Config) {
		this.instance = configureStore({
			devTools: config.ENV.APP.ENVIRONMENT !== AppEnvironment.PRODUCTION,
			middleware: (getDefaultMiddleware) => {
				return getDefaultMiddleware({
					thunk: {
						extraArgument: this.extraArguments,
					},
				}).prepend([handleError]);
			},
			reducer: {
				app: appReducer,
				events: eventsReducer,
			},
		});
	}

	public get extraArguments(): ExtraArguments {
		return {
			eventApi,
			notification,
			storage,
		};
	}
}

export { Store };
