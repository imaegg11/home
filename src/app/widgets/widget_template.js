import { useState } from "react";
import uuidv4 from "@/app/utils/uuidv4"

export function TemplateWidget(cols = 1, rows = 1) {

    let name = "Template Widget"
    let id = uuidv4()

    let widgetData = [cols, rows]

    let updateData = null;

    const internalUpdate = (data) => {
        cols = data["cols"]
        rows = data["rows"]

        widgetData = [cols, rows]
    }

    function SettingComponent({ cls }) {

        const [data, setData] = useState({
            "cols": cols,
            "rows": rows,
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
            </>
        )
    }

    const renderSetting = (key, cls) => <SettingComponent key={id} cls={cls} />

    function Component({ cls }) {
        let col_spans = ["col-span-1", "col-span-2", "col-span-3", "col-span-4"]
        let row_spans = ["row-span-1", "row-span-2"]

        return (
            <div className={`${col_spans[cols - 1]} ${row_spans[rows - 1]} ${cls}`}>
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