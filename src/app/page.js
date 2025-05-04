'use client'


import { useState, useEffect } from "react";

import { Toast } from "./toast";
import { Time } from "./components/time";
import { Date_C } from "./components/date";
import { SearchBar } from "./components/search";
import { get_settings } from "./settings.config";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { SettingsProvider, useSettings } from "./settings/setting_provider";
import { Render } from "./settings/settings";
import { localStorageManager } from "./settings/localStorage_manager";
import { ThemeSetting } from "./settings/theme_setting"
import { SearchSetting } from "./settings/search_setting";
import { AboutSetting } from "./settings/about_settings";
import { BackgroundSetting } from "./settings/background_setting";



export default function Home() {

    // TODO: https://stackoverflow.com/questions/77026759/using-next-themes-for-dark-mode-generates-hydration-failed-error

    const [settingsOpen, setSettingsOpen] = useState(false)
    const [mounted, setMounted] = useState(false);

    const [settingsReady, setSettingsReady] = useState(false)

    const settings = get_settings();
    useEffect(() => {

        settings.load()

        setMounted(true);

        const toggleSettings = (e) => {
            if (e.key === "." && e.ctrlKey) {
                setSettingsOpen(prev => !prev);
            }
        };

        window.addEventListener("keydown", toggleSettings);
        return () => window.removeEventListener("keydown", toggleSettings);
    }, []);

    if (!mounted) {
        return <div></div>
    }

    return (
        <SettingsProvider>
            <SetupSettings onLoaded={() => setSettingsReady(true)}/>
            <div id="date-div" className="text-[--text] select-none grid place-items-center content-center h-screen w-screen">
                <div className="text-6xl font-medium"><Time></Time></div>
                <Date_C></Date_C>
                <br></br>
                <div className="mt-8 w-1/2 flex justify-center"><SearchBar searchSettings={settings.get("Search Shortcuts")}></SearchBar></div>
                <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
                    <DialogContent hideClose={true} className="min-w-fit" onOpenAutoFocus={(e) => {
                        e.preventDefault()
                        document.activeElement.blur()
                    }} onCloseAutoFocus={(e) => {
                        document.getElementById("search-bar").focus()
                    }}>
                        <DialogHeader>
                            <DialogTitle className="text-[--text] text-3xl">Settings Menu</DialogTitle>
                            <DialogDescription>Manage your preferences here</DialogDescription>
                        </DialogHeader>
                        {settingsReady ? <Render /> : <p>Loading settings...</p>}
                    </DialogContent>
                </Dialog>
            </div>
        </SettingsProvider>
    )
}


function SetupSettings({ onLoaded: onLoad }) {
    const settings = useSettings()
    const lsm = new localStorageManager('home')

    const search_settings = SearchSetting('Search Shortcuts', 'Search',lsm)
    search_settings.add(["wiki \\v\\", "https://en.wikipedia.org/wiki/\\v\\", "#fc4e4e"],lsm)
    search_settings.add(["gh metro", "https://github.com/wlmac/metropolis", "#fca54e"],lsm)
    search_settings.add(["gh metro \\v\\", "https://github.com/wlmac/metropolis/pull/\\v\\", "#fce54e"],lsm)
    search_settings.add(["gh \\v\\", "https://github.com/\\v\\", "#96fc4e"],lsm)
    search_settings.add(["google \\v\\", "https://www.google.ca/search?q=\\v\\", "#4efce5"],lsm)
    
    const about = AboutSetting("About", "About",lsm)
    const theme = ThemeSetting("Theme", "Appearance",lsm)
    const bg = BackgroundSetting("Background Image", "Appearance", lsm)

    useEffect(() => {

        settings.add(theme)
        settings.add(search_settings)
        settings.add(about)
        settings.add(bg);

        settings.load()
        onLoad()

    }, [settings, onLoad])

    return null
}