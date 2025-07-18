import { NewsWidget } from "./news";
import { WeatherWidget } from "./weather";
import { EmptyWidget } from "./empty";
import { SystemInfoWidget } from "./system_info"
import { TimeProgressWidget } from "./time_progress"
import { QuoteWidget } from "./quote"

export const availableWidgets = {
    [WeatherWidget().name]: WeatherWidget,
    [NewsWidget().name]: NewsWidget,
    [EmptyWidget().name]: EmptyWidget,
    [SystemInfoWidget().name]: SystemInfoWidget,
    [TimeProgressWidget().name]: TimeProgressWidget,
    [QuoteWidget().name]: QuoteWidget
}

