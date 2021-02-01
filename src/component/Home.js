import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { apiHistory } from "../endpoint";

import {
    Grid,
    Container,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
    Link,
    TextField,
    Button,
    Divider,
    CircularProgress

 } from '@material-ui/core'

import { Link as RouterLink } from "react-router-dom"
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Cookies from 'universal-cookie';

const cookies = new Cookies()

const theme = createMuiTheme({
    typography: {
      subtitle1: {
        fontSize: 12,
      },
    },
  });


export default function Home() {

    const [userHistory, setUserHistory] = useState([])
    const [isLogin, setisLogin] = useState(false)
    const [isnull, setisnull] = useState(false)

    useEffect(() => {

        tokenCheck();

    }, [])

    function tokenCheck(){

        let userToken = cookies.get("Mangamee_Login_Token");
        // console.log(cookies.get("Mangamee_Login_Token"))
    
        if(userToken != undefined){
    
            fetchHistory();
            setisLogin(true)
    
        }
    
      }

    function fetchHistory(){

        axios.post(apiHistory,{
    
          token   : cookies.get("Mangamee_Login_Token")
    
        })
        .then((res) => {
        //   console.log(res.data.history)
          if(res.data.history != null){

            setUserHistory(res.data.history)
          }
          
        })
    
    
      }

    const handleImageError = (e) => {
        e.target.onerror = null;
        // e.target.style.display = 'none'
        e.target.src = ""
    }

    const userHistoryCard = (

        <div>
        {isLogin && (
            

            <Grid container spacing={3} m={2} justify='center' style={{ marginTop : 20 }}>

            {userHistory.map(item =>{
                return(
                <Grid item lg={2} xs={4}>
                    {/* <Link underline='none' component={RouterLink} to={`/${langvalue}/${item.link}`}> */}
                    <ThemeProvider theme={theme}>
                    <Card style={{ height: '100%' }} key={item.id}>
                        <CardActionArea>
                        

                            <CardMedia
                                component='img' 
                                src={item.cover_img}
                                onError={handleImageError}
                            />
                            <CardContent>
                            <Typography variant="subtitle1">
                                {item.name}
                            </Typography>
                            <Typography variant="subtitle1">
                                Last read {item.latest} 
                            </Typography>
                            </CardContent>

                        </CardActionArea>
                    </Card>
                    </ThemeProvider>
                    {/* </Link> */}

                </Grid>

            )})}
            </Grid>
        )}
        </div>
    )

    return (
        <div>
            <Container>
                <Grid container spacing={3} m={2} justify='center' style={{ marginTop : 50 }}>
                <Typography >
                    Mangamee
                </Typography>
                </Grid>
                {userHistoryCard}
            </Container>
            
        </div>
    )
}
