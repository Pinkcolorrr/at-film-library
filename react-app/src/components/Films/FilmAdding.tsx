import { Paper, Theme, makeStyles, FormGroup, TextField } from '@material-ui/core';

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
    <Paper className={classes.root} elevation={0}>
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
                <TextField label="Film title" type="text" variant="outlined" fullWidth {...field} />
              )}
            </Field>
          </FormGroup>
          <FormGroup className={classes.formGroup}>
            <Field name="episodeId">
              {({ field }: FieldProps) => (
                <TextField label="Episode id" type="number" variant="outlined" fullWidth {...field} />
              )}
            </Field>
          </FormGroup>

          <FormGroup className={classes.formGroup}>
            <Field name="releaseDate">
              {({ field }: FieldProps) => (
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Release date"
                  type="date"
                  variant="outlined"
                  {...field}
                />
              )}
            </Field>
          </FormGroup>

          <FormGroup className={classes.formGroup}>
            <Field name="director">
              {({ field }: FieldProps) => (
                <TextField label="Director" type="text" variant="outlined" fullWidth {...field} />
              )}
            </Field>
          </FormGroup>

          <FormGroup className={classes.formGroup}>
            <Field name="producer">
              {({ field }: FieldProps) => (
                <TextField label="Producer" type="text" variant="outlined" fullWidth {...field} />
              )}
            </Field>
          </FormGroup>
          <FormGroup className={classes.formGroup}>
            <Field name="openingCrawl">
              {({ field }: FieldProps) => (
                <TextField label="Opening crawl" rows={5} variant="outlined" multiline {...field} />
              )}
            </Field>
          </FormGroup>
        </Form>
      </Formik>
    </Paper>
  );
}
