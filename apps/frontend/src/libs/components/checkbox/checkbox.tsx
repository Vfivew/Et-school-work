import React, { useCallback } from "react";

import styles from "./styles.module.css";

interface CheckboxProperties {
	checked: boolean;
	label: string;
	onChange: (value: string) => void;
	value: string;
}

const Checkbox: React.FC<CheckboxProperties> = ({
	checked,
	label,
	onChange,
	value,
}) => {
	const handleCheckboxChange = useCallback((): void => {
		onChange(value);
	}, [onChange, value]);

	return (
		<div className={styles["checkbox-container"]}>
			<label htmlFor={value}>{label}</label>
			<input
				checked={checked}
				className={styles["input"]}
				id={value}
				onChange={handleCheckboxChange}
				type="checkbox"
				value={value}
			/>
		</div>
	);
};

export { Checkbox };
