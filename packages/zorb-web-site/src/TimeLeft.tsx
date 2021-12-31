import {
  formatDistanceStrict,
  formatDuration,
  intervalToDuration,
} from "date-fns";
import { useEffect, useState } from "react";
import {
  END_UNIX_TIME,
  getStatus,
  START_UNIX_TIME,
  Status,
} from "./mint-status";

const FORMAT_OPTIONS = {
  format: ["years", "months", "weeks", "days", "hours", "minutes"],
};

export const TimeLeft = () => {
  const [baseDate, setBaseDate] = useState(() => new Date());
  const [status, setStatus] = useState(() => getStatus());
  useEffect(() => {
    const tmOut = setInterval(() => {
      setBaseDate(new Date());
      setStatus(getStatus());
    });
    return () => {
      clearTimeout(tmOut);
    };
  }, [setBaseDate]);

  if (status === Status.NOT_STARTED) {
    return (
      <>
        {" "}
        starts in{" "}
        {formatDuration(
          intervalToDuration({
            end: new Date(START_UNIX_TIME * 1000),
            start: baseDate,
          }),
          FORMAT_OPTIONS
        )}{" "}
      </>
    );
  }

  if (status === Status.OPEN) {
    return (
      <>
        {formatDuration(
          intervalToDuration({
            end: new Date(END_UNIX_TIME * 1000),
            start: baseDate,
          }),
          FORMAT_OPTIONS
        )}{" "}
        left
      </>
    );
  }

  return <>Sale finished</>;
};
