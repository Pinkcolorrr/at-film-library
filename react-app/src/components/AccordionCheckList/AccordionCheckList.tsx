import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  createStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

interface Props {
  /** Accordion title */
  title: string;
  /** Array with all list options */
  listOptions: string[];
  /** Array with selected list options */
  selected: string[];
  /** Set state on dirty, if list was touched */
  setDirty?(): void;
  /** Get all checked values */
  getCheckedValues(value: string[]): void;
}

/** Unite accordion and check list from react-ui in one component */
export function AccordionCheckList(props: Props): JSX.Element {
  const classes = useStyles();
  const [checked, setChecked] = useState<string[]>([]);

  /**
   * Handler for check list states
   * Push marked items in checked array
   */
  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    if (props.setDirty) {
      props.setDirty();
    }
    setChecked(newChecked);
  };

  /** Raises the state of marked items */
  useEffect(() => {
    props.getCheckedValues(checked);
  }, [checked]);

  /** Set selected items, after component loading */
  useEffect(() => {
    setChecked(props.selected);
  }, [props.selected]);

  const listItems = props.listOptions.map((value: string) => {
    const labelId = `checkbox-list-label-${value}`;
    return (
      <ListItem key={value} onClick={handleToggle(value)} role={undefined} button dense>
        <ListItemIcon>
          <Checkbox
            checked={checked.indexOf(value) !== -1}
            edge="start"
            inputProps={{ 'aria-labelledby': labelId }}
            tabIndex={-1}
            disableRipple
          />
        </ListItemIcon>
        <ListItemText id={labelId} primary={value} />
      </ListItem>
    );
  });

  return (
    <Accordion>
      <AccordionSummary>{props.title}</AccordionSummary>
      <AccordionDetails>
        <List className={classes.root}>{listItems}</List>
      </AccordionDetails>
    </Accordion>
  );
}
