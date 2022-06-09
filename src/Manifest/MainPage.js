import { data } from "autoprefixer";
import React from "react";
import Side from "./Major";
import pcwallpaper from "./img/pcwallpaper.jpg"
import { Blurhash } from "react-blurhash"
import News from "./News";




export default function MainPage(){
    const [backGroundImg, setBackGround]= React.useState({
        img: "",
        author: "",
        description: ""

        
    })
    const [reload, setReload] = React.useState(false)
    const suitableImages = ["https://images.unsplash.com/photo-1584747792986-48c0515faba1…8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTQ3MzAwOTU&ixlib=rb-1.2.1&q=80",

]
    const date = new Date()
    const [todayDate, setToday] = React.useState(date.getDay())

    const [imgVisible, setImgVisible] = React.useState(true)
     const localStorageImg = JSON.parse(localStorage.getItem("backgroundTheme")) || "snow" 
     const localStorageFont = JSON.parse(localStorage.getItem("font")) || "Radio" 
    const [themeSettings, setThemeSettings] = React.useState({
        font: localStorageFont, backGroundTheme: localStorageImg , crypto: ""
    })
     localStorage.setItem("backgroundTheme", JSON.stringify(themeSettings.backGroundTheme)) 
    localStorage.setItem("font", JSON.stringify(themeSettings.font)) 
    const [time,setTime] = React.useState("")
    const [backGroundType, setBackGroundType] = React.useState("snow")

    function getCurrentTime() {
        const date = new Date()
        const currentTime = date.toLocaleTimeString("en-us", {timeStyle: "short"})
        setTime(currentTime)
    
    } 
    
    
    setInterval(getCurrentTime, 1000)
    const searchIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="fill-white" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M11 2c4.968 0 9 4.032 9 9s-4.032 9-9 9-9-4.032-9-9 4.032-9 9-9zm0 16c3.867 0 7-3.133 7-7 0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7zm8.485.071l2.829 2.828-1.415 1.415-2.828-2.829 1.414-1.414z"/></svg>
    const fetchImage = async ()=>{
        const width = window.innerWidth
        const orientation = width > 600 ? "landscape" : "portrait"
        const res = await fetch(`https://apis.scrimba.com/unsplash/photos/random?query=${JSON.parse(localStorage.getItem("backgroundTheme"))}`)
        const data = await res.json()
        console.log(data)
         setBackGround(prev => ({
            img:  data.urls.full,
            author: data.user.name,
            blurHash: data.blur_hash,
            description: data.alt_description
        })) 

    }

    const getNewBackground = async ()=>{
        const res = await fetch(`https://apis.scrimba.com/unsplash/photos/random?query=${JSON.parse(localStorage.getItem("backgroundTheme"))}`)
        const data = await res.json()
        localStorage.setItem("backGroundSave", JSON.stringify(data.urls.full))
        localStorage.setItem("backGroundDes", JSON.stringify(data.alt_description))
        setReload(prev => !prev)
    }
 
    React.useEffect(()=>{
        fetchImage()
    }, [date.getDay()])

    const refreshIcon = <svg xmlns="http://www.w3.org/2000/svg" className="fill-white" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M5.463 4.433A9.961 9.961 0 0 1 12 2c5.523 0 10 4.477 10 10 0 2.136-.67 4.116-1.81 5.74L17 12h3A8 8 0 0 0 6.46 6.228l-.997-1.795zm13.074 15.134A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12c0-2.136.67-4.116 1.81-5.74L7 12H4a8 8 0 0 0 13.54 5.772l.997 1.795z"/></svg>
    

    const fontFamily = `font-${themeSettings.font}`
    return <div className="h-screen">
        
         {<div className={`w-screen h-screen flex flex-col  justify-center z-50`}  style= {{
        "backgroundImage": `url(${JSON.parse(localStorage.getItem("backGroundSave"))|| backGroundImg.img})`,
         "backgroundRepeat": "no-repeat",
         "backgroundSize": "cover"}
         } >
          <div className="self-start justify-self-start text-left w-screen absolute top-3">
          <Side changeTheme= {{themeSettings, setThemeSettings}} info = {backGroundImg.author}/>
          <div className="flex items-end justify-end w-24 absolute right-10 top-2">  <News /></div>
          </div>
          <p className="font-Digital"></p>
          <p className="font-DigitalAlt"></p>
          <p className="font-SegmentLED"></p>
          <p className="font-Poppins"></p>
          <p className="font-Radio"></p>
          <div style={{
              textShadow: "2px 2px 5px gray"
          }} className="block self-center justify-self-center flex flex-col justify-items-center flex items-center justify-center ">
     
           <div className="flex"> 
           <form role="search" method="get" action="http://www.google.com/search">
                <input name="q" type="text" className="border-b border-white outline-none focus:border-b-2 bg-transparent text-white pb-2 placeholder:text-white" placeholder="Google"></input>
                <button className="ml-2" value="search" type="submit">{searchIcon}</button>
           </form>
           </div>
          <h1 className= {`text-8xl text-gray-200 p-8 ${fontFamily}`}>{time}</h1>
          </div>
          <div className="absolute bottom-6 ml-2 text-white text-xs flex flex-col bg-white/30 rounded rounded-lg backdrop-blur-[20px] p-2" style={{  textShadow: "2px 2px 5px gray"}}>
              <button onClick={()=>{getNewBackground()}} className="w-fit">{refreshIcon}</button>
              </div>
        </div> }

        
    </div>
}


/* <div id="gform">
  <label class="screen-reader-text" for="s"></label>
  <input type="text" value="" name="q" id="s">
  <input type="submit" class="btn fa-input" value="&#xf002;" style="font-family: FontAwesome;">	
</div> */

/*       <form action="http://www.google.com/search" method="get">
        <input type="text" name="q"/>
        <input type="submit" value="search" />
        </form> */