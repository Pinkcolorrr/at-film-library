import React, { useState } from 'react';
import { List, ListItem, ListItemText, Menu, MenuItem } from '@material-ui/core';
import { sortMenuClasses } from './SortMenuStyles';

interface Props {
  /** Menu options */
  options: string[];
  /** Start selected index */
  index: number;
  /** Call function for sorting in parent component */
  sortBySelectedOption(selected: number): void;
}

/** Menu for select sort option */
export function SortMenu(props: Props): JSX.Element {
  const classes = sortMenuClasses();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState(props.index);

  /** Open sort menu and assign anchor element */
  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setIsOpen(true);
    setAnchorEl(event.currentTarget);
  };

  /** Close sort menu and remove anchor element */
  const closeMenu = () => {
    setIsOpen(false);
    setAnchorEl(null);
  };

  /** Set current selected item */
  const setSelectedItem = (index: number) => {
    setSelectedIndex(index);
    props.sortBySelectedOption(index);
    closeMenu();
  };

  return (
    <div className={classes.root}>
      <List>
        <ListItem onClick={openMenu} button>
          <ListItemText primary="Sorted by" secondary={props.options[selectedIndex]} />
        </ListItem>
      </List>
      <Menu anchorEl={anchorEl} onClose={closeMenu} open={isOpen} keepMounted>
        {props.options.map((option, index) => (
          <MenuItem
            key={option}
            disabled={index === selectedIndex}
            onClick={() => setSelectedItem(index)}
            selected={index === selectedIndex}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
