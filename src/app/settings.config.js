import { useSettings } from "./settings/setting_provider";
import { useEffect } from "react";

import { ThemeSetting, SearchSetting, AboutSetting, BackgroundSetting, ExportSettings, ImportSettings } from "./settings/all_settings"

export function SetupSettings({ onLoad }) {
    const settings = useSettings()

    // SETTINGS HERE

    const search_settings = SearchSetting('Search Shortcuts', 'Search')
    search_settings.add(["wiki \\v\\", "https://en.wikipedia.org/wiki/\\v\\", "#fc4e4e", false])
    search_settings.add(["gh metro", "https://github.com/wlmac/metropolis", "#fca54e", false])
    search_settings.add(["gh metro \\v\\", "https://github.com/wlmac/metropolis/pull/\\v\\", "#fce54e", false])
    search_settings.add(["gh \\v\\", "https://github.com/\\v\\", "#96fc4e", false])
    search_settings.add(["@g \\v\\", "https://www.google.ca/search?q=\\v\\", "#4efce5", true])

    const about = AboutSetting("About", "About")
    const theme = ThemeSetting("Theme", "Appearance")
    const bg = BackgroundSetting("Background Image", "Appearance")
    const exp = ExportSettings("Export Settings", "Settings")
    const imp = ImportSettings("Import Settings", "Settings")

    const all_settings = [
        theme,
        search_settings,
        imp,
        exp,
        bg,
        about,
    ]

    const setting_types_need_saving = [
        "Appearance",
        "Search"
    ]

    // SETTINGS END HERE

    useEffect(() => {

        for (let setting of all_settings) {
            settings.add(setting)
        }

        for (let setting_type of setting_types_need_saving) {
            settings.addNeedSaving(setting_type)
        }

        settings.load()
        onLoad()

    }, [settings])

    return null
}
