import { SearchRounded } from '@mui/icons-material';
import { Autocomplete, InputAdornment, TextField } from '@mui/material';
import React from 'react';

const SearchInput = () => {
  return (
    <Autocomplete
      freeSolo
      id="search"
      clearOnBlur
      options={top100Films.map((option) => option.title)}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search a word"
          size="small"
          InputProps={{
            ...params.InputProps,
            type: 'search',
            startAdornment: (
              <InputAdornment position="start">
                <SearchRounded />
              </InputAdornment>
            ),
          }}
        />
      )}
      // slotProps={{
      //   paper: {
      //     elevation: 1
      //   },
      // }}
    />
  );
};

export default SearchInput;

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
];
