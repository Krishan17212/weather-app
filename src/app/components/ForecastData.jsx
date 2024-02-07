import { convertData } from "@/app/utils/convertData";
import WeatherDetails from "./WeatherDetails";
import WeatherIcon from "./WeatherIcon";

const ForecastData = (props) => {
  const {
    weatherIconData = "02d",
    date = "19.09",
    day = "Tuesday",
    temp,
    feels_like,
    temp_min,
    temp_max,
    description,
    visibility = "25km",
    humidity = "61%",
    windSpeed = "7 km/h",
    airPressure = "1012 hPa",
    sunrise = "6.20",
    sunset = "18:48",
  } = props;
  return (
    <div className="w-full rounded-xl border bg-white dark:bg-slate-500 flex py-4 shadow-sm gap-4 px-6 items-stretch">
      <section className=" flex gap-4 items-center px-4  ">
        <div className=" flex flex-col gap-1 items-center">
          <WeatherIcon iconSrc={weatherIconData} />
          <p>{date}</p>
          <p className="text-sm">{day} </p>
        </div>

        {/*  */}
        <div className="flex flex-col px-4 text-center">
          <span className="text-5xl">{convertData(temp ?? 0)}°</span>
          <p className="text-xs space-x-1 whitespace-nowrap">
            <span> Feels like</span>
            <span>{convertData(feels_like ?? 0)}°</span>
          </p>
          <p className="capitalize text-sm mt-1"> {description}</p>
        </div>
      </section>
      {/* right */}
      <section className=" overflow-x-auto flex justify-between gap-4 px-4  w-full pr-10 dark:text-white ">
        <WeatherDetails
          visibility={visibility}
          humidity={humidity}
          windSpeed={windSpeed}
          airPressure={airPressure}
          sunrise={sunrise}
          sunset={sunset}
          darkMode={true}
        />
      </section>
    </div>
  );
};

export default ForecastData;
