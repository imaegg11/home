import { Settings } from "./settings/settings"
import { ThemeSetting } from "./settings/theme_setting"
import { SearchSetting } from "./settings/search_setting";

export const settings = Settings();

const search_settings = SearchSetting('Search Shortcuts', 'Search',)
search_settings.add(["wiki \\v\\", "https://en.wikipedia.org/wiki/\\v\\", "#fc4e4e"])
search_settings.add(["gh metro", "https://github.com/wlmac/metropolis", "#fca54e"])
search_settings.add(["gh metro \\v\\", "https://github.com/wlmac/metropolis/pull/\\v\\", "#fce54e"])
search_settings.add(["gh \\v\\", "https://github.com/\\v\\", "#96fc4e"])
search_settings.add(["google \\v\\", "https://www.google.ca/search?q=\\v\\", "#4efce5"])
search_settings.add(["google \\v\\", "https://www.google.ca/search?q=\\v\\", "#4efce5"])


settings.add(search_settings)
let x = [
    "Appearance",
    "Account",
    "Privacy",
    "Baguette",
    "About",
]
for (let i = 0; i < 5; i++) {
    settings.add(SearchSetting(x[i], x[i]))
}
