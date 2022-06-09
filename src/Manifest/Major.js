import React from "react";

import setttingsImg from "./svg/icons8-settings-50 (1).png"
import locaImg from "./svg/icons8-location-50.png"
import settingFill from "./img/map-pin-2-fill.png"

/*   document.getElementById("weather").innerHTML = `
                        <img src=${iconUrl} />
                        <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                        <p class="weather-city">${data.name}</p>
                    ` */


const locationIcon = <svg xmlns="http://www.w3.org/2000/svg" className="fill-white" name="location" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 20.9l4.95-4.95a7 7 0 1 0-9.9 0L12 20.9zm0 2.828l-6.364-6.364a9 9 0 1 1 12.728 0L12 23.728zM12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 2a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/></svg>

export default function Major(props){
    const [selectedCoin, setSelectedCoin] = React.useState(JSON.parse(localStorage.getItem("crypto")) || "bitcoin")
    const [mouseDiv, setmouseDiv] = React.useState("")
    const [weatherLocation, setweatherLocation] = React.useState({
        location: "", weatherIcon: "", temperature: ""
    })
    const [fontHover, setFontHover] = React.useState(false)
    const [cryptoHover, setCryptoHover] = React.useState(false)
    const [themeHover, setthemeHover] = React.useState(false)
    const [mouseOverSettings, setMouseSettings] = React.useState(false)
    const [mouseOver, setmouseOver] = React.useState(false)
    const [divOver, setDivOver] = React.useState(false)
    const [currencyInfo, setCurrencyInfo] = React.useState({
        current: "",
        low: "",
        high: "",
        icon: "",
        name: "",
    })
 
    const {themeSettings, setThemeSettings} = props.changeTheme
    const setThemeFont = (e)=>{
        setThemeSettings(prev => ({...prev, "font": e.target.value}))
        e.target.checked = true
    }

    const setThemeBackGround = (e)=>{
        setThemeSettings(prev => ({...prev, "backGroundTheme":e.target.value }))
        e.target.selected = true
        localStorage.setItem("backgroundTheme", JSON.stringify(e.target.value))
        console.log(themeSettings)
    }

    const setCrypto = (e)=>{
        console.log(e.target.value)
        console.log("working properly")
        e.target.selected = true
        localStorage.setItem("crypto", JSON.stringify(e.target.value))
        setSelectedCoin(e.target.value)
        
    }


    const getCoinInfo = async ()=>{
        const data = await fetch(`https://api.coingecko.com/api/v3/coins/${selectedCoin}`)
        const res = await data.json()
        setCurrencyInfo(prev => ({
            current: `$${res.market_data.current_price.usd}`,
            high:  `$${res.market_data.high_24h.usd}`,
            low: `$${res.market_data.low_24h.usd}`,
            icon: res.image.small,
            name: res.name

        }))
    }
    React.useEffect(()=>{
        getCoinInfo()
    }, [selectedCoin])

    const getWeatherLocation = ()=>{
        navigator.geolocation.getCurrentPosition(position => {
            fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
                .then(res => {
                    if (!res.ok) {
                        throw Error("Weather data not available")
                    }
                    return res.json()
                })
                .then(data => {
                    const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
                    setweatherLocation(prev => ({weatherIcon: iconUrl, temperature: data.main.temp, location: data.name  }))
                })
                .catch(err => console.error(err))
        })
    }

    React.useEffect(()=>{
        getCoinInfo()
        getWeatherLocation()
    }, [])

    const handleMouseOver = (e)=>{
        if(e.target.name === "location"){
           setmouseDiv(
            <div className="flex flex-col transition ease-in-out duration-350 delay-100 
            animate-fadeIn text-xs mt-4 font-bold text-gray-600">
            <div className="flex flex-col justify-center items-center ">
                <div className="w-10 flex text-center"><img src={currencyInfo.icon}></img></div>
                <div className="text-md text-black">    {
                 ` ${currencyInfo.name}`
                }</div>
                <div className="self-start ml-2 text-xs">
                <div>current : <span className="ml-2">{currencyInfo.current}</span></div>
                <div> high : <span className="ml-7">{currencyInfo.high}</span></div>
                <div>low : <span className="ml-8">{currencyInfo.low}</span></div>
                </div>
            </div>

            <div className="flex">
                <div className="w-6">
                <img src={weatherLocation.weatherIcon}></img>
                </div>
                {weatherLocation.location} <div className="ml-4">{weatherLocation.temperature} F</div>
            </div>
            <div className="ml-2 text-xs">
               <span className="text-red-400">Photo By</span> {props.info}
            </div>
        </div>
           )
           setmouseOver(true)
        }
        else{
            return
        }

    }
    
    return <div className="flex flex-col">
        <div className="flex p-2 p-4 items-start w-24 justify-center">
        <div className="w-7 flex flex-col h-6 " name="location">
            <button name="location" className="h-7 w-7 -mt-1"  onMouseOut={()=>{setmouseOver(false)}}  onMouseOver={(e)=>{handleMouseOver(e)}}>
  
                <div name="location" className="h-full" >{locationIcon}</div>
                <img name="location" className="h-full w-screen opacity-0 -mt-8" src={settingFill}></img>
                
            </button>
        </div>
        <div className="w-7 ml-4 flex flex-col border-rounded" onClick={()=>{setDivOver(prev => !prev)}} onMouseOut={()=>{setMouseSettings(false)}} onMouseOver={()=>{setMouseSettings(true)}}>
            <button name="settings" className="opacity-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="fill-white hover:fill-blue-400" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 1l9.5 5.5v11L12 23l-9.5-5.5v-11L12 1zm0 14a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg>
            </button>
        </div>
    </div>
   {mouseOver ?  <div className="bg-gray-200/75 w-48 h-48 rounded-r-lg" >
        {mouseDiv}
    </div>: null}
    {mouseOverSettings || divOver ? <div className="opacity-75">
        <div className="transition ease-in-out animate-fadeIn accent-red-500 bg-gray-200
    p-4 text-xs delay-100 duration-350 w-96 rounded-r-lg flex justify-center flex-col">
          <div className="text-pink-500 mt-2">click icon to pin and unpin menu</div>
        <form defaultValue={JSON.parse(localStorage.getItem("font"))} className="flex flex-col" onMouseOver={()=>{setFontHover(true)}} onMouseOut={()=>{setFontHover(false)}}>
           <p className="p-1 pl-0">
           Font-Type:
           </p>
            <div className={`${fontHover ? "block": "hidden"} mt-2`}>
            <label className="ml-3 text-gray-700 hover:text-pink-500 border border-pink-400 w-fit p-1 rounded-lg" for="Radio">
                <input className="mr-2 hidden "  id="Radio" type="radio" defaultChecked={themeSettings.font === "Radio"} name="font" value="Radio"  onClick={(e)=>{setThemeFont(e)}}></input>
                Radio
            </label>
    
            <label className="ml-2 text-gray-700 hover:text-pink-500 border border-pink-400 w-fit p-1 rounded-lg" for="Alt">
              <input className="mr-2 hidden" id="Alt" type="radio" defaultChecked={themeSettings.font === "DigitalAlt"} name="font" value="DigitalAlt" onClick={(e)=>{setThemeFont(e)}}></input>
             Alt
            </label>
            <label className="ml-2 text-gray-700 hover:text-pink-500 border border-pink-400 w-fit p-1 rounded-lg" for="Digital">
                 <input className="mr-2 hidden" id="Digital" type="radio" defaultChecked={themeSettings.font === "Digital"} name="font" value="Digital" onClick={(e)=>{setThemeFont(e)}}></input>
                 Digital
            </label>
            <label className="ml-2 text-gray-700 hover:text-pink-500 border border-pink-400 w-fit p-1 rounded-lg" for="Led">
              <input className="mr-2 hidden" type="radio" id="Led" defaultChecked={themeSettings.font === "SegmentLED"} name="font" value="SegmentLED" onClick={(e)=>{setThemeFont(e)}}></input>
              LED 
            </label>
            <label className="ml-2 text-gray-700 hover:text-pink-500 border border-pink-400 w-fit p-1 rounded-lg" for="Poppins">
            <input className="mr-2 hidden" type="radio" id="Poppins" defaultChecked={themeSettings.font === "Poppins"} name="font" value="Poppins" onClick={(e)=>{setThemeFont(e)}}></input>
            Poppins
            </label>
            </div>
        </form >
       
            <form className="mt-2" defaultValue={JSON.parse(localStorage.getItem("crypto"))} onMouseOver={()=>{(setCryptoHover(true))}} onMouseLeave={()=>{setCryptoHover(false)}}>
           <p className="p-1 pl-0"> Cryto: </p>
            <div className={`${cryptoHover ? "block": "hidden"} mt-2`}>
            <label className="mr-2 ml-2 hover:text-pink-500 border border-pink-400 w-fit p-1 rounded-lg"  for="bitcoin">bitcoin
                    <input type="radio" className="hidden" id="bitcoin" value="bitcoin" onChange={(e)=>{setCrypto(e)}} defaultChecked ={selectedCoin === "bitcoin"} name="crypto"></input>
                </label>
                <label className="mr-2 hover:text-pink-500 border border-pink-400 w-fit p-1 rounded-lg" for="dogecoin">dogecoin
                    <input type="radio" className="hidden" id="dogecoin" value="dogecoin" onChange={(e)=>{setCrypto(e)}} defaultChecked ={selectedCoin === "dogecoin"} name="crypto"></input>
                </label>
                <label className="mr-2 hover:text-pink-500 border border-pink-400 w-fit p-1 rounded-lg" for="apecoin">apecoin
                    <input type="radio" id="apecoin" className="hidden" value="apecoin" onChange={(e)=>{setCrypto(e)}} defaultChecked={selectedCoin === "apecoin"} name="crypto"></input>
                </label>
                <label className="mr-2 hover:text-pink-500 border border-pink-400 w-fit p-1 rounded-lg" for="eth" >ethereum
                    <input type="radio" id="eth" value="ethereum" className="hidden" onChange={(e)=>{setCrypto(e)}} defaultChecked ={selectedCoin === "ethereum"} name="crypto"></input>
                </label>
            </div>
            </form>

            <form className="mt-2 flex flex-col" onMouseOver={()=>{setthemeHover(true)}} onMouseLeave={()=>{setthemeHover(false)}}>
                <p className="p-1 pl-0">Theme:</p>
               <div className={`${themeHover ? "block": "hidden"} flex`}>
               <label className={`flex items-center ml-2 border border-pink-400 w-fit p-1 rounded-lg ${themeSettings.backGroundTheme === "snow" ? "text-pink-400": "text-gray-700" }`}>
                    Snow
                    <input type="radio" value="snow" className="ml-1 hidden" name="backGroundTheme" defaultChecked={themeSettings.backGroundTheme === "snow"} onClick={(e)=>{setThemeBackGround(e)}}></input>
                </label>
                <label  className={`flex items-center ml-2 border border-pink-400 w-fit p-1 rounded-lg ${themeSettings.backGroundTheme === "nature" ? "text-pink-400": "text-gray-700" }`}>
                    Nature
                    <input type="radio" value="nature" className="ml-1 hidden" name="backGroundTheme" defaultChecked={themeSettings.backGroundTheme === "nature"} onClick={(e)=>{setThemeBackGround(e)}}></input>
                </label>
                <label  className={`flex items-center ml-2 border border-pink-400 w-fit p-1 rounded-lg ${themeSettings.backGroundTheme === "sand" ? "text-pink-400": "text-gray-700" }`}>
                    Sand
                    <input type="radio" value="sand" className="ml-1 hidden" name="backGroundTheme" defaultChecked={themeSettings.backGroundTheme === "sand"} onClick={(e)=>{setThemeBackGround(e)}}></input>
                </label>
                <label  className={`flex items-center ml-2 border border-pink-400 w-fit p-1 rounded-lg ${themeSettings.backGroundTheme === "ocean" ? "text-pink-400": "text-gray-700"}`}>
                    Ocean
                    <input type="radio" className="ml-1 hidden" value="ocean" name="backGroundTheme" defaultChecked={themeSettings.backGroundTheme === "ocean"} onClick={(e)=>{setThemeBackGround(e)}}></input>
                </label>
                <label  className={`flex items-center ml-2 border border-pink-400 w-fit p-1 rounded-lg ${themeSettings.backGroundTheme === "robots" ? "text-pink-400": "text-gray-700"}`}>
                    Robots
                    <input type="radio" className="ml-1 hidden" value="robots" name="backGroundTheme" defaultChecked={themeSettings.backGroundTheme === "robots"} onClick={(e)=>{setThemeBackGround(e)}}></input>
                </label>
                <label  className={`flex items-center ml-2 border border-pink-400 w-fit p-1 rounded-lg ${themeSettings.backGroundTheme === "anime" ? "text-pink-400": "text-gray-700"}`}>
                    Japan
                    <input type="radio" className="ml-1 hidden" value="anime" name="backGroundTheme" defaultChecked={themeSettings.backGroundTheme === "japan"} onClick={(e)=>{setThemeBackGround(e)}}></input>
                </label>
               </div>
            </form>
          
      

    </div> 


    </div>: null}
    </div>
}