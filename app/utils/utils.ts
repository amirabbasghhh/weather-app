import moment from "moment";

export const kelvinToCelsius = (kelvin: number) => {
    return Math.round(kelvin - 273.15);
  };
  export const unixToTime = (unix: number, timezone: number) => {
    return moment
      .unix(unix)
      .utcOffset(timezone / 60)
      .format("HH:mm");
  };
  