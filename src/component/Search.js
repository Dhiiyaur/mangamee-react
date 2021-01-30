import React, { useState } from 'react'
import { search } from "../endpoint";
import axios from 'axios';
import SearchField from 'react-search-field';
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
    TextField,
    Button,
    Divider

 } from '@material-ui/core'

const theme = createMuiTheme({
    typography: {
      subtitle1: {
        fontSize: 12,
      },
    },
  });


  
export default function Search() {

    const [value, setValue] = useState("")
    const [searchResult, setSearchResult] = useState([])
    
    const handleSumbit = e => {

        e.preventDefault();

        // jika ga ada value return
        if (!value) return;

        // masukin ke addTask
        console.log(value);
        // lalu set 'empty' lagi buat valuenya
        fetchData();

        setValue('');

    }

    const fetchData = () =>{
        axios.get(search, {
            params:{
                manga_title:value
            }
        })
        .then((res) =>{
            console.log(res.data);
            setSearchResult(res.data);
        })
    }

    return (
        <div>
            <Container>

                <Grid container spacing={3} m={2} justify='center' style={{ marginTop : 50 }}>
                <form onSubmit = {handleSumbit}>
                {/* <FormControl onSubmit = {handleSumbit}> */}
                    <TextField
                        variant='outlined'
                        color='primary'
                        label='Manga Title'
                        size='medium'
                        value = {value}
                        onChange = {e => setValue(e.target.value)}
                        
                    />
                    
                    <Button
                        type="submit"
                        variant='contained'
                        color='primary'
                        onClick={handleSumbit}
                    > search 
                    </Button>
                </form>
                {/* </FormControl> */}
                    {/* <SearchField 
                        placeholder='Manga Title'
                        // onEnter={onEnter}
                    /> */}
                
                </Grid>

            <Grid container spacing={3} m={2} justify='center' style={{ marginTop : 20 }}>
            <Divider /> 
            {searchResult.map(item =>{
                return(
                <Grid item lg={2} xs={4}>
                    <Link underline='none' component={RouterLink} to={`/${item.link}`}>
                    <ThemeProvider theme={theme}>
                    <Card style={{ height: '100%' }}>
                        <CardActionArea>
                        

                            <CardMedia
                                component='img' src={item.thumbnail_image}
                            />
                            <CardContent>
                            <Typography variant="subtitle1">
                                {item.name}
                            </Typography>
                            <Typography variant="subtitle1">
                                status : {item.status}
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
