export const convertSeconds = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours === 0) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
  } else {
    return `${hours} hour${hours !== 1 ? "s" : ""} and ${minutes} minute${
      minutes !== 1 ? "s" : ""
    }`;
  }
};
