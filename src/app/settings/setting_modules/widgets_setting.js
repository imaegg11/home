import { lsm } from "../../utils/localStorage_manager"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'

import { Grip } from "lucide-react"

import { WeatherWidget } from "@/app/widgets/weather"
import { EmptyWidget } from "@/app/widgets/empty"

import { ReactSortable } from "react-sortablejs";

import { useMemo, useState } from "react";

export function WidgetSetting(name, type) {

    let availableWidgets = {
        [WeatherWidget().name]: WeatherWidget,
        [EmptyWidget().name]: EmptyWidget
    }

    let widgets = [
        WeatherWidget(2, 1),
        EmptyWidget(1, 1),
        EmptyWidget(1, 1),
        EmptyWidget(1, 1),
        EmptyWidget(1, 1),
        EmptyWidget(1, 1),
        EmptyWidget(1, 1),
    ]

    // let widgetsMemo = useMemo(() => widgets, [widgets])

    let updateLocalstorageSettings = null;

    const export_setting = () => {
        let export_object = {
            [name]: get()
        }

        return export_object;
    }

    const import_setting = (import_object) => {
        update(import_object["widgets"])
    }

    const load = () => {
        if (lsm.getItem(name) === null) {
            update(widgets)
        } else {
            import_setting(lsm.getItem(name))
        }
    }

    const update = (w) => {
        if (w[0].render == null) {
            w = w.map(e => {
                let obj = availableWidgets[e.name](...e.widgetData)
                obj.id = e.id
                return obj
            })
        }
        widgets = w

        lsm.setItem(name, get());
    }

    const save_preferences = () => {
        if (updateLocalstorageSettings !== null) updateLocalstorageSettings()
    }

    const get = () => {
        return {
            "widgets": widgets.map(e => {
                return {
                    "name": e.name,
                    "id": e.id,
                    "widgetData": e.get()
                }
            })
        }
    }

    function Component({ isHidden }) {

        let [wData, setWData] = useState(widgets)

		updateLocalstorageSettings = () => {
            wData.map(e => {
                e.updateData()
            })

			update(wData);
		}

        const removeWidget = (id) => {
            setWData(prev => prev.filter(e => e.id != id))
        }

        const addWidget = () => {
            // pass
        }

        return isHidden ? <div className="hidden"></div> : (
            <div className="text mb-4">
                <p className="font-semibold">{name}</p>
                <Accordion type="multiple" className="w-[95%] mx-2">
                    <ReactSortable className="mt-2" list={wData} setList={setWData} handle=".handle" ghostClass="draggable-ghost" dragClass="draggable-drag">
                        {
                            wData.length == 0 ?
                                <div className="mt-8 mb-6">
                                    <p className="text-center text-sm">There seems to be nothing here... Try adding a widget?</p>
                                </div> :
                                wData.map((e, i) => {
                                    // This is some god fu- of a sh- ngl 
                                    return (
                                        <AccordionItem className="px-4" key={e.id} value={e.id}>
                                            <AccordionTrigger>
                                                <div className="flex items-center">
                                                    <Grip size={20} className="handle mr-2 opacity-25" />
                                                    <p className="overflow-hidden text-ellipsis whitespace-nowrap">
                                                        {e.name}
                                                    </p>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent >
                                                {
                                                    e.renderSetting == null ?
                                                        <p className="w-full text-center mt-2">No Settings To Modify :)</p> :
                                                        e.renderSetting()
                                                }

                                                <div className="mt-4 flex justify-between content-center">
                                                    <div></div>
                                                    <div>
                                                        <Button
                                                            onClick={() =>
                                                                removeWidget(e.id)
                                                            }
                                                            variant="destructive"
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    )
                                })
                        }
                    </ReactSortable>
                    <div className="w-full flex justify-center mt-5">
                        <Button onClick={() => addWidget()} variant="outline">
                            Add
                        </Button>
                    </div>
                </Accordion>
            </div>
        )
    }

    const render = (key, r) => <Component key={key} isHidden={r} />

    function WidgetComponent() {

        if (widgets.length == 0) {
            return <></>
        } else {
            return (
                <div id="widgets" className="grid grid-cols-4 grid-rows-2 gap-4" style={{ gridTemplateColumns: 'repeat(4, 175px)', gridTemplateRows: 'repeat(2, 175px)' }}>
                    {
                        widgets.map((e, i) => e.render(i, "bg-[var(--background-5)] rounded-xl"))
                    }
                </div>
            )
        }
    }

    const renderWidgets = (key) => <WidgetComponent key={key} />

    return {
        "export": export_setting,
        "import": import_setting,
        "load": load,
        "update": update,
        "get": get,
        "save": save_preferences,
        "render": render,
        "renderWidgets": renderWidgets,
        "name": name,
        "type": type
    }
}