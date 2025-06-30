import { Button } from '@/components/ui/button'
import { Toast } from '@/app/toast'
import { useState } from 'react'
import { lsm } from '../localStorage_manager';


export function BackgroundSetting(name, type) {

    let bg = "";

    let updateAfterSettingsImport = null;

    const export_setting = () => {
        let export_object = {
            [name]: get()
        }

        return export_object;
    }

    const import_setting = (import_object) => {
        update(import_object["url"])

        if (updateAfterSettingsImport !== null) updateAfterSettingsImport()
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

        updateAfterSettingsImport = () => setBgURL(bg)

        const update_bg = (e) => {
            let value = e.target.parentNode.children[0].value

			update(value)
			setBgURL(value)

            Toast.success("Saved")
        }

        return isHidden ? <div className="hidden"></div> : (
            <div className="text">
                <p className="text-lg font-semibold">{name}</p>

                <div className="flex justify-between content-center my-2">
					<p className="content-center text-sm">Background URL: </p>
					<div className="flex items-center content-center">
						<input
							type="text"
							placeholder="Background Image URL"
							className="bg-inherit w-full h-10 border border-gray-750 select-none rounded-xl px-6 focus-within:outline-none text-sm mr-2 ml-auto"
							defaultValue={bgURL}
						></input>
						<Button onClick={(e) => update_bg(e)} variant="outline">Save</Button>
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
        "render": render, 
        "name": name,
        "type": type 
    }
}