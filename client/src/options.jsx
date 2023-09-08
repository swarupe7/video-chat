import React,{useContext,useState} from 'react';
import {Button,TextField,Grid,Typography,Container,Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PhoneIcon from '@mui/icons-material/Phone';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import {SocketContext} from './SocketContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  gridContainer: {
    width: '100%',
    // [theme.breakpoints.down('xs')]: {
    //   flexDirection: 'column',
    // },
  },
  container: {
    width: '600px',
    margin: '35px 0',
    padding: 0,
    // [theme.breakpoints.down('xs')]: {
    //   width: '80%',
    // },
  },
  margin: {
    marginTop: 20,
  },
  padding: {
    padding: 20,
  },
  paper: {
    padding: '10px 20px',
    border: '2px solid black',
  },
}));

const Options= ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Paper elevation={10} className={classes.paper}>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container className={classes.gridContainer}>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography gutterBottom variant="h6">Account Info</Typography>
              <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
              <CopyToClipboard text={me} className={classes.margin}>
                <Button variant="contained" color="primary" fullWidth startIcon={<AssignmentIcon fontSize="large" />}>
                  Copy Your ID
                </Button>
              </CopyToClipboard>
            </Grid>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography gutterBottom variant="h6">Make a call</Typography>
              <TextField label="ID to call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth />
              {callAccepted && !callEnded ? (
                <Button variant="contained" color="secondary" startIcon={<PhoneDisabledIcon fontSize="large" />} fullWidth onClick={leaveCall} className={classes.margin}>
                  Hang Up
                </Button>
              ) : (
                <Button variant="contained" color="primary" startIcon={<PhoneIcon fontSize="large" />} fullWidth onClick={() => callUser(idToCall)} className={classes.margin}>
                  Call
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
        {children}
      </Paper>
    </Container>
  );
};
// const Options = ({children}) => {
//   const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } =useContext(SocketContext);
//   const [idToCall, setIdToCall] = useState('');
//   const classes = useStyles();
//   return (
//     <Container className={classes.container}>
//       <Paper elevation={10} className={classes.paper}>
//         <form className={classes.root} noValidate autoComplete='off'>
//              <Grid container className={classes.gridContainer}>
//               <Grid item xs={12} md={6} className={classes.padding}>
//                 <Typography gutterBottom variant='h6'>Account Info </Typography>
//                   <TextField label="Name" id="outlined-basic"  variant="outlined" value={name} fullWidth onChange={(e)=>setName(e.target.value)}/>
//                   <CopyToClipboard text={me} className={classes.margin}>
//                     <Button variant="contained" color="primary" fullWidth startIcon={<AssignmentIcon fontSize='large'/>} > Copy Ur Id</Button>

//                   </CopyToClipboard> </Grid>
//                   <Grid item xs={12} md={6} className={classes.padding}>
//                 <Typography gutterBottom variant='h6'>Make the call </Typography>
//                   <TextField label="Caller Id" id="outlined-basic"  variant="outlined" value={idToCall} fullWidth onChange={(e)=>setIdToCall(e.target.value)}/>
//                  {
//                   callAccepted && !callEnded ?<Button variant='contained' color='secondary' className={classes.margin} fullWidth startIcon={<PhoneDisabledIcon fontSize='large'/>} onClick={()=>leaveCall()}>
//                     Hang Up
//                   </Button>:<Button  variant='contained' color='primary' fullWidth onClick={()=>callUser(idToCall)} startIcon={<PhoneIcon fontSize='large'/>}> Call</Button>
//                  }
                  
//                    </Grid>
//              </Grid>
//           </form>
//           {children}

//       </Paper>
      
//     </Container>
//   )
// }

export default Options;