import { useTheme } from "next-themes";

export function ThemeSetting(name, type) {

    const { theme, setTheme } = useTheme();

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
            localStorage.setItem("theme_setting", true)
        }
    }

    const update = (value) => {
        localStorage.setItem("theme_setting", value);

        const html = document.getElementsByTagName("html");
        const currentMode = html[0].className;
        
        if (currentMode === "dark") {
            html[0].className = "light";
            setTheme("light");
        } else {
            html[0].className = "dark";
            setTheme("dark");
        }
    }

    const get = () => {
        return theme;
    }

    const render = (key) => {
        return (
            <div key={key}>
                <button onClick={() => update("dark")}>Toggle Theme</button>
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