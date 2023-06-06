import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import GridViewIcon from '@mui/icons-material/GridView';
import { IconButton, Paper } from '@mui/material';
import Link from 'next/link';

import styles from "./Header.module.css"

function Header({
    headerText,
    createdBy,
    showWalletID,
    IDText = "Wallet ID",
    IdAddress,
    showQRIcon = true,
    showCopyIcon = true
}) {
    return (<>

        <Grid
            container
            mt={5}
            sx={{
                display: "flex",
                justifyContent: "space-between"
            }}

        >
            <Grid
                item
                sx={{
                    display: "flex",
                    flexWrap: "wrap"
                }}

            >
                <Typography variant='h4' sx={{
                    color: "#9FCA6F",
                    fontWeight: "bold",
                    fontSize: "42px"
                }}

                    className={styles.socialtitle}

                >
                    {headerText}
                </Typography>
                <Typography
                    variant='h4'
                    px={2}
                    sx={{
                        color: "#F0F0F0"
                    }}
                    className={styles.separator}
                >
                    |
                </Typography>
                <Typography
                    variant='h6'
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "22px"
                    }}

                    className={styles.socialcreatedby}
                >
                    Created by &nbsp;
                </Typography>
                <Typography
                    variant='h5'
                    pr={2}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        fontWeight: "bold",
                        fontSize: "22px"
                    }}
                    className={styles.socialcreatedby}
                >
                    {createdBy}
                </Typography>
            </Grid>

            {
                showWalletID && (
                    <Grid
                        item
                        pl={0}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            color: "#A4A4A4"
                        }}
                    >
                        <Typography
                            variant="subtitle2"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                color: "#A4A4A4",
                                wordBreak: "break-all"
                            }}
                        >
                            {IDText}:
                            <Link target="_blank" href={`https://polygonscan.com/tx/${IdAddress}`}  className={styles.id_address}>
                                <span>{IdAddress} &nbsp;</span>
                            </Link>
                        </Typography>

                        {showCopyIcon && (

                            <IconButton
                                sx={{
                                    backgroundColor: "#EEEDF1"
                                }}>
                                <ContentCopyIcon fontSize="small" />
                            </IconButton>
                        )}

                        {showQRIcon && (

                            <IconButton
                                sx={{
                                    backgroundColor: "#EEEDF1"
                                }}>
                                <GridViewIcon fontSize="small" />
                            </IconButton>
                        )}
                    </Grid>
                )
            }

        </Grid>
    </>);
}

export default Header;