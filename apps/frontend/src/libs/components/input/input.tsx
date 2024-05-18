import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
	type UseFormRegister,
} from "react-hook-form";

import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useFormController } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
	className?: string | undefined;
	color?: "dark" | "light";
	control: Control<T, null>;
	errors: FieldErrors<T>;
	hasVisuallyHiddenLabel?: boolean;
	inputMode?: "email" | "numeric" | "text";
	label: string;
	maxDate?: string;
	minDate?: string;
	name: FieldPath<T>;
	placeholder?: string;
	register?: UseFormRegister<T>;
	rows?: number;
	type?: "date" | "email" | "number" | "password" | "text";
};

const Input = <T extends FieldValues>({
	className,
	color = "light",
	control,
	errors,
	hasVisuallyHiddenLabel,
	inputMode = "text",
	label,
	maxDate = "",
	minDate = "",
	name,
	placeholder = "",
	register,
	rows,
	type = "text",
}: Properties<T>): JSX.Element => {
	const { field } = useFormController({ control, name });

	const error = errors[name]?.message;
	const hasError = Boolean(error);

	const isTextArea = Boolean(rows);

	const inputClasses = getValidClassNames(
		className,
		isTextArea ? styles["textarea"] : styles["input"],
		styles[color],
		hasError && styles["error-input"],
	);
	const labelClasses = getValidClassNames(
		styles["heading"],
		hasVisuallyHiddenLabel && "visually-hidden",
	);

	return (
		<label className={styles["container"]}>
			<span className={labelClasses}>{label}</span>
			{isTextArea ? (
				<textarea
					className={inputClasses}
					{...field}
					placeholder={placeholder}
					rows={rows}
				/>
			) : (
				<input
					className={inputClasses}
					{...field}
					inputMode={inputMode}
					max={type === "date" ? maxDate : undefined}
					min={type === "date" ? minDate : undefined}
					placeholder={placeholder}
					type={type}
					{...(register && register(name, { valueAsNumber: true }))}
				/>
			)}
			{hasError && <span className={styles["error"]}>{error as string}</span>}
		</label>
	);
};

export { Input };
