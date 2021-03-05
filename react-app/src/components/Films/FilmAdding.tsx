import { Paper, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { FormGroup, TextField } from '@material-ui/core';
import { Formik, Form, Field, FieldProps } from 'formik';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minWidth: '700px',
    padding: theme.spacing(5, 10),
  },

  formGroup: {
    marginBottom: '30px',
  },
}));

const init = {
  email: '',
  password: '',
};

export function FilmAdding(): JSX.Element {
  const classes = useStyles();
  return (
    <Paper elevation={0} className={classes.root}>
      <Formik
        initialValues={init}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        <Form>
          <FormGroup className={classes.formGroup}>
            <Field name="filmTitle">
              {({ field }: FieldProps) => (
                <TextField
                  fullWidth
                  label="Film title"
                  type="text"
                  variant="outlined"
                  {...field}
                />
              )}
            </Field>
          </FormGroup>
          <FormGroup className={classes.formGroup}>
            <Field name="episodeId">
              {({ field }: FieldProps) => (
                <TextField
                  fullWidth
                  label="Episode id"
                  type="number"
                  variant="outlined"
                  {...field}
                />
              )}
            </Field>
          </FormGroup>

          <FormGroup className={classes.formGroup}>
            <Field name="releaseDate">
              {({ field }: FieldProps) => (
                <TextField
                  label="Release date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  {...field}
                />
              )}
            </Field>
          </FormGroup>

          <FormGroup className={classes.formGroup}>
            <Field name="director">
              {({ field }: FieldProps) => (
                <TextField
                  fullWidth
                  label="Director"
                  type="text"
                  variant="outlined"
                  {...field}
                />
              )}
            </Field>
          </FormGroup>

          <FormGroup className={classes.formGroup}>
            <Field name="producer">
              {({ field }: FieldProps) => (
                <TextField
                  fullWidth
                  label="Producer"
                  type="text"
                  variant="outlined"
                  {...field}
                />
              )}
            </Field>
          </FormGroup>
          <FormGroup className={classes.formGroup}>
            <Field name="openingCrawl">
              {({ field }: FieldProps) => (
                <TextField
                  label="Opening crawl"
                  multiline
                  variant="outlined"
                  rows={5}
                  {...field}
                />
              )}
            </Field>
          </FormGroup>
        </Form>
      </Formik>
    </Paper>
  );
}
