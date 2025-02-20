export function Setting(name, type) {

    const export_setting = () => {}

    const import_setting = (import_object) => {}

    const load = () => {}

    const update = (value) => {}
    
    const get = () => {}

    const render = (key) => {}


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