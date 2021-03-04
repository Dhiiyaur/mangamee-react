import React, { useEffect, useState} from 'react'
import { apiBrowse } from "../endpoint";
import axios from 'axios'
import { Link as RouterLink } from "react-router-dom"
import {MuiThemeProvider, createMuiTheme } from '@material-ui/core'
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
    CircularProgress

 } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';
const cookies = new Cookies()

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    mobileText:{

    [theme.breakpoints.down("xs")]: {
        fontSize: 12
    }
    }
    }))

export default function Browse() {

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true)
    const classes = useStyles();

    const theme = createMuiTheme({
        palette:{

            type:'dark'
        }

    })

    useEffect(() => {

        let mounted = true;
        // axios.get(apiBrowse)

        // .then(res =>{
        //     if(mounted){
        //         // console.log(res.data)
        //         setList(res.data)
        //         setLoading(false)
        //     }
        // })

        async function fetchData(){
            const browseData = await axios.get(apiBrowse);
            if(mounted){
                console.log(browseData.data)
                setList(browseData.data)
                setLoading(false)

            }
        }

        fetchData()
        
        return () => mounted = false;
    }, [])


    return (

        <div>
            <Container>
            <MuiThemeProvider theme={theme}>
            <Grid container spacing={3} m={2} justify='center' style={{ marginTop : 100 }}>
                {loading && (
                    <CircularProgress color="secondary"/>
                )}
            </Grid>
            <Grid container spacing={3} m={2} justify='center' style={{ marginTop : 40 }}>
            {list.map(item =>{
            
                return(
                <Grid item lg={2} xs={4}>
                <Card className={classes.root} style={{ height: '100%' }}>
                <div onClick={() => {
                                        
                                        let MangeName = item.name
                                        let date = new Date(2030, 12)
                                        cookies.set("Mangamee_Temp_Name", MangeName, { path: "/", expires: date })
                                
                                    }}>
                    <CardActionArea>
                    <Link underline='none' component={RouterLink} to={`/EN/${item.link}`}>
                    <CardMedia
                        component="img"
                        alt=" "
                        height="180"
                        src={item.thumbnail_image}
                        title="manga title"
                    />
                    <CardContent>
                        <Typography noWrap variant="body2" color="textSecondary" component="p" className={classes.mobileText}>
                            {item.name}
                        </Typography>
                    </CardContent>
                    </Link>
                    </CardActionArea>
                </div>
                </Card>
                </Grid>
            )})}
            </Grid>
            </MuiThemeProvider>
            </Container>
        </div>  
    )
}
