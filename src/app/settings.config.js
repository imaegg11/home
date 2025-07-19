import { useSettings } from "./settings/setting_provider";
import { useEffect } from "react";

import { 
    ThemeSetting, 
    SearchSetting,
    AboutSetting, 
    BackgroundSetting, 
    ExportSetting, 
    ImportSetting, 
    WidgetSetting, 
    CSSSetting
} from "./settings/all_settings"

export function SetupSettings({ onLoad }) {
    const settings = useSettings()

    // SETTINGS HERE

    const search_settings = SearchSetting('Search Shortcuts', 'Search')
    search_settings.add(["wiki \\v\\", "https://en.wikipedia.org/wiki/\\v\\", "#fc4e4e", false])
    search_settings.add(["gh \\v\\", "https://github.com/\\v\\", "#96fc4e", false])
    search_settings.add(["@g \\v\\", "https://www.google.ca/search?q=\\v\\", "#4efce5", true])

    const about = AboutSetting("About", "About")
    const theme = ThemeSetting("Theme", "Appearance")
    const bg = BackgroundSetting("Background Image", "Appearance")
    const exp = ExportSetting("Export Setting", "Settings")
    const imp = ImportSetting("Import Setting", "Settings")
    const widgets = WidgetSetting("Widgets", "Widgets")

    const css = CSSSetting("Custom CSS", "CSS")

    const all_settings = [
        theme,
        search_settings,
        widgets,
        css,
        imp,
        exp,
        bg,
        about,
    ]

    const setting_types_need_saving = [
        "Appearance",
        "Search",
        "Widgets",
        "CSS"
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
