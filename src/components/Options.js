import React, { useContext, useState } from 'react'
import { Button, Container, Grid, makeStyles, Paper, TextField, Typography } from '@material-ui/core'
import {socketContext} from '../SocketContext'
import CopyToClipboard from 'react-copy-to-clipboard';
import { Assignment, PhoneDisabled, PhoneEnabled } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    gridContainer: {
      width: '100%',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
    container: {
      width: '600px',
      margin: '35px 0',
      padding: 0,
      [theme.breakpoints.down('xs')]: {
        width: '80%',
      },
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
function Options({children}) {


  const {me, callAccepted, name, setName, endCall , callEnded, callUser } = useContext(socketContext)

  const [idToCall , setIdToCall] = useState('')

  const classes = useStyles()

    return (
      
      <Container className={classes.container} > 
        <Paper elevation={10} className={classes.paper}>
          <form className={classes.root} noValidate auto >
            <Grid className={classes.gridContainer}>
              <Grid item xs={12} md={6} className={classes.padding}>
                <Typography variant = 'h6' gutterBottom>
                  Account Info
                </Typography>
                <TextField label='Name' value = {name} onChange={(e) =>  setName(e.target.value)} fullWidth />
                <CopyToClipboard text={me} className={classes.margin}>
                  <Button variant='contained' color='primary' fullWidth startIcon={ <Assignment fontSize='large' /> } >
                    Copy Your ID
                  </Button>
                </CopyToClipboard>
              </Grid>

              {/* Call Button */}

              <Grid item xs={12} md={6} className={classes.padding}>
                <Typography variant = 'h6' gutterBottom>
                  Make A Call
                </Typography>
                <TextField label='ID to Call' value = {idToCall} onChange={(e) =>  setIdToCall(e.target.value)} fullWidth />
                {
                  callAccepted && !callEnded ? (
                    <Button variant='contained' color='secondary' startIcon={ <PhoneDisabled fontSize='large' />} onClick = {endCall } className={classes.margin} >
                      Hang Up
                    </Button>
                  ): (
                    <Button variant='contained' color='primary' fullWidth startIcon={ <PhoneEnabled fontSize='large' />} onClick = {() => callUser(idToCall)} className={classes.margin}>
                      Call
                    </Button>
                  )
                }
              </Grid>


            </Grid>
          </form>
            {children}
        </Paper>


      </Container>


    )
}

export default Options
