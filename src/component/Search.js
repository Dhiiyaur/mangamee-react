import React, { useState } from 'react'
import { apiSearch } from "../endpoint";
import axios from 'axios';
import { Link as RouterLink } from "react-router-dom"
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
// import { makeStyles } from '@material-ui/core/styles';

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

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';


// const useStyles = makeStyles(theme => ({
//     paperRoot: {
//       backgroundColor: 'red',
//       height: 45,
//       width: 50

//     },
//     searchIconTheme: {
//         '& svg': {
//             height: 45,
//             width: 50
//         }
//       }
// }));

const theme = createMuiTheme({
    typography: {
      subtitle1: {
        fontSize: 12,
      },
    },
  });


  
export default function Search() {

    const [value, setValue] = useState('')
    const [langvalue, setLangvalue] = useState('ENG')
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    // const classes = useStyles();

    const handleImageError = (e) => {
        e.target.onerror = null;
        // e.target.style.display = 'none'
        e.target.src = ""
    }

    const handleLang = (event) => {
        setLangvalue(event.target.value);
      };


    const handleSumbit = e => {

        e.preventDefault();

        // jika ga ada value return
        if (!value) return;

        // masukin ke addTask
        // console.log(value);
        // console.log(langvalue)
        // lalu set 'empty' lagi buat valuenya
        setSearchResult([])
        setLoading(true)
        fetchData();

        setValue('');

    }

    const fetchData = () =>{
        axios.get(apiSearch, {
            params:{

                lang:langvalue,
                manga_title:value
            }
        })
        .then((res) =>{
            // console.log(res.data);
            setSearchResult(res.data);
            setLoading(false)
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
                    {/* <br/> */}
                    <Button
        
                        type="submit"
                        variant='contained'
                        onClick={handleSumbit} 
                    >
                    <SearchIcon fontSize='large'/>
                    </Button>
                    <br/>
                    <RadioGroup value={langvalue} style={{display:'initial'}} onChange={handleLang}> 
                        <FormControlLabel value="EN" control={<Radio />} label="ENG" />
                        <FormControlLabel value="ID" control={<Radio />} label="IND" />
                    </RadioGroup>
                </form>
                {/* </FormControl> */}
                    {/* <SearchField 
                        placeholder='Manga Title'
                        // onEnter={onEnter}
                    /> */}
                
                </Grid>



            <Grid container spacing={3} m={2} justify='center' style={{ marginTop : 20 }}>

            <Grid container spacing={3} m={2} justify='center' style={{ marginTop : 80 }}>
                {loading && (
                    <CircularProgress color="secondary"/>
                )}
            </Grid>

            <Divider /> 
            {searchResult.map(item =>{
                return(
                <Grid item lg={2} xs={4}>
                    <Link underline='none' component={RouterLink} to={`/${langvalue}/${item.link}`}>
                    <ThemeProvider theme={theme}>
                    <Card style={{ height: '100%' }} key={item.id}>
                        <CardActionArea>
                        

                            <CardMedia
                                component='img' 
                                src={item.thumbnail_image}
                                onError={handleImageError}
                            />
                            <CardContent>
                            <Typography variant="subtitle1">
                                {item.name}
                            </Typography>
                            <Typography variant="subtitle1">
                               {item.latest_chapter} chapter - {item.status}
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
