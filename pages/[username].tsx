import React from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { InferGetServerSidePropsType } from 'next/types'
import { CircularProgress, Avatar } from '@mui/material'
import styles from '../styles/UserPage.module.css'
import LinkButton from '../components/LinkButton'
import useWindowSize from '../useWindowSize'
import https from "https"
import LinkIcon from '@mui/icons-material/Link';

const fetchData = async (username: string | string[] | undefined) => {
    if (typeof username === "string") {
        return (await axios.get(`https://chainlink.restapi.ca/api/users/${username.toLowerCase()}`)).data
    }
}

export default function UserPage({ userData }: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const router = useRouter()
    const { username } = router.query
    const { isLoading, data } = useQuery({ queryKey: ["user-page-query"], queryFn: async () => await fetchData(username), placeholderData: userData })
    const windowSize = useWindowSize()


    const userPageContainerMobile = {
        display: "flex",
        minHeight: "93vh",
        maxWidth: "100vw",
        alignItems: "center",
        flexDirection: "column" as "column",
        fontFamily: "Inter, sans-serif",
        gap: "5vw",
        paddingTop: "8vw",
        backgroundColor: `#${data.bgcolor}`
    }

    const userPageContainerDesktop = {
        display: "flex",
        minHeight: "93vh",
        maxWidth: "100vw",
        alignItems: "center",
        flexDirection: "column" as "column",
        fontFamily: "Inter, sans-serif",
        gap: "1.5vw",
        paddingTop: "3vw",
        backgroundColor: `#${data.bgcolor}`
    }


    if (isLoading) {
        return (
            <div className={styles.user_page_container}>
                <CircularProgress sx={{ color: "grey" }} />
            </div>
        )
    }

    const linkButtonElements = data.links ? data.links.map((linkObject: { link: string, title: string, id: number }) => {
        return <LinkButton key={linkObject.id} link={linkObject.link} title={linkObject.title} buttonColor={data.buttoncolor} fontColor={data.fontcolor} />
    }) : []

    return (
        <>
            <div style={windowSize.width > 640 ? userPageContainerDesktop : userPageContainerMobile}>
                <Avatar sx={windowSize.width > 640 ?
                    { backgroundColor: `#${data.avatarbgcolor}`, fontFamily: "Inter, sans-serif", width: "5vw", height: "5vw", fontSize: "3vw", color: `#${data.avatarfontcolor}`, marginBottom: "-1vw" }
                    :
                    { backgroundColor: `#${data.avatarbgcolor}`, fontFamily: "Inter, sans-serif", width: "25vw", height: "25vw", fontSize: "16vw", color: `#${data.avatarfontcolor}`, marginBottom: "-2vw" }}>
                    {data.username[0].toUpperCase()}</Avatar>
                <h1 style={windowSize.width > 640 ?
                    { fontSize: "1.5vw", color: `#${data.tagcolor}` }
                    :
                    { fontSize: "7vw", color: `#${data.tagcolor}` }}>{`@${data.username}`}</h1>
                <div className={styles.user_page_button_container}>
                    {linkButtonElements}
                </div>
            </div>
            <div style={windowSize.width > 640 ? { display: "flex", justifyContent: "center", marginTop: "1vw", marginBottom: "1vw" } : { display: "flex", justifyContent: "center", marginTop: "5vw", marginBottom: "3vw" }}>
                <h1 style={windowSize.width > 640 ? { fontSize: "1.5vw", color: data.avatarbgcolor } : { fontSize: "5.5vw", color: data.avatarbgcolor }}>chainlink</h1>
                <LinkIcon sx={windowSize.width > 640 ? { height: "2vw", width: "2vw", color: data.avatarbgcolor } : { height: "7.4vw", width: "7.4vw", color: data.avatarbgcolor }} />
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const { params } = context
    const username = params?.username
    let userData;

    if (typeof username === "string") {
        userData = (await axios.get(`https://chainlink.restapi.ca/api/users/${username.toLowerCase()}`, {
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        })).data
    }

    return {
        props: {
            userData
        }
    }
}