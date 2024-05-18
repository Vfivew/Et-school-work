import { type AppRoute } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { type ValueOf } from "~/libs/types/types.js";

import { Link } from "../link/link.js";
import { Loader } from "../loader/loader.js";
import styles from "./styles.module.css";

type Properties = {
	className?: string | undefined;
	hasVisuallyHiddenLabel?: boolean;
	href?: ValueOf<typeof AppRoute>;
	isDisabled?: boolean;
	isLoading?: boolean;
	label: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
	size?: "default" | "regular" | "small";
	style?: "black" | "primary" | "red" | "secondary";
	type?: "button" | "submit";
};

const Button: React.FC<Properties> = ({
	className,
	hasVisuallyHiddenLabel = false,
	href,
	isDisabled = false,
	isLoading,
	label,
	onClick,
	size = "regular",
	style = "primary",
	type = "button",
}: Properties) => {
	const buttonStyles = getValidClassNames(
		styles["button"],
		styles[size],
		styles[style],
		className,
		isDisabled && styles["disabled"],
	);

	const labelStyle = getValidClassNames(
		hasVisuallyHiddenLabel && "visually-hidden",
	);

	const buttonContentStyles = getValidClassNames(
		styles["content"],
		isLoading && styles["content-hidden"],
	);

	return (
		<>
			{href ? (
				<Link className={buttonStyles} isDisabled={isDisabled} to={href}>
					<span className={labelStyle}>{label}</span>
				</Link>
			) : (
				<button
					className={buttonStyles}
					disabled={isDisabled}
					onClick={onClick}
					type={type}
				>
					{isLoading && (
						<Loader
							className={getValidClassNames(styles["button-loader"])}
							size="small"
						/>
					)}
					<div className={buttonContentStyles}>
						<span className={labelStyle}>{label}</span>
					</div>
				</button>
			)}
		</>
	);
};

export { Button };
