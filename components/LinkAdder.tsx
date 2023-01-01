import React from 'react'
import { motion } from 'framer-motion'
import CloseIcon from '@mui/icons-material/Close';
import {IconButton} from "@mui/material"
import styles from "../styles/Extras.module.css"

interface props {
    closeLinkAdder: () => void
}

export const LinkAdder = (props: props) => {
    return (
        <motion.div initial={{ opacity: 0, y: "-2vw" }} animate={{ opacity: 1, y: 0 }} exit={{opacity: 0, y: "-.5vw"}} style={{
            backgroundColor: "white", width: "33vw", height: "6vw", borderRadius: "1vw",
            marginTop: "1.5vw", boxShadow: ".5vw .4vw 0 0vw black", border: ".2vw solid black", paddingTop: ".1vw", display: "flex", flexDirection: "column", gap: ".1vw"
        }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingLeft: "1vw", paddingRight: ".5vw" }}>
                <h5 style={{fontSize: "1.2vw", fontWeight: "800"}}>Enter URL</h5>
                <IconButton onClick={props.closeLinkAdder}>
                    <CloseIcon sx={{width: "1.3vw", height: "1.3vw"}} />
                </IconButton>
            </div>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingLeft: "1vw", paddingRight: ".5vw"  }}>
                <input type="text" placeholder="URL" style={{width: "24vw", height: "2.5vw", borderRadius: ".3vw", fontSize: "1.2vw", borderColor: "black", paddingLeft: ".3vw"
            , backgroundColor: "#F3F3F1", boxShadow: ".2vw .2vw 0 0vw black", outlineWidth: 0}}/>
                <button className={styles.add_link_button} type="submit" style={{width: "5vw", height: "2.5vw", borderRadius: ".3vw", fontSize: "1.2vw", fontWeight: "700"
            , color: "white", boxShadow: ".2vw .2vw 0 0vw black"}}>Add</button>
            </form>
        </motion.div>
    )
}
