import React from 'react'
import { useRouter } from 'next/router'
import { CircularProgress } from "@mui/material"
import axios from 'axios'

const AdminPage = () => {

  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {

    const validate = async () => {
      try {
        // you might be calling this in a few places. it might be good to create an api class that can handle calling the validate method more easily than using axios every time. ideally none of your components need to know aout having to use axios or the url that it sends to
        const validateRes = await axios.get("https://chainlink.restapi.ca/api/validate", {
          withCredentials: true
        })
        setIsLoading(false)
      } catch (error) {
        router.push("/")
      }
    }

    validate()

  }, [router])

  const handleLogout = async () => {
      const logoutRes = await axios.get("https://chainlink.restapi.ca/api/logout", {
        withCredentials: true
      })
      router.push("/")
  }

  if (isLoading) {
    return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", width: "100vw", height: "100vh" }}>
      <CircularProgress sx={{ color: "#202430" }} />
    </div>
  }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default AdminPage
