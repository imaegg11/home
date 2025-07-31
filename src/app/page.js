'use client'


import { useState, useEffect } from "react";

import { Time } from "./components/time";
import { Date_C } from "./components/date";
import { SearchBar } from "./components/search";
import { SetupSettings } from "./settings.config";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogOverlay
} from "@/components/ui/dialog"

import { SettingsProvider } from "./settings/setting_provider";
import { globalSettings } from "./settings/settings";
import { DialogSettings } from "./settings/dialog_setting";



export default function Home() {

    // TODO: https://stackoverflow.com/questions/77026759/using-next-themes-for-dark-mode-generates-hydration-failed-error

    const [mounted, setMounted] = useState(false);
    const [settingsReady, setSettingsReady] = useState(false)

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div></div>
    }

    return (
        <div>
            <DialogSettings settingsReady={settingsReady} setSettingsReady={setSettingsReady} onClose={() => document.getElementById("search-bar").focus()}></DialogSettings>
            <style id="styleLocation"></style>
            <div className="grid place-items-center content-center h-screen w-screen">
                <div id="date-div" className="text select-none grid place-items-center content-center w-screen">
                    <div className="text-6xl font-medium"><Time></Time></div>
                    <Date_C></Date_C>
                    <br></br>
                    <div className="mt-8 w-1/2 flex justify-center"><SearchBar searchSettings={globalSettings.get("Search Shortcuts")}></SearchBar></div>
                    <br></br>
                </div>
                <div className="mt-8">
                    {
                        globalSettings.get("Widgets") != null
                            ? globalSettings.get("Widgets").renderWidgets()
                            : <></>
                    }

                </div>
            </div>
        </div>

    )
}


