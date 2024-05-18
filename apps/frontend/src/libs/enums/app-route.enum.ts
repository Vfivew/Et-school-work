const AppRoute = {
	ANY: "*",
	EVENT_$ID: "/event/:id",
	EVENT_REGISTRATION_$ID: "/event-registration/:id",
	ROOT: "/",
} as const;

export { AppRoute };
