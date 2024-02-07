import { LuEye, LuSunrise, LuSunset } from "react-icons/lu";
import { FiDroplet } from "react-icons/fi";
import { MdAir } from "react-icons/md";
import { ImMeter } from "react-icons/im";

const WeatherDetails = (props) => {
  const {
    visibility = "25km",
    humidity = "61%",
    windSpeed = "7 km/h",
    airPressure = "1012 hPa",
    sunrise = "6.20",
    sunset = "18:48",
    darkMode = false,
  } = props;
  return (
    <>
      <SingleWeatherDetail
        icon={<LuEye />}
        info="Visibility"
        value={visibility}
        darkMode={darkMode}
      />
      <SingleWeatherDetail
        icon={<FiDroplet />}
        info="Humidity"
        value={humidity}
        darkMode={darkMode}
      />
      <SingleWeatherDetail
        icon={<MdAir />}
        info="Wind speed"
        value={windSpeed}
        darkMode={darkMode}
      />
      <SingleWeatherDetail
        icon={<ImMeter />}
        info="Air Pressure"
        value={airPressure}
        darkMode={darkMode}
      />
      <SingleWeatherDetail
        icon={<LuSunrise />}
        info="Sunrise"
        value={sunrise}
        darkMode={darkMode}
      />
      <SingleWeatherDetail
        icon={<LuSunset />}
        info="Sunset"
        value={sunset}
        darkMode={darkMode}
      />
    </>
  );
};

function SingleWeatherDetail({ info, icon, value, darkMode = false }) {
  return (
    <div className="flex flex-col h-full justify-between gap-2 items-center text-xs font-semibold text-black/80">
      <p className={`whitespace-nowrap ${darkMode ? "dark:text-white" : ""}`}>
        {info}
      </p>
      <div className={`text-3xl ${darkMode ? "dark:text-white" : ""}`}>
        {icon}
      </div>
      <p className={`${darkMode ? "dark:text-white" : ""}`}>{value}</p>
    </div>
  );
}

export default WeatherDetails;
