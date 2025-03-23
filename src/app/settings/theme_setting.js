'use client'

import { useTheme } from "next-themes";
import { Check, Laptop } from "lucide-react";
import { useState } from "react"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

export function ThemeSetting(name, type) {

    const { theme, setTheme, resolvedTheme } = useTheme();

    const export_setting = () => {
        let export_object = {
            "theme_setting": localStorage.getItem("theme_setting"),
        }

        return export_object;
    }

    const import_setting = (import_object) => {
        localStorage.setItem("theme_setting", import_object.getItem("theme_setting"));
    }

    const load = () => {
        if (localStorage.getItem("theme_setting") === null) {
            localStorage.setItem("theme_setting", "system")
            setTheme("system")
        } else {
            update(localStorage.getItem("theme_setting"))
        }
    }

    const update = (value) => {
        localStorage.setItem("theme_setting", value);
        document.documentElement.classList.remove("light", "dark", "system");
        document.documentElement.classList.add(value);
    };

    const get = () => {
        return theme;
    }

    const render = (key, r) => {

        let data = [
            {
                "theme": "light",
                "displayColor": "white",
                "children": <></>,
                "selected": false
            },
            {
                "theme": "dark",
                "displayColor": "black",
                "children": <></>,
                "selected": false
            },
            {
                "theme": "system",
                "displayColor": "transparent",
                "children": <Laptop className="fixed" style={{ color: "var(--text)" }}></Laptop>,
                "selected": false
            }
        ]

        for (let e of data) {
            if (e.theme == theme) {
                e.selected = true;
                break;
            }
        }

        const [themes, setThemes] = useState(data)

        let update_theme = (th) => {
            update(th)

            setThemes(themes.map(value => {
                value.selected = false;

                if (value.theme == th) value.selected = true;

                return value;
            }))
        }

        return r ? <div className="hidden" key={key}></div> : (
            <div key={key}>
                <p className="text-lg font-semibold">{name}</p>
                <div className="flex justify-between content-center mb-3 items-center">
					<p className="content-center">Display Theme</p>
                    <div id="themes" className="flex items-center">
                        {
                            themes.map((value, index) => {
                                return (
                                    <TooltipProvider key={index}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div 
                                                    className={`h-8 w-8 ml-auto rounded-md mr-2 border-2 cursor-pointer flex justify-center items-center ${value.selected ? "border-green-600" : "border-[#595959]"}`}
                                                    style={{
                                                        backgroundColor: value.displayColor
                                                    }}
                                                    onClick={() => update_theme(value.theme)}
                                                >
                                                    {value.children}
                                                    {/* <Check size={20} className={`${value.selected ? "" : "hidden"} fixed]`} color="#16a34a"></Check> */}
                                                    <div className={`${value.selected ? "" : "hidden"} absolute bg-green-600 rounded-full h-2 w-2`}></div>
                                                    
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{value.theme} theme</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                )
                                
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }

    return {
        "export": export_setting,
        "import": import_setting,
        "load": load,
        "update": update,
        "get": get,
        "render": render, 
        "name": name,
        "type": type 
    }
}