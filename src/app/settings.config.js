import { Settings } from "./settings/settings"
import { ThemeSetting } from "./settings/theme_setting"
import { SearchSetting } from "./settings/search_setting";
import { AboutSetting } from "./settings/about_settings";
import { BackgroundSetting } from "./settings/background_setting";
import { localStorageManager } from "./settings/localStorage_manager";


export function get_settings() {
    const settings = Settings();

    const lsm = new localStorageManager("home");

    const search_settings = SearchSetting('Search Shortcuts', 'Search',lsm)
    search_settings.add(["wiki \\v\\", "https://en.wikipedia.org/wiki/\\v\\", "#fc4e4e"],lsm)
    search_settings.add(["gh metro", "https://github.com/wlmac/metropolis", "#fca54e"],lsm)
    search_settings.add(["gh metro \\v\\", "https://github.com/wlmac/metropolis/pull/\\v\\", "#fce54e"],lsm)
    search_settings.add(["gh \\v\\", "https://github.com/\\v\\", "#96fc4e"],lsm)
    search_settings.add(["google \\v\\", "https://www.google.ca/search?q=\\v\\", "#4efce5"],lsm)
    
    const about = AboutSetting("About", "About",lsm)
    const theme = ThemeSetting("Theme", "Appearance",lsm)
    const bg = BackgroundSetting("Background Image", "Appearance", lsm)
    
    settings.add(theme)
    settings.add(search_settings)
    settings.add(about)
    settings.add(bg);

    return settings
}



