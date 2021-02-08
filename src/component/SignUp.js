import React, { useState} from 'react'
import axios from 'axios';
import { apiRegister } from "../endpoint";

import { 
    Avatar,
    Button,
    CssBaseline,
    Container,
    TextField,
    Typography,

} from "@material-ui/core";

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import {MuiThemeProvider, createMuiTheme } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

export default function SignUp() {

    const classes = useStyles();
    const { handleSubmit, control } = useForm();
    const [formError, setformError] = useState(false)
    const [registerError, setRegisterError] = useState(false)

    const theme = createMuiTheme({
        palette:{

            type:'dark'
        }

    })
    const onSubmitRegister = data => {

        // console.log(data)
        if(data.password1 != data.password2){
        
            setformError(true)
        }

        axios.post(apiRegister,{

            username : data.username,
            email    : data.email,
            password : data.password1
        })

        .then((res) => {
            // console.log(res.data)
            window.location.href='/auth/signin/'

        })

        .catch(error => {
            // console.log(error.response)
            setRegisterError(true)
        })
    } 

    return (
        <div>
            <MuiThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs" style={{ marginTop : 120 }}>
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    Sign Up
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit(onSubmitRegister)}>
                    <Controller
                        name='username'
                        as={
                            <TextField
                                variant="filled"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="User Name"
                                name="username"
                                // autoComplete="username"
                                autoFocus
                            />
                    }

                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Required'
                        }}

                    />
                    <Controller
                        name='email'
                        as={

                        <TextField
                            variant="filled"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                    
                    }
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Required'
                        }}
                    />

                    {registerError && (
                        <Typography color='error'>
                            Email already exist
                        </Typography>
                    )}

                    <Controller
                        name='password1'
                        as={

                        <TextField
                            variant="filled"
                            margin="normal"
                            required
                            fullWidth
                            name="password1"
                            label="password"
                            type="password"
                            id="password1"
                            
                        />
                    }
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Required'
                        }}
                    />
                    <Controller
                        name='password2'
                        as={

                        <TextField
                            variant="filled"
                            margin="normal"
                            required
                            fullWidth
                            name="password2"
                            label="confirm-password"
                            type="password"
                            id="password2"
                            
                        />
                    }
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Required',
                            
                        }}
                    />

                    {formError && (
                    <Typography color='error'>
                        Password didnt  match
                    </Typography>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>

                    </form>
                </div>
                </Container>
                </MuiThemeProvider>    
        </div>
    )
}
