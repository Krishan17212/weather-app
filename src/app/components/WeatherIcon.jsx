import Image from "next/image";

const WeatherIcon = ({ iconSrc }) => {
  return (
    <div className="relative">
      <Image
        width={100}
        height={100}
        src={`https://openweathermap.org/img/wn/${iconSrc}@4x.png`}
        alt="weather icon"
        className=""
      />
    </div>
  );
};

export default WeatherIcon;
