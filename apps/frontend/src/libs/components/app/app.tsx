import { RouterOutlet } from "~/libs/components/components.js";

import styles from "./styles.module.css";

const App: React.FC = () => {
	return (
		<main className={styles["page-layout"]}>
			<RouterOutlet />
		</main>
	);
};

export { App };
