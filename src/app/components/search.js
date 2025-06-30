import { useEffect } from "react";

export function SearchBar(props) {

    const { searchSettings, ...rest } = props 

    useEffect(() => {

        if (searchSettings == null) return;

        let searchBar = document.getElementById("search-bar");
        
        let timeout;

        const searchFunction = (e) => {search_function(e, searchSettings)}

        const addSearch = (ms) => {
            timeout = setTimeout(() => searchBar.addEventListener("keyup", searchFunction), ms)
        }

        const removeSearch = () => {
            clearTimeout(timeout);

            searchBar.removeEventListener("keyup", searchFunction)
        }

        window.addEventListener("focus", (e) => {
            addSearch(300);
        })

        window.addEventListener("blur", (e) => {
            removeSearch();
        })

        addSearch(0);

    }, [searchSettings])

    return (
        <input id="search-bar" type="text" autoComplete="off" autoFocus placeholder="Search"
            className="muted bg-[hsl(var(--background))] w-full h-10 border-2 border-[hsl(var(--border))] select-none rounded-3xl px-6  transition focus-within:outline-none focus-within:shadow-[0_1px_6px_0_var(--shadow-color)] hover:shadow-[0_1px_6px_0_var(--shadow-color)]"
        ></input>
    )
}

function search_function(event, searchSettings) {
    
    let settings = searchSettings.get();

    const options = settings["options"]
    const default_search = settings["default"]
    
    const value = document.getElementById("search-bar").value
    let search_link = null 

    for (let option of options) {

        let [ input, output, color, useURI, id ] = option 

        if (!input.includes("\\v\\") && input == value) {
            search_link = output 
            event.target.style.setProperty("--shadow-color", color)
            break 
        }

        let prefix = input.substring(0, input.indexOf("\\v\\"))

        if (value.startsWith(prefix)) {

            let values = value.substring(input.indexOf("\\v\\"), value.length).split("|")

            let match = true;
            
            for (let v of values) {
                if (output.includes("\\v\\")) {
                    output = output.replace("\\v\\", useURI ? encodeURIComponent(v) : v)
                } else {
                    match = false 
                }
            }

            if (match && !output.includes("\\v\\")) {
                search_link = output
                event.target.style.setProperty("--shadow-color", color)
                break 
            }
        }
    }

    if (search_link == null) {
        search_link = `${default_search}${encodeURIComponent(value)}` 
        event.target.style.setProperty("--shadow-color", "#71717a")
    }

    if (event.keyCode == 13) {
        if (event.ctrlKey) {
            window.open(search_link)
        } else {
            window.location.href = search_link
        }

        document.getElementById("search-bar").value = ""
        event.target.style.setProperty("--shadow-color", "#71717a")
    }

}