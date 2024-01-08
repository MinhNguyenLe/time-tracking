import dayjsWithTz from "dayjs";

import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone"; // dependent on utc plugin

dayjsWithTz.extend(utc);
dayjsWithTz.extend(timezone);

export const formatDate = (date: Date) =>
dayjsWithTz(date).format("HH:mm DD/MM/YYYY");

export default dayjsWithTz;
