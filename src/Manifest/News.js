import React, {useState} from "react";
import axios from "axios";


export default function News(){
    const [articles, setArticles] = React.useState()
    const [articlesAvailable, setArticlesAvailable] = useState(false)
    const [infoHover, setInfoHover] = React.useState(false)
    const [currentArticle, setCurrentArticle] = React.useState([])
    const [searchParam, setSearchParams] = useState("")
    const [articleNo, setArticleNo] = React.useState(0)
    const options = {
        method: 'GET',
        url: 'https://free-news.p.rapidapi.com/v1/search',
        params: {q: searchParam, lang: 'en'},
        headers: {
          'X-RapidAPI-Key': '3e1511ad44msh595a480a8abb955p18a1eajsn024e0ecca1e4',
          'X-RapidAPI-Host': 'free-news.p.rapidapi.com'
        }
      };

      const getNews = ()=>{
          if(options.params.q === ""){
              return
          }
          else{
            axios.request(options).then(function (response) {
                console.log(response.data.articles)
                setArticles(response.data.articles)
                setArticlesAvailable(true)
            }).catch(function (error) {
                console.error(error);
            });
          }
      }

/*       React.useEffect(()=>{
        axios.request(options).then(function (response) {
            console.log(response.data.articles)
            setArticles(response.data.articles)
            setArticlesAvailable(true)
        }).catch(function (error) {
            console.error(error);
        });
      }, []) */

      const authorIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M5 20h14v2H5v-2zm7-2a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm0-2a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/></svg>
      const opinionIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0H24V24H0z"/><path d="M21 3c.552 0 1 .448 1 1v14c0 .552-.448 1-1 1H6.455L2 22.5V4c0-.552.448-1 1-1h18zm-8 4h-2v8h2V7zm4 2h-2v6h2V9zm-8 2H7v4h2v-4z"/></svg>
      const infoIcon = <svg xmlns="http://www.w3.org/2000/svg" className="fill-white border border-black bg-black rounded-full" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z"/></svg>
      const newsIcon = <svg xmlns="http://www.w3.org/2000/svg" className="fill-white" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M19 22H5a3 3 0 0 1-3-3V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v7h4v9a3 3 0 0 1-3 3zm-1-10v7a1 1 0 0 0 2 0v-7h-2zM5 6v6h6V6H5zm0 7v2h10v-2H5zm0 3v2h10v-2H5zm2-8h2v2H7V8z"/></svg>
      return <div className="flex flex-col">
          <div className="flex items-center justify-center">
          <input placeholder="Search News" value={searchParam} onChange={(e)=>{
              setSearchParams(e.target.value)
          }} className="outline-none rounded-l-full p-1 pl-2 placeholder:text-sm flex items-center justify-center"></input>
          <button className="rounded-r-full bg-black p-1" onClick={()=>{getNews()}}>
          {newsIcon}
          </button>
      </div>
      {articlesAvailable && <div className="bg-gray-400 bg-cover h-56 w-96 mt-2 rounded-lg flex object-contain"  style={{backgroundImage: `url(${articles[articleNo].media})`}}>
        <div className="flex flex-col pl-2 mt-2" onMouseOver={()=>{setInfoHover(true)}} onMouseOut={()=>{setInfoHover(false)}}>{infoIcon}
        <div className={`h-24 flex flex-col text-gray-800 w-64 bg-white/30 p-2 rounded-lg ${infoHover ? "block": "hidden"}`}>
        <div className="flex items-center">
            {opinionIcon}
            <div className="text-xs flex">
                isOpinion: 
                <p className="ml-2">{articles[articleNo].is_opinion ? "true": "false"}</p>
            </div>
        </div>
        <div className="flex items-center">
            {authorIcon}
            <div className="text-xs flex overflow-hidden flex">
                Author:
                <p className="ml-2"> {articles[articleNo].author}</p>
            </div>

        </div>
        <div className="flex text-xs flex items-center">
            Date published:
            <p className="ml-2">   {articles[articleNo].published_date}</p>
        </div>

        </div>
        </div>
         <div className="absolute bottom-6 p-2 text-white font-bold flex items-center" style={{
             textShadow: "4px 4px 3px black"
         }}>{articles[articleNo].title}
         <a href={articles[articleNo].link}>
         <div className="text-sm text-white ml-24">Follow the story</div>
         </a>
         </div>
          <div className="absolute bottom-2 flex w-96 justify-between p-1">
          {articles.map(item => (
              <button className={`h-2 w-2 rounded-full border border-black ${articleNo === articles.indexOf(item) ? "bg-green-400": "bg-white"}`} id={articles.indexOf(item)} onClick={()=>{
                  setArticleNo(articles.indexOf(item))
              }}></button>
          ))}
          </div>
      </div>}
      </div>
}


/* {articles[1].authors.map(item => (
                    <div>
                        {item}
                    </div>
                ))} */