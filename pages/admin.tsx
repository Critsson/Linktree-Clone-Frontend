import React from 'react'
import { useRouter } from 'next/router'
import { CircularProgress } from "@mui/material"
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import useWindowSize from '../useWindowSize'
import AdminPreview from '../components/AdminPreview'
import { ColorResult, SketchPicker } from 'react-color'
import AddLinkIcon from '@mui/icons-material/AddLink';
import styles from "../styles/Extras.module.css"
import { LinkAdder } from '../components/LinkAdder'
import { AnimatePresence } from 'framer-motion'

const fetchData = async () => {
  const getRes = await axios.get("https://chainlink.restapi.ca/api/admin", {
    withCredentials: true
  })
  return getRes.data
}

const AdminPage = () => {

  const router = useRouter()
  const [isValidating, setIsValidating] = React.useState(true)
  const { isLoading, data } = useQuery({ queryKey: ["admin-page-query"], queryFn: async () => await fetchData() })
  const [iframeUpdateCount, setIframeUpdateCount] = React.useState(0)
  const [isIframeRefreshing, setIsIframeRefreshing] = React.useState(false)
  const [isAddingLink, setIsAddingLink] = React.useState(false)
  const [bgcolor, setBgcolor] = React.useState(``)
  const [fontcolor, setFontcolor] = React.useState(``)
  const [tagcolor, setTagcolor] = React.useState(``)
  const [avatarbgcolor, setAvatarbgcolor] = React.useState(``)
  const [avatarfontcolor, setAvatarfontcolor] = React.useState(``)
  const [buttoncolor, setButtoncolor] = React.useState(``)
  const windowSize = useWindowSize()

  console.log(data)

  React.useEffect(() => {

    const validate = async () => {
      try {
        const validateRes = await axios.get("https://chainlink.restapi.ca/api/validate", {
          withCredentials: true
        })
        setIsValidating(false)
      } catch (error) {
        router.push("/")
      }
    }

    validate()

  }, [router])

  React.useEffect(() => {
    if (!isLoading) {
      setBgcolor(`#${data.bgcolor}`)
      setFontcolor(`#${data.fontcolor}`)
      setTagcolor(`#${data.tagcolor}`)
      setAvatarbgcolor(`#${data.avatarbgcolor}`)
      setAvatarfontcolor(`#${data.avatarfontcolor}`)
      setButtoncolor(`#${data.buttoncolor}`)
    }
  }, [isLoading])

  const handleLogout = async () => {
    const logoutRes = await axios.get("https://chainlink.restapi.ca/api/logout", {
      withCredentials: true
    })
    router.push("/")
  }

  const handleDeletion = async () => {
    const deleteRes = await axios.delete("https://chainlink.restapi.ca/api/users", {
      withCredentials: true
    })
    router.push("/")
  }

  const handlePreviewRefresh = () => {
    setIsIframeRefreshing(true)
    setIframeUpdateCount(iframeUpdateCount + 1)
    setTimeout(() => {
      setIsIframeRefreshing(false)
    }, 800)

  }

  const handleColorChange = (newColor: ColorResult) => {
    setBgcolor(newColor.hex)
  }

  const closeLinkAdder = () => {
    setIsAddingLink(false)
  }


  if (isValidating || isLoading) {
    return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", width: "100vw", height: "100vh" }}>
      <CircularProgress sx={{ color: "#202430" }} />
    </div>
  }

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh", backgroundColor: "#F3F3F1", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={windowSize.width > 640 ? {
          width: "68vw", height: "100vh", borderRight: ".1vw solid lightgrey", boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px", overflow: "scroll", flexDirection: 'column'
          , display: "flex", alignItems: "center", paddingTop: "9vw"
        } : {
          width: "100vw", height: "100vh", overflowY: "scroll", flexDirection: 'column', display: "flex", alignItems: "center", paddingTop: "9vw"
        }}>
          <div style={{
            display: "flex", justifyContent: "center", width: "33vw", height: "2.5vw", borderRadius: "1vw",
            boxShadow: ".3vw .3vw 0 0vw black", border: ".2vw solid black", alignItems: "center", gap: ".3vw"
          }} className={styles.add_link_button} onClick={() => setIsAddingLink(true)}>
            <AddLinkIcon sx={{ color: "white", width: "1.9vw", height: "1.9vw" }} />
            <h3 style={{ color: "white", fontSize: "1vw" }}>Add link</h3>
          </div>
          <AnimatePresence>
            {isAddingLink && <LinkAdder closeLinkAdder={closeLinkAdder} />}
          </AnimatePresence>
        </div>
        {windowSize.width > 640 && <div style={{ width: "32vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <AdminPreview bgcolor={data.bgcolor} isIframeRefreshing={isIframeRefreshing} iframeUpdateCount={iframeUpdateCount} username={data.username} />
        </div>}
      </div>
      <button style={{ position: "absolute", bottom: "1vw", right: "1vw" }} onClick={handleLogout}>Logout</button>
      <button style={{ position: "absolute", bottom: "1vw", right: "5vw" }} onClick={handlePreviewRefresh}>Refresh</button>
    </div>
  )
}

export default AdminPage
