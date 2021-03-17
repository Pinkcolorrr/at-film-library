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

type props = {
  title: string;
  array: string[];
  selected: string[];
  setDirty?(): void;
  getCheckedValues(value: string[]): void;
};

export function AccordionCheckList(props: props): JSX.Element {
  const classes = useStyles();
  const [checked, setChecked] = useState([] as string[]);

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

  useEffect(() => {
    props.getCheckedValues(checked);
  }, [checked]);

  useEffect(() => {
    setChecked(props.selected);
  }, [props.selected]);

  return (
    <Accordion>
      <AccordionSummary>{props.title}</AccordionSummary>
      <AccordionDetails>
        <List className={classes.root}>
          {props.array.map((value: string) => {
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
          })}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}
