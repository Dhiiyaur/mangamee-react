import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { page } from "../endpoint";
import { useParams } from "react-router-dom"

import {
    Grid,
    Container,
    CardMedia,
    CircularProgress

 } from '@material-ui/core'

export default function Manga() {


    const [list, setList] = useState([]);
    const { manga_tile } = useParams()
    const { chapter } = useParams()
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        let mounted = true;
        axios.get(page, {
            params:{
                manga_title:manga_tile,
                chapter:chapter
            }
        })

        .then(res =>{
            if(mounted){
                console.log(res.data)
                setList(res.data)
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
                        {list.map(item =>{
                            return(
 
                                <CardMedia component='img' src={item.image} />

                        )})}
                        
                    </Grid>
                </Grid>
            </Container>   
        </div>
    )
}
