import "dayjs/locale/km";

import dayjs from "dayjs";

export const DATE_FORMATS = {
	style1: "DD MMM YYYY",
	style2: "DD, MMM YYYY",
} as const;

export const getDateFormat = (
	date: string,
	locale: Locale = "en",
	format?: string,
) => {
	return dayjs(date)
		.locale(locale)
		.format(format || DATE_FORMATS.style1);
};
