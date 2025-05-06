import { lsm } from "../localStorage_manager"

export function Setting(name, type) {

    const export_setting = () => {}

    const import_setting = (import_object) => {}

    const load = () => {}

    const update = (value) => {}
    
    const get = () => {}

    function Component({ isHidden })  {
        return isHidden ? <div className="hidden"></div> : (
            <div>

            </div>
        )
    }

    const render = (key, r) => <Component key={key} isHidden={r}/>

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