import { Loader } from "~/libs/components/components.js";
import { AppTitle, DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useAppTitle,
	useCallback,
	useEffect,
	useParams,
	useState,
} from "~/libs/hooks/hooks.js";
import { actions as eventsActions } from "~/modules/events/events.js";

import { UserCard, UserRegistrationChart } from "./components/components.js";
import { MagicNumber } from "./libs/enums/enums.js";
import styles from "./styles.module.css";

const Users: React.FC = () => {
	const dispatch = useAppDispatch();
	const { id } = useParams();
	const { users } = useAppSelector((state) => state.events);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const usersDataStatus = useAppSelector(({ events }) => {
		return events.dataStatus;
	});

	const isLoading = usersDataStatus === DataStatus.PENDING;

	const handleSearchChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>): void => {
			setSearchTerm(event.target.value);
		},
		[],
	);
	useEffect(() => {
		void dispatch(
			eventsActions.getEventUsers({
				count: MagicNumber.PAGE_COUNT,
				eventId: Number(id),
				page: MagicNumber.DEFAULT_PAGE,
				search: searchTerm,
			}),
		);
	}, [dispatch, id, searchTerm]);

	useAppTitle(AppTitle.USERS);

	return (
		<div className={styles["container"]}>
			<h3 className={styles["title"]}>Awesome event participants</h3>
			<UserRegistrationChart users={users} />
			<input
				className={styles["input"]}
				onChange={handleSearchChange}
				placeholder="Search users..."
				type="text"
				value={searchTerm}
			/>
			{isLoading ? (
				<Loader size="large" />
			) : (users.length === MagicNumber.EMPTY_ARRAY ? (
				<p>No registered users</p>
			) : (
				<ul className={styles["list-container"]}>
					{users.map((user) => (
						<UserCard key={user.id} user={user} />
					))}
				</ul>
			))}
		</div>
	);
};

export { Users };
