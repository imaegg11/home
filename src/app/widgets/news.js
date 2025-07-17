import { useState, useEffect } from "react";

import uuidv4 from "@/app/utils/uuidv4"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

import { Toast } from "../toast";

export function NewsWidget(cols = 1, rows = 1, newsLink = "https://hs.d6f4e5.hackclub.app/news") {

    let name = "News Widget"
    let id = uuidv4()

    let widgetData = [cols, rows, newsLink]

    let updateData = null;

    const internalUpdate = (data) => {
        cols = data["cols"]
        rows = data["rows"]
        newsLink = data["news"]

        widgetData = [cols, rows]
    }

    function SettingComponent({ cls }) {

        const [data, setData] = useState({
            "cols": cols,
            "rows": rows,
            "news": newsLink
        })

        updateData = () => {
            internalUpdate(data)
        }

        const updateUseStateData = (e, info) => {
            let temp = data;
            temp[info] = e.target.value

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
                        onChange={(e) => updateUseStateData(e, "cols")}
                    ></input>
                </div>
                <div className={`${cls} flex justify-between content-center my-3`}>
                    <p className="content-center">Rows:</p>
                    <input
                        type="text"
                        placeholder="Rows"
                        className="bg-inherit w-2/3 h-10 border border-gray-750 select-none rounded-xl px-6 focus-within:outline-none"
                        defaultValue={data["rows"]}
                        onChange={(e) => updateUseStateData(e, "rows")}
                    ></input>
                </div>
                <div className={`${cls} flex justify-between content-center my-3`}>
                    <p className="content-center">News API Link:</p>
                    <input
                        type="text"
                        placeholder="Rows"
                        className="bg-inherit w-2/3 h-10 border border-gray-750 select-none rounded-xl px-6 focus-within:outline-none"
                        defaultValue={data["news"]}
                        onChange={(e) => updateUseStateData(e, "news")}
                    ></input>
                </div>
            </>
        )
    }

    const renderSetting = (key, cls) => <SettingComponent key={id} cls={cls} />

    function Component({ cls }) {
        let col_spans = ["col-span-1", "col-span-2", "col-span-3", "col-span-4"]
        let row_spans = ["row-span-1", "row-span-2"]

        const [news, setNews] = useState(null)
        const [failedFetch, setFailedFetch] = useState(false)

        const validate = (article) => {
            if (article["source"]["name"] == null && article["author"] == null) return false
            else if (article["title"] == null) return false
            else if (article["urlToImage"] == null) return false
            else return true
        }

        const shuffle = (array) => {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }

            return array;
        }

        useEffect(() => {
            fetch(newsLink)
                .then(r => r.json())
                .then(r => { setNews(shuffle(r["data"]["articles"].filter(e => validate(e)))) })
                .catch(error => {
                    Toast.error("Failed to retrieve news")
                    setFailedFetch(true)
                })
        }, [newsLink])
        
        return (
            <div className={`${col_spans[cols - 1]} ${row_spans[rows - 1]} ${cls} flex items-center text`}>
                {news == null
                    ? failedFetch ? <p className="text-xl m-auto">Failed to fetch news</p> : <p className="text-xl m-auto">Fetching news...</p>
                    : <Carousel className="w-full h-full"
                        plugins={[
                            Autoplay({
                                delay: 5000,
                                stopOnMouseEnter: true
                            }),
                        ]}
                        opts={{
                            loop: true,
                        }}>
                        <CarouselContent className="h-full">
                            {news.map(e => {
                                let source = []
                                if (e.source.name != null) source.push(e.source.name)
                                if (e.author != null) source.push(e.author.split(",")[0])

                                return (
                                    <CarouselItem key={e.title} className="">
                                        <div className="h-[175px] bg-cover bg-no-repeat bg-center mx-auto bg-transparent cursor-pointer" style={{ "backgroundImage": `url(${e.urlToImage})` }}>
                                            <a href={e.url}>
                                                <div className="bg-gradient-to-b from-transparent to-black h-full rounded-sm">
                                                    <div className="h-full relative">
                                                        <div className="absolute bottom-2 px-4">
                                                            <p className="text-sm line-clamp-2">{e.title}</p>
                                                            <p className="text-xs muted mt-1">{source.join(" • ")}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </CarouselItem>
                                )
                            })}
                        </CarouselContent>
                        <CarouselPrevious className="ml-14 bg-transparent border-none" />
                        <CarouselNext className="mr-14 bg-transparent border-none" />
                    </Carousel>}
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