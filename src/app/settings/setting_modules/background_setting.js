import { useEffect, useState } from 'react'
import { lsm } from '../localStorage_manager';


export function BackgroundSetting(name, type) {

    let bg = "";

    let updateLocalstorageSettings = null;

    const export_setting = () => {
        let export_object = {
            [name]: get()
        }

        return export_object;
    }

    const import_setting = (import_object) => {
        update(import_object["url"])
    }
    
    const save_preferences = () => {
        if (updateLocalstorageSettings !== null) updateLocalstorageSettings()
    }

    const load = () => {
        if (lsm.getItem(name) === null) {
            update("")
        } else {
			import_setting(lsm.getItem(name))
		}
    }

    const update = (value) => {
        bg = value;

        lsm.setItem(name, get());
        
        document.body.style.backgroundImage = `url('${value}')`; 
    }
    
    const get = () => {
        return {
            "url": bg 
        }
    }

    function Component({ isHidden }) {

        const [bgURL, setBgURL] = useState(bg)

        useEffect(() => {
            setBgURL(bg)
        }, [bg])

        updateLocalstorageSettings = () => update(bgURL) // This has to be the most roundabout way of doing this

        const update_bg = (e) => {
            let value = e.target.value

            setBgURL(value)
        }

        return isHidden ? <div className="hidden"></div> : (
            <div className="text mb-4">
                <p className="font-semibold">{name}</p>

                <div className="flex justify-between content-center my-2">
					<p className="content-center text-sm">Background URL: </p>
					<div className="flex items-center content-center w-3/5">
						<input
							type="text"
							placeholder="Background Image URL"
							className="bg-inherit w-full h-10 border border-gray-750 select-none rounded-xl px-6 focus-within:outline-none text-sm mr-2 ml-auto"
							defaultValue={bgURL}
                            onChange={(e) => update_bg(e)}
						></input>
					</div>
				</div>
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
        "save": save_preferences, 
        "render": render, 
        "name": name,
        "type": type 
    }
}