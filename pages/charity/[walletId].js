import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import styles from '../../styles/Home.module.css'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Summary from '../../components/summary/Summary';
import TransactionsDataGrid from '../../components/transactionsDataGrid/TransactionsDataGrid';
import Header from '../../components/header/Header';
import { rows, columns, TokenSymbolDecimals } from "../../utils/data";
import { useSipContract } from "../../hooks/useSipContract";
import { ethers } from "ethers";
import { getAddress } from "ethers/lib/utils";
import { relativeTime,numberFormat } from "utils/helpers";


export default function Charity() {
    const router = useRouter();
    const walletId = useMemo(() => router.query.walletId, [router]);

    const { provider, sipContract } = useSipContract();
    const [customer, setCustomer] = useState();
    const [filterableRows, setFilterableRows] = useState([]);
    const [totalFeds, setTotalFeds] = useState({
        peopleFed: 0,
        treesPlanted: 0,
        animalsFed: 0
    });

    useEffect(() => {
        (async () => {
            if (!walletId)
                return;

            const res = await fetch(`/api/customer?wallet=${walletId}`);
            if (res.status === 200) {
                const data = await res.json();
                setCustomer(data.name);
            }
        })();
    }, [walletId])

    useEffect(() => {
        if (!walletId || !sipContract)
            return;

        (async () => {
            const cursor = 0;
            const result = await sipContract.getUserImpactTransactions(walletId, cursor, ethers.constants.MaxUint256);
            const userImpactIds = [...result[0]].reverse();
            const userImpacts = [...result[1]].reverse();

            let userTotalPeopleFed = 0, userTotalTreesPlanted = 0, userTotalAnimalsFed = 0;
            const tokenRates = await sipContract.tokenRates(userImpacts[0].token);

            let userImpact, rows = [];
            for (let i = 0; i < userImpacts.length; i++) {
                userImpact = userImpacts[i];

                // Get customer name from database
                let customer = userImpact.customer;
                const res = await fetch(`/api/customer?wallet=${userImpact.customer}`);
                if (res.status === 200) {
                  const data = await res.json();
                  customer = data.name;
                }

                // Get token decimals and symbol
                const tokenDecimals = TokenSymbolDecimals[getAddress(userImpact.token)]?.decimals ?? 18;
                const tokenSymbol = TokenSymbolDecimals[getAddress(userImpact.token)]?.symbol ?? 'USDT';

                userTotalPeopleFed += userImpact.peopleFeed.amount / tokenRates.peopleFeed;
                userTotalTreesPlanted += userImpact.treesPlant.amount / tokenRates.treesPlant;
                userTotalAnimalsFed += userImpact.animalsFeed.amount / tokenRates.animalsFeed;

                rows.push({
                    id: `${i}`,
                    createdBy: userImpact.customer,
                    output: Math.floor(ethers.utils.formatUnits(userImpact.peopleFeed.amount , tokenDecimals) / 0.2),
                    customer: customer,
                    age: relativeTime(userImpact.receivedTime * 1000),
                    value: userImpact.peopleFeed.amount / (10 ** tokenDecimals) + ' ' + tokenSymbol,
                    impact: 'People Fed',
                    fufilledBy: 'Food For Life Global',
                    status: userImpact.peopleFeed.acceptedTime <= 0 ? 'Received' : userImpact.peopleFeed.admittedTime <= 0 ? 'Processing' : 'Fulfilled',
                    transactionId: ''
                });
                rows.push({
                    id: `${i}t`,
                    createdBy: userImpact.customer,
                    output: Math.floor(ethers.utils.formatUnits(userImpact.treesPlant.amount , tokenDecimals) / 0.2),
                    customer: customer,
                    age: relativeTime(userImpact.receivedTime * 1000),
                    value: userImpact.treesPlant.amount / (10 ** tokenDecimals) + ' ' + tokenSymbol,
                    impact: 'Trees Planted',
                    fufilledBy: 'Kindly',
                    status: userImpact.treesPlant.acceptedTime <= 0 ? 'Received' : userImpact.treesPlant.admittedTime <= 0 ? 'Processing' : 'Fulfilled',
                    transactionId: ''
                });
                rows.push({
                    id: `${i}a`,
                    createdBy: userImpact.customer,
                    output: Math.floor(ethers.utils.formatUnits(userImpact.animalsFeed.amount , tokenDecimals) / 0.2),
                    customer: customer,
                    age: relativeTime(userImpact.receivedTime * 1000),
                    value: userImpact.animalsFeed.amount / (10 ** tokenDecimals) + ' ' + tokenSymbol,
                    impact: 'Animals Fed',
                    fufilledBy: 'Juliana’s Animal Sanctuary',
                    status: userImpact.animalsFeed.acceptedTime <= 0 ? 'Received' : userImpact.animalsFeed.admittedTime <= 0 ? 'Processing' : 'Fulfilled',
                    transactionId: ''
                });
            }

            setTotalFeds({
                peopleFed: Math.round(userTotalPeopleFed),
                treesPlanted: Math.round(userTotalTreesPlanted),
                animalsFed: Math.round(userTotalAnimalsFed)
            });
            setFilterableRows(rows);

            // Get tx hashes
            for (let i = 0; i < userImpactIds.length; i += 3) {
                // Get tx hash
                const filter = sipContract.filters.BuySocialImpact(userImpactIds[i]);
                const log = await provider.getLogs({
                    ...filter,
                    fromBlock: 39495857,    // Contract Creation Block
                    toBlock: 'latest'
                });
                for (let j = i; j < i + 3; j++) {
                    rows[j].transactionId = log[0].transactionHash;
                }
                setFilterableRows([...rows]);
            }
        })();
    }, [walletId, sipContract]);

    return (
        <>
            <Container maxWidth="lg" sx={{
                              padding:1
                            }}>
                <Header
                    headerText="Social Impact"
                    createdBy={customer || '...'}
                    showWalletID={true}
                    IdAddress={walletId || '...'}
                    showQRIcon={false}
                    showCopyIcon={false}
                />

                <Grid container
                    mt={4}
                    justifyContent="flex-end"
                >
                    <Grid item>
                        <Typography
                            sx={{
                                fontSize: "13px",
                                color: "#929292"
                            }}>
                            {/* 1m &nbsp;|&nbsp; 3m &nbsp;|&nbsp; 1y &nbsp;|&nbsp; All &nbsp;|&nbsp; Custom Period */}
                        </Typography>
                    </Grid>
                </Grid>

                {/* summary section */}
                <Grid container mt={1} spacing={2} justifyContent="space-evenly">
                    <Grid item xs={12} md={4}>
                        <Summary
                            summaryTotal={totalFeds.peopleFed}
                            summaryText="People Fed"
                            iconLink="/people-fed.svg"
                            summaryTotalFontSize="40px"
                            summaryTextFontSize="24px"
                            showInfoIcon
                            textAlign="center"
                            pending={false}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Summary
                            summaryTotal={totalFeds.treesPlanted}
                            summaryText="Trees Planted"
                            iconLink="/trees-planted.svg"
                            summaryTotalFontSize="40px"
                            summaryTextFontSize="24px"
                            showInfoIcon
                            textAlign="center"
                            pending={false}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Summary
                            summaryTotal={totalFeds.animalsFed}
                            summaryText="Animals Fed"
                            iconLink="/animals-fed.svg"
                            summaryTotalFontSize="40px"
                            summaryTextFontSize="24px"
                            showInfoIcon
                            textAlign="center"
                            pending={false}
                        />
                    </Grid>
                </Grid>

                {/* data grid */}
                <Paper
                    elevation={2}
                    sx={{
                        marginTop: 4,
                        padding: 1,
                        borderRadius: 2,
                      }}
                >
                    <Box
                        sx={{
                            borderBottom: "2px solid #F2F2F2"
                        }}
                    >
                        <Typography
                            variant="h6"
                            mb={2}
                            sx={{
                              color: "#979797",
                              padding:2
                            }}
                        >
                            Transaction Activity
                        </Typography>
                    </Box>
                    <TransactionsDataGrid rows={filterableRows} columns={columns} pageSize={10} />
                </Paper>
            </Container>
        </>
    )
}
