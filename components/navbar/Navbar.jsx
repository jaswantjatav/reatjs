import React, { useState } from 'react';
import Image from 'next/image'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SearchBar from '../searchBar/SearchBar';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useRouter } from 'next/router';
import Link from 'next/link';

import styles from "./Navbar.module.css"


export default function Navbar({ showSearchBar = false }) {
    const [searchText, setSearchText] = useState("")
    const router = useRouter();
    const pathname = router.pathname;

    const requestSearch = (event) => {
        // Navigate to home page and do a search
        router.push({
            pathname: "/",
            query: { searchText: event.target.value }
        })
    }

    const NavLinks = [
        { title: "Home", pathname: "/" },
        { title: "Activity", pathname: "/activity" },
        { title: "Body", pathname: "/body" },
        { title: "Soul", pathname: "/soul" },
        { title: "Marketplace", pathname: "/marketplace" },
        { title: "Social", pathname: "/social" },
        { title: "Your Avatars", pathname: "/your-avatars" }
    ]

    return (
        <Grid container sx={{ flexGrow: 1, width: "100%" }}>
            <AppBar
                position="static"
                color="transparent"
                elevation={0}
                p={2}
            >
                <Toolbar className={styles.apptoolbar}>
                    <Box
                        pl={3}
                        className={styles.brandbox}
                    >

                        <Link href="/"><Image src="/kindly-logo.svg" width={90} height={24} alt="kindly-logo" /></Link>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"

                        >

                            <Typography
                                variant="h6"
                                sx={{
                                    color: "#979797"
                                }}
                            >
                                &nbsp; | Search
                            </Typography>
                            <ArrowDropDownIcon
                                sx={{
                                    color: "#979797"
                                }}
                            />
                        </IconButton >
                    </Box>
                    <Grid
                        mx={3}
                        px={2}
                        py={1}
                        container
                        className={styles.newsbox}
                        
                    >

                        {/* {
                            NavLinks.map((item, index) => (
                                <Typography variant="body1" component="div" px={2} key={index}>
                                    <Link href={item.pathname} className={`${styles.navLink} ${pathname === item.pathname && styles.active}`} > {item.title} </Link>
                                </Typography>
                            ))
                        } */}

                        <Box
                            mx={2}
                            className={styles.newsbar}
                        >
                            <Typography className={styles.scrollText} >
                                <Box component="span" mr={2} sx={{ fontWeight: "600" }}>
                                    KINDLY COIN PRICE: <Box component="span" sx={{ fontWeight: "400" }} > $0.0485 </Box>
                                </Box>
                                <Box component="span" mr={2} sx={{ fontWeight: "600" }}>
                                    MARKET CAP: <Box component="span" sx={{ fontWeight: "400" }} >  $314,977 </Box>
                                </Box>
                                <Box component="span" mr={2} sx={{ fontWeight: "600" }}>
                                    TRANSACTIONS: <Box component="span" sx={{ fontWeight: "400" }} > 589,475 </Box>
                                </Box>
                                |
                                <Box component="span" ml={2} sx={{ fontWeight: "400" }}>
                                    Kindly is the leading ecosystem to generate, process, and track measurable social impact. Join us on this journey to bring accounatability, trust and transparency to the giving space!
                                </Box>
                            </Typography>
                        </Box>

                    </Grid>

                    {
                        (showSearchBar || router.pathname !== "/") && (
                            <Box
                                sx={{ width: "auto" }}
                                xs={12}
                                mt={1}
                            >
                                <SearchBar
                                
                                    handleSearch={requestSearch}
                                    values={searchText}
                                    setValues={setSearchText}
                                />
                            </Box>
                        )
                    }
                </Toolbar>
            </AppBar>
        </Grid>
    );
}
