import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Summary from '../../../components/summary/Summary';
import Header from '../../../components/header/Header';
import TransactionDetails from '../../../components/transactionDetails/TransactionDetails';
import GridWithConnector from '../../../components/gridWithConnector/GridWithConnector';
import { localeDate, truncateAddress } from '../../../utils/helpers';
import { useSipContract } from '../../../hooks/useSipContract';
import { TokenSymbolDecimals } from '../../../utils/data';
import { getAddress } from 'ethers/lib/utils';

function Transaction() {
    const router = useRouter();
    const { provider, sipContract } = useSipContract();

    const [txID, setTxID] = useState();
    const [impactType, setImpactType] = useState();
    const [donateInfo, setDonateInfo] = useState({
        customer: 'Getting...',
        receivedTime: 0,
        acceptedTime: 0,
        admittedTime: 0,
        status: 'Getting...',
        amount: 'Getting...',
        type: 'Getting...',
        source: 'Getting...',
        fulfilledBy: 'Getting...'
    });

    useEffect(() => {
        setTxID(router.query.transactionId);
        setImpactType(router.query.impactType);
    }, [router]);

    useEffect(() => {
        (async () => {
            if (provider && sipContract && txID) {
                const tx = await provider.getTransactionReceipt(txID);
                const donateId = tx.logs[0].topics[1];

                const info = await sipContract.impactTransactions(donateId);
                const tokenDecimals = TokenSymbolDecimals[getAddress(info.token)]?.decimals ?? 18;

                console.log("info: ", info);

                let customer = truncateAddress(info.customer, 10, 35);
                const res = await fetch(`/api/customer?wallet=${info.customer}`);
                if (res.status === 200) {
                    const data = await res.json();
                    customer = data.name;
                }

                if (impactType == 1) {
                    setDonateInfo({
                        customer: customer,
                        receivedTime: info.receivedTime,
                        acceptedTime: info.peopleFeed.acceptedTime,
                        admittedTime: info.peopleFeed.admittedTime,
                        status: info.peopleFeed.acceptedTime <= 0 ? 'Received' : info.peopleFeed.admittedTime <= 0 ? 'Processing' : 'Fulfilled',
                        amount: Math.floor(ethers.utils.formatUnits(info.peopleFeed.amount, tokenDecimals) / 0.2),
                        type: 'People Fed',
                        source: 'Direct Purchase',
                        fulfilledBy: 'Food For Life Global'
                    });
                } else if (impactType == 2) {
                    setDonateInfo({
                        customer: customer,
                        receivedTime: info.receivedTime,
                        acceptedTime: info.treesPlant.acceptedTime,
                        admittedTime: info.treesPlant.admittedTime,
                        status: info.treesPlant.acceptedTime <= 0 ? 'Received' : info.treesPlant.admittedTime <= 0 ? 'Processing' : 'Fulfilled',
                        amount: Math.floor(ethers.utils.formatUnits(info.treesPlant.amount, tokenDecimals) / 0.2),
                        type: 'Trees Planted',
                        source: 'Direct Purchase',
                        fulfilledBy: 'Kindly'
                    });
                } else {
                    setDonateInfo({
                        customer: customer,
                        receivedTime: info.receivedTime,
                        acceptedTime: info.animalsFeed.acceptedTime,
                        admittedTime: info.animalsFeed.admittedTime,
                        status: info.animalsFeed.acceptedTime <= 0 ? 'Received' : info.animalsFeed.admittedTime <= 0 ? 'Processing' : 'Fulfilled',
                        amount: Math.floor(ethers.utils.formatUnits(info.animalsFeed.amount, tokenDecimals) / 0.2),
                        type: 'Animals Fed',
                        source: 'Direct Purchase',
                        fulfilledBy: 'Juliana’s Animal Sanctuary'
                    });
                }
            }
        })();
    }, [provider, sipContract, router, txID]);

    return (
        <>
            <Container maxWidth="lg"  mt={2}  sx={{ marginBottom: 25,marginTop:"0px",padding:1 }}>
                <Header
                    headerText="Transactions"
                    createdBy={donateInfo.customer}
                    showWalletID={true}
                    IDText="TxID"
                    IdAddress={txID}
                    showQRIcon={false}
                    showCopyIcon={false}
                />

                {/* data grid */}
                <Paper
                    elevation={2}
                    sx={{
                        marginTop: 3,
                        borderRadius: 2,
                    }}
                >
                    <Grid  container>
                        {/* left side */}
                        <Grid item container xs={12} md={5}
                            px={2}
                            py={0}
                            justifyContent="center"
                        >
                            <Grid item xs={12} md={12} mb={1}
                                sx={{
                                    display: "flex",
                                    alignItems: "flex-start"

                                }} >
                                <Typography variant='h5'
                                    pt={2}
                                    sx={{

                                        color: "#000000",
                                        fontSize: "22px",
                                        display: "flex",
                                        alignItems: "flex-start",
                                    }}>
                                    Social Impact Journey
                                </Typography>
                            </Grid>

                            <GridWithConnector 
                                connector={true}
                            >

                                <Summary
                                    summaryTotal="Money Sent"
                                    summaryText={donateInfo.customer ? `From ${truncateAddress(donateInfo.customer, 10, 28)}` : ''}
                                    summaryDate={localeDate(donateInfo.receivedTime)}
                                    summaryTotalFontSize="18px"
                                    summaryTextFontSize="14px"
                                    summaryTotalTextColor="#434343"
                                    summaryTextColor="#434343"
                                    iconText='1'
                                    iconHeight="38"
                                    iconWidth="34"
                                    iconBackgroundWidth="53px"
                                    iconBackgroundHeight="53px"
                                    pending={false}
                                    showCheckIcon
                                />

                            </GridWithConnector>

                            <GridWithConnector
                                connector={true}
                            >
                                <Summary
                                    summaryTotal="Money Received"
                                    summaryText="To Kindly Ecosystem"
                                    summaryDate={localeDate(donateInfo.receivedTime)}
                                    summaryTotalFontSize="18px"
                                    summaryTextFontSize="14px"
                                    summaryTotalTextColor="#434343"
                                    summaryTextColor="#434343"
                                    iconText='2'
                                    iconHeight="38"
                                    iconWidth="34"
                                    iconBackgroundWidth="53px"
                                    iconBackgroundHeight="53px"
                                    pending={false}
                                    showCheckIcon
                                />
                            </GridWithConnector>

                            <GridWithConnector
                                connector={donateInfo.acceptedTime > 0}
                            >
                                <Summary
                                    summaryTotal="Order Accepted"
                                    summaryText={'By ' + donateInfo.fulfilledBy}
                                    summaryDate={localeDate(donateInfo.acceptedTime)}
                                    summaryTotalFontSize="18px"
                                    summaryTextFontSize="14px"
                                    summaryTotalTextColor="#434343"
                                    summaryTextColor="#434343"
                                    iconText='3'
                                    iconHeight="38"
                                    iconWidth="34"
                                    iconBackgroundWidth="53px"
                                    iconBackgroundHeight="53px"
                                    pending={donateInfo.acceptedTime <= 0}
                                    showCheckIcon
                                />
                            </GridWithConnector>

                            <GridWithConnector
                                connector={donateInfo.acceptedTime > 0}
                            >
                                <Summary
                                    summaryTotal="Processing"
                                    summaryText="Impact being generated"
                                    summaryDate={localeDate(donateInfo.acceptedTime)}
                                    summaryTotalFontSize="18px"
                                    summaryTextFontSize="14px"
                                    summaryTotalTextColor="#434343"
                                    summaryTextColor="#434343"
                                    iconText='4'
                                    iconHeight="38"
                                    iconWidth="34"
                                    iconBackgroundWidth="53px"
                                    iconBackgroundHeight="53px"
                                    pending={donateInfo.acceptedTime <= 0 && donateInfo.admittedTime <= 0}
                                    showCheckIcon
                                />
                            </GridWithConnector>

                            <GridWithConnector
                                connector={false}
                            >
                                <Summary
                                    summaryTotal="Fulfilled"
                                    summaryText={`${donateInfo.amount} ${donateInfo.type}`}
                                    summaryDate={localeDate(donateInfo.admittedTime)}
                                    summaryTotalFontSize="18px"
                                    summaryTextFontSize="14px"
                                    summaryTotalTextColor="#434343"
                                    summaryTextColor="#434343"
                                    iconText='5'
                                    iconHeight="38"
                                    iconWidth="34"
                                    iconBackgroundWidth="53px"
                                    iconBackgroundHeight="53px"
                                    pending={donateInfo.admittedTime <= 0}
                                    showCheckIcon
                                />
                            </GridWithConnector>

                            <Grid item xs={12} md={12}>
                                <Typography
                                    py={2}
                                    variant="body1"
                                    sx={{ fontSize: "22px" }}
                                >
                                    Disclaimer

                                </Typography>

                                <Typography
                                    variant="body1"
                                    sx={{ fontSize: "16px" }}
                                >
                                    {(() => {
                                        if (impactType === 1) {
                                            return "Processing times are estimated based on each social impact partners corresponding average fulfillment time. This impact partner has  acknowledged their average processing times and guarantee that impacts not processed within that time frame will be fulfilled no later than 30 days from the initial date of purchase.";
                                        } else if (impactType === 2) {
                                            return "Processing times are estimated based on each social impact partners corresponding average fulfillment time. This impact partner has  acknowledged their average processing times and guarantee that impacts not processed within that time frame will be fulfilled no later than 480 days from the initial date of purchase.";
                                        } else {
                                            return "Processing times are estimated based on each social impact partners corresponding average fulfillment time. This impact partner has  acknowledged their average processing times and guarantee that impacts not processed within that time frame will be fulfilled no later than 30 days from the initial date of purchase.";
                                        }
                                    })()}
                                </Typography>
                            </Grid>
                        </Grid>

                        {/* Right side */}
                        <TransactionDetails donateInfo={donateInfo} />
                    </Grid>
                </Paper>
            </Container>

        </>
    )
}

export default Transaction