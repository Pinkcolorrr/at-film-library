import React, { useEffect } from 'react';
import { setRootContent } from '../../store/CurrentContent';
import { useThunkDispatch } from '../../store/store';
import { FilmForm } from './FilmForm';

export function FilmAdding(): JSX.Element {
  const dispatch = useThunkDispatch();

  useEffect(() => {
    dispatch(setRootContent('add film'));
  }, []);

  return <FilmForm formType="add" />;
}
