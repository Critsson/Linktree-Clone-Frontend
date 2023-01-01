import React from 'react'
import useWindowSize from '../useWindowSize'
import styles from "../styles/Extras.module.css"
import { motion } from 'framer-motion'

interface linkButtonProps {
    link: string,
    title: string,
    buttonColor: string,
    fontColor: string
}

const LinkButton = (props: linkButtonProps) => {

    const buttonStyleMobile = {
        width: "90vw",
        minHeight: "10vw",
        fontSize: "4vw",
        backgroundColor: `#${props.buttonColor}`,
        borderColor: "black",
        padding: "3vw 1vw",
        color: `#${props.fontColor}`,
        fontWeight: "700",
        fontFamily: "Inter, sans-serif",
        borderRadius: "2vw",
        borderWidth: "1vw",
        boxShadow: "3.5px 4px 0px 1px black"
    }

    const buttonStyleDesktop = {
        width: "35vw",
        minHeight: "3vw",
        fontSize: "1vw",
        backgroundColor: `#${props.buttonColor}`,
        borderColor: "black",
        padding: ".5vw 1vw",
        color: `#${props.fontColor}`,
        fontWeight: "700",
        fontFamily: "Inter, sans-serif",
        borderRadius: ".6vw",
        borderWidth: ".3vw",
        boxShadow: ".4vw .3vw 0 0vw black"
    }

    const { link, title } = props
    const windowSize = useWindowSize();

    return (
        <a href={link} target="_blank" rel="noreferrer">
            <motion.button whileHover={{scale: 1.03}} className={styles.hover_cursor} style={windowSize.width > 640 ? buttonStyleDesktop : buttonStyleMobile}>
                {title}
            </motion.button>
        </a>
    )
}

export default LinkButton
