import { Button } from "~/libs/components/components.js";
import { AppTitle } from "~/libs/enums/enums.js";
import { useAppTitle } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

const NotFound: React.FC = () => {
	useAppTitle(AppTitle.NOT_FOUND);

	return (
		<div className={styles["not-found-page-container"]}>
			<div className={styles["not-found-page-content-container"]}>
				<h2 className={styles["title"]}>Page Not Found</h2>
				<p className={styles["content"]}>
					There is no page you are trying to find.
				</p>
				<div className={styles["actions"]}>
					<Button href="/" label="Go Home" />
				</div>
			</div>
		</div>
	);
};

export { NotFound };
