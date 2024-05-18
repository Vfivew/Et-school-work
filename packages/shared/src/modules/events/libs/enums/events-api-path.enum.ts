const EventsApiPath = {
	$ID: "/:id",
	EVENT: "/event/:id",
	ROOT: "/",
	UPDATE_USERS: "/update-users",
	USER: "/users/:id",
} as const;

export { EventsApiPath };
