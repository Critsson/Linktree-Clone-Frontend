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
            display: "flex", width: "15.3vw", height: "33vw", outline: ".8vw solid black", borderRadius: "2.9vw", flexDirection: "column", alignItems: "center"
            , position: "relative", backgroundColor: `#${props.bgcolor}`, outlineOffset: "-.3vw"}}>
            <iframe key={props.iframeUpdateCount} scrolling="no" style={{height: "100%", width: "100%", borderRadius: "3vw", borderColor: "transparent"}} src={`http://localhost:3000/${props.username}`} title="Preview Screen"></iframe>
            {props.isIframeRefreshing && <CircularProgress sx={{color: "rgba(63, 63, 63, 0.63)", position: "absolute", left: "6.5vw", top: "15vw"}} size="2vw" />}
          </div>
    )
}

export default AdminPreview