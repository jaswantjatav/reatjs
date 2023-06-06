import React from 'react';
import Image from 'next/image';
import cx from 'classnames';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { UnSdgIcons } from '../../utils/data';

import styles from "./TransactionDetails.module.css";

function TransactionDetails({ donateInfo }) {
    return (
        <>
            <Grid item xs={12} md={7} px={2} py={2}
                sx={{
                    borderLeft: 2,
                    borderLeftColor: "rgba(193,193,193, 0.5)",
                    height:"100%"
                }}>

                <Box
                    py={2}
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        borderBottom: 1,
                        borderBottomColor: "rgba(193,193,193, 0.5)",
                        flexWrap:"wrap"
                    }}
                >
                    <Typography variant='h4'
                        sx={{
                            color: "#000000",
                            fontSize: "22px",
                            display: "flex",
                            alignItems: "center",
                        }} >
                        Transaction Details
                    </Typography>

                    <Typography variant='h4' sx={{
                        color: "#9FCA6F",
                        fontSize: "32px",
                        fontWeight: "bold",
                    }}>
                        {donateInfo.amount} {donateInfo.type}
                    </Typography>
                </Box>

                <Box
                    py={1}
                    sx={{
                        width: "100%",
                        height: "7%",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        borderBottom: 1,
                        borderBottomColor: "rgba(193,193,193, 0.5)"
                    }}
                >
                    <Typography variant='body1' sx={{
                        color: "#434343",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        width: "40%"
                    }}>
                        Purchased by: &nbsp;
                    </Typography>

                    <Typography
                        variant='body2'
                        px={3}
                        py={1}
                        ml={2}
                        sx={{
                            height: "7%",
                            color: "#434343",
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: "rgba(159,202,111,0.3)",
                            borderRadius: 5,
                            fontSize: "15px",
                            width:"150px",
                            justifyContent:"center"
                        }}>
                        {donateInfo.customer}
                    </Typography>
                </Box>


                <Box
                    py={1}
                    sx={{
                        width: "100%",
                        height: "7%",
                        display: "flex",
                        alignItems: "center",
                        borderBottom: 1,
                        borderBottomColor: "rgba(193,193,193, 0.5)"
                    }}
                >
                    <Typography variant='body1' sx={{
                        color: "#434343",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        width: "40%"
                    }}>
                        Impact Status: &nbsp;
                    </Typography>

                    <Typography
                        variant='body2'
                        px={3}
                        py={1}
                        ml={2}
                        sx={{
                            height: "7%",
                            color: "#434343",
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: "rgba(159,202,111,0.3)",
                            borderRadius: 5,
                            fontSize: "15px",
                            width:"150px",
                            justifyContent:"center"
                        }}>
                        {donateInfo.status}
                    </Typography>
                </Box>


                <Box
                    py={1}
                    sx={{
                        width: "100%",
                        height: "7%",
                        display: "flex",
                        alignItems: "center",
                        borderBottom: 1,
                        borderBottomColor: "rgba(193,193,193, 0.5)"
                    }}
                >
                    <Typography variant='body1' sx={{
                        color: "#434343",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        width: "40%"
                    }}>
                        Impact Amount: &nbsp;
                    </Typography>

                    <Typography
                        variant='body2'
                        px={3}
                        py={1}
                        ml={2}
                        sx={{
                            height: "7%",
                            color: "#434343",
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: "rgba(159,202,111,0.3)",
                            borderRadius: 5,
                            fontSize: "15px",
                            width:"150px",
                            justifyContent:"center"
                        }} >
                        {donateInfo.amount}
                    </Typography>
                </Box>


                <Box
                    py={1}
                    sx={{
                        width: "100%",
                        height: "7%",
                        display: "flex",
                        alignItems: "center",
                        borderBottom: 1,
                        borderBottomColor: "rgba(193,193,193, 0.5)"
                    }}
                >
                    <Typography variant='body1' sx={{
                        color: "#434343",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        width: "40%"
                    }}>
                        Type of Impact: &nbsp;
                    </Typography>

                    <Typography
                        variant='body2'
                        px={3}
                        py={1}
                        ml={2}
                        sx={{
                            height: "7%",
                            color: "#434343",
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: "rgba(159,202,111,0.3)",
                            borderRadius: 5,
                            fontSize: "15px",
                            width:"150px",
                            justifyContent:"center"
                        }}>
                        {donateInfo.type}
                    </Typography>
                </Box>


                <Box
                    py={1}
                    sx={{
                        width: "100%",
                        height: "7%",
                        display: "flex",
                        alignItems: "center",
                        borderBottom: 1,
                        borderBottomColor: "rgba(193,193,193, 0.5)"
                    }}
                >
                    <Typography variant='body1' sx={{
                        color: "#434343",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        width: "40%"
                    }}>
                        Source of Impact: &nbsp;
                    </Typography>

                    <Typography variant='body2'
                        px={3}
                        py={1}
                        ml={2}
                        sx={{
                            height: "7%",
                            color: "#434343",
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: "rgba(159,202,111,0.3)",
                            borderRadius: 5,
                            fontSize: "15px",
                            width:"150px",
                            justifyContent:"center"
                        }}>
                        {donateInfo.source}
                    </Typography>
                </Box>

                <Box
                    py={1}
                    sx={{
                        width: "100%",
                        height: "7%",
                        display: "flex",
                        alignItems: "center",
                        borderBottom: 1,
                        borderBottomColor: "rgba(193,193,193, 0.5)"
                    }}
                >
                    <Typography variant='body1' sx={{
                        color: "#434343",
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        width: "40%"
                    }}>
                        Processed by: &nbsp;
                    </Typography>

                    <Typography variant='body2'
                        px={3}
                        py={1}
                        ml={2}
                        sx={{
                            height: "7%",
                            color: "#434343",
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: "rgba(159,202,111,0.3)",
                            borderRadius: 5,
                            fontSize: "15px",
                            width:"150px",
                            justifyContent:"center"
                        }}>
                        {donateInfo.fulfilledBy}
                    </Typography>
                </Box>

                <Box
                    py={2}
                    mb={3}
                    sx={{
                        width: "100%"
                    }}
                >
                    <Typography sx={{
                        color: "#434343",
                    }}>
                        UN Sustainable Development Goals (SDG) Impacted
                    </Typography>

                    <Box
                        py={2}
                        sx={{
                            width: "100%",
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent:"center"
                        }}
                    >
                        {UnSdgIcons.map((item, index) => (
                            <Image
                                key={index}
                                src={item.iconLink}
                                width={96}
                                height={97}
                                className={
                                    cx(styles.sdgIcon, !item[donateInfo.type] && styles.disabled)
                                }
                                alt="UN-SDG-icon"
                            />
                        ))}
                    </Box>
                </Box>
            </Grid>
        </>
    )
}

export default TransactionDetails