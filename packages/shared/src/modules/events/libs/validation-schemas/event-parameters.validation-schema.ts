import { z } from "zod";

import { EventValidationMessage } from "../enums/enums.js";

type EventParametersValidationDto = {
	id: z.ZodString;
};

const eventParameters = z
	.object<EventParametersValidationDto>({
		id: z.string().trim().regex(/^\d+$/, {
			message: EventValidationMessage.INVALID_ID,
		}),
	})
	.required();

export { eventParameters };
