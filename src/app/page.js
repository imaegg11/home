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



export default function Home() {

    // TODO: https://stackoverflow.com/questions/77026759/using-next-themes-for-dark-mode-generates-hydration-failed-error

    const [settingsOpen, setSettingsOpen] = useState(false)
    const [mounted, setMounted] = useState(false);

    const [settingsReady, setSettingsReady] = useState(false)

    useEffect(() => {

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
            <SetupSettings onLoad={() => setSettingsReady(true)} />
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
            <Dialog open={settingsOpen} onOpenChange={setSettingsOpen} modal={false}>
                {/* TO DO - FIX THE CLOSE BUTTON ON THE THINGY */}
                {settingsOpen && <div data-state={settingsOpen ? "open" : "closed"} className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"></div>}
                <DialogContent className="min-w-fit h-[80vh]" onOpenAutoFocus={(e) => {
                    e.preventDefault()
                    document.activeElement.blur()
                }} onCloseAutoFocus={(e) => {
                    document.getElementById("search-bar").focus()
                }}>
                    <DialogHeader>
                        <DialogTitle className="text text-3xl">Settings Menu</DialogTitle>
                        <DialogDescription className="muted">Manage your preferences here</DialogDescription>
                    </DialogHeader>
                    {settingsReady ? globalSettings.render() : <p>Loading settings...</p>}
                </DialogContent>
            </Dialog>
        </SettingsProvider>
    )
}


