import { useState, useEffect } from "react";
import uuidv4 from "@/app/utils/uuidv4"
import { Toast } from "../toast";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export function WeatherWidget(cols = 1, rows = 1, redirect = "https://example.com", apiKey = "", loc = "") {

    let name = "Weather Widget"
    let id = uuidv4()

    let widgetData = [cols, rows, redirect, apiKey, loc]

    let updateData = null;

    const internalUpdate = (data) => {
        cols = data["cols"]
        rows = data["rows"]
        redirect = data["redirect"]
        apiKey = data["apiKey"]
        loc = data["loc"]

        widgetData = [cols, rows, redirect, apiKey, loc]
    }

    function SettingComponent({ cls }) {

        const [data, setData] = useState({
            "cols": cols,
            "rows": rows,
            "redirect": redirect,
            "apiKey": apiKey,
            "loc": loc,
        })

        updateData = () => {
            internalUpdate(data)
        }

        const updateUseStateData = (value, info) => {
            let temp = data;
            temp[info] = value

            setData(temp)
        }

        return (
            <>
                <div className={`${cls} flex justify-between content-center my-3`}>
                    <p className="content-center">Columns:</p>
                    <input
                        type="text"
                        placeholder="Columns"
                        className="bg-inherit w-2/3 h-10 border border-gray-750 select-none rounded-xl px-6 focus-within:outline-none"
                        defaultValue={data["cols"]}
                        onChange={(e) => updateUseStateData(e.target.value, "cols")}
                    ></input>
                </div>
                <div className={`${cls} flex justify-between content-center my-3`}>
                    <p className="content-center">Rows:</p>
                    <input
                        type="text"
                        placeholder="Rows"
                        className="bg-inherit w-2/3 h-10 border border-gray-750 select-none rounded-xl px-6 focus-within:outline-none"
                        defaultValue={data["rows"]}
                        onChange={(e) => updateUseStateData(e.target.value, "rows")}
                    ></input>
                </div>
                <div className={`${cls} flex justify-between content-center my-3`}>
                    <p className="content-center">Redirect:</p>
                    <input
                        type="text"
                        placeholder="Redirect when widget is clicked"
                        className="bg-inherit w-2/3 h-10 border border-gray-750 select-none rounded-xl px-6 focus-within:outline-none"
                        defaultValue={data["redirect"]}
                        onChange={(e) => updateUseStateData(e.target.value, "redirect")}
                    ></input>
                </div>
                <div className={`${cls} flex justify-between content-center my-3`}>
                    <p className="content-center">API Key:</p>
                    <input
                        type="text"
                        placeholder="API Key"
                        className="bg-inherit w-2/3 h-10 border border-gray-750 select-none rounded-xl px-6 focus-within:outline-none"
                        defaultValue={data["apiKey"]}
                        onChange={(e) => updateUseStateData(e.target.value, "apiKey")}
                    ></input>
                </div>
                <div className={`${cls} flex justify-between content-center my-3`}>
                    <p className="content-center">Location:</p>
                    <input
                        type="text"
                        placeholder="Location"
                        className="bg-inherit w-2/3 h-10 border border-gray-750 select-none rounded-xl px-6 focus-within:outline-none"
                        defaultValue={data["loc"]}
                        onChange={(e) => updateUseStateData(e.target.value, "loc")}
                    ></input>
                </div>
                <p className="my-3 muted">Using <a href="https://www.weatherapi.com/" className="accent-text">weatherapi</a> for data, visit for information for API key and location</p>
            </>
        )
    }

    const renderSetting = (key, cls) => <SettingComponent key={id} cls={cls} />

    function Component({ cls }) {

        const [forecastData, setForecastData] = useState(null);

        const [failedFetch, setFailedFetch] = useState(false)

        useEffect(() => {
            fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${loc}&aqi=yes`)
                .then(r => r.json())
                .then(r => { setForecastData(r) })
                .catch(error => {
                    Toast.error("Failed to retrieve weather data")
                    setFailedFetch(true)
                })
        }, [apiKey, loc])

        let jsxForData = (forecastData == null || forecastData == null)
            ? (failedFetch ? <p className="text-xl">Failed to fetch weather</p> : <p className="text-xl">Fetching weather...</p>)
            : <a href={redirect} className="w-full">
                <div className="w-full px-8 flex justify-around items-center">
                    <div className="grid place-content-center">
                        <div className="flex">
                            <p className="text-[4rem]">{Math.round(forecastData["current"]["temp_c"])}</p>
                            <p className="pt-2">°</p>
                            <p className="text-lg pt-2">C</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-lg">{forecastData["current"]["condition"]["text"]}</p>
                        <div className="faded text-sm">
                            <p>Feels {Math.round(forecastData["current"]["feelslike_c"])}°C</p>
                            <p>H: {Math.round(forecastData["forecast"]["forecastday"][0]["day"]["maxtemp_c"])}°C L: {Math.round(forecastData["forecast"]["forecastday"][0]["day"]["mintemp_c"])}°C </p>
                            <p>UV: {forecastData["current"]["uv"]} WS: {forecastData["current"]["wind_kph"]}km/h {forecastData["current"]["wind_dir"]}</p>
                        </div>
                    </div>
                </div>
            </a>


        let col_spans = ["col-span-1", "col-span-2", "col-span-3", "col-span-4"]
        let row_spans = ["row-span-1", "row-span-2"]

        return (
            <div className={`${col_spans[cols - 1]} ${row_spans[rows - 1]} ${cls} text w-full h-full grid place-items-center cursor-pointer`}>
                {jsxForData}
            </div>
        )
    }

    const render = (key, cls) => <Component key={key} cls={cls} />

    return {
        "name": name,
        "id": id,
        "render": render,
        "renderSetting": renderSetting,
        "updateData": () => {
            if (updateData != null) updateData()
        },
        "get": () => widgetData
    }
}