import { Link } from "@mui/material";
import { truncateAddress } from "./helpers";

export const rows = [
    { id: 1, age: "22 sec ago", output: '12', impact: 'People Fed', fufilledBy: "35", status: "Money Sent", transactionId: "cca7507897abc89628f450e8b1e0c6fca4ec3f7b34cccf55f3f531c659ff4d79" },
    { id: 2, age: "4 mins ago", output: '126', impact: 'Animals Fed', fufilledBy: "35", status: "Money Received", transactionId: "cca7507897abc89628f450e8b1e0c6fca4ec3f7b34cccf55f3f531c659ff4d79" },
    { id: 3, age: "22 mins ago", output: '10,258', impact: 'People Fed', fufilledBy: "35", status: "Order Accepted", transactionId: "cca7507897abc89628f450e8b1e0c6fca4ec3f7b34cccf55f3f531c659ff4d79" },
    { id: 4, age: "49 mins ago", output: '138,924', impact: 'People Fed', fufilledBy: "35", status: "Order Accepted", transactionId: "cca7507897abc89628f450e8b1e0c6fca4ec3f7b34cccf55f3f531c659ff4d79" },
    { id: 5, age: "1 hr 14 mins ago", output: '56', impact: 'Animals Fed', fufilledBy: "35", status: "Processing", transactionId: "cca7507897abc89628f450e8b1e0c6fca4ec3f7b34cccf55f3f531c659ff4d79" },
    { id: 6, age: "1 day 4 hrs ago", output: '1,845,269', impact: 'Trees Planted', fufilledBy: "35", status: "Processing", transactionId: "cca7507897abc89628f450e8b1e0c6fca4ec3f7b34cccf55f3f531c659ff4d79" },
    { id: 7, age: "36 days 10 hrs ago", output: '3,786', impact: 'People Fed', fufilledBy: "35", status: "Completed", transactionId: "cca7507897abc89628f450e8b1e0c6fca4ec3f7b34cccf55f3f531c659ff4d79" },
    { id: 8, age: "1 day 4 hrs ago", output: '11,246,983', impact: 'Jon', fufilledBy: "35", status: "Completed", transactionId: "cca7507897abc89628f450e8b1e0c6fca4ec3f7b34cccf55f3f531c659ff4d79" },

];

export const rows2 = [
    { id: 1, createdBy: "ABC Company", age: "22 sec ago", output: '12', impact: 'People Fed', fufilledBy: "35", status: "Money Sent", transactionId: "cca7507897abc89628f450e8b1e0c6fca4ec3f7b34cccf55f3f531c659ff4d79" },
    { id: 2, createdBy: "0x4513BD1247C661f28921aDa65e5A695ab1d5GY7U", age: "4 mins ago", output: '126', impact: 'Animals Fed', fufilledBy: "35", status: "Money Received", transactionId: "cca7507897abc89628f450e8b1e0c6fca4ec3f7b34cccf55f3f531c659ff4d79" },
    { id: 3, createdBy: "Toronto Hospital", age: "22 mins ago", output: '10,258', impact: 'People Fed', fufilledBy: "35", status: "Order Accepted", transactionId: "" },
    { id: 4, createdBy: "0x4513BD1247C661f28921aDa65e5A695ab1d5GY7U", age: "49 mins ago", output: '138,924', impact: 'People Fed', fufilledBy: "35", status: "Order Accepted", transactionId: "cca7507897abc89628f450e8b1e0c6fca4ec3f7b34cccf55f3f531c659ff4d79" },
    { id: 5, createdBy: "0x4513BD1247C661f28921aDa65e5A695ab1d5GY7U", age: "1 hr 14 mins ago", output: '56', impact: 'Animals Fed', fufilledBy: "35", status: "Processing", transactionId: "cca7507897abc89628f450e8b1e0c6fca4ec3f7b34cccf55f3f531c659ff4d79" },
    { id: 6, createdBy: "Heart Foundation", age: "1 day 4 hrs ago", output: '1,845,269', impact: 'Trees Planted', fufilledBy: "35", status: "Processing", transactionId: "cca7507897abc89628f450e8b1e0c6fca4ec3f7b34cccf55f3f531c659ff4d79" },
    { id: 7, createdBy: "0x4513BD1247C661f28921aDa65e5A695ab1d5GY7U", age: "36 days 10 hrs ago", output: '3,786', impact: 'People Fed', fufilledBy: "35", status: "Completed", transactionId: "cca7507897abc89628f450e8b1e0c6fca4ec3f7b34cccf55f3f531c659ff4d79" },
];

export const columns = [
    { 
        field: 'age', 
        headerName: 'Age', 
        width: 90 
    },
    {
        field: 'value',
        headerName: 'value',
        width: 130,
    },
    {
        field: 'createdBy',
        headerName: 'Purchased by',
        width: 150,
        renderCell: (params) => (
            <Link href={`/charity/${params.value}`}
                sx={{
                    color: "#7E9951",
                    textDecoration: "none"
                }}
            >
                {params.row.customer}
            </Link>
        ),
    },
    {
        field: 'output',
        headerName: 'Output',
        width: 90,
    },
    {
        field: 'impact',
        headerName: 'Impact',
        width: 110,
    },
    {
        field: 'fufilledBy',
        headerName: 'Processed by',
        width: 200,
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 110,
    },
    {
        field: 'transactionId',
        headerName: 'Transaction ID',
        width: 280,
        renderCell: (params) => (
            <Link href={`/transaction/${params.value}/${params.id.slice(-1) == 't' ? 2 : params.id.slice(-1) == 'a' ? 3 : 1}`}
                sx={{
                    color: "#7E9951",
                    textDecoration: "none"
                }}
            >
                {params.value.length > 13 ? truncateAddress(params.value, 7, 58) : params.value}
            </Link>
        ),
    }
];

export const columns2 = [
    { 
        field: 'age', 
        headerName: 'Age', 
        width: 90 
    },
    {
        field: 'value',
        headerName: 'Value',
        width: 130,
    },
    {
        field: 'createdBy',
        headerName: 'Purchased by',
        width: 150,
        renderCell: (params) => (
            <Link href={`/charity/${params.row.customer}`}
                sx={{
                    color: "#7E9951",
                    textDecoration: "none"
                }}
            >
                {params.value}
            </Link>
        ),
    },
    {
        field: 'output',
        headerName: 'Output',
        width: 90,
    },
    {
        field: 'impact',
        headerName: 'Impact',
        width: 110,
    },
    {
        field: 'fufilledBy',
        headerName: 'Processed by',
        width: 200,
        renderCell: (params) => (
            <Link href={`/charity/${params.row.customer}`}
                sx={{
                    color: "#7E9951",
                    textDecoration: "none"
                }}
            >
                {params.value}
            </Link>
        ),
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 110,
    },
    {
        field: 'transactionId',
        headerName: 'Order TxID',
        width: 150,
        renderCell: (params) => (
            <Link href={`/transaction/${params.value}/${params.id.slice(-1) == 't' ? 2 : params.id.slice(-1) == 'a' ? 3 : 1}`}
                sx={{
                    color: "#7E9951",
                    textDecoration: "none"
                }}
            >
                {params.value.length > 13 ? truncateAddress(params.value, 7, 58) : params.value}
            </Link>
        ),
    }
];

export const UnSdgIcons = [
    {
        iconLink: '/un-sdgs/1.png',
        'People Fed': true,
        'Trees Planted': true,
        'Animals Fed': false
    },
    {
        iconLink: '/un-sdgs/2.png',
        'People Fed': true,
        'Trees Planted': true,
        'Animals Fed': false
    },
    {
        iconLink: '/un-sdgs/3.png',
        'People Fed': true,
        'Trees Planted': false,
        'Animals Fed': false
    },
    {
        iconLink: '/un-sdgs/4.png',
        'People Fed': true,
        'Trees Planted': false,
        'Animals Fed': false
    },
    {
        iconLink: '/un-sdgs/5.png',
        'People Fed': false,
        'Trees Planted': false,
        'Animals Fed': false
    },
    {
        iconLink: '/un-sdgs/6.png',
        'People Fed': false,
        'Trees Planted': true,
        'Animals Fed': false
    },
    {
        iconLink: '/un-sdgs/7.png',
        'People Fed': false,
        'Trees Planted': false,
        'Animals Fed': false
    },
    {
        iconLink: '/un-sdgs/8.png',
        'People Fed': false,
        'Trees Planted': true,
        'Animals Fed': false
    },
    {
        iconLink: '/un-sdgs/9.png',
        'People Fed': false,
        'Trees Planted': false,
        'Animals Fed': false
    },
    {
        iconLink: '/un-sdgs/10.png',
        'People Fed': true,
        'Trees Planted': true,
        'Animals Fed': false
    },
    {
        iconLink: '/un-sdgs/11.png',
        'People Fed': true,
        'Trees Planted': false,
        'Animals Fed': false
    },
    {
        iconLink: '/un-sdgs/12.png',
        'People Fed': false,
        'Trees Planted': true,
        'Animals Fed': false
    },
    {
        iconLink: '/un-sdgs/13.png',
        'People Fed': true,
        'Trees Planted': true,
        'Animals Fed': true
    },
    {
        iconLink: '/un-sdgs/14.png',
        'People Fed': false,
        'Trees Planted': false,
        'Animals Fed': true
    },
    {
        iconLink: '/un-sdgs/15.png',
        'People Fed': false,
        'Trees Planted': true,
        'Animals Fed': true
    },
    {
        iconLink: '/un-sdgs/16.png',
        'People Fed': false,
        'Trees Planted': false,
        'Animals Fed': false
    },
    {
        iconLink: '/un-sdgs/17.png',
        'People Fed': false,
        'Trees Planted': true,
        'Animals Fed': false
    },
    {
        iconLink: '/un-sdgs/18.png',
        'People Fed': true,
        'Trees Planted': true,
        'Animals Fed': true
    }
];

export const TokenSymbolDecimals = {
    '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174': {
        decimals: 6,
        symbol: 'USDC'
    }
};