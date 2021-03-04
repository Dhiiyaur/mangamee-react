import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { apiUpdateHistory, apiGetHistory, apiDeleteHistory } from "../endpoint";

import {
    Grid,
    Container,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
    Link,
    Button,

 } from '@material-ui/core'

import { Link as RouterLink } from "react-router-dom"
import Cookies from 'universal-cookie';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';

import {MuiThemeProvider} from '@material-ui/core'

const cookies = new Cookies()
const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(6),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    root: {
        maxWidth: 345,

    },
    mobileText:{

        [theme.breakpoints.down("xs")]: {
            fontSize: 12
        }
    }
  }));

export default function Home() {

    const [userHistory, setUserHistory] = useState([])
    const [isLogin, setisLogin] = useState(false)
    const classes = useStyles();


    const theme = createMuiTheme({
        palette:{

            type:'dark'
        }

    })

    useEffect(() => {

        tokenCheck();

    }, [])

    function UpdateDbUser(userHistory) {

        let token = cookies.get("Mangamee_Login_Token");
        
        axios.post(apiUpdateHistory,{

            token   : token,
            history : userHistory
            
        })
        .then((res) => {
            
            // console.log(res.status)
            if(res.status === 200){

                window.location.href='/'
            }
            
        })
        
    }

    function DeleteDbUser() {
        
        let token = cookies.get("Mangamee_Login_Token");
        
        axios.post(apiDeleteHistory,{

            token   : token,
            
        })
        .then((res) => {
            
            // console.log(res.status)
            if(res.status === 200){

                window.location.href='/'
            }
            
        })
    }

    function tokenCheck(){

        let userToken = cookies.get("Mangamee_Login_Token");
        // console.log(cookies.get("Mangamee_Login_Token"))
        // console.log(userToken)
    
        if(userToken !== undefined){
    
            fetchHistory(userToken);
            setisLogin(true)
    
        }
    
      }

    function fetchHistory(userToken){

        axios.post(apiGetHistory,{
    
          token   : userToken
    
        })
        .then((res) => {

            // console.log(res.data.history)
            // console.log(res.data)
            if(res.data.history !== null){

                setUserHistory(res.data.history)
                let date = new Date(2030, 12)
                cookies.set("Mangamee_Temp_History", res.data.history, { path: "/", expires: date })  

            }
      
        })
        .catch(error => {
            // console.log(error.response)
            console.log(error)
        })
    
    
      }
      
    const homeTitle = (
        <div>
        <Grid container spacing={3} m={2} justify='center' style={{ marginTop : 125 }}>
            <Typography variant="h4" component="h4" color='textPrimary'>
                MANGAMEE
            </Typography>
        </Grid>
        </div>
    )

    const userHistoryCard = (

        <div>
        {isLogin && (

            <div>
                <Grid container style={{ marginTop : 50 }} justify='center'>
                    <Typography variant="body2" color="textSecondary" component="h6">
                            User History
                    </Typography>
                </Grid>

                <Grid 
                    container 
                    spacing={3} m={2}
                    justify='center' 
                    style={{ marginTop : 10 }} >
                        

                {userHistory.map(item =>{
                
                return(
                    <Grid item lg={2} xs={4} >
                    <Card className={classes.root} style={{ height: '100%'}}>
                        <CardActionArea>
                        <Link underline='none' component={RouterLink} to={`/${item.Lang}/${item.ID}`}>
                        <CardMedia
                            component="img"
                            alt=" "
                            height="180"
                            src={item.CoverImg}
                            title="manga title"
                        />
                        <CardContent>
                            <Typography noWrap 
                                        variant="body2" 
                                        color="textSecondary" 
                                        component="p" 
                                        className={classes.mobileText}>

                                {item.Name}
                            </Typography>
                            <Typography variant="body2" 
                                        color="textSecondary" 
                                        component="p" 
                                        className={classes.mobileText}>


                                {item.LatestRead}
                            </Typography>
                        </CardContent>
                        </Link>
                        </CardActionArea>
                        <CardActions>
                        
                            <div onClick={() => {
                                
                                let tempHistory = cookies.get("Mangamee_Temp_History");
                                // get target data
                                let mangaIDCookies = item.ID
                                let date = new Date(2030, 12)
                                // filter with mangaNameCookies

                                if(tempHistory.length === 1){

                                    cookies.remove("Mangamee_Temp_History" ,{ path: '/' })
                                    DeleteDbUser()

                                    
                            
                                }else{
                            
                                    let cookiesFilter = tempHistory.filter((item) => item.ID !== mangaIDCookies);
                                    // console.log(cookiesFilter)
                                    cookies.set("Mangamee_Temp_History", cookiesFilter, { path: "/", expires: date })
                                    UpdateDbUser(cookiesFilter)
                                    
                                    
                            
                                }
                            }}>
                            <Button size="small" 
                                    color="secondary" 
                                    className={classes.mobileText}>
                                        
                                Delete
                            </Button>
                            </div>
                        </CardActions>
                    </Card>
                    </Grid>
                )})}
                </Grid>
            </div>  
                
        )}
        </div>
    )




    return (
        <div>
            <Container>
                <MuiThemeProvider theme={theme}>
                {homeTitle}
                {userHistoryCard}
                </MuiThemeProvider>
            </Container>
            
        </div>
    )
}
