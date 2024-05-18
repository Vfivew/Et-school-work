import { z } from "zod";

import { FormValidationMessage, FormValidationRule } from "../enums/enums.js";

type EventFormValidationDto = {
	dateOfBirth: z.ZodString;
	email: z.ZodString;
	fullName: z.ZodString;
	source: z.ZodString;
};

const eventFormParameters = z
	.object<EventFormValidationDto>({
		dateOfBirth: z
			.string()
			.trim()
			.min(FormValidationRule.FIELD_MINIMUM_LENGTH, {
				message: FormValidationMessage.FIELD_REQUIRE,
			}),
		email: z
			.string()
			.trim()
			.min(FormValidationRule.FIELD_MINIMUM_LENGTH, {
				message: FormValidationMessage.FIELD_REQUIRE,
			})
			.email({
				message: FormValidationMessage.EMAIL_INVALID_FORMAT,
			})
			.regex(/^[\w.]+(?:[._][\dA-Za-z]+)*(?=@)/, {
				message: FormValidationMessage.EMAIL_INVALID_FORMAT,
			})
			.regex(/^(?!.*[._]{2})[\w.]*(?=@)/, {
				message: FormValidationMessage.EMAIL_INVALID_FORMAT,
			})
			.regex(/(?<=@)(?!.*[.-]{2})[\d.A-Za-z-]*/, {
				message: FormValidationMessage.EMAIL_INVALID_FORMAT,
			})
			.regex(/^[^_][\w.]*(?=@)/, {
				message: FormValidationMessage.EMAIL_INVALID_FORMAT,
			})
			.regex(/^(?!.*_(?=@)).*(?=@)/, {
				message: FormValidationMessage.EMAIL_INVALID_FORMAT,
			})
			.regex(
				new RegExp(
					`^[a-zA-Z0-9._%+-]{1,${FormValidationRule.EMAIL_LOCAL_PART_MAXIMUM_LENGTH}}(?=@)`,
				),
				{
					message: FormValidationMessage.EMAIL_LOCAL_PART_MAXIMUM_LENGTH,
				},
			)
			.regex(
				new RegExp(
					`(?<=@)[a-zA-Z0-9.-]{1,${FormValidationRule.EMAIL_DOMAIN_PART_MAXIMUM_LENGTH}}$`,
				),
				{
					message: FormValidationMessage.EMAIL_DOMAIN_PART_MAXIMUM_LENGTH,
				},
			),
		fullName: z
			.string()
			.trim()
			.min(FormValidationRule.FIELD_MINIMUM_LENGTH, {
				message: FormValidationMessage.FIELD_REQUIRE,
			})
			.regex(/^[\s'A-Za-z-]*$/, {
				message: FormValidationMessage.FIRST_NAME_INVALID_CHARACTERS,
			})
			.regex(/^[^-]*-?[^-]*$/, {
				message: FormValidationMessage.FIRST_NAME_INVALID_CHARACTERS,
			})
			.regex(/^[^']*'?[^']*$/, {
				message: FormValidationMessage.FIRST_NAME_INVALID_CHARACTERS,
			})
			.regex(/^(?!['-])(?!.*['-]$)[\s'A-Za-z-]*$/, {
				message: FormValidationMessage.FIRST_LAST_CHARACTERS_ONLY_LETTERS,
			})
			.regex(/^(?!.*['-]{2})[\s'A-Za-z-]*$/, {
				message: FormValidationMessage.ADJACENT_HYPHEN_APOSTROPHE,
			})
			.min(FormValidationRule.FIRST_NAME_MINIMUM_LENGTH, {
				message: FormValidationMessage.FIRST_NAME_MINIMUM_LENGTH,
			})
			.max(FormValidationRule.FIRST_NAME_MAXIMUM_LENGTH, {
				message: FormValidationMessage.FIRST_NAME_MAXIMUM_LENGTH,
			}),
		source: z.string().trim().min(FormValidationRule.FIELD_MINIMUM_LENGTH, {
			message: FormValidationMessage.FIELD_REQUIRE,
		}),
	})
	.required();

export { eventFormParameters };
