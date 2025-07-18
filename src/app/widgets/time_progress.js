import { useEffect, useState } from "react";
import uuidv4 from "@/app/utils/uuidv4"

import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"

export function TimeProgressWidget(cols = 1, rows = 1, animate = true) {

    let name = "Time Progress Widget"
    let id = uuidv4()

    let widgetData = [cols, rows, animate]

    let updateData = null;

    const internalUpdate = (data) => {
        cols = data["cols"]
        rows = data["rows"]
        animate = data["ani"]

        widgetData = [cols, rows, animate]
    }

    function SettingComponent({ cls }) {

        const [data, setData] = useState({
            "cols": cols,
            "rows": rows,
            "ani": animate
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
                <div className="flex justify-between content-center my-3">
                    <p className="content-center">
                        Animate:
                    </p>
                    <Switch defaultChecked={data["ani"]} onCheckedChange={(b) => updateUseStateData(b, "ani")} className="mr-2 data-[state=unchecked]:[&>span]:bg-[var(--text)]" />
                </div>
            </>
        )
    }

    const renderSetting = (key, cls) => <SettingComponent key={id} cls={cls} />

    function Component({ cls }) {
        let col_spans = ["col-span-1", "col-span-2", "col-span-3", "col-span-4"]
        let row_spans = ["row-span-1", "row-span-2"]

        const getYearProgress = () => {
            const now = new Date();
            const start = new Date(now.getFullYear(), 0, 1);
            const end = new Date(now.getFullYear() + 1, 0, 1);

            const total = end - start;
            const elapsed = now - start;

            const progress = (elapsed / total) * 100;

            return progress.toFixed(2);
        }

        let currentYearProgress = getYearProgress()

        let progress = (0.00).toFixed(2)
        let tick = 0

        const getCurve = (x) => {
            return 0.5 * Math.tanh(3.5 * (x - 0.8)) + 0.5;
        }

        const animateProgress = () => {
            if (tick >= 2) {
                progress = currentYearProgress
                document.getElementById(`${id}-progress`).innerText = progress + "%"
                document.getElementById(`${id}-progress-bar`).children[0].style.transform = `translateX(-${100 - parseFloat(progress)}%)`
            }
            else {
                tick += 0.006
                progress = (getCurve(tick) * currentYearProgress).toFixed(2)

                document.getElementById(`${id}-progress`).innerText = progress + "%"
                document.getElementById(`${id}-progress-bar`).children[0].style.transform = `translateX(-${100 - (getCurve(tick) * currentYearProgress)}%)`
                requestAnimationFrame(animateProgress)
            }

        }

        useEffect(() => {
            if (animate) {
                setTimeout(() => requestAnimationFrame(animateProgress), 100)
            }
            else {
                document.getElementById(`${id}-progress`).innerText = currentYearProgress + "%"
                document.getElementById(`${id}-progress-bar`).children[0].style.transform = `translateX(-${100 - parseFloat(currentYearProgress)}%)`
            }
        }, [])

        return (
            <div className={`${col_spans[cols - 1]} ${row_spans[rows - 1]} ${cls} flex justify-center items-center`}>
                <div className="text text-center w-full px-4">
                    <p>The Year Is</p>
                    <p className="text-3xl font-semibold" id={`${id}-progress`}>{progress}%</p>
                    <Progress id={`${id}-progress-bar`} value={0} max={100} className="w-4/5 mx-auto my-3" />
                    <p>Done.</p>
                </div>
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