import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectAdditionalContent, selectRootContent } from '../../store/CurrentContent/currentContentSlice';

const useStyles = makeStyles((theme) => ({
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: theme.palette.grey[300],
    fontSize: '17px',
    padding: '15px 0',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
}));

export function AsideTitle(): JSX.Element {
  const classes = useStyles();
  const rootTitle = useSelector(selectRootContent);
  const additionalTitle = useSelector(selectAdditionalContent);

  return (
    <div className={classes.title}>
      {rootTitle} {additionalTitle ? `: ${additionalTitle}` : null}
    </div>
  );
}
