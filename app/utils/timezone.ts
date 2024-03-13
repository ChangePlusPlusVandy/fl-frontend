export const convertToCentral = (date: Date) => {
  if (isDST(date)) {
    date.setUTCHours(date.getUTCHours() - 5);
    return date;
  }
  date.setUTCHours(date.getUTCHours() - 6);
  return date;
};

// Function to check if the given date is within DST period
function isDST(date: Date) {
  // Get the beginning and ending dates of DST for the current year
  let dstStart = new Date(date.getFullYear(), 2, 8); // March 8th (0-indexed month)
  let dstEnd = new Date(date.getFullYear(), 10, 1); // November 1st (0-indexed month)

  // Find the first Sunday in March
  dstStart.setDate(8 - dstStart.getDay());
  // Find the first Sunday in November
  dstEnd.setDate(1 - dstEnd.getDay());

  // Check if the date is within the DST period
  return date >= dstStart && date < dstEnd;
}

export const formatTimeToAMPM = (dateString: string) => {
  if (dateString) {
    let date = new Date(dateString);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let formattedTime = `${hours < 10 ? "0" : ""}${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes}`;
    return formattedTime;
  }
  return " ";
};
