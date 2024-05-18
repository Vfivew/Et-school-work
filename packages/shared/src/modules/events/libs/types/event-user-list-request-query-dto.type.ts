import { type PaginationRequestDto } from "./pagination-request-dto.js";

type EventUserListRequestQueryDto = {
	eventId: number;
	search: string;
} & PaginationRequestDto;

export { type EventUserListRequestQueryDto };
