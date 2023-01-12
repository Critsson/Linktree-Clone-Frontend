import React from 'react'
import { motion } from 'framer-motion'
import { ColorResult, SketchPicker } from 'react-color'

interface props {
  bgcolor: string,
  fontcolor: string,
  tagcolor: string,
  buttoncolor: string,
  avatarbgcolor: string,
  avatarfontcolor: string
}

const swatchStyle = {
  borderRadius: "1vw",
  height: "5vw",
  width: "5vw",
  outline: ".1vw solid lightgrey"
}

const ColorMenu = (props: props) => {

  return (
    <motion.div style={{ display: "flex", alignItems: "center", marginBottom: "5vw", marginTop: "5vw", gap: "3vw" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexWrap: "wrap", width: "6.2vw" }}>
        <div style={{ ...swatchStyle, backgroundColor: props.bgcolor }}>
        </div>
        <p style={{textAlign: "center"}}>Background</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexWrap: "wrap", width: "6.2vw" }}>
        <div style={{ ...swatchStyle, backgroundColor: props.buttoncolor }}>
        </div>
        <p style={{textAlign: "center"}}>Button</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexWrap: "wrap", width: "6.2vw" }}>
        <div style={{ ...swatchStyle, backgroundColor: props.fontcolor }}>
        </div>
        <p style={{textAlign: "center"}}>Button Font</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexWrap: "wrap", width: "6.2vw", marginTop: "1.2vw" }}>
        <div style={{ ...swatchStyle, backgroundColor: props.avatarbgcolor }}>
        </div>
        <p style={{textAlign: "center"}}>Avatar Background</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexWrap: "wrap", width: "6.2vw" }}>
        <div style={{ ...swatchStyle, backgroundColor: props.avatarfontcolor }}>
        </div>
        <p style={{textAlign: "center"}}>Avatar Font</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexWrap: "wrap", width: "6.2vw" }}>
        <div style={{ ...swatchStyle, backgroundColor: props.tagcolor }}>
        </div>
        <p style={{textAlign: "center"}}>Tag Color</p>
      </div>
    </motion.div>
  )
}

export default ColorMenu