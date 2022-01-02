export enum Status {
  OPEN,
  NOT_STARTED,
  FINISHED,
}

export const START_UNIX_TIME = 1641013200;
export const END_UNIX_TIME = START_UNIX_TIME + (60 * 60 * 42);

export function getStatus() {
  const nowUnix = Math.floor(new Date().getTime() / 1000);
  if (nowUnix >= END_UNIX_TIME) {
    return Status.FINISHED;
  }
  if (nowUnix >= START_UNIX_TIME) {
    return Status.OPEN;
  }
  return Status.NOT_STARTED;
}
