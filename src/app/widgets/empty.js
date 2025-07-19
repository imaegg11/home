import { useState } from "react";
import { Switch } from "@/components/ui/switch"
import uuidv4 from "../utils/uuidv4";


export function EmptyWidget(cols = 1, rows = 1, isTransparent = false) {

    let name = "Empty Widget"
    let id = uuidv4()

    let widgetData = [cols, rows, isTransparent]

    let updateData = null;

    const internalUpdate = (transparent) => {
        isTransparent = transparent
        widgetData = [cols, rows, isTransparent]
    }

    function SettingComponent({ cls }) {

        const [transparent, setTransparent] = useState(isTransparent)

        updateData = () => {
            internalUpdate(transparent)
        }

        return (
            <div className={`${cls} flex justify-between content-center my-3`}>
                <p className="content-center">
                    Is Transparent:
                </p>
                <Switch defaultChecked={transparent} onCheckedChange={() => setTransparent(prev => !prev)} className="mr-2 data-[state=unchecked]:[&>span]:bg-[hsl(var(--text))]" />
            </div>
        )
    }

    const renderSetting = (key, cls) => <SettingComponent key={id} cls={cls} />

    function Component({ cls }) {
        let col_spans = ["col-span-1", "col-span-2", "col-span-3", "col-span-4"]
        let row_spans = ["row-span-1", "row-span-2"]

        return (
            <div className={`${col_spans[cols - 1]} ${row_spans[rows - 1]} ${cls} ${isTransparent ? "opacity-0" : ""}`}>
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