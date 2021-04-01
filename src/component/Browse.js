import React, { useEffect, useState} from 'react'
import { apiBrowse } from "../config/endpoint";
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
    CircularProgress,
    ButtonGroup,
    Button,

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
    const [page, setpage] = useState(1)

    const theme = createMuiTheme({
        palette:{

            type:'dark'
        }

    })

    const FetchManga = (pageNumber) => {
        
        axios.get(apiBrowse, {
            params:{

                page:pageNumber
            }
        })
        .then(res =>{

            // console.log(res.data)
            setList(res.data)
            setLoading(false)

        })
    }

    const handlePageNext = () => {

        setLoading(true)
        let tempPage = page
        tempPage += 1
        setList([])
        FetchManga(tempPage)
        setpage(tempPage)
        

    }

    const handlePagePrev = () => {

        setLoading(true)
        let tempPage = page
        if (tempPage > 1){

            tempPage -= 1
            setList([])
            FetchManga(tempPage)
            setpage(tempPage)
        }

    }


    useEffect(() => {

        // console.log(page)
        FetchManga(page)

    }, [])

    const browseTitle = (
        <div>
        <Grid container spacing={3} m={2} justify='center' style={{ marginTop : 100 }}>
            <Typography variant="h5" component="h5" color='textPrimary'>
            -- Page : {page} --
            </Typography>
        </Grid>
        </div>
    )

    const mangaData = (
        <div>
        {loading ? (
            <Grid container spacing={3} m={2} justify='center' style={{ marginTop : 150 }}>
                <CircularProgress color="secondary"/>
            </Grid>
            ) : ( 
            <div>
            <Grid container spacing={3} m={2} justify='center' style={{ marginTop : 30 }}>
            {list.map(item =>{
            
                return(
                <Grid item lg={2} xs={4}>
                <Card className={classes.root} style={{ height: '100%' }}>
                <div onClick={() => {
                                        
                                        let MangeName = item.MangaTitle
                                        let date = new Date(2030, 12)
                                        cookies.set("Mangamee_Temp_Name", MangeName, { path: "/", expires: date })
                                
                                    }}>
                    <CardActionArea>
                    <Link underline='none' component={RouterLink} to={`/EN/${item.MangaLink}`}>
                    <CardMedia
                        component="img"
                        alt=" "
                        height="180"
                        src={item.MangaCover}
                        title="manga title"
                    />
                    <CardContent>
                        <Typography noWrap variant="body2" color="textSecondary" component="p" className={classes.mobileText}>
                            {item.MangaTitle}
                        </Typography>
                    </CardContent>
                    </Link>
                    </CardActionArea>
                </div>
                </Card>
                </Grid>
            )})}
            </Grid>
            <ButtonGroup fullWidth style={{ marginTop : 30}}>
            <Button variant="contained" 
                    color="primary"
                    onClick={e => handlePagePrev()}>
                Prev
            </Button>
            <Button variant="contained" 
                    color="secondary"
                    onClick={e => handlePageNext()}>
                        
                Next
            </Button>
            </ButtonGroup>
            </div>
            )}
        </div>
    )

    return (

        <div>
            <Container>
                <MuiThemeProvider theme={theme}>
                {browseTitle}
                {mangaData}
                </MuiThemeProvider>
            </Container>
            
        </div>
    )
}
