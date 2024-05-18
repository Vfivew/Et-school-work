import { useEffect } from "~/libs/hooks/hooks.js";

const useAppTitle = (title?: string): void => {
	useEffect(() => {
		document.title = (title ? title + " | " : "") + "ET school";
	}, [title]);
};

export { useAppTitle };
