import React, { useState, useEffect } from 'react'

import { manga } from "../endpoint";
import axios from 'axios'
import { useParams, Link as RouterLink } from "react-router-dom"

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

 
export default function MangaChapter() {

    const { manga_tile } = useParams()
    const [loading, setLoading] = useState(true)
    const [chapter, setChapter] = useState([])
    const [info, setInfo] = useState({
        cover_img : null,
        summary : null
    })


    useEffect(() => {

        let mounted = true;
        axios.get(manga, {
            params:{
                manga_title:manga_tile
            }
        })

        .then(res =>{
            if(mounted){
                // console.log(res.data.chapters)
                // console.log(res.data.cover_img)
                // console.log(res.data.summary)
                setChapter(res.data.chapters)
                setInfo({
                    cover_img:res.data.cover_img,
                    summary:res.data.summary,
                    title:res.title    
                })
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

                <Grid container spacing={3} m={2} justify='center' style={{ marginTop : 80 }}>
                    {loading && (
                        <CircularProgress color="secondary"/>
                    )}
                </Grid>

                <Grid container spacing={3} m={2} justify='center' style={{ marginTop : 20 }}>

                    <Grid item lg={12} xs={12}>
                        
                        <Card style={{ height: '100%' }}>
                            <CardActionArea>
                                <CardMedia component='img' src={info.cover_img} />
                                <CardContent>
                                <Typography variant="h6" component="h6">
                                summary
                                </Typography>
                                <br/>
                                <Typography variant="body2" color="textSecondary" component="p">
                                {info.summary}
                                </Typography>
                                <br/>
                                <Divider />
                                    <List>
                                        {chapter.map(item =>{   
                                            return(
                                            
                                                <ListItem button>
                                                    {/* <Link to={`/${manga_tile}/${item.chapter_name}`}> */}
                                                    <Link underline='none' component={RouterLink} to={`/${manga_tile}/${item.chapter_name}`}>
                                                        <ListItemText primary={item.chapter_name} />
                                                    </Link>
                                                </ListItem>
                                            
                                        )})}
                                    </List>
                                </CardContent>
                            </CardActionArea>
                        </Card>

                    </Grid>
                </Grid>

            </Container>
        </div>
    )
}
