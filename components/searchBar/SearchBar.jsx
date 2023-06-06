import * as React from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';

import styles from "./SearchBar.module.css";

export default function SearchBar({ size = "small", handleSearch, values, setValues }) {

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSearch(event)
        }
    };

    return (
        <Box
            className={styles.searchbar}
        >
            <FormControl fullWidth sx={{
                width: "100%"
            }}>
                <InputLabel htmlFor="searchbar"></InputLabel>
                <OutlinedInput
                    sx={{ minHeight: "50px" }}
                    id="searchbar"
                    value={values}
                    onChange={(event) => setValues(event.target.value)}
                    onKeyPress={handleKeyPress}
                    startAdornment={<InputAdornment position="start"><SearchIcon fontSize='large' ></SearchIcon></InputAdornment>}
                    label=""
                    size={size}
                    placeholder='Search by Company / Impact Partner / Name / Address / TxID'

                />
            </FormControl>
        </Box>
    );
}
