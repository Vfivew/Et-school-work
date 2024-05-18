import { AppTitle } from "~/libs/enums/enums.js";
import { useAppTitle } from "~/libs/hooks/hooks.js";

import { ReservationInformation } from "./components/components.js";
import styles from "./styles.module.css";

const Form: React.FC = () => {
	useAppTitle(AppTitle.REGISTRATION);

	return (
		<div className={styles["container"]}>
			<ReservationInformation />;
		</div>
	);
};

export { Form };
