const FormValidationRule = {
	CHILD_SEAT_MAXIMUM_LENGHT: 3,
	CHILD_SEAT_MINIMUM_LENGHT: 0,
	COMMON_MAXIMUM_LENGTH: 35,
	EMAIL_DOMAIN_PART_MAXIMUM_LENGTH: 35,
	EMAIL_LOCAL_PART_MAXIMUM_LENGTH: 35,
	FIELD_MINIMUM_LENGTH: 1,
	FIRST_NAME_MAXIMUM_LENGTH: 35,
	FIRST_NAME_MINIMUM_LENGTH: 2,
	LAST_NAME_MAXIMUM_LENGTH: 35,
	LAST_NAME_MINIMUM_LENGTH: 2,
} as const;

export { FormValidationRule };