import React, { useState } from 'react'
import { apiSearch } from "../endpoint";
import axios from 'axios';
import { Link as RouterLink } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
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
    TextField,
    CircularProgress,
    CssBaseline,
    Paper,
    Box

 } from '@material-ui/core'

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { useForm, Controller } from 'react-hook-form';

import {MuiThemeProvider, createMuiTheme } from '@material-ui/core'

const cookies = new Cookies()
const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(0),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    root: {
        maxWidth: 345,
    },
    mobileText:{

        [theme.breakpoints.down("xs")]: {
            fontSize: 12
        }
    },
    buttonColor: {
        "&.Mui-selected": {
          backgroundColor: "red"
        }
      }
  }));
  
export default function Search() {

    const classes = useStyles();
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [notFound, setnotFound] = useState(false)
    const [langOption, setLangOption] = useState('EN');
    const { handleSubmit, control, errors: fieldsErrors, reset } = useForm();

    const theme = createMuiTheme({
        palette:{

            type:'dark'
        }

    })

    function fetchData(title, langOption) {
        
        axios.get(apiSearch, {
            params:{

                lang:langOption,
                manga_title:title
            }
        })
        .then((res) =>{
            console.log(res.data.length);
            if(res.data.length !== 0){
                setSearchResult(res.data);
                setLoading(false)
            }else{
                setnotFound(true)
                setLoading(false)
            }

        })
    }

    const handleLangSelect = (event, newLang) => {
        setLangOption(newLang);
    };

    const onSubmitLogin = data => {

        console.log(data)
        console.log(langOption)
        setLoading(true)
        setnotFound(false)
        fetchData(data.title_manga, langOption);
        
    }


    return (
        <div>
            <Container>
                <MuiThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs" style={{ marginTop : 120 }}>
                <CssBaseline />
                <div className={classes.paper}>
                <form className={classes.form} onSubmit={handleSubmit(onSubmitLogin)}>
                    <Controller
                        name='title_manga'
                        as={

                            <TextField
                            variant="filled"
                            margin="normal"
                            required
                            fullWidth
                            id="title_manga"
                            label="Manga Title"
                            name="title_manga"
                            autoFocus      
                        />
                    }
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Required'
                        }}

                    />

                <ToggleButtonGroup
                        value={langOption}
                        exclusive
                        onChange={handleLangSelect}
                        aria-label="lang selected"
                    >
                    <ToggleButton value="EN" aria-label="left aligned" className={classes.buttonColor}>
                        ENG
                    </ToggleButton>
                    <ToggleButton value="ID" aria-label="centered" className={classes.buttonColor}>
                        IND
                    </ToggleButton>
                    </ToggleButtonGroup>

                </form>
                </div>
                </Container>

            
                {loading && (

                    <Grid container spacing={3} m={2} justify='center' style={{ marginTop : 50 }}>
                    <CircularProgress color="secondary"/>
                    </Grid>

                )}

                {!loading && (

                    <div>
                    {!notFound &&(

                        <Grid container spacing={3} m={2} justify='center' style={{ marginTop : 50 }}>
                        {searchResult.map(item =>{
                            return(
                            
                            <Grid item lg={2} xs={4}>
                                    <Card className={classes.root} style={{ height: '100%' }}>
                                        <div onClick={() => {
                                        
                                            let MangeName = item.name
                                            let date = new Date(2030, 12)
                                            cookies.set("Mangamee_Temp_Name", MangeName, { path: "/", expires: date })
                                    
                                        }}>
                                        <CardActionArea>
                                        <Link underline='none' component={RouterLink} to={`/${langOption}/${item.link}`}>
                                        <CardMedia
                                            component="img"
                                            alt=" "
                                            height="180"
                                            src={item.thumbnail_image}
                                            title="manga title"
                                        />
                                        <CardContent>
                                            <Typography variant="body2" color="textPrimary" component="p" className={classes.mobileText}>
                                                {item.name}
                                            </Typography>
                                            <br/>
                                            <Typography variant="body2" color="textSecondary" component="p" className={classes.mobileText}>
                                                {item.latest_chapter} chapter - {item.status}
                                            </Typography>
                                        </CardContent>
                                        </Link>
                                        </CardActionArea>
                                        </div>
                                    </Card>
                            </Grid> 
                        )})}
                        </Grid>
                    )}
                    
                    {notFound &&(
                        <Grid container spacing={3} m={2} justify='center' style={{ marginTop : 50 }}>
                        <Typography variant="h6" color="textPrimary" component="h6">
                            Not Found
                        </Typography>
                        </Grid>

                    )}
                    </div>
                )}
            </MuiThemeProvider>
            </Container>
        </div>
    )
}


