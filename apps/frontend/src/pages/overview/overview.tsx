import { Button, Loader } from "~/libs/components/components.js";
import { type AppRoute, AppTitle, DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useAppTitle,
	useCallback,
	useEffect,
	useNavigate,
	useSearchParams,
	useState,
} from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";
import { actions as eventsActions } from "~/modules/events/events.js";

import { EventCard } from "./components/components.js";
import styles from "./styles.module.css";

const Overview: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
	const [queryParameters] = useSearchParams();
	const { events } = useAppSelector((state) => state.events);
	const currentPage = 1;
	const eventsDataStatus = useAppSelector(({ events }) => {
		return events.dataStatus;
	});

	const isLoading = eventsDataStatus === DataStatus.PENDING;

	const handleSort = useCallback(() => {
		setSortOrder((previousSortOrder) =>
			previousSortOrder === "asc" ? "desc" : "asc",
		);
		const searchParameters = new URLSearchParams(queryParameters);
		searchParameters.set("sortOrder", sortOrder === "asc" ? "desc" : "asc");
		navigate(`?${searchParameters.toString()}`);
	}, [navigate, queryParameters, sortOrder]);

	useEffect(() => {
		const searchParameters = new URLSearchParams(queryParameters);
		const sortOrderParameter = searchParameters.get("sortOrder") || "asc";
		const sortByParameter = searchParameters.get("sortBy") || "title";
		void dispatch(
			eventsActions.getAllEvents({
				page: currentPage,
				sortBy: sortByParameter,
				sortOrder: sortOrderParameter as "asc" | "desc",
			}),
		);
	}, [dispatch, queryParameters, currentPage, sortOrder]);

	useAppTitle(AppTitle.EVENT);

	return (
		<div className={styles["container"]}>
			<h3 className={styles["title"]}>Events</h3>
			<div className={styles["button-container"]}>
				<Button
					className={styles["button"]}
					href={
						`?sortOrder=${sortOrder}&page=${currentPage}&sortBy=title` as ValueOf<
							typeof AppRoute
						>
					}
					label="Sort by Title"
				/>
				<Button
					className={styles["button"]}
					href={
						`?sortOrder=${sortOrder}&page=${currentPage}&sortBy=eventDate` as ValueOf<
							typeof AppRoute
						>
					}
					label="Sort by Date"
				/>
				<Button
					className={styles["button"]}
					href={
						`?sortOrder=${sortOrder}&page=${currentPage}&sortBy=organizer` as ValueOf<
							typeof AppRoute
						>
					}
					label="Sort by Organizer"
				/>
				<Button
					className={styles["button"]}
					label={`Sort ${sortOrder === "asc" ? "Descending" : "Ascending"}`}
					onClick={handleSort}
				/>
			</div>
			{isLoading ? (
				<Loader size="large" />
			) : (
				<ul className={styles["list-container"]}>
					{events.map((event) => (
						<EventCard event={event} key={event.id} />
					))}
				</ul>
			)}
		</div>
	);
};

export { Overview };
