import {
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LineElement,
	LinearScale,
	PointElement,
	Title,
	Tooltip,
} from "chart.js";
import { type RefObject, useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";

import { type EventUserResponseDto } from "~/modules/events/libs/types/types.js";

import { MagicNumber } from "../../libs/enums/magic-number.enum.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
	Legend,
);

type ChartData = {
	datasets: {
		backgroundColor: string;
		borderColor: string;
		borderWidth: number;
		data: number[];
		fill: boolean;
		label: string;
		tension: number;
	}[];
	labels: string[];
};

type Properties = {
	users: EventUserResponseDto[];
};

const UserRegistrationChart: React.FC<Properties> = ({ users }: Properties) => {
	const [chartData, setChartData] = useState<ChartData>({
		datasets: [
			{
				backgroundColor: "rgba(75, 192, 192, 0.2)",
				borderColor: "rgba(75, 192, 192, 1)",
				borderWidth: 1,
				data: [],
				fill: true,
				label: "Регистрации пользователей",
				tension: 0.4,
			},
		],
		labels: [],
	});

	const chartReference: RefObject<ChartJS<"line">> = useRef(null);

	const prepareChartData = (users: EventUserResponseDto[]): ChartData => {
		const registrations: { [key: string]: number } = {};

		for (const user of users) {
			const [date] = user.createdAt.split("T");

			if (date) {
				registrations[date] =
					(registrations[date] || MagicNumber.EMPTY_ARRAY) +
					MagicNumber.SECOND_ARRAY_ELEMENT;
			}
		}

		const chartLabels = Object.keys(registrations);

		return {
			datasets: [
				{
					backgroundColor: "rgba(75, 192, 192, 0.2)",
					borderColor: "rgba(75, 192, 192, 1)",
					borderWidth: 1,
					data: chartLabels.map((date) => registrations[date]) as number[],
					fill: true,
					label: "User registrations",
					tension: 0.4,
				},
			],
			labels: chartLabels,
		};
	};

	useEffect(() => {
		const newData = prepareChartData(users);
		setChartData(newData);
	}, [users]);

	return (
		<div>
			<h2>Schedule of user registrations</h2>
			<Line data={chartData} ref={chartReference} />
		</div>
	);
};

export { UserRegistrationChart };
