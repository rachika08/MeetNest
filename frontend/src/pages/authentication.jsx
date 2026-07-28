
// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { AuthContext } from '../contexts/AuthContext';
// import { Snackbar } from '@mui/material';
// import "../App.css";

// const theme = createTheme({
//   palette: {
//     primary: { main: '#F97316' },
//     secondary: { main: '#FBBF24' },
//   },
//   typography: {
//     fontFamily: "'DM Sans', sans-serif",
//   },
//   shape: { borderRadius: 12 },
// });

// export default function Authentication() {
//   const [username, setUsername] = React.useState();
//   const [password, setPassword] = React.useState();
//   const [name, setName] = React.useState();
//   const [error, setError] = React.useState();
//   const [message, setMessage] = React.useState();
//   const [formState, setFormState] = React.useState(0);
//   const [open, setOpen] = React.useState(false);
//   const { handleRegister, handleLogin } = React.useContext(AuthContext);

//   // ── LOGIC UNTOUCHED ──
//   let handleAuth = async () => {
//     try {
//       if (formState === 0) {
//         let result = await handleLogin(username, password);
//         setError("");
//         setMessage(result);
//         setOpen(true);
//       }
//       if (formState === 1) {
//         let result = await handleRegister(name, username, password);
//         setUsername("");
//         setMessage(result);
//         setOpen(true);
//         setError("");
//         setFormState(0);
//         setPassword("");
//       }
//     } catch (err) {
//       let message = err.response.data.message;
//       setError(message);
//     }
//   };

//   const inputSx = {
//     '& .MuiOutlinedInput-root': {
//       borderRadius: '12px',
//       background: '#FFFBEB',
//       '&:hover fieldset': { borderColor: '#FBBF24' },
//       '&.Mui-focused fieldset': { borderColor: '#F97316' },
//     },
//     '& label.Mui-focused': { color: '#F97316' },
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Grid container sx={{ height: '100vh' }}>

//         {/* ── LEFT PANEL ── */}
//         <Grid size={7}
//           sx={{
//             display: { xs: 'none', md: 'flex' },
//             flexDirection: 'column',
//             alignItems: 'center',
//             justifyContent: 'center',
//             background: 'linear-gradient(150deg, #FEF3C7 0%, #FDE68A 50%, #FBBF24 100%)',
//             position: 'relative',
//             overflow: 'hidden',
//           }}
//         >
//           {/* Decorative circles */}
//           <Box sx={{
//             position: 'absolute', top: '-10%', right: '-10%',
//             width: 400, height: 400, borderRadius: '50%',
//             background: 'rgba(249,115,22,0.12)'
//           }} />
//           <Box sx={{
//             position: 'absolute', bottom: '-8%', left: '-8%',
//             width: 300, height: 300, borderRadius: '50%',
//             background: 'rgba(251,191,36,0.2)'
//           }} />

//           <Box sx={{ textAlign: 'center', zIndex: 1, px: 4 }}>
//             <Box sx={{
//               width: 72, height: 72, borderRadius: '50%',
//               background: 'rgba(255,255,255,0.7)',
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//               margin: '0 auto 1.5rem',
//               boxShadow: '0 4px 20px rgba(249,115,22,0.2)',
//             }}>
//               <span style={{ fontSize: '2rem' }}>🎥</span>
//             </Box>
//             <Box sx={{
//               fontFamily: "'Sora', sans-serif",
//               fontSize: '2.4rem',
//               fontWeight: 700,
//               color: '#292524',
//               letterSpacing: '-0.03em',
//               lineHeight: 1.2,
//               mb: 1.5,
//             }}>
//               Meet<span style={{ color: '#EA580C' }}>Nest</span>
//             </Box>
//             <Box sx={{ color: '#57534E', fontSize: '1rem', maxWidth: 320, lineHeight: 1.6 }}>
//               HD video calls, seamless collaboration, and crystal-clear audio — all in one place.
//             </Box>
//             <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 3 }}>
//               {['🔒 Secure', '⚡ Fast', '🌍 Global'].map(feat => (
//                 <Box key={feat} sx={{
//                   background: 'rgba(255,255,255,0.6)',
//                   borderRadius: '50px',
//                   px: 1.5, py: 0.5,
//                   fontSize: '0.8rem',
//                   fontWeight: 600,
//                   color: '#57534E',
//                   border: '1px solid rgba(255,255,255,0.8)',
//                 }}>
//                   {feat}
//                 </Box>
//               ))}
//             </Box>
//           </Box>
//         </Grid>

//         {/* ── RIGHT PANEL ── */}
//         <Grid size={5}
//           sx={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             background: '#FFFBEB',
//           }}
//         >
//           <Box sx={{ width: '100%', maxWidth: 400, px: 4 }}>

//             {/* Logo on mobile */}
//             <Box sx={{
//               fontFamily: "'Sora', sans-serif",
//               fontSize: '1.6rem',
//               fontWeight: 700,
//               color: '#292524',
//               mb: 3,
//               display: { xs: 'block', md: 'none' }
//             }}>
//               Meet<span style={{ color: '#EA580C' }}>Nest</span>
//             </Box>

//             {/* Header */}
//             <Box sx={{ mb: 3 }}>
//               <Box sx={{
//                 fontFamily: "'Sora', sans-serif",
//                 fontSize: '1.7rem',
//                 fontWeight: 700,
//                 color: '#292524',
//                 letterSpacing: '-0.02em',
//                 mb: 0.5,
//               }}>
//                 {formState === 0 ? 'Welcome back 👋' : 'Create account ✨'}
//               </Box>
//               <Box sx={{ fontSize: '0.9rem', color: '#78716C' }}>
//                 {formState === 0
//                   ? 'Sign in to continue your meetings'
//                   : 'Join MeetNest and start connecting'}
//               </Box>
//             </Box>

//             {/* Toggle tabs */}
//             <Box sx={{
//               display: 'flex',
//               background: '#FEF3C7',
//               borderRadius: '12px',
//               p: '4px',
//               mb: 3,
//             }}>
//               {['Sign In', 'Sign Up'].map((label, idx) => (
//                 <Button
//                   key={label}
//                   fullWidth
//                   onClick={() => setFormState(idx)}
//                   sx={{
//                     borderRadius: '10px',
//                     textTransform: 'none',
//                     fontWeight: 600,
//                     fontSize: '0.9rem',
//                     py: 0.8,
//                     transition: 'all 0.2s',
//                     background: formState === idx ? 'white' : 'transparent',
//                     color: formState === idx ? '#F97316' : '#78716C',
//                     boxShadow: formState === idx ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
//                     '&:hover': {
//                       background: formState === idx ? 'white' : 'rgba(255,255,255,0.5)',
//                     }
//                   }}
//                 >
//                   {label}
//                 </Button>
//               ))}
//             </Box>

//             {/* Form fields */}
//             <Box component="form" noValidate>
//               {formState === 1 && (
//                 <TextField
//                   margin="normal"
//                   required
//                   fullWidth
//                   label="Full Name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   sx={inputSx}
//                 />
//               )}
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 label="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 sx={inputSx}
//               />
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 label="Password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 sx={inputSx}
//               />

//               {error && (
//                 <Box sx={{
//                   background: '#FEE2E2',
//                   color: '#B91C1C',
//                   borderRadius: '10px',
//                   px: 2, py: 1,
//                   fontSize: '0.85rem',
//                   mt: 1,
//                   border: '1px solid #FECACA',
//                 }}>
//                   {error}
//                 </Box>
//               )}

//               <Button
//                 fullWidth
//                 variant="contained"
//                 onClick={handleAuth}
//                 sx={{
//                   mt: 2.5,
//                   py: 1.4,
//                   borderRadius: '12px',
//                   textTransform: 'none',
//                   fontWeight: 700,
//                   fontSize: '1rem',
//                   fontFamily: "'Sora', sans-serif",
//                   background: '#F97316',
//                   boxShadow: '0 4px 14px rgba(249,115,22,0.35)',
//                   '&:hover': {
//                     background: '#EA580C',
//                     boxShadow: '0 6px 20px rgba(249,115,22,0.4)',
//                   }
//                 }}
//               >
//                 {formState === 0 ? 'Sign In' : 'Create Account'}
//               </Button>
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>

//       <Snackbar
//         open={open}
//         autoHideDuration={4000}
//         message={message}
//         onClose={() => setOpen(false)}
//         sx={{
//           '& .MuiSnackbarContent-root': {
//             background: '#292524',
//             borderRadius: '12px',
//           }
//         }}
//       />
//     </ThemeProvider>
//   );
// }
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar } from '@mui/material';
import "../App.css";

const theme = createTheme({
  palette: {
    primary: { main: '#F97316' },
    secondary: { main: '#FBBF24' },
  },
  typography: {
    fontFamily: "'DM Sans', sans-serif",
  },
  shape: { borderRadius: 12 },
});

export default function Authentication() {
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();
  const [name, setName] = React.useState();
  const [error, setError] = React.useState();
  const [message, setMessage] = React.useState();
  const [formState, setFormState] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  // ── LOGIC UNTOUCHED ──
  let handleAuth = async () => {
    try {
      if (formState === 0) {
        let result = await handleLogin(username, password);
        setError("");
        setMessage(result);
        setOpen(true);
      }
      if (formState === 1) {
        let result = await handleRegister(name, username, password);
        setUsername("");
        setMessage(result);
        setOpen(true);
        setError("");
        setFormState(0);
        setPassword("");
      }
    } catch (err) {
      let message = err.response.data.message;
      setError(message);
    }
  };

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      background: '#FFFBEB',
      '&:hover fieldset': { borderColor: '#FBBF24' },
      '&.Mui-focused fieldset': { borderColor: '#F97316' },
    },
    '& label.Mui-focused': { color: '#F97316' },
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container sx={{ height: '100vh' }}>

        {/* ── LEFT PANEL ── */}
        <Grid size={{ xs: 12, md: 7 }}
          sx={{
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(150deg, #FEF3C7 0%, #FDE68A 50%, #FBBF24 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative circles */}
          <Box sx={{
            position: 'absolute', top: '-10%', right: '-10%',
            width: 400, height: 400, borderRadius: '50%',
            background: 'rgba(249,115,22,0.12)'
          }} />
          <Box sx={{
            position: 'absolute', bottom: '-8%', left: '-8%',
            width: 300, height: 300, borderRadius: '50%',
            background: 'rgba(251,191,36,0.2)'
          }} />

          <Box sx={{ textAlign: 'center', zIndex: 1, px: 4 }}>
            <Box sx={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'rgba(255,255,255,0.7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.5rem',
              boxShadow: '0 4px 20px rgba(249,115,22,0.2)',
            }}>
              <span style={{ fontSize: '2rem' }}>🎥</span>
            </Box>
            <Box sx={{
              fontFamily: "'Sora', sans-serif",
              fontSize: '2.4rem',
              fontWeight: 700,
              color: '#292524',
              letterSpacing: '-0.03em',
              lineHeight: 1.2,
              mb: 1.5,
            }}>
              Meet<span style={{ color: '#EA580C' }}>Nest</span>
            </Box>
            <Box sx={{ color: '#57534E', fontSize: '1rem', maxWidth: 320, lineHeight: 1.6 }}>
              HD video calls, seamless collaboration, and crystal-clear audio — all in one place.
            </Box>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 3 }}>
              {['🔒 Secure', '⚡ Fast', '🌍 Global'].map(feat => (
                <Box key={feat} sx={{
                  background: 'rgba(255,255,255,0.6)',
                  borderRadius: '50px',
                  px: 1.5, py: 0.5,
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: '#57534E',
                  border: '1px solid rgba(255,255,255,0.8)',
                }}>
                  {feat}
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>

        {/* ── RIGHT PANEL ── */}
        <Grid size={{ xs: 12, md: 5 }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#FFFBEB',
            height: '100%',
            px: { xs: 2, sm: 0 },
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 400, px: 4 }}>

            {/* Logo on mobile */}
            <Box sx={{
              fontFamily: "'Sora', sans-serif",
              fontSize: '1.6rem',
              fontWeight: 700,
              color: '#292524',
              mb: 3,
              display: { xs: 'block', md: 'none' }
            }}>
              Meet<span style={{ color: '#EA580C' }}>Nest</span>
            </Box>

            {/* Header */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{
                fontFamily: "'Sora', sans-serif",
                fontSize: '1.7rem',
                fontWeight: 700,
                color: '#292524',
                letterSpacing: '-0.02em',
                mb: 0.5,
              }}>
                {formState === 0 ? 'Welcome back 👋' : 'Create account ✨'}
              </Box>
              <Box sx={{ fontSize: '0.9rem', color: '#78716C' }}>
                {formState === 0
                  ? 'Sign in to continue your meetings'
                  : 'Join MeetNest and start connecting'}
              </Box>
            </Box>

            {/* Toggle tabs */}
            <Box sx={{
              display: 'flex',
              background: '#FEF3C7',
              borderRadius: '12px',
              p: '4px',
              mb: 3,
            }}>
              {['Sign In', 'Sign Up'].map((label, idx) => (
                <Button
                  key={label}
                  fullWidth
                  onClick={() => setFormState(idx)}
                  sx={{
                    borderRadius: '10px',
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    py: 0.8,
                    transition: 'all 0.2s',
                    background: formState === idx ? 'white' : 'transparent',
                    color: formState === idx ? '#F97316' : '#78716C',
                    boxShadow: formState === idx ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                    '&:hover': {
                      background: formState === idx ? 'white' : 'rgba(255,255,255,0.5)',
                    }
                  }}
                >
                  {label}
                </Button>
              ))}
            </Box>

            {/* Form fields */}
            <Box component="form" noValidate>
              {formState === 1 && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={inputSx}
                />
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={inputSx}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={inputSx}
              />

              {error && (
                <Box sx={{
                  background: '#FEE2E2',
                  color: '#B91C1C',
                  borderRadius: '10px',
                  px: 2, py: 1,
                  fontSize: '0.85rem',
                  mt: 1,
                  border: '1px solid #FECACA',
                }}>
                  {error}
                </Box>
              )}

              <Button
                fullWidth
                variant="contained"
                onClick={handleAuth}
                sx={{
                  mt: 2.5,
                  py: 1.4,
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontWeight: 700,
                  fontSize: '1rem',
                  fontFamily: "'Sora', sans-serif",
                  background: '#F97316',
                  boxShadow: '0 4px 14px rgba(249,115,22,0.35)',
                  '&:hover': {
                    background: '#EA580C',
                    boxShadow: '0 6px 20px rgba(249,115,22,0.4)',
                  }
                }}
              >
                {formState === 0 ? 'Sign In' : 'Create Account'}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        message={message}
        onClose={() => setOpen(false)}
        sx={{
          '& .MuiSnackbarContent-root': {
            background: '#292524',
            borderRadius: '12px',
          }
        }}
      />
    </ThemeProvider>
  );
}
