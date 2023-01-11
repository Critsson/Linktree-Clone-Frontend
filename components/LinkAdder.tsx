import React from 'react'
import { motion } from 'framer-motion'
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from "@mui/material"
import styles from "../styles/Extras.module.css"

interface props {
    closeLinkAdder: () => void,
    addedLink: { title: string, link: string },
    updateAddedLink: (titleLink: { title: string, link: string }) => void,
    handleLinkAdderSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export const LinkAdder = (props: props) => {

    const [isValidLink, setIsValidLink] = React.useState(false)

    const handleLinkCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
        props.updateAddedLink({ ...props.addedLink, link: e.target.value })

        if (urlRegex.test(e.target.value)) {
            setIsValidLink(true)
        } else {
            setIsValidLink(false)
        }

    }

    return (
        <motion.div initial={{ opacity: 0, y: "-2vw" }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: "-.5vw" }} style={{
            backgroundColor: "white", width: "33vw", height: "6.8vw", borderRadius: "1vw", paddingBottom: "1vw",
            marginTop: "1.5vw", boxShadow: ".5vw .4vw 0 0vw black", border: ".2vw solid black", paddingTop: ".1vw", display: "flex", flexDirection: "column", gap: ".1vw",
        }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingLeft: "1vw", paddingRight: ".5vw" }}>
                <h5 style={{ fontSize: "1.2vw", fontWeight: "800" }}>Enter Title & URL</h5>
                <IconButton onClick={props.closeLinkAdder}>
                    <CloseIcon sx={{ width: "1.3vw", height: "1.3vw" }} />
                </IconButton>
            </div>
            <form onSubmit={(e) => props.handleLinkAdderSubmit(e)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingLeft: "1vw", paddingRight: ".5vw" }}>
                <input value={props.addedLink.title} onChange={(e) => props.updateAddedLink({ ...props.addedLink, title: e.target.value })} type="text" placeholder="Title" style={{
                    width: "10vw", height: "2.5vw", borderRadius: ".3vw", fontSize: "1.2vw", borderColor: "black", paddingLeft: ".3vw"
                    , backgroundColor: "#EFF0EC", boxShadow: ".2vw .2vw 0 0vw black", outlineWidth: 0
                }} />
                <input value={props.addedLink.link} onChange={(e) => handleLinkCheck(e)} type="text" placeholder="URL" style={{
                    width: "14vw", height: "2.5vw", borderRadius: ".3vw", fontSize: "1.2vw", borderColor: "black", paddingLeft: ".3vw"
                    , backgroundColor: "#EFF0EC", boxShadow: ".2vw .2vw 0 0vw black", outlineWidth: 0
                }} />
                {isValidLink ? <button className={styles.add_link_button} type="submit" style={{
                    width: "5vw", height: "2.5vw", borderRadius: ".3vw", fontSize: "1.2vw", fontWeight: "700"
                    , color: "white", boxShadow: ".2vw .2vw 0 0vw black", border: ".15vw solid black"
                }}>Add</button>
                    :
                    <button disabled style={{
                        width: "5vw", height: "2.5vw", borderRadius: ".3vw", fontSize: "1.2vw", fontWeight: "700"
                        , color: "#A8AAA2", backgroundColor: "#E0E2D9", border: ".15vw solid #b8bab3", boxShadow: ".2vw .2vw 0 0vw #b8bab3"
                    }}>Add</button>}
            </form>
        </motion.div>
    )
}
