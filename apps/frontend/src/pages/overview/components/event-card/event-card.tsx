import { Button } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { configureString } from "~/libs/helpers/helpers.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type EventResponseDto } from "~/modules/events/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	event: EventResponseDto;
};

const EventCard: React.FC<Properties> = ({ event }: Properties) => {
	const eventUsersRoute = configureString(AppRoute.EVENT_$ID, {
		id: String(event.id),
	});
	const eventUpdateUsersRoute = configureString(
		AppRoute.EVENT_REGISTRATION_$ID,
		{
			id: String(event.id),
		},
	);

	return (
		<li className={styles["card"]} key={event.id}>
			<h3>{event.title}</h3>
			<p>{event.description}</p>
			<p>{new Date(event.eventDate).toLocaleDateString()}</p>
			<p>Organized by: {event.organizer}</p>
			<div className={styles["button-container"]}>
				<Button
					href={eventUpdateUsersRoute as ValueOf<typeof AppRoute>}
					label="Registration"
					size="small"
				/>
				<Button
					href={eventUsersRoute as ValueOf<typeof AppRoute>}
					label="View"
					size="small"
				/>
			</div>
		</li>
	);
};

export { EventCard };
