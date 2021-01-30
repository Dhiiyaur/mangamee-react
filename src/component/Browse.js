import React, { useEffect, useState} from 'react'
import { browse } from "../endpoint";
import axios from 'axios'
import { Link as RouterLink } from "react-router-dom"
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


import {
    Grid,
    Container,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
    Link,
    CircularProgress

 } from '@material-ui/core'

const theme = createMuiTheme({
    typography: {
      subtitle1: {
        fontSize: 12,
      },
    },
  });

export default function Browse() {

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true)
    const handleImageError = (e) => {
        e.target.onerror = null;
        // e.target.style.display = 'none'
        e.target.src = ""
    }
    useEffect(() => {

        let mounted = true;
        axios.get(browse)

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
                <Grid container spacing={3} justify='center' style={{ marginTop : 20 }}>
                    {list.map(item =>{
                        return(
                        <Grid item lg={2} xs={4}>

                            {/* <Card className={classes.root} style={{ height: '100%' }}> */}
                            
                            <Link underline='none' component={RouterLink} to={`/${item.link}`}>
                            <ThemeProvider theme={theme}>
                                <Card style={{ height: '100%' }}>
                                    <CardActionArea>
                                        <CardMedia
                                        // className={classes.media}
                                        // className={classes.media}
                                        component='img' 
                                        src={item.thumbnail_image} 
                                        onError={handleImageError}
                                        />
                                        <CardContent>
                                        <Typography variant="subtitle1">
                                            {item.name}
                                        </Typography>
                                        </CardContent>
                                    </CardActionArea>

                                </Card>
                            </ThemeProvider>
                            </Link>
                            

                        </Grid>

                    )})}
                </Grid>
            </Container>
        </div>
    )
}
