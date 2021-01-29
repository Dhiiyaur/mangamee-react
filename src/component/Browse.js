import React, { useEffect, useState} from 'react'
import { browse } from "../endpoint";
import axios from 'axios'
import { Link as RouterLink } from "react-router-dom"

import {
    Grid,
    Container,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
    Link,

 } from '@material-ui/core'


export default function Browse() {

    const [list, setList] = useState([]);

    useEffect(() => {

        let mounted = true;
        axios.get(browse)

        .then(res =>{
            if(mounted){
                console.log(res.data)
                setList(res.data)
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
                <Grid container spacing={3} justify='center' style={{ marginTop : 20 }}>
                    {list.map(item =>{
                        return(
                        <Grid item lg={2} xs={4}>

                            {/* <Card className={classes.root} style={{ height: '100%' }}> */}
                            
                            <Link underline='none' component={RouterLink} to={`/${item.link}`}>
                                <Card style={{ height: '100%' }}>
                                    <CardActionArea>
                                        <CardMedia
                                        // className={classes.media}
                                        // className={classes.media}
                                        component='img' src={item.thumbnail_image}
                                        />
                                        <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                        {item.name}
                                        </Typography>
                                        </CardContent>
                                    </CardActionArea>

                                </Card>
                            </Link>
                            

                        </Grid>

                    )})}
                </Grid>
            </Container>
        </div>
    )
}
