import { useEffect, useState } from "react";

import uuidv4 from "@/app/utils/uuidv4"
import { Toast } from "../toast";
import { ScrollArea } from "@/components/ui/scroll-area";

export function QuoteWidget(cols = 1, rows = 1, quoteLink = "https://hs.d6f4e5.hackclub.app/dayQuote") {

    let name = "Quote Widget"
    let id = uuidv4()

    let widgetData = [cols, rows, quoteLink]

    let updateData = null;

    const internalUpdate = (data) => {
        cols = data["cols"]
        rows = data["rows"]
        quoteLink = data["link"]

        widgetData = [cols, rows, quoteLink]
    }

    function SettingComponent({ cls }) {

        const [data, setData] = useState({
            "cols": cols,
            "rows": rows,
            "link": quoteLink
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
                    <p className="content-center">Link:</p>
                    <input
                        type="text"
                        placeholder="Rows"
                        className="bg-inherit w-2/3 h-10 border border-gray-750 select-none rounded-xl px-6 focus-within:outline-none"
                        defaultValue={data["link"]}
                        onChange={(e) => updateUseStateData(e.target.value, "link")}
                    ></input>
                </div>
                <p  className="my-3 muted">Inspirational quotes provided by <a href="https://zenquotes.io/" target="_blank" className="text-[var(--accent-color)]">ZenQuotes API</a></p>
            </>
        )
    }

    const renderSetting = (key, cls) => <SettingComponent key={id} cls={cls} />

    function Component({ cls }) {
        let col_spans = ["col-span-1", "col-span-2", "col-span-3", "col-span-4"]
        let row_spans = ["row-span-1", "row-span-2"]

        const [quote, setQuote] = useState(null)
        const [failedFetch, setFailedFetch] = useState(false)

        useEffect(() => {
            fetch(quoteLink)
                .then(r => r.json())
                .then(r => { setQuote(r) })
                .catch(error => {
                    Toast.error("Failed to retrieve quote")
                    setFailedFetch(true)
                })
        }, [])

        useEffect(() => {
            if (quote != null) document.getElementById(id).innerHTML = '<p style="margin-bottom: 0.5rem;">Quote Of The Day</p>' + quote["data"]
        }, [quote])

        return (
            <div className={`${col_spans[cols - 1]} ${row_spans[rows - 1]} ${cls}`}>
                <ScrollArea className='h-full'>
                <div className="text text-sm p-4 grid">
                    <div id={`${id}`}>
                        <p className="mb-2">Quote Of The Day</p>
                    </div>
                </div>
                </ScrollArea>
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