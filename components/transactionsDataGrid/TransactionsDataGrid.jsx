import * as React from 'react';
import Box from '@mui/material/Box';
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses, GridToolbar } from '@mui/x-data-grid';


// Create a stripped table
const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.even`]: {
        backgroundColor: theme.palette.grey[200],
        '&:hover, &.Mui-hovered': {
            backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
            '@media (hover: none)': {
                backgroundColor: 'transparent',
            },
        },
        '&.Mui-selected': {
            backgroundColor: alpha(
                theme.palette.primary.main,
                ODD_OPACITY + theme.palette.action.selectedOpacity,
            ),
            '&:hover, &.Mui-hovered': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    ODD_OPACITY +
                    theme.palette.action.selectedOpacity +
                    theme.palette.action.hoverOpacity,
                ),
                // Reset on touch devices, it doesn't add specificity
                '@media (hover: none)': {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        ODD_OPACITY + theme.palette.action.selectedOpacity,
                    ),
                },
            },
        },
    },
}));

export default function TransactionsDataGrid({
    rows,
    columns,
    pageSize = 6
}) {

    return (
        <Box sx={{ display: "flex", height: '100%', width: '100%' }}>
            <StripedDataGrid
                sx={{
                    border: 0
                }}
                rows={rows}
                columns={columns}
                pageSize={pageSize}
                pageSizeOptions={[0, 10]}
                components={{ Toolbar: GridToolbar }}
                rowsPerPageOptions={[10]}
                autoHeight={true} 
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
                getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                }
            />
        </Box>
    );
}
