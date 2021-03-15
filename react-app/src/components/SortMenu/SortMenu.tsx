import { makeStyles } from '@material-ui/core';
import { createStyles } from '@material-ui/core';
import { Theme, List, ListItem, ListItemText, Menu, MenuItem } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';

type props = {
  options: string[];
  index: number;
  sortBySelectedOption(selected: number): void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

export function SortMenu(props: props): JSX.Element {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(props.index);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setSelectedIndex(index);
    props.sortBySelectedOption(index);
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <List>
        <ListItem button onClick={handleClickListItem}>
          <ListItemText primary="Sorted by" secondary={props.options[selectedIndex]} />
        </ListItem>
      </List>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => {
          setAnchorEl(null);
        }}
      >
        {props.options.map((option, index) => (
          <MenuItem
            key={option}
            disabled={index === selectedIndex}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
