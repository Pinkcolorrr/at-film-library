import React, { useState } from 'react';
import { List, ListItem, ListItemText, Menu, MenuItem } from '@material-ui/core';
import { sortMenuClasses } from './SortMenuStyles';

type props = {
  /** Menu options */
  options: string[];
  /** Start selected index */
  index: number;
  /** Call function for sorting in parent component */
  sortBySelectedOption(selected: number): void;
};

/** Menu for select sort option */
export function SortMenu(props: props): JSX.Element {
  const classes = sortMenuClasses();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(props.index);

  /** Open menu */
  const openListMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  /** Set current selected item */
  const setSelectedItem = (_event: React.MouseEvent<HTMLElement>, index: number) => {
    setSelectedIndex(index);
    props.sortBySelectedOption(index);
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <List>
        <ListItem onClick={openListMenu} button>
          <ListItemText primary="Sorted by" secondary={props.options[selectedIndex]} />
        </ListItem>
      </List>
      <Menu
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
        }}
        open={Boolean(anchorEl)}
        keepMounted
      >
        {props.options.map((option, index) => (
          <MenuItem
            key={option}
            disabled={index === selectedIndex}
            onClick={(event) => setSelectedItem(event, index)}
            selected={index === selectedIndex}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
