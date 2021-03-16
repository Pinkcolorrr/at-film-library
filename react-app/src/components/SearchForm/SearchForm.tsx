import { IconButton, makeStyles, TextField } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import React from 'react';
import { useState } from 'react';
import { useThunkDispatch } from '../../store/store';

type props = {
  getPlanetByName(name: string): void;
  getInitialPlanets(): void;
};

const useStyles = makeStyles((theme) => ({
  searchForm: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 2),
  },
}));

export function SearchForm(props: props): JSX.Element {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useThunkDispatch();

  return (
    <div>
      <form
        className={classes.searchForm}
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          if (searchValue) {
            props.getPlanetByName(searchValue);
          } else {
            props.getInitialPlanets();
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
