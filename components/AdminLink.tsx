import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material"

interface props {
    title: string,
    link: string,
    id: number,
    handleLinkDeletion: (id: number) => void,
    handleLinkChange: (id: number, newLink: string, e: React.FormEvent<HTMLFormElement>) => void,
    handleTitleChange: (id: number, newTitle: string, e: React.FormEvent<HTMLFormElement>) => void
}

const AdminLink = (props: props) => {

    const [editingTitle, setEditingTitle] = React.useState(false)
    const [editingLink, setEditingLink] = React.useState(false)
    const [title, setTitle] = React.useState(props.title)
    const [link, setLink] = React.useState(props.link)

    return (
        <div style={{
            width: "100%", backgroundColor: "white", display: "flex", padding: ".5vw .7vw", borderRadius: "1vw",
            boxShadow: ".3vw .3vw 0 0vw black", border: ".2vw solid black", flexDirection: "column"
        }}>
            {editingTitle ? <div>
                <form onSubmit={(e) => {
                    if(title !== props.title) {
                        props.handleTitleChange(props.id, title, e)
                    }
                    setEditingTitle(false)
                }}>
                    <input autoFocus onChange={(e) => setTitle(e.target.value)} value={title} type="text" style={{
                        backgroundColor: "white", outline: "0vw", border: "0vw", fontSize: "1vw"
                        , fontWeight: "700", height: "1.2vw", width: "31vw"
                    }} />
                </form>
            </div>
                :
                <div style={{ display: "inline-flex", alignItems: "center", marginBottom: "-.4vw" }}>
                    <p style={{ fontSize: "1vw", fontWeight: "700" }}>{title}</p>
                    <IconButton style={{ marginLeft: "-.2vw" }} onClick={() => setEditingTitle(true)} disableRipple>
                        <EditIcon sx={{ width: "1vw", height: "1vw", color: "darkgrey" }} />
                    </IconButton>
                </div>}
            {editingLink ? <div style={{ display: "flex", alignItems: "center", position: "relative", }}>
                <form onSubmit={(e) => {
                    if(link !== props.link) {
                        props.handleLinkChange(props.id, link, e)
                    }
                    setEditingLink(false)
                }}>
                    <input autoFocus onChange={(e) => setLink(e.target.value)} value={link} type="text" style={{
                        backgroundColor: "white", outline: "0vw", border: "0vw", fontSize: "1vw"
                        , fontWeight: "500", height: "1.2vw", width: "31vw"
                    }} />
                </form>
            </div>
                :
                <div style={{ display: "flex", alignItems: "center", position: "relative", }}>
                    <p style={{ fontSize: "1vw", fontWeight: "500" }}>{link}</p>
                    <IconButton style={{ marginLeft: "-.2vw" }} onClick={() => setEditingLink(true)} disableRipple>
                        <EditIcon sx={{ width: "1vw", height: "1vw", color: "darkgrey" }} />
                    </IconButton>
                    <IconButton onClick={() => props.handleLinkDeletion(props.id)} sx={{ position: "absolute", right: "-.7vw" }} disableRipple>
                        <DeleteIcon sx={{ width: "1.2vw", height: "1.2vw" }} />
                    </IconButton>
                </div>}
        </div>
    )
}

export default AdminLink