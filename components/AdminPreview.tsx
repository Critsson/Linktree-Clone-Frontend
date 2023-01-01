import {CircularProgress} from "@mui/material"

import React from 'react'

interface props {
    username: string,
    iframeUpdateCount: number,
    isIframeRefreshing: boolean,
    bgcolor: string
}

const AdminPreview = (props: props) => {

    return (
        <div style={{
            display: "flex", width: "15.3vw", height: "31vw", border: ".9vw solid black", borderRadius: "2.9vw", flexDirection: "column", alignItems: "center"
            , position: "relative", background: `#${props.bgcolor}`}}>
            <iframe key={props.iframeUpdateCount} style={{height: "100%", width: "100%", borderRadius: "3vw", borderColor: "transparent"}} src={`http://localhost:3000/${props.username}`} title="Preview Screen"></iframe>
            {props.isIframeRefreshing && <CircularProgress sx={{color: "rgba(63, 63, 63, 0.63)", position: "absolute", left: "5.6vw", top: "13vw"}} size="2vw" />}
          </div>
    )
}

export default AdminPreview