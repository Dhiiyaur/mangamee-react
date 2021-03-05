import React, { useState, useEffect } from 'react'
import { apiManga, apiUpdateHistory, apiPage } from "../endpoint";
import axios from 'axios'
import { useParams } from "react-router-dom"
import Cookies from 'universal-cookie';
import { makeStyles } from '@material-ui/core/styles';
import LazyLoad from "react-lazyload";

import {
    Grid,
    Container,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
    ListItem,
    List,
    ListItemText,
    Divider,
    CircularProgress,
    Button,
    Dialog,
    AppBar,
    Toolbar,
    TextField

 } from '@material-ui/core'


import {MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


const cookies = new Cookies()
const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
      [theme.breakpoints.down("xs")]: {
        fontSize: 14
        }
    },
    mobileText:{
        [theme.breakpoints.down("xs")]: {
            fontSize: 12
        }
    },
    input: {
        '& label.Mui-focused': {
            color: '#FFFFFF'
          },
    },
    notchedOutline: {
        borderColor: "#FFFFFF !important"
      }
  }));

export default function MangaChapter() {


    const classes = useStyles();
    const { lang, manga_tile } = useParams()
    const [loading, setLoading] = useState(true)
    const [chapter, setChapter] = useState([])
    const [info, setInfo] = useState({
        
        cover_img   : null,
        summary     : null
    })
    
    const theme = createMuiTheme({
        palette:{

            type:'dark'
        }

    })

    // fillter function
    const [fillterChapter, setFillterChapter] = useState("")

    const handleFilterChapter = (e) => {
        setFillterChapter(e.target.value);
    };

    function FetchManga() {
        
        axios.get(apiManga, {
            params:{

                lang:lang,
                manga_title:manga_tile
            }
        })

        .then(res =>{
        
                // console.log(res.data.chapters)
                // console.log(res.data.cover_img)
                // console.log(res.data.summary)
                setChapter(res.data.chapters)
                setInfo({
                    cover_img:res.data.cover_img,
                    summary:res.data.summary,
                    title:res.title    
                })
                
                CreateOrUpdate(res.data.cover_img)
                // console.log(res.data.chapters)
                setLoading(false)
                
        })

    }

    function UpdateDbUser(userHistory) {

        let token = cookies.get("Mangamee_Login_Token");
        
        axios.post(apiUpdateHistory,{

            token   : token,
            history : userHistory
            
        })
    }

    function CreateOrUpdate(coverImg) {

        let userToken = cookies.get("Mangamee_Login_Token");
        let tempHistory = cookies.get("Mangamee_Temp_History");

        // console.log(userToken)

        if(userToken !== undefined){


            if(tempHistory === undefined){

                CreateCookies(coverImg)

            }else{

                UpdateCookies(tempHistory, coverImg)
                   
            }    
        }
    }


    function CreateCookies(coverImg){

        let tempName = cookies.get("Mangamee_Temp_Name");

        let userHistory = [
            {
                ID : manga_tile,
                Lang : lang,
                Name : tempName,
                CoverImg : coverImg,
                LatestRead : '-'
            }
        ]
        
        let date = new Date(2030, 12)
        cookies.set("Mangamee_Temp_History", userHistory, { path: "/", expires: date })
        UpdateDbUser(userHistory)

    }

    function UpdateCookies(tempHistory, coverImg) {

        let userHistory = tempHistory
        let tempName = cookies.get("Mangamee_Temp_Name");
        // checking manga is input or not if, ga da, tambahin data,if ada, update

        let checkName = manga_tile
        let findName = userHistory.find((item) =>{
            return item.ID === checkName
        })

        // console.log(userHistory)

        if(findName === undefined){
            
            userHistory.push(
                
                {
                    ID : manga_tile,
                    Lang : lang,
                    Name : tempName,
                    CoverImg : coverImg,
                    LatestRead : '-'

                }
            )

            let date = new Date(2030, 12)
            cookies.set("Mangamee_Temp_History", userHistory, { path: "/", expires: date })
            UpdateDbUser(userHistory)
        }
    }


    // manga func  ---------------------------------------------------------------------------------


    const [open, setOpen] = useState({

        mangaIndex : null,
        mangaData : [],
        isModalOpen : false
    });

    const [tempMangaID, settempMangaID] = useState(0)
    const [loadingManga, setloadingManga] = useState(true)
    
    const fecthManga = (id) => {

        axios.get(apiPage, {
            params:{

                lang:lang,
                manga_title:manga_tile,
                chapter:chapter[id].link
            }
        })
        .then(res =>{

                // console.log(res.data)
                setOpen({
                    mangaIndex : id,
                    mangaData : res.data,
                    isModalOpen : true
                    
                })
        })
    }

    function getIndex(chapter_name) {

        return chapter.findIndex(item => item.link === chapter_name);
    }

    function updateCookiesChapter(tempID){

        // get data
        let MangaID = manga_tile
        let lastChapter = chapter[tempID].chapter_name
        let TempHistory = cookies.get("Mangamee_Temp_History");


        // update chapter .map cookies
        if(TempHistory !== undefined){

            let newChapter = TempHistory.map(obj =>
                obj.ID === MangaID ? { ...obj, LatestRead: lastChapter } : obj
            );
        
            // jsonvalue
            let date = new Date(2030, 12)
            cookies.set("Mangamee_Temp_History", newChapter, { path: "/", expires: date })
            UpdateDbUser(newChapter)

        }

    }

    const handleImageError = (e) => {
        e.target.onerror = null;
        e.target.style.display = 'none'
        e.target.src = " "
    }

    const handleClickOpen = (link) => {

        let tempID = getIndex(link)
        settempMangaID(tempID)
        fecthManga(tempID)
        updateCookiesChapter(tempID)
        setloadingManga(false)
    };
  
    const handleClose = () => {

      setOpen({

            mangaIndex : null,
            isModalOpen : false,
            mangaData : [],
      });
    };

    const handlePrev = () => {

        setloadingManga(true)
        let id = tempMangaID
        // check with length chapter
        if(id !== (chapter.length -1)){

            setOpen({

                mangaIndex : null,
                isModalOpen : true,
                mangaData : [],
            })
            id = id + 1
            settempMangaID(id)
            // console.log(id)
            fecthManga(id)
            updateCookiesChapter(id)
            
        }
        setloadingManga(false)
    }

    const handleNext = () => {

        setloadingManga(true)

        let id = tempMangaID
        if(id !== 0){

            setOpen({

                mangaIndex : null,
                isModalOpen : true,
                mangaData : [],
            })

            id = id - 1
            settempMangaID(id)
            // console.log(id)
            fecthManga(id)
            updateCookiesChapter(id)

        }
        setloadingManga(false)
    }


    useEffect(() => {

        FetchManga()
       

    }, [])


    return (
        <div>
            <MuiThemeProvider theme={theme}>
            <Container>

            {loading ? (
                <Grid container spacing={3} m={2} justify='center' style={{ marginTop : 150 }}>
                    <CircularProgress color="secondary"/>
                </Grid>

            ):(

                <Grid container spacing={3} m={2} justify='center' style={{ marginTop : 100 }}>
                    <Grid item lg={8} xs={12}>
                    <Card style={{ height: '100%' }}>
                        <CardActionArea>
                        <CardMedia
                            component="img"
                            alt=" "
                            // height='60%'
                            src={info.cover_img}
                            title="manga title"
                        />
                        <CardContent>
                            <Typography variant="h6" component="h6">
                                 summary
                            </Typography>
                            <br />
                            <Typography variant="body2" color="textSecondary" component="p">
                                {info.summary}
                            </Typography>
                            <br />
                            <Divider />
                            <br />
                            <form>
                            <TextField id="outlined-basic" 
                                       label="Search Chapter" 
                                       variant="outlined" 
                                       fullWidth
                                       onChange={handleFilterChapter}
                                       className={classes.input}
                                       InputProps={{
                                        classes: {
                                          notchedOutline: classes.notchedOutline
                                        }
                                      }}/>

                            </form>
                            <br />
                            <List>
                                {chapter.filter((item) =>{
                                    if (fillterChapter == "") {
                                        return item
                                    } else if (
                                        item.chapter_name.toLowerCase().includes(fillterChapter.toLocaleLowerCase())
                                    ) {
                                        return item
                                    }
                                }).map((item, index) => (
                                        <ListItem button>
                                            <ListItemText style={{ color: '#FFFFFF' }} 
                                                        primary={item.chapter_name} 
                                                        onClick={e => handleClickOpen(item.link)}/>
                                        </ListItem>
                                ))}

                                {/* {chapter.map((item, index) => (
                                        <ListItem button>
                                            <ListItemText style={{ color: '#FFFFFF' }} 
                                                        primary={item.chapter_name} 
                                                        onClick={e => handleClickOpen(index)}/>
                                        </ListItem>
                                ))} */}

                            </List>   
                        </CardContent>
                        </CardActionArea>
                    </Card>
                    
                    <Dialog fullScreen open={open.isModalOpen} onClose={handleClose}>
  
                        <AppBar style={{ background: '#2E3B55' }}>
                        <Toolbar variant="dense">
                            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                            </IconButton>
                            <Typography noWrap variant="h6" className={classes.title}>
                                {chapter[tempMangaID].chapter_name}
                            </Typography>
                            <Button autoFocus color="inherit" onClick={e => handlePrev()} className={classes.mobileText}>
                            Prev
                            </Button>
                            <Button autoFocus color="inherit" onClick={e => handleNext()} className={classes.mobileText}>
                            Next
                            </Button>
                        </Toolbar>
                        </AppBar>

                            {loadingManga ? (
                                <Grid container spacing={3} m={2} justify='center' style={{ marginTop : 200 }}>
                                    <CircularProgress color="secondary"/>
                                </Grid>
                            ) : (

                                <Grid container spacing={3} m={2} justify='center' style={{ marginTop : 50 }}>
                                <Grid item lg={7} xs={12}>
                                    {open.mangaData.map(item =>{
                                        return(
                                        <LazyLoad>
                                        <CardMedia component='img' src={item.image} onError={handleImageError}/>
                                        </LazyLoad>
                                    )})}
                                    
                                </Grid>
                                </Grid>    

                            )  }

                    </Dialog>
                    </Grid>
                </Grid>
            )}
            </Container>
            </MuiThemeProvider>
        </div>
    )
}






