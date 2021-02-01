import React from 'react'
import axios from 'axios';

import { 
    Avatar,
    Button,
    CssBaseline,
    Container,
    TextField,
    Link,
    Grid,
    Typography,

} from "@material-ui/core";

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import Cookies from 'universal-cookie';


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
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

export default function SignIn() {

    const classes = useStyles();
    const { handleSubmit, control, errors: fieldsErrors, reset } = useForm();
    const onSubmitLogin = data => {

        console.log(data['email'])
        // console.log(data['password'])
        axios.post('http://127.0.0.1:8000/api/auth/',{

            email   : data['email'],
            passowrd: data['password']
        })
        .then((res) => {
            console.log(res.data)
            
        })

    }
    
    return (
        <div>
            
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Sign in
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit(onSubmitLogin)}>

                <Controller
                    name='email'
                    as={

                        <TextField
                        variant="outlined"
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

                <Controller
                    name='password'
                    as={

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    }

                    control={control}
                    defaultValue=""
                    rules={{
                        required: 'Required'
                      }}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    
                >
                    Sign In
                </Button>

                <Grid container>
                    <Grid item>
                    <Link href="/auth/signup" variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                    </Grid>
                </Grid>
                </form>
            </div>
            </Container>        
        </div>
    )
}

