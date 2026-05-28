// #9c27b0
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar } from '@mui/material';


const defaultTheme = createTheme();

export default function Authentication() {

    

    const [username, setUsername] = React.useState();
    const [password, setPassword] = React.useState();
    const [name, setName] = React.useState();
    const [error, setError] = React.useState();
    const [message, setMessage] = React.useState();


    const [formState, setFormState] = React.useState(0);

    const [open, setOpen] = React.useState(false);
    const { handleRegister, handleLogin } = React.useContext(AuthContext);
    let handleAuth=async()=>{
        try {
            if(formState===0){
                let result=await handleLogin(username,password);
                console.log(result);
                setError("");
                setMessage(result);
                setOpen(true);
            }
            if(formState===1){
                let result= await handleRegister(name,username,password);
                console.log(result);
                setUsername("");
                setMessage(result);
                setOpen(true);
                setError("");
                setFormState(0);
                setPassword("");
            }
        } catch (err) {
            let message=(err.response.data.message);
            console.log(err.response.data.message);
            setError(message);
        }
    }


    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline/>
            <Grid container sx={{ height: "100vh" }}>
                <Grid size={7}>
                    <Box sx={
                        { 
                        height:"100vh",
                        backgroundImage:'url(/signin.png)',
                        backgroundRepeat:"no-repeat",
                        backgroundSize:"cover",
                        backgroundPosition:"center"}}
                    />
                </Grid>   
                <Grid size={5}>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m:1, bgcolor: 'orange' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button variant={formState === 0 ? "contained" : ""} onClick={()=>setFormState(0)}
                             sx={{
                                ...(formState === 0 && {
                                backgroundColor: "orange",   // violet
                                color: "#fff",
                                "&:hover": {
                                    backgroundColor: "#ecb62d",
                                },
                                }),
                            }}>
                                sign in 
                            </Button>
                            <Button variant={formState === 1 ? "contained" : ""} onClick={()=>setFormState(1)}
                            sx={{
                                ...(formState === 1 && {
                                backgroundColor: "orange",   // violet
                                color: "#fff",
                                "&:hover": {
                                    backgroundColor: "#ecb62d",
                                },
                                }),
                            }}>
                            sign up</Button>
                        </Box>
                        
                        <Box component="form" noValidate sx={{mt :1, width:'100%'}}>
                            {formState === 1? 
                            <TextField
                                margin='normal'
                                required 
                                fullWidth
                                id="username" 
                                value={name}
                                label="Fullname" 
                                variant="outlined"
                                onChange={(e)=> setName(e.target.value)} />
                            : <></>}

                        
                            <TextField
                                margin='normal'
                                required 
                                fullWidth
                                id="username"
                                value={username} 
                                label="Username" 
                                variant="outlined" 
                                onChange={(e)=>setUsername(e.target.value)}/>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name='password'
                                value={password}
                                label="Password"
                                type="password"
                                variant="outlined"
                                onChange={(e)=>setPassword(e.target.value)}
                            /> 
                            <p style={{color:"red"}}>{error}</p>
                            <Button 
                                variant='contained'
                                fullWidth
                                onClick={handleAuth}
                            >
                                {formState===0 ?"LOGIN" : "SIGNUP"}    
                            </Button>  

                        </Box>




                    </Box>
                     

                </Grid>
            </Grid>         
                        
                    <Snackbar
                        open={open}
                        autoHideDuration={4000}
                        message={message}  />
               
                
             
        </ThemeProvider>
        
        // <ThemeProvider theme={defaultTheme}>
        //     <Grid container component="main" sx={{ height: '100vh' ,width:'100vw'}}>
        //         <CssBaseline />
        //         <Grid
        //             item
        //             xs={false}
        //             sm={4}
        //             md={7}
        //             sx={{
        //                 // 1. Fallback color to verify the Grid exists
        //                 backgroundColor: '#cccccc', 
        //                 backgroundImage: 'url(https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&w=2070)',
        //                 backgroundRepeat: 'no-repeat',
        //                 backgroundSize: 'cover',
        //                 backgroundPosition: 'center',
        //                 // 2. Ensure it actually takes up space
        //                 display: { xs: 'none', sm: 'block' }, 
        //                 height: '100vh',
        //             }}
        //         />
                
        //         <Grid item xs={12}  md={6} component={Paper} elevation={6} square>
        //             <Box
        //                 sx={{
        //                     my: 8,
        //                     mx: 4,
        //                     display: 'flex',
        //                     flexDirection: 'column',
        //                     alignItems: 'center',
        //                 }}
        //             >
        //                 <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        //                     <LockOutlinedIcon />
        //                 </Avatar>


        //                 <div>
        //                     <Button variant={formState === 0 ? "contained" : "outlined"} onClick={() => { setFormState(0) }}>
        //                         Sign In
        //                     </Button>
        //                     <Button variant={formState === 1 ? "contained" : ""} onClick={() => { setFormState(1) }}>
        //                         Sign Up
        //                     </Button>
        //                 </div>

        //                 <Box component="form" noValidate sx={{ mt: 1 }}>
        //                     {formState === 1 ? <TextField
        //                         margin="normal"
        //                         required
        //                         fullWidth
        //                         id="username"
        //                         label="Full Name"
        //                         name="username"
        //                         value={name}
        //                         autoFocus
        //                         onChange={(e) => setName(e.target.value)}
        //                     /> : <></>}

        //                     <TextField
        //                         margin="normal"
        //                         required
        //                         fullWidth
        //                         id="username"
        //                         label="Username"
        //                         name="username"
        //                         value={username}
        //                         autoFocus
        //                         onChange={(e) => setUsername(e.target.value)}

        //                     />
        //                     <TextField
        //                         margin="normal"
        //                         required
        //                         fullWidth
        //                         name="password"
        //                         label="Password"
        //                         value={password}
        //                         type="password"
        //                         onChange={(e) => setPassword(e.target.value)}

        //                         id="password"
        //                     />

        //                     <p style={{ color: "red" }}>{error}</p>

        //                     <Button
        //                         type="button"
        //                         fullWidth
        //                         variant="contained"
        //                         sx={{ mt: 3, mb: 2 }}
                                
        //                     >
        //                         SIGN IN
        //                     </Button>

        //                 </Box>
        //             </Box>
        //         </Grid>
        //     </Grid>

        //     

        // </ThemeProvider>
    );
}