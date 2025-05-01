import { Button } from '@/components/ui/button'
import { Toast } from '@/app/toast'
import { useState } from 'react'


export function BackgroundSetting(name, type, lsm) {

    let bg = "";

    const export_setting = () => {}

    const import_setting = (import_object) => {}
``
    const load = () => {
        if (lsm.getItem(name) === null || lsm.getItem(name) === "null") {
            update("")
        } else {
			update(lsm.getItem(name))
		}
    }

    const update = (value) => {
        lsm.setItem(name, value);
        
        bg = value;
        
        document.body.style.backgroundImage = `url('${value}')`; 
    }
    
    const get = () => {}

    const render = (key, r) => {

        const [bgURL, setBgURL] = useState(lsm.getItem(name))

        console.log(bg, lsm.getItem(name))

        const update_bg = (e) => {
            let value = e.target.parentNode.children[0].value

			update(value)
			setBgURL(value)

            Toast.success("Saved")
        }

        return r ? <div className="hidden" key={key}></div> : (
            <div key={key}>
                <p className="text-lg font-semibold">{name}</p>

                <div className="flex justify-between content-center my-2">
					<p className="content-center text-sm">Background URL: </p>
					<div className="flex items-center content-center">
						<input
							type="text"
							placeholder="Background Image (Empty for none)"
							className="bg-inherit w-full h-10 border border-gray-750 select-none rounded-xl px-6 focus-within:outline-none text-sm mr-2 ml-auto"
							defaultValue={bgURL}
						></input>
						<Button onClick={(e) => update_bg(e)} variant="outline">Save</Button>
					</div>
				</div>
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