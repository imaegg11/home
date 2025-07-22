import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogOverlay
} from "@/components/ui/dialog"
import { useState } from "react"


export function README() {

    let viewed_readme = localStorage["viewed_readme"]
    const [settingsOpen, setSettingsOpen] = useState(
        (viewed_readme == null || viewed_readme == undefined ||
            viewed_readme == "null" || viewed_readme == "undefined") ? true : !viewed_readme
    )

    return (
        <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
            <DialogContent className="min-w-fit h-[80vh] [&>button]:hidden"  onOpenAutoFocus={(e) => {
                e.preventDefault()
                document.activeElement.blur()
            }} onCloseAutoFocus={(e) => {
                localStorage["viewed_readme"] = true
            }}>
                <DialogHeader>
                    <DialogTitle className="text text-2xl">A little README :)</DialogTitle>
                    <DialogDescription className="muted">Some stuff I wanted to share :)</DialogDescription>
                    <div>
                        <div className="mt-4 h-[60vh] overflow-y-auto pr-4 text-sm">
                            <p className="text-sm">
                                Baguette.
                                <br></br>
                                <br></br>
                                Anyways hey there! I'm glad you're taking a look at this project. Took me way too long to complete for honestly a project that wasn't all that difficult to do. But I wanted to add a bunch of random features with it and that took far too long to complete. Oops. Anyhow, please read this entire thing (It will disappear the next time you visit this though, modify localStorage to change that), I promise it won't be too long (Editing me here, that was a lie it's like 601 words).
                                <br></br>
                                <br></br>
                                So well, this is a homepage. Created for myself to use, figured might submit this to SoM for some free goodies while I was at it :) Everything is saved to localStorage. Use <code className="bg-[hsl(var(--background-20))] px-1">Ctrl + .</code> to open the settings menu (Do this later!!). There will be appearance in which you can change the theme and set a background image. Sure, it supports light mode but it's kinda meh if you ask me, much prefer dark mode :) In search, you will be able to have custom prefixes to quickly access different links. For example, the default includes a wiki search, so if you type wiki baguette and hit enter, you will be brought to the baguette wikipedia entry. The search bar will also change color to indicate this. In widgets, you modify what widgets (The boxes below search bar). Order matters!! Drag on the icon with 9 dots to rearrange them.  You can add more if you scroll down to see the add button. CSS will allow to apply custom css if you don't like mine (Wow, you got something against my css mate?). Settings will allow to import and export all of your settings. So you know, you can save and transfer all your between devices. Because I don't want to deal with cloud lmao. Finally about, um, there's nothing useful there. Also, click the save button to save everything!!
                                <br></br>
                                <br></br>
                                Wow, good on you! You read all the way here! There's only a few more things left! (Editing me here again, that was another lie, I'm sorry)
                                <br></br>
                                <br></br>
                                You probably noticed a Used AI badge. Yes, I did use AI. Who doesn't these days? SoM should really add a bar or something to measure AI... As a disclosure of what AI was used for here, mostly debugging. Turns out I'm terrible at finding the causes behind problems. But nearly all of the code was painfully written by a human (Which is maybe why this took so long) with the sole exception of a single 25 line file named <code className="bg-[hsl(var(--background-20))] px-1">setting_provider.js</code>, which was written by ChatGPT. There was a problem I could <strong>not</strong> figure out :(
                                <br></br>
                                <br></br>
                                To conclude with some final stuff, I swear it's almost over :sob:, all of the widgets you see here is filled with dummy data. The real website needs you to host a bunch of things (which I might consider pushing to a repo). This current website uses the branch  <code className="bg-[hsl(var(--background-20))] px-1">hc_version</code> instead of  <code className="bg-[hsl(var(--background-20))] px-1">main</code>. If you actually want to use this website for some reason, the actual website is at <a href="https://imaegg11.github.io/home/" className="accent-text">here</a>. However, it's not the fastest in terms of loading, something which I will hopefully improve... maybe... probably not if we're being honest. If you actually enjoyed this for some unknown reason, let me know maybe, either by starring or message me on Slack (@Bob (Maybe you'll find me)). I'll probably be happy about it.
                                <br></br>
                                <br></br>
                                Welp, so sorry to have you read all of my unedited, terrible grammar wise ramblings. I'll leave you off with some already custom settings for this website that you can download, see and have some fun!
                            </p>
                            <br></br>
                            <p>Default: <a href="http://files.d6f4e5.hackclub.app/homepage_demo_files/Default_Demo.json" download className="accent-text">Setting Files</a></p>
                            <img className="w-4/5 border-[3px] border-[hsl(var(--accent-color))]" src="http://files.d6f4e5.hackclub.app/homepage_demo_files/default.png"></img>
                            <br></br>
                            <p>Storm 1: <a href="http://files.d6f4e5.hackclub.app/homepage_demo_files/Storm_Demo_One.json" download className="accent-text">Setting Files</a></p>
                            <img className="w-4/5 border-[3px] border-[hsl(var(--accent-color))]" src="http://files.d6f4e5.hackclub.app/homepage_demo_files/storm_one.png"></img>
                            <p>Storm 2: <a href="http://files.d6f4e5.hackclub.app/homepage_demo_files/Storm_Demo_Two.json" download className="accent-text">Setting Files</a></p>
                            <img className="w-4/5 border-[3px] border-[hsl(var(--accent-color))]" src="http://files.d6f4e5.hackclub.app/homepage_demo_files/storm_two.png"></img>
                            <p>Astronaut: <a href="http://files.d6f4e5.hackclub.app/homepage_demo_files/Astronaut_Demo.json" download className="accent-text">Setting Files</a></p>
                            <img className="w-4/5 border-[3px] border-[hsl(var(--accent-color))]" src="http://files.d6f4e5.hackclub.app/homepage_demo_files/astronaut.png"></img>
                            <p>Sunset: <a href="http://files.d6f4e5.hackclub.app/homepage_demo_files/Sunset_Demo.json" download className="accent-text">Setting Files</a></p>
                            <img className="w-4/5 border-[3px] border-[hsl(var(--accent-color))]" src="http://files.d6f4e5.hackclub.app/homepage_demo_files/sunset.png"></img>
                        </div>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}