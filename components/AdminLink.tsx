import React from 'react'
import EditIcon from '@mui/icons-material/Edit';

interface props {
    title: string,
    link: string,
    id: number
}

const AdminLink = (props: props) => {
    return (
        <div key={props.id} style={{
            width: "100%", backgroundColor: "white", display: "flex", padding: ".5vw .5vw", borderRadius: "3vw",
            boxShadow: ".3vw .3vw 0 0vw black", border: ".2vw solid black"
        }}>
            AdminLink
        </div>
    )
}

export default AdminLink