export const PAGE_SIZE = 10;
export const TIME_INCREMENT = 5;
export const SPEED_INCREMENT = 0.25;

export const TOKEN = [
  process.env.REACT_APP_TOKEN_HEADER,
  process.env.REACT_APP_TOKEN_BODY,
  process.env.REACT_APP_TOKEN_SIGNATURE,
].join(".");
