import { type Knex } from "knex";

const TABLE_NAME = "event_users";

const ColumnName = {
	CREATED_AT: "created_at",
	DATE_OF_BIRTH: "date_of_birth",
	EMAIL: "email",
	EVENT_ID: "event_id",
	FULL_NAME: "full_name",
	ID: "id",
	SOURCE: "source",
	UPDATED_AT: "updated_at",
} as const;

const userData = [
	{
		[ColumnName.CREATED_AT]: "2024-05-06",
		[ColumnName.DATE_OF_BIRTH]: new Date(),
		[ColumnName.EMAIL]: "john@example.com",
		[ColumnName.FULL_NAME]: "John Doe",
		[ColumnName.SOURCE]: "Friend",
	},
	{
		[ColumnName.CREATED_AT]: "2024-05-07",
		[ColumnName.DATE_OF_BIRTH]: new Date(),
		[ColumnName.EMAIL]: "jane@example.com",
		[ColumnName.FULL_NAME]: "Jane Smith",
		[ColumnName.SOURCE]: "Social Media",
	},
	{
		[ColumnName.CREATED_AT]: "2024-05-03",
		[ColumnName.DATE_OF_BIRTH]: new Date(),
		[ColumnName.EMAIL]: "alice@example.com",
		[ColumnName.FULL_NAME]: "Alice Johnson",
		[ColumnName.SOURCE]: "Found Myself",
	},
	{
		[ColumnName.CREATED_AT]: "2024-05-04",
		[ColumnName.DATE_OF_BIRTH]: new Date(),
		[ColumnName.EMAIL]: "bob@example.com",
		[ColumnName.FULL_NAME]: "Bob Brown",
		[ColumnName.SOURCE]: "Friend",
	},
	{
		[ColumnName.CREATED_AT]: "2024-05-03",
		[ColumnName.DATE_OF_BIRTH]: new Date(),
		[ColumnName.EMAIL]: "emily@example.com",
		[ColumnName.FULL_NAME]: "Emily Davis",
		[ColumnName.SOURCE]: "Social Media",
	},
	{
		[ColumnName.CREATED_AT]: "2024-05-06",
		[ColumnName.DATE_OF_BIRTH]: new Date(),
		[ColumnName.EMAIL]: "michael@example.com",
		[ColumnName.FULL_NAME]: "Michael Wilson",
		[ColumnName.SOURCE]: "Found Myself",
	},
];

async function seed(knex: Knex): Promise<void> {
	const events = await knex.select(ColumnName.ID).from("events");

	const usersDataForAllEvents = events.flatMap((event) =>
		userData.map((user) => ({
			...user,
			// TODO TS error
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
			[ColumnName.EVENT_ID]: event[ColumnName.ID],
		})),
	);

	await knex(TABLE_NAME).insert(usersDataForAllEvents);
}

export { seed };
