import React, { useState } from 'react'
import axios from 'axios';

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

export default function Home() {

    const [userHistory, setUserHistory] = useState([])

    const getdatahistory = () =>{

        axios.post('http://127.0.0.1:8000/api/auth/',{

            email   :"aoyyamako@gmail.com",
            passowrd: "dhiiyaur1234"
        })
        .then((res) => {
            console.log(res.data)
            setUserHistory(res.data.history)
        })

    }

    return (
        <div>
            <Container>
                <Grid container spacing={3} m={2} justify='center' style={{ marginTop : 50 }}>
                <Typography >
                    Mangamee
                </Typography>
                </Grid>
            </Container>
            
        </div>
    )
}
