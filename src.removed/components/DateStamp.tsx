import React from "react";
import { formatDate } from "../utils/date";

export type DateStampProps = {
  dateISO: string;
  className?: string;
};

export function DateStamp({ dateISO, className }: DateStampProps) {
  return (
    <time className={className} dateTime={dateISO}>
      {formatDate(dateISO)}
    </time>
  );
}

export default DateStamp;

