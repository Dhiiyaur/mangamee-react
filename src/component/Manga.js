import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { apiPage, apiUpdateHistory } from "../endpoint";
import { useParams } from "react-router-dom"
import Cookies from 'universal-cookie';
import {
    Grid,
    Container,
    CardMedia,
    CircularProgress

 } from '@material-ui/core'

const cookies = new Cookies()
export default function Manga() {


    const [list, setList] = useState([]);
    const { lang, chapter, manga_tile } = useParams()
    // const { chapter } = useParams()
    const [loading, setLoading] = useState(true)

    const handleImageError = (e) => {
        e.target.onerror = null;
        // e.target.style.display = 'none'
        e.target.src = ""
    }

    function UpdateDbUser(userHistory) {

        let token = cookies.get("Mangamee_Login_Token");
        
        axios.post(apiUpdateHistory,{

            token   : token,
            history : userHistory
            
        })
    }


    function updateCookiesChapter(){

        // get data
        let MangaID = manga_tile
        let lastChapter = chapter
        let TempHistory = cookies.get("Mangamee_Temp_History");

        // update chapter .map cookies
    
        let newChapter = TempHistory.map(obj =>
            obj.ID === MangaID ? { ...obj, LatestRead: lastChapter } : obj
        );
    
        // jsonvalue
        console.log(newChapter)
        let date = new Date(2030, 12)
        cookies.set("Mangamee_Temp_History", newChapter, { path: "/", expires: date })
        UpdateDbUser(newChapter)
    }
    

    useEffect(() => {

        let mounted = true;
        axios.get(apiPage, {
            params:{

                lang:lang,
                manga_title:manga_tile,
                chapter:chapter
            }
        })

        .then(res =>{
            if(mounted){
                // console.log(res.data)
                setList(res.data)
                if(console.log(cookies.get("Mangamee_Login_Token")) !== undefined){
                    updateCookiesChapter()
                    setLoading(false)
                }
                
                setLoading(false)
            }
        })

        // async function fetchData(){
        //     const browseData = await axios.get(browse);
        //     if(mounted){
        //         console.log(browseData.data)
        //         setList(browseData.data)
        //     }
        // }

        // fetchData()
        // return () => mounted = false;
    }, [])


    return (
        <div>
            <Container>
                
                {loading && (
                    <Grid container spacing={3} m={2} justify='center' style={{ marginTop : 100 }}>
                    <CircularProgress color="secondary"/>
                    </Grid>
                )}
                
                <Grid container spacing={3} m={2} justify='center' style={{ marginTop : 80 }}>
                    <Grid item lg={8} xs={12}>
                        {list.map(item =>{
                            return(
 
                                <CardMedia component='img' src={item.image} onError={handleImageError}/>

                        )})}
                        
                    </Grid>
                </Grid>
            </Container>   
        </div>
    )
}
