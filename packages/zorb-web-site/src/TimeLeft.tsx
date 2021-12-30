import { formatDistance } from "date-fns";
import { useEffect, useState } from "react";

const START_UNIX_TIME = 1640995200;
const END_UNIX_TIME = START_UNIX_TIME + 60 * 60 * 24;

enum Status {
  OPEN,
  NOT_STARTED,
  FINISHED,
};

function getStatus() {
  const nowUnix = Math.floor((new Date()).getTime()/1000);
  if (START_UNIX_TIME >= nowUnix && END_UNIX_TIME <= nowUnix) {
    return Status.OPEN;
  }
  if (nowUnix >= START_UNIX_TIME) {
    return Status.FINISHED;
  }
  return Status.NOT_STARTED;
}

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

  return (
    <>
    {status === Status.NOT_STARTED && 'starts in '}
      {formatDistance(new Date(END_UNIX_TIME * 1000), baseDate, {
        includeSeconds: true,
        addSuffix: false,
      })}
      {' '}{status === Status.OPEN && 'left'}
    </>
  );
};
