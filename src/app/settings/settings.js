import { useState, useReducer, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export function Settings() {
    let settings = [];
    let isLoaded = false;

    function exportSettings() {
        let export_object = {};

        for (let setting of settings) {
            export_object = {...export_object, ...setting.export()};
        }

        return export_object;
    }

    function importSettings(import_object) {
        for (let setting of settings) {
            setting.import(import_object[setting.name]);

            if (setting.updateAfterSettingsImport != undefined) setting.updateAfterSettingsImport();

            console.log(setting.updateAfterSettingsImport)
        }
    }

    function add(setting) {
        if (get(setting.name) == null) settings.push(setting);
    }

    function load() {

        if (isLoaded) return 

        for (let setting of settings) {
            setting.load();
        }

        isLoaded = false;
    }

    function remove(name) {
        for (let i = 0; i < settings.length; i++) {
            let setting = settings[i];

            if (setting.name == name) {
                settings.splice(i, 1); 
                break;
            }
        }
    }

    function get(name) {
        for (let i = 0; i < settings.length; i++) {
            let setting = settings[i];

            if (setting.name == name) {
                return setting;
            }
        }

        return null;
    }

    function getAll() {
        return settings;
    }

    function Component() {
        const [ settingType, setSettingType ] = useState(settings.length == 0 ? [] : settings[0].type)
    
        const settingTypes = settings.length == 0 ? [] : [...new Set(settings.map(setting => setting.type))]
    
        const clear_all = () => {
            for (let child of document.getElementById("settings-types").children) {
                child.classList.remove("bg-[--hover-background]")
            }
        }
    
        const handle_type_switch = (event, type) => {
            clear_all()
            event.target.classList.add("bg-[--hover-background]")
            setSettingType(type)
        }
    
        return (
            <div className="w-[50vw] h-[60vh] pb-4 flex">
                <div id="settings-types" className="w-1/3 my-2 overflow-y-auto"> {/* TO-DO */}
                    {settingTypes.map((type, index) => 
                        <p className={`${index == 0 ? "bg-[--hover-background] " : ""}px-3 my-1 py-3 rounded-[0.5rem] hover:cursor-pointer hover:bg-[--hover-background]`} onClick={(e) => handle_type_switch(e, type)} key={type}>{type}</p>
                    )}
                </div >
                <Separator className="mx-4" orientation="vertical"></Separator>
                <ScrollArea type="always" className="w-full my-2 overflow-y-auto px-6">
                    <p className="text-2xl font-semibold text-[--text] mb-4">{settingType}</p>
                    {settings.map(setting => 
                        setting.render(setting.name, setting.type != settingType)
                    )}
                </ScrollArea>
            </div>
        )
    }

    function render() {
        return <Component key={Math.random()}/>
    }

    return {
        "export": exportSettings,
        "import": importSettings,
        "add": add,
        "load": load,
        "remove": remove,
        "get": get,
        "getAll": getAll,
        "render": render
    };
}

export const globalSettings = new Settings(); 