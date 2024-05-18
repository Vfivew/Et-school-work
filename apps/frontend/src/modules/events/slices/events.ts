import { createUser, getAllEvents, getEventUsers } from "./actions.js";
import { actions } from "./events.slice.js";

const allActions = {
	...actions,
	createUser,
	getAllEvents,
	getEventUsers,
};

export { reducer } from "./events.slice.js";
export { allActions as actions };
