import React, { useState, useEffect } from 'react'
import { apiManga, apiUpdateHistory } from "../endpoint";
import axios from 'axios'
import { useParams, Link as RouterLink } from "react-router-dom"
import Cookies from 'universal-cookie';

import {
    Grid,
    Container,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
    Link,
    ListItem,
    List,
    ListItemText,
    Divider,
    CircularProgress

 } from '@material-ui/core'

 import {MuiThemeProvider, createMuiTheme } from '@material-ui/core'

const cookies = new Cookies()
export default function MangaChapter() {

    // const classes = useStyles();
    const { lang, manga_tile } = useParams()
    const [loading, setLoading] = useState(true)
    const [chapter, setChapter] = useState([])
    const [info, setInfo] = useState({
        cover_img   : null,
        summary     : null
    })

    const theme = createMuiTheme({
        palette:{

            type:'dark'
        }

    })

    function FetchManga() {
        
        axios.get(apiManga, {
            params:{

                lang:lang,
                manga_title:manga_tile
            }
        })

        .then(res =>{
        
                // console.log(res.data.chapters)
                // console.log(res.data.cover_img)
                // console.log(res.data.summary)
                setChapter(res.data.chapters)
                setInfo({
                    cover_img:res.data.cover_img,
                    summary:res.data.summary,
                    title:res.title    
                })
                
                CreateOrUpdate(res.data.cover_img)
                // console.log(res.data.chapters)
                setLoading(false)
                
        })

    }

    function UpdateDbUser(userHistory) {

        let token = cookies.get("Mangamee_Login_Token");
        
        axios.post(apiUpdateHistory,{

            token   : token,
            history : userHistory
            
        })
    }

    function CreateOrUpdate(coverImg) {

        let userToken = cookies.get("Mangamee_Login_Token");
        let tempHistory = cookies.get("Mangamee_Temp_History");

        console.log(userToken)

        if(userToken != undefined){


            if(tempHistory == undefined){

                // creaate his
                console.log('ga ada history')
                CreateCookies(coverImg)

            }else{

                // update history
                console.log('ada history')
                console.log(tempHistory)
                UpdateCookies(tempHistory, coverImg)
                   
            }    
        }
    }


    function CreateCookies(coverImg){

        let tempName = cookies.get("Mangamee_Temp_Name");

        let userHistory = [
            {
                ID : manga_tile,
                Lang : lang,
                Name : tempName,
                CoverImg : coverImg,
                LatestRead : '-'
            }
        ]
        
        let date = new Date(2030, 12)
        cookies.set("Mangamee_Temp_History", userHistory, { path: "/", expires: date })
        UpdateDbUser(userHistory)

    }

    function UpdateCookies(tempHistory, coverImg) {

        let userHistory = tempHistory
        let tempName = cookies.get("Mangamee_Temp_Name");
        // checking manga is input or not if, ga da, tambahin data,if ada, update

        let checkName = manga_tile
        let findName = userHistory.find((item) =>{
            return item.ID === checkName
        })

        console.log(userHistory)

        if(findName === undefined){
            
            userHistory.push(
                
                {
                    ID : manga_tile,
                    Lang : lang,
                    Name : tempName,
                    CoverImg : coverImg,
                    LatestRead : '-'

                }
            )

            let date = new Date(2030, 12)
            cookies.set("Mangamee_Temp_History", userHistory, { path: "/", expires: date })
            UpdateDbUser(userHistory)
        }
    }

    useEffect(() => {

        FetchManga()
       

    }, [])


    return (
        <div>
            <MuiThemeProvider theme={theme}>
            <Container>

            {loading && (
                <Grid container spacing={3} m={2} justify='center' style={{ marginTop : 150 }}>
                    <CircularProgress color="secondary"/>
                </Grid>
            )}

            {!loading && (

                <Grid container spacing={3} m={2} justify='center' style={{ marginTop : 100 }}>
                    <Grid item lg={8} xs={12}>
                    <Card style={{ height: '100%' }}>
                        <CardActionArea>
                        <CardMedia
                            component="img"
                            alt=" "
                            // height='60%'
                            src={info.cover_img}
                            title="manga title"
                        />
                        <CardContent>
                            <Typography variant="h6" component="h6">
                                 summary
                            </Typography>
                            <br />
                            <Typography variant="body2" color="textSecondary" component="p">
                                {info.summary}
                            </Typography>
                            <br />
                            <Divider />
                            <List>
                                {chapter.map(item =>{   
                                    return(
                                    
                                    <ListItem button>
                                        <Link underline='none' component={RouterLink} to={`/${lang}/${manga_tile}/${item.link}`}>
                                            <ListItemText style={{ color: '#FFFFFF' }} primary={item.chapter_name} />
                                        </Link>
                                    </ListItem>
                                    
                                )})}
                            </List>
                        </CardContent>
                        </CardActionArea>
                    </Card>
                    </Grid>
                </Grid>
            )}
            </Container>
            </MuiThemeProvider>
        </div>
    )
}


