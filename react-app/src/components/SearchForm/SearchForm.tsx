import React, { useState } from 'react';
import { IconButton, TextField } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import { searchFormStyles } from './SearchFormStyles';

type props = {
  /** Call function for searching in parent component */
  getItemByName(name: string): void;
  /** Call function for getting initial items in parent component */
  getInitialItems(): void;
};

/** Form for searching items */
export function SearchForm(props: props): JSX.Element {
  const classes = searchFormStyles();
  const [searchValue, setSearchValue] = useState('');

  return (
    <div>
      <form
        className={classes.searchForm}
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          if (searchValue) {
            props.getItemByName(searchValue);
          } else {
            props.getInitialItems();
          }
        }}
      >
        <TextField
          label="Search"
          onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchValue(event.target.value);
          }}
          size="small"
          value={searchValue}
          variant="outlined"
          fullWidth
        />
        <IconButton type="submit">
          <SearchOutlined />
        </IconButton>
      </form>
    </div>
  );
}
