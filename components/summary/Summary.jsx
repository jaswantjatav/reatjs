import * as React from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import styles from "./Summary.module.css"
import { useRouter } from 'next/router';

export default function Summary({
    summaryTotal,
    summaryTotalVariant = "h4",
    summaryText,
    summaryTextVariant = "h6",
    summaryDate = "",
    summaryTotalTextColor = "#A4C971",
    summaryTextColor = "#9A9A9A",
    summaryTotalFontSize = "",
    summaryTextFontSize = "",
    textAlign = "",
    iconLink = "",
    iconText = "",
    iconHeight = "88",
    iconWidth = "84",
    iconBackgroundWidth = "114.05px",
    iconBackgroundHeight = "109.59px",
    showInfoIcon = false,
    showCheckIcon = false,
    processing = false,
    pending = true
}) {

    const router = useRouter()

    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 12,
        borderRadius: 5,
        width: "50%",
        marginTop: 2,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: theme.palette.mode === 'light' ? '#9FCA6F' : '#9FCA6F',
        },
    }));

    return (
        <>
            <Paper elevation={3}
                sx={{
                    display: "flex",
                    padding: 1,
                    position: "relative",
                    alignItems: "center",
                    borderRadius: 3,
                    border: !pending && "3px solid #9FCA6F"
                }}
                className="summerycard"
                >
                <Box
                    mr={1}
                    alt="Icon-logo"
                    sx={{
                        width: iconBackgroundWidth,
                        borderRadius: 2,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: (processing || pending) ? "#EEEEEE" : "#9FCA6F",
                        boxShadow: 3,
                        height: iconBackgroundHeight
                    }}
                >
                    {
                        iconLink === "" ? (

                            <Typography
                                sx={{
                                    fontSize: "40px",
                                    fontWeight: "bold",
                                    color: (processing || pending) ? "#C4C4C4" : "#EEEEEE",
                                }}
                            >
                                {iconText}
                            </Typography>
                        ) : (

                            <Image src={iconLink} height={iconHeight} width={iconWidth} className={styles.filter} alt="summary-icon" />
                        )
                    }

                </Box>
                <Box
                    p={1}
                    sx={{
                        width: "70%",
                        textAlign: textAlign || ""
                    }} >
                    <Typography
                        variant={summaryTotalVariant}
                        sx={{
                            color: summaryTotalTextColor,
                            fontWeight: "bold",
                            fontSize: summaryTotalFontSize,
                            lineHeight: 1.2
                        }}
                    >
                        {summaryTotal}
                    </Typography>
                    
                    {
                        processing ? (
                            <Typography
                                variant={summaryTextVariant}
                                sx={{
                                    color: summaryTextColor,
                                    fontSize: summaryTextFontSize
                                }}
                            >
                                Processing...
                            </Typography>
                        ) : pending ? (
                            <Typography
                                variant={summaryTextVariant}
                                sx={{
                                    color: summaryTextColor,
                                    fontSize: summaryTextFontSize
                                }}
                            >
                                Pending
                            </Typography>
                        ) : (
                            <Typography
                                variant={summaryTextVariant}
                                sx={{
                                    color: summaryTextColor,
                                    fontSize: summaryTextFontSize
                                }}
                            >
                                {summaryText}
                            </Typography>
                        )
                    }

                    {
                        summaryDate !== "" && (
                            <Typography
                                variant="body2"
                                sx={{
                                    color: "#9A9A9A",
                                    position: "absolute",
                                    right: "5%",
                                    bottom: "2%",
                                    fontSize: "12px"
                                }}
                            >
                                {summaryDate}
                            </Typography>
                        )
                    }

                    {
                        showInfoIcon && (
                            <Box
                                sx={{
                                    position: "absolute",
                                    right: "2%",
                                    top: "5%",
                                }}>
                                <Image src="/info-icon.svg" width={16} height={16} alt="info-icon" />
                            </Box>
                        )
                    }


                    {
                        (processing || pending) ? (
                            <Box
                                sx={{
                                    position: "absolute",
                                    right: "5%",
                                    top: "10%",
                                }}>
                                <Image src="/processing-icon.svg" width={22} height={22} alt="check-icon" />
                            </Box>
                        ) : (
                            showCheckIcon && (
                                <Box
                                    sx={{
                                        position: "absolute",
                                        right: "5%",
                                        top: "10%",
                                    }}>
                                    <Image src="/check-icon.svg" width={22} height={22} alt="check-icon" />
                                </Box>
                            )
                        )
                    }
                </Box>

            </Paper>
        </>
    );
}
