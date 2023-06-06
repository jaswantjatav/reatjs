import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Summary from "../components/summary/Summary";
import TransactionsDataGrid from "../components/transactionsDataGrid/TransactionsDataGrid";
import Header from "../components/header/Header";
import SearchBar from "../components/searchBar/SearchBar";
import { columns2 } from "../utils/data";
import { filterData, numberFormat } from "../utils/helpers";
import { useQuery } from "@apollo/client";
import DONATIONS_QUERY from "../graphql/donations.query";
import { relativeTime } from "../utils/helpers";
import { useSipContract } from "../hooks/useSipContract";
import { getAddress } from "ethers/lib/utils";
import { TokenSymbolDecimals } from "../utils/data";
import { ethers } from 'ethers';

export default function Home() {
  const router = useRouter();
  const intialSearchText = router.query.searchText || "";
  const { sipContract } = useSipContract();

  const { data, loading, error } = useQuery(DONATIONS_QUERY);

  const [searchText, setSearchText] = useState(intialSearchText);
  const [filterableRows, setFilterableRows] = useState([]);
  const [defaultData, setDefaultData] = useState([]); // Default state to save all data before filter
  const [totalFeds, setTotalFeds] = useState({
    peopleFed: 0,
    treesPlanted: 0,
    animalsFed: 0
  });

  const requestSearch = (rows) => {
    // Filter rows based on the company or charity or address or txid

    // Return defaultData state when searchText is an empty string
    if (searchText === "") {
      setFilterableRows(defaultData)
      return
    }

    // filter by address
    const filteredDataByCompany = filterData("createdBy", rows, searchText);
    let filteredDataByCharity;
    let filteredDataByAddress;

    if (filteredDataByCompany.length > 0) {
      setFilterableRows(filteredDataByCompany);
    }

    if (filteredDataByCompany.length === 0) {
      // filter by transactionID
      filteredDataByCharity = filterData("transactionId", rows, searchText);
      setFilterableRows(filteredDataByCharity);
    }

    // TODO: replace filter column with actual column name
    if (
      filteredDataByCompany.length === 0 &&
      filteredDataByCharity.length === 0
    ) {
      // filter by company Name
      filteredDataByAddress = filterData("output", filterableRows, searchText);
      setFilterableRows(filteredDataByAddress);
    }
  };

  useEffect(() => {
    (async () => {
      if (loading || error || !sipContract)
        return;

      sipContract.getTotalFeds().then(feds => {
        const [peopleFed, treesPlanted, animalsFed] = feds;
        setTotalFeds({
          peopleFed, treesPlanted, animalsFed
        });
      });

      let donations = [];

      data.ethereum.smartContractEvents.forEach(e => {
        let donationItem = {
          timestamp: e.block.timestamp.unixtime,
          hash: e.transaction.hash
        };

        e.arguments.forEach(arg => {
          donationItem[arg.argument] = arg.value;
        });

        donations.push(donationItem);
      });
      let rows = [];



      for (let i = 0; i < donations.length; i++) {
        const d = donations[i];


      const tokenRates = await sipContract.tokenRates(d.token);

        // Get customer name from database
        let customer = d.customer;
        console.log('customer ', customer);

        const res = await fetch(`/api/customer?wallet=${d.customer}`);
        if (res.status === 200) {
          const data = await res.json();
          customer = data.name;
        }

        // Get token decimals and symbol
        const tokenDecimals = TokenSymbolDecimals[getAddress(d.token)]?.decimals ?? 18;
        const tokenSymbol = TokenSymbolDecimals[getAddress(d.token)]?.symbol ?? 'USDT';

        let one = {
          id: d.impactId.toString(),
          createdBy: customer,
          customer: d.customer,
          age: relativeTime(d.timestamp * 1000),
          value: d.peopleFeedAmount / (10 ** tokenDecimals) + ' ' + tokenSymbol,
          output: (ethers.utils.formatUnits(d.peopleFeedAmount , tokenDecimals) / 0.2).toFixed(2) ,
          impact: 'People Fed',
          fufilledBy: 'Food For Life Global',
          status: 'Getting...',
          transactionId: d.hash
        };

        rows.push({
          ...one,
          impactType: 1
        });

        rows.push({
          ...one,
          id: one.id + 't',
          impact: 'Trees Planted',
          impactType: 2,
          value: d.treesPlantAmount / (10 ** 6) + ' USDC',
          output: Math.floor(ethers.utils.formatUnits(d.treesPlantAmount , tokenDecimals) / 0.2) ,
          fufilledBy: 'Kindly',
        });

        rows.push({
          ...one,
          id: one.id + 'a',
          impact: 'Animals Fed',
          impactType: 3,
          value: d.animalsFeedAmount / (10 ** 6) + ' USDC',
          output:Math.floor(ethers.utils.formatUnits(d.animalsFeedAmount , tokenDecimals) / 0.2) ,
          fufilledBy: 'Juliana’s Animal Sanctuary',
        });
      }

      setFilterableRows(rows);
      setDefaultData(rows);

      for (let i = 0; i < rows.length; i += 3) {
        // Get donation status by donate id
        const info = await sipContract.impactTransactions(rows[i].id);
        for (let j = i; j < i + 3; j++) {
          rows[j].status = info.peopleFeed.acceptedTime <= 0 ? 'Received' : info.peopleFeed.admittedTime <= 0 ? 'Processing' : 'Fulfilled';
        }
        setFilterableRows([...rows]);
      }
    })();
  }, [data, sipContract]);

  console.log(filterableRows);
  return (
    <>
      <Container maxWidth="lg" mt={2} sx={{marginTop:"0px",padding:1}}>
        <Header headerText="Social Impact" createdBy="The Kindly Ecosytem" />

        {/* searchbar */}
        <Grid container mt={4} justifyContent="flex-start">
          <SearchBar
            size="large"
            handleSearch={() => requestSearch(filterableRows)}
            values={searchText}
            setValues={setSearchText}
          />
        </Grid>

        <Grid container mt={4} justifyContent="flex-start">
          <Grid item>
            <Typography
              sx={{
                fontSize: "42px",
                color: "#9B9B9B",
                fontWeight: "bold",
                lineHeight:"48px"
              }}
            >
              See How We’re Changing the World
            </Typography>
          </Grid>
        </Grid>

        <Grid container mt={1} justifyContent="flex-end">
          <Grid item>
            <Typography
              sx={{
                fontSize: "13px",
                color: "#929292",
              }}
            >
              {/* 1m &nbsp;|&nbsp; 3m &nbsp;|&nbsp; 1y &nbsp;|&nbsp; All
              &nbsp;|&nbsp; Custom Period */}
            </Typography>
          </Grid>
        </Grid>

        {/* summary section */}
        <Grid container mt={1} spacing={2} justifyContent="space-evenly">
          <Grid item xs={12} md={4}>
            <Summary
              summaryTotal={numberFormat(totalFeds.peopleFed)}
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
              summaryTotal={numberFormat(totalFeds.treesPlanted)}
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
              summaryTotal={numberFormat(totalFeds.animalsFed)}
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
          className="dataGridTable"
        >
          <Box
            sx={{
              borderBottom: "2px solid #F2F2F2",
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
              Latest Social Impacts Generated
            </Typography>
          </Box>
          {loading
            ? <p>Loading...</p>
            : <TransactionsDataGrid rows={filterableRows} columns={columns2} pageSize={10} />
          }
        </Paper>
      </Container>
    </>
  );
}
