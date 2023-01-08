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
import AdminLink from '../components/AdminLink'

const fetchData = async () => {
  const getRes = await axios.get("https://chainlink.restapi.ca/api/admin", {
    withCredentials: true
  })
  return getRes.data
}

const AdminPage = () => {

  const router = useRouter()
  const [isValidating, setIsValidating] = React.useState(true)
  const { isLoading, data, refetch } = useQuery({ queryKey: ["admin-page-query"], queryFn: async () => await fetchData() })
  const [iframeUpdateCount, setIframeUpdateCount] = React.useState(0)
  const [isIframeRefreshing, setIsIframeRefreshing] = React.useState(false)
  const [isAddingLink, setIsAddingLink] = React.useState(false)
  const [addedLink, setAddedLink] = React.useState({ title: "", link: "" })
  const [bgcolor, setBgcolor] = React.useState(``)
  const [fontcolor, setFontcolor] = React.useState(``)
  const [tagcolor, setTagcolor] = React.useState(``)
  const [avatarbgcolor, setAvatarbgcolor] = React.useState(``)
  const [avatarfontcolor, setAvatarfontcolor] = React.useState(``)
  const [buttoncolor, setButtoncolor] = React.useState(``)
  const [links, setLinks] = React.useState<{ id: number, title: string, link: string }[]>([])
  const [linksId, setLinksId] = React.useState(1)
  const windowSize = useWindowSize()

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
      if (data.links) {
        setLinks(data.links)
        if (data.links.length > 0) {
          setLinksId(data.links[0].id + 1)
        }
      }
    }
  }, [isLoading, data])

  const handleLogout = async () => {
    await axios.get("https://chainlink.restapi.ca/api/logout", {
      withCredentials: true
    })
    router.push("/")
  }

  const handleDeletion = async () => {
    await axios.delete("https://chainlink.restapi.ca/api/users", {
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

  const updateAddedLink = (titleLink: { title: string, link: string }) => {
    setAddedLink(titleLink)
  }

  const closeLinkAdder = () => {
    setIsAddingLink(false)
    setAddedLink({ link: "", title: "" })
  }

  const handleLinkAdderSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const placeholder: { id: number, title: string, link: string }[] = [...links]
    placeholder.unshift({ ...addedLink, id: linksId })
    setLinksId((prevState) => prevState + 1)
    try {
      const res = await axios.put("https://chainlink.restapi.ca/api/users/links", {
        links: placeholder
      }, {
        withCredentials: true
      })
    } catch (err) {
      console.error(err)
    }
    setLinks(placeholder)
    handlePreviewRefresh()
    setIsAddingLink(false)
    setAddedLink({link: "", title: ""})
    refetch()
  }

  if (isValidating || isLoading) {
    return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", width: "100vw", height: "100vh" }}>
      <CircularProgress sx={{ color: "#202430" }} />
    </div>
  }

  console.log(linksId)

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
            {isAddingLink && <LinkAdder closeLinkAdder={closeLinkAdder} addedLink={addedLink} updateAddedLink={updateAddedLink} handleLinkAdderSubmit={handleLinkAdderSubmit} />}
          </AnimatePresence>
          <div style={{display: "flex", alignItems: "center", flexDirection: "column", marginTop: "1.5vw", gap: "1.5vw", width: "33vw"}}>
              <AdminLink id={links[0].id} title={links[0].title} link={links[0].link} />
              <AdminLink id={links[1].id} title={links[1].title} link={links[1].link} />
          </div>
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
