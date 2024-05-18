import { Button, Checkbox, Input } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppForm,
	useCallback,
	useNavigate,
	useParams,
	useState,
} from "~/libs/hooks/hooks.js";
import { actions as eventsActions } from "~/modules/events/events.js";
import { type EventUserRequestDto } from "~/modules/events/libs/types/types.js";
import { eventFormParametersValidationSchema } from "~/modules/events/libs/validation/validation.js";

import { ARRAY_LENGHT } from "../libs/constants/array-length.constant.js";
import styles from "./styles.module.css";

const ReservationInformation: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { id } = useParams();
	const [selectedCheckbox, setSelectedCheckbox] = useState<string>("Friend");

	const { control, errors, getValues, handleSubmit, reset } =
		useAppForm<EventUserRequestDto>({
			defaultValues: {
				dateOfBirth: "",
				email: "",
				fullName: "",
				source: "Friend",
			},
			validationSchema: eventFormParametersValidationSchema,
		});

	const handleCheckboxChange = useCallback((value: string): void => {
		setSelectedCheckbox(value);
	}, []);

	const handleInputChange = useCallback((): void => {
		if (Object.keys(errors).length === ARRAY_LENGHT.EMPTY) {
			const payload = {
				...getValues(),
				eventId: id,
				source: selectedCheckbox,
			};
			void dispatch(eventsActions.createUser(payload));
			navigate(AppRoute.ROOT);
		}
	}, [dispatch, errors, getValues, id, navigate, selectedCheckbox]);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(handleInputChange)(event_);
		},
		[handleSubmit, handleInputChange],
	);

	const handleResetForm = useCallback(() => {
		reset();
	}, [reset]);

	return (
		<div className={styles["container"]}>
			<section className={styles["form-wrapper"]}>
				<h3 className={styles["title"]}>Registration</h3>
				<form action="" className={styles["form"]} onSubmit={handleFormSubmit}>
					<h4>Information</h4>
					<Input
						control={control}
						errors={errors}
						label="Full name *"
						name="fullName"
						placeholder="Enter your name"
						type="text"
					/>
					<Input
						control={control}
						errors={errors}
						label="Email *"
						name="email"
						placeholder="Enter your email"
						type="text"
					/>
					<Input
						control={control}
						errors={errors}
						label="Date of birth *"
						name="dateOfBirth"
						placeholder="Enter your date of birth"
						type="date"
					/>
					<div className={styles["checkbox-wrapper"]}>
						<Checkbox
							checked={selectedCheckbox === "Friend"}
							label="Friend"
							onChange={handleCheckboxChange}
							value="Friend"
						/>
						<Checkbox
							checked={selectedCheckbox === "Found myself"}
							label="Found myself"
							onChange={handleCheckboxChange}
							value="Found myself"
						/>
						<Checkbox
							checked={selectedCheckbox === "Social media"}
							label="Social media"
							onChange={handleCheckboxChange}
							value="Social media"
						/>
					</div>
					<div className={styles["btn-wrapper"]}>
						<Button
							className={styles["button"]}
							label="Reset"
							onClick={handleResetForm}
							size="small"
							style="secondary"
						/>
						<Button
							className={styles["button"]}
							label="Send form"
							size="small"
							type="submit"
						/>
					</div>
				</form>
			</section>
		</div>
	);
};

export { ReservationInformation };
