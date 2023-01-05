import React, { useState } from "react";
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import InputField from "./InputField";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { signIn, signUp } from '../../actions/auth'

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true);
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
    const navigate = useNavigate()
    const classes = useStyles();
    const dispatch = useDispatch();
    const switchMode = () => {
        setIsSignUp(!isSignUp)
        setShowPassword(false)
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isSignUp) {
            dispatch(signUp(formData, navigate))
        }
        else {
            dispatch(signIn(formData, navigate))

        }

    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }




    return <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignUp && (
                            <>
                                <InputField name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <InputField name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )
                    }
                    <InputField name="email" label="Email Address" type="email" handleChange={handleChange} />
                    <InputField name="password" label="Password" type={showPassword ? "text" : "password"} handleChange={handleChange} handleShowPassword={handleShowPassword} />
                    {isSignUp && <InputField name="confirmPassword" label="Repeat Password" type={showPassword ? "text" : "password"} handleChange={handleChange} />}

                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>{isSignUp ? 'Sign Up' : 'Sign In'}</Button>

                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Button onClick={switchMode}>
                            {isSignUp ? "Already have an Account ? Sign In" : "Don't have an account? Create"}
                        </Button>
                    </Grid>

                </Grid>
            </form>
        </Paper>
    </Container>;
};

export default Auth;
