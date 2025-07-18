import { useEffect, useState } from "react";
import uuidv4 from "@/app/utils/uuidv4"
import { Toast } from "../toast";

import { Activity, BatteryCharging, BatteryFull, BatteryLow, BatteryMedium, Cpu, HardDrive, MemoryStick } from "lucide-react";

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

export function SystemInfoWidget(cols = 1, rows = 1, systemInfoLink = "http://127.0.0.1:8000/systemInfo") {

    let name = "System Info Widget"
    let id = uuidv4()

    let widgetData = [cols, rows, systemInfoLink]

    let updateData = null;

    const internalUpdate = (data) => {
        cols = data["cols"]
        rows = data["rows"]
        systemInfoLink = data["sysinfo"]

        widgetData = [cols, rows, systemInfoLink]
    }

    function SettingComponent({ cls }) {

        const [data, setData] = useState({
            "cols": cols,
            "rows": rows,
            "sysinfo": systemInfoLink
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
                    <p className="content-center">System Information Retriever:</p>
                    <input
                        type="text"
                        placeholder="Rows"
                        className="bg-inherit w-2/3 h-10 border border-gray-750 select-none rounded-xl px-6 focus-within:outline-none"
                        defaultValue={data["sysinfo"]}
                        onChange={(e) => updateUseStateData(e.target.value, "sysinfo")}
                    ></input>
                </div>
            </>
        )
    }

    const renderSetting = (key, cls) => <SettingComponent key={id} cls={cls} />

    function Component({ cls }) {
        let col_spans = ["col-span-1", "col-span-2", "col-span-3", "col-span-4"]
        let row_spans = ["row-span-1", "row-span-2"]

        const [sysInfo, setSysInfo] = useState(null)
        const [failedFetch, setFailedFetch] = useState(false)

        useEffect(() => {
            fetch(systemInfoLink)
                .then(r => r.json())
                .then(r => { setSysInfo(r["data"]) })
                .catch(error => {
                    Toast.error("Failed to retrieve system info")
                    setFailedFetch(true)
                })
        }, [])

        const getBattery = (battery) => {
            // Charing, low, medium, full
            let batteries = [
                <BatteryCharging size={20} className="text-green-500" />,
                <BatteryLow size={20} className="text-red-500" />,
                <BatteryMedium size={20} className="text-low-500" />,
                <BatteryFull size={20} className="text-green-500" />
            ]

            if (battery.charging) return batteries[0]
            else if (battery.percent < 1 / 3) return batteries[1]
            else if (batteries.percent < 2 / 3) return batteries[2]
            else return batteries[3]
        }

        const getCores = (data) => {
            let children = [[], []]

            for (let i = 0; i < data.length; i++) {
                let child = <p key={i}>Core {i + 1}: {data[i]}%</p>
                children[Math.floor(i / (data.length / 2))].push(child)
            }

            return <div className="px-2">
                <p className="text text-xs mb-2">CPU</p>
                <p className="text text-xs mb-2">Total Usage: {sysInfo.cpu.total_percent}%</p>
                <p className="text text-xs my-2">Cores</p>
                <div className="flex justify-between text text-xs">
                    <div>
                        {children[0]}
                    </div>
                    <div>
                        {children[1]}
                    </div>
                </div>
            </div>
        }

        return (
            <div className={`${col_spans[cols - 1]} ${row_spans[rows - 1]} ${cls} flex justify-center items-center text`}>
                {sysInfo == null
                    ? <div className="w-full select-none">
                        <p className="text-lg text-center">System Info</p>
                        <div className="w-full px-4 flex justify-around mt-3">
                            <div className="flex muted text-sm items-center">
                                <BatteryLow size={20} className="text-green-500" />
                                <p className="ml-1">- -%</p>
                            </div>

                            <div className="flex muted text-sm items-center">
                                <Cpu size={20} />
                                <p className="ml-1">- -%</p>
                            </div>
                        </div>
                        <div className="w-full px-4 flex justify-around mt-3">

                            <div className="flex muted text-sm items-center">
                                <MemoryStick size={20} />
                                <p className="ml-1">- -%</p>
                            </div>

                            <div className="flex muted text-sm items-center">
                                <HardDrive size={20} />
                                <p className="ml-1">- -%</p>
                            </div>
                        </div>
                        <div className="flex justify-center mt-3">
                            <div className="flex muted text-sm items-center">
                                <Activity size={20} />
                                <p className="ml-1">- -:- -:- -</p>
                            </div>
                        </div>
                    </div>
                    : <div className="w-full select-none">
                        <p className="text-lg text-center">System Info</p>
                        <div className="w-full px-4 flex justify-around mt-3">
                            <div className="flex muted text-sm items-center">
                                {getBattery(sysInfo.battery)}
                                <p className="ml-1">{sysInfo.battery.percent}%</p>
                            </div>
                            <HoverCard>
                                <HoverCardTrigger>
                                    <div className="flex muted text-sm items-center">
                                        <Cpu size={20} />
                                        <p className="ml-1">{Math.round(sysInfo.cpu.total_percent)}%</p>
                                    </div>
                                </HoverCardTrigger>
                                <HoverCardContent className="bg-[hsl(var(--background))]">
                                    {getCores(sysInfo.cpu.per_core)}
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                        <div className="w-full px-4 flex justify-around mt-3">
                            <HoverCard>
                                <HoverCardTrigger>
                                    <div className="flex muted text-sm items-center">
                                        <MemoryStick size={20} />
                                        <p className="ml-1">{Math.round(sysInfo.ram.percent)}%</p>
                                    </div>
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    <div className="text-xs text">
                                        <p>RAM & Swap</p>
                                        <p className="mt-2">RAM: {sysInfo.ram.percent}% - {sysInfo.ram.used}/{sysInfo.ram.total}</p>
                                        <p className="">Swamp: {sysInfo.swap.percent}% - {sysInfo.swap.used}/{sysInfo.swap.total}</p>
                                    </div>
                                </HoverCardContent>
                            </HoverCard>
                            <HoverCard>
                                <HoverCardTrigger>
                            <div className="flex muted text-sm items-center">
                                <HardDrive size={20} />
                                <p className="ml-1">{Math.round(sysInfo.disk.total.percent)}%</p>
                            </div>

                                </HoverCardTrigger>
                                <HoverCardContent>
                                    <div className="text-xs text">
                                        <p className="mb-2">Disk Usage</p>
                                        <p>Total: {sysInfo.disk.total.percent}% - {sysInfo.disk.total.used}/{sysInfo.disk.total.total}</p>
                                        {Object.keys(sysInfo.disk.drives).map(e => {
                                            return (
                                                <p key={e}>{e}: {sysInfo.disk.drives[e].percent}% - {sysInfo.disk.drives[e].used}/{sysInfo.disk.drives[e].total}</p>
                                            )
                                        })}
                                    </div>
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                        <div className="flex justify-center mt-3">
                            <div className="flex muted text-sm items-center">
                                <Activity size={20} />
                                <p className="ml-1">{sysInfo.uptime}</p>
                            </div>
                        </div>
                    </div>}
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