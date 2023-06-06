import React from 'react'
import Grid from '@mui/material/Grid';

function GridWithConnector({ connector, children }) {
    return (
        <Grid item xs={12} md={12} 
            sx={{
                minHeight:"100px",
                background: connector && "linear-gradient(#9FCA6F, #9FCA6F) no-repeat center/4px 100%"
            }}
        >
            {children}
        </Grid>
    )
}

export default GridWithConnector