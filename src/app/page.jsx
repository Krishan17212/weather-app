"use client";
import ForecastData from "@/app/components/ForecastData";
import LoadingAnimaition from "@/app/components/LoadingUi";
import Navbar from "@/app/components/Navbar";
import SearchForm from "@/app/components/SearchForm";
import WeatherDetails from "@/app/components/WeatherDetails";
import WeatherIcon from "@/app/components/WeatherIcon";
import InputContext from "@/app/context/InputContext";
import { convertData } from "@/app/utils/convertData";
import { meterToKilometers } from "@/app/utils/convertMeterToKm";
import { convertWindSpeed } from "@/app/utils/convertWindspeed";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";
import { useContext, useEffect } from "react";
import { IoIosArrowRoundDown } from "react-icons/io";
import { IoIosArrowRoundUp } from "react-icons/io";

export default function Home() {
  const { inputText } = useContext(InputContext);
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${
          inputText.input || "Delhi"
        }&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&cnt=56`
      );
      return data;
    },
  });

  useEffect(() => {
    refetch();
  }, [inputText, refetch]);

  const todayData = data?.list[0];

  const uniqueDates = [
    ...new Set(
      data?.list.map(
        (entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]
      )
    ),
  ];

  // Filtering data to get the first entry after 6 AM for each unique date
  const firstDataForEachDate = uniqueDates.map((date) => {
    return data?.list.find((entry) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
      const entryTime = new Date(entry.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    });
  });

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center gap-5  dark:bg-gray-700">
        <LoadingAnimaition />
      </div>
    );
  }
  return (
    <div className="flex min-h-screen gap-4 flex-col bg-white dark:bg-gray-700 pb-10">
      <Navbar />
      <main className="man_section w-full">
        <div className="container">
          <div className="mobile_search flex md:hidden justify-center">
            <SearchForm />
          </div>
          {/* Today Data */}
          <section className="flex flex-col gap-9 w-full pb-10 pt-4">
            <div className="weather_top">
              <div className="weather_title flex items-center gap-2 text-3xl font-medium mb-5">
                <p>{dayjs(data?.list[0]?.dt_txt).format("dddd")}</p>
                <p className="text-xl">
                  ({dayjs(data?.list[0]?.dt_txt).format("DD-MM-YYYY")})
                </p>
              </div>
              <div className="currentData w-full rounded-xl border bg-white dark:bg-slate-500 flex py-4 shadow-sm gap-10 px-6 items-center">
                <div className="flex flex-col px-4 text-center">
                  <span className="text-5xl">
                    {convertData(todayData?.main?.temp ?? 0)}°
                  </span>
                  <p className="text-sm space-x-1 whitespace-nowrap">
                    <span>Feels like</span>
                    <span>
                      {convertData(todayData?.main?.feels_like ?? 0)}°
                    </span>
                  </p>
                  <p className="text-sm space-x-2 flex flex-wrap">
                    <span className="flex items-center">
                      {convertData(todayData?.main?.temp_min ?? 0)}°
                      <IoIosArrowRoundDown />
                    </span>
                    <span className="flex items-center">
                      {convertData(todayData?.main?.temp_max ?? 0)}°
                      <IoIosArrowRoundUp />
                    </span>
                  </p>
                </div>
                {/* time and weather icon */}
                <div className="flex gap-10 sm:gap-16 overflow-x-auto pb-4 w-full justify-between pr-3">
                  {data?.list.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
                    >
                      <p className="whitespace-nowrap">
                        {dayjs(item?.dt_txt).format("hh:mm A")}
                      </p>
                      <WeatherIcon iconSrc={item?.weather[0]?.icon} />
                      <p>{convertData(item?.main?.temp_max ?? 0)}°</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              {/* left */}
              <div className="w-fit  rounded-xl border flex-col bg-white dark:bg-slate-500 flex py-4 shadow-sm gap-4 px-6 items-center">
                <p className=" capitalize text-center">
                  {todayData?.weather[0].description}{" "}
                </p>
                <WeatherIcon iconSrc={todayData?.weather[0]?.icon} />
              </div>

              {/* right */}
              <div className="bg-yellow-300/80 px-6 py-6 gap-4 justify-between overflow-x-auto rounded-xl w-full flex">
                <WeatherDetails
                  visibility={meterToKilometers(todayData?.visibility ?? 10000)}
                  airPressure={`${todayData?.main?.pressure} hpa`}
                  humidity={`${todayData?.main?.humidity}%`}
                  sunrise={dayjs.unix(data?.city?.sunrise).format("h:mm A")}
                  sunset={dayjs.unix(data?.city?.sunset).format("h:mm A")}
                  windSpeed={convertWindSpeed(todayData?.wind?.speed ?? 1.64)}
                />
              </div>
            </div>
          </section>
          {/* 7 days data */}
          <section className="flex flex-col gap-4 w-full">
            <p className="text-3xl font-medium dark:text-white">
              Forecast (7 days)
            </p>
            {firstDataForEachDate.map((item, i) => (
              <ForecastData
                key={i}
                description={item?.weather[0].description ?? ""}
                weatherIconData={item?.weather[0].icon ?? "01d"}
                date={dayjs(item?.dt_txt ?? "").format("HH:MM")}
                day={dayjs(item?.dt_txt ?? "").format("dddd")}
                feels_like={item?.main.feels_like ?? 0}
                temp={item?.main.temp ?? 0}
                temp_max={item?.main.temp_max ?? 0}
                temp_min={item?.main.temp_min ?? 0}
                airPressure={`${item?.main.pressure} hPa `}
                humidity={`${item?.main.humidity}% `}
                sunrise={dayjs.unix(data?.city?.sunrise).format("h:mm A")}
                sunset={dayjs.unix(data?.city?.sunset).format("h:mm A")}
                visibility={meterToKilometers(item?.visibility ?? 10000)}
                windSpeed={convertWindSpeed(item?.wind?.speed ?? 1.64)}
              />
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
