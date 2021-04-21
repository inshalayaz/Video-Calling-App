import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import {socketContext} from '../SocketContext'

const useStyles = makeStyles((theme) =>( {
    
    video: {
        width: '550px',
        [theme.breakpoints.down('xs')]: {
          width: '300px',
        },
      },
      gridContainer: {
        justifyContent: 'center',
        [theme.breakpoints.down('xs')]: {
          flexDirection: 'column',
        },
      },
      paper: {
        padding: '10px',
        border: '2px solid black',
        margin: '10px',
      },
      hideCamera:{
          display: 'none'
      },
      displayCamera:{
          display: 'inline-block'
        }
}))

function VideoPlayer() {

    const {name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(socketContext)
    let [cameraStatus,setCameraStatus] = useState(false)
    const classes = useStyles()


    

    return (
       <Grid className = {classes.gridContainer} spacing='2'>

           {
               stream && (
                   <>
                   <Paper style={{textAlign: 'center'}}>
                    <Typography variant='h5' gutterBottom > {name || 'Name'} </Typography>
                   </Paper>
                   
                <Paper className = { classes.paper} style={{textAlign:'center'}}>
                    <Grid item xs={12} md={6} >
                        
                        <video playsInline muted ref={myVideo}  autoPlay className={classes.video } style={ cameraStatus?{display:'none'} : {display:'inline-block'} }   />
                        {cameraStatus?<h3>Video OFF</h3>: ''}
                        
                    </Grid>
                </Paper>
                <Button variant='contained' fullWidth color='primary' onClick={ ()=>{
                            setCameraStatus(!cameraStatus)
                    } } > {cameraStatus? 'Turn On Camera' : 'Turn Off Camera'} 
                </Button>
                </>
               )
           }
            {/* Our Video */}

               

            {/* User Video */}
            {
                callAccepted && !callEnded && (
                    <Paper className = { classes.paper}>
                        <Grid item xs={12} md={6} >
                            <Typography variant='h5' gutterBottom > { call.callerName || 'Name' } </Typography>
                            <video playsInline  ref={userVideo} autoPlay className={classes.video} />
                        </Grid>
                    </Paper>

                )
            }
               
       </Grid>
    )
}

export default VideoPlayer
