import { Button } from '@material-ui/core'
import React, { useContext } from 'react'
import {socketContext} from '../SocketContext'

function Notifications() {

    const {answerCall, call, callAccepted} = useContext(socketContext)

    return (
        <div>
            {call.isRecievingCall && !callAccepted && (
                <div style={{ display:'flex', justifyContent:'center' }}>

                    <h1> {call.callerName} is calling:  </h1>
                    <Button variant='contained' color='primary' onClick={answerCall} style={{ marginLeft: '10px', }}>
                        Accept
                    </Button>
                </div>
            ) }
        </div>
    )
}

export default Notifications
