export const convertData = (data) => {
  const tempData = data - 273.15;
  return Math.floor(tempData); // remove decimal part from the data and returns integer value
};
