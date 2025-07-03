import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Toast } from '@/app/toast'
import { useEffect, useState } from 'react'
import { lsm } from '../localStorage_manager'

import { Switch  } from "@/components/ui/switch"

export function SearchSetting(name, type) {
	let search_options = []

	let default_search = 'https://duckduckgo.com/?t=ffab&q='

    let updateLocalstorageSettings = null;

	const export_setting = () => {
		return {
			[name]: get()
		}

	}

	const import_setting = (import_object) => {
		let opt = import_object["options"]
		let def = import_object["default"]

		update(opt, def)
	}

	const load = () => {
		if (lsm.getItem(name) === null) {
            update(search_options, default_search)
        } else {
			import_setting(lsm.getItem(name))
		}
	}

	const update = (opt, def) => {
		search_options = opt 
		default_search = def 

		lsm.setItem(name, get())
	}

	const uuidv4 = () => { // Literally only here to make a unique id that barely gets used :) 
		return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
		  (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
		);
	  }

	const add = (value) => {
		if (value.length != 5) value.push(uuidv4())
		search_options.push(value)

		return value
	}

	const remove = (id) => {
		let return_val;
		for (let i = 0; i < search_options.length; i++) {
			let option_id = search_options[i][4]

			if (option_id == id) {
				return_val = search_options.splice(i, 1)
			}
		}

		return return_val
	}

	const get = () => {
		return {
			options: search_options,
			default: default_search
		}
	}

	const save_preferences = () => {
        if (updateLocalstorageSettings !== null) updateLocalstorageSettings()
    }

	function Component({ isHidden })  {
		const [data, setData] = useState(search_options)
		const [defaultSearch, setDefault] = useState(default_search)

		useEffect(() => {
			setData(search_options)
			setDefault(default_search)
		}, [search_options, default_search])

		const update_default = (e) => {
            let value = e.target.value

			setDefault(value)
		}

		const update_value = (index, elementID) => {

			let parent = document.getElementById(elementID).children[0].children
			let shortcut = parent[0].children[1].value
			let description = parent[1].children[1].value
			let color = parent[2].children[1].children[1].value

			let useURI = parent[3].children[1].getAttribute('data-state') == 'checked'

			let id = data[index][4]

			let options = data.slice()
			options[index] = [shortcut, description, color, useURI, id]

			setData((prev) =>
				prev.map((e, i) => (i == index ? options[index] : e))
			)
		}

		const delete_value = (id) => {
			setData((prev) => prev.filter((e, i) => e[4] != id))
		}

		updateLocalstorageSettings = () => {
			update(data, defaultSearch);
		}

		const add_value = () => {
			setData([...data, ['', '', '#ffffff', false, uuidv4()]])
		}

		return isHidden ? <div className="hidden"></div> : (
			<div className="text mb-4">
				<p className="font-semibold">{name}</p>
				<div className="flex justify-between content-center my-2">
					<p className="content-center text-sm">Default Search: </p>
					<div className="flex items-center content-center w-3/5">
						<input
							type="text"
							placeholder="Default Search"
							className="bg-inherit w-full h-10 border border-gray-750 select-none rounded-xl px-6 focus-within:outline-none text-sm mr-2 ml-auto"
							defaultValue={defaultSearch}
							onChange={(e) => update_default(e)}
						></input>
					</div>
				</div>

				<Accordion type="multiple" className="w-[90%] mx-2">

					{data.length == 0 ? 
						<div className="mt-8 mb-6">
							<p className="text-center text-sm">There seems to be nothing here... Try adding a shortcut?</p>
						</div>
					: data.map((value, index) => {
						let [shortcut, destination, color, useURI, id] = value

						return (
							<AccordionItem key={index + 10} value={index + 10}>
								<AccordionTrigger>
									<p className="overflow-hidden text-ellipsis whitespace-nowrap">
										Shortcut - {shortcut}
									</p>
								</AccordionTrigger>
								<AccordionContent id={id}>
									<div className="flex justify-between content-center">
										<p className="content-center">
											Shortcut:
										</p>
										<input
											type="text"
											placeholder="Shortcut (\v\ for user value)"
											className="bg-inherit w-2/3 h-10 border border-gray-750 select-none rounded-xl px-6 focus-within:outline-none"
											defaultValue={shortcut}
											onChange={() => update_value(index, id)}
										></input>
									</div>
									<div className="flex justify-between content-center my-3">
										<p className="content-center">
											Destination:
										</p>
										<input
											type="text"
											placeholder="Destination (\v\ for user value)"
											className="bg-inherit w-2/3 h-10 border border-gray-750 select-none rounded-xl px-6 focus-within:outline-none"
											defaultValue={destination}
											onChange={() => update_value(index, id)}
										></input>
									</div>
									<div className="flex justify-between content-center mb-3">
										<p className="content-center">Color:</p>
										<div className="flex items-center">
											<div
												className="h-8 w-8 ml-auto mr-2 rounded-md border-2 border-[#595959]"
												style={{
													backgroundColor: color
												}}
											></div>
											<input
												type="text"
												placeholder="Color"
												className="bg-inherit w-1/2 h-10 border border-gray-750 select-none rounded-xl px-6 focus-within:outline-none"
												defaultValue={color}
												onChange={() => update_value(index, id)}
											></input>
										</div>
									</div>
									<div className="flex justify-between content-center my-3">
										<p className="content-center">
											Use encodeURIComponent:
										</p>
										<Switch defaultChecked={useURI} onCheckedChange={() => update_value(index, id)} className="mr-2 data-[state=unchecked]:[&>span]:bg-[var(--text)]"/>
									</div>
									<div className="flex justify-between content-center">
										<div></div>
										<div>
											<Button
												onClick={() =>
													delete_value(id)
												}
												variant="destructive"
											>
												Delete
											</Button>
										</div>
									</div>
								</AccordionContent>
							</AccordionItem>
						)
					})}
					<div className="w-full flex justify-center mt-5">
						<Button onClick={() => add_value()} variant="outline">
							Add
						</Button>
					</div>
				</Accordion>
			</div>
		)
	}

	const render = (key, r) => <Component key={key} isHidden={r}/>

	return {
		"export": export_setting,
		"import": import_setting,
		"load": load,
		"add": add,
		"remove": remove,
		"get": get,
        "save": save_preferences, 
		"render": render,
		"name": name,
		"type": type
	}
}

