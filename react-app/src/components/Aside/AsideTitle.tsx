import React from 'react';
import { useSelector } from 'react-redux';
import { selectRootContent, selectAdditionalContent } from '../../store/CurrentContent/currentContentSelectors';
import { asideTitleClasses } from './AsideStyles';

/** Title on aside bar, that display current page information */
export function AsideTitle(): JSX.Element {
  const classes = asideTitleClasses();
  const rootTitle = useSelector(selectRootContent);
  const additionalTitle = useSelector(selectAdditionalContent);

  return (
    <div className={classes.title}>
      {rootTitle} {additionalTitle ? `: ${additionalTitle}` : null}
    </div>
  );
}
