import React from 'react'
import { Alert, AlertTitle } from '@mui/material'
import { motion } from 'framer-motion'

interface props {
    closeModal: () => void
}

const WipModal = (props: props) => {
    return (
        <motion.div initial={{y: 100}} animate={{y: 0}}>
            <Alert sx={{ fontFamily: "Inter", width: "28vw", height: "5.5vw", fontSize: ".8vw" }} severity="info" onClose={props.closeModal}>
                <AlertTitle sx={{fontSize: ".9vw"}}><strong>Construction Site 🚧</strong></AlertTitle>
                Hey, you&apos;ve stumbled a work in progress! Please enjoy the parts that are complete. 😀
            </Alert>
        </motion.div>
    )
}

export default WipModal