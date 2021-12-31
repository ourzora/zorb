export enum Status {
  OPEN,
  NOT_STARTED,
  FINISHED,
}

export const START_UNIX_TIME = 1640995200;
export const END_UNIX_TIME = START_UNIX_TIME + 60 * 60 * 42;

export function getStatus() {
  const nowUnix = Math.floor(new Date().getTime() / 1000);
  if (START_UNIX_TIME >= nowUnix && END_UNIX_TIME <= nowUnix) {
    return Status.OPEN;
  }
  if (nowUnix >= START_UNIX_TIME) {
    return Status.FINISHED;
  }
  return Status.NOT_STARTED;
}
