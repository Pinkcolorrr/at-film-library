import React, { useEffect } from 'react';
import { FormGroup, Button, TextField } from '@material-ui/core';
import { Field, FieldProps, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import { UserAuthData } from '../../models/UserAuthData';
import { removeErrorMsg } from '../../store/User/userSlice';
import { signInByEmailAndPassword } from '../../store/User/userThunks/apiThunks';
import { selectErrorMsg } from '../../store/User/userSelectors';
import { authFormStyles } from './AuthFormStyles';
import { authSchema } from '../../utils/validateSchemas';

/** Login form */
export function Login(): JSX.Element {
  const classes = authFormStyles();
  const errorMsg = useSelector(selectErrorMsg);
  const dispatch = useDispatch();
  const init: UserAuthData = {
    email: '',
    password: '',
  };

  /** Remove error msg after destroy component */
  useEffect(
    () => () => {
      dispatch(removeErrorMsg());
    },
    [dispatch],
  );

  return (
    <Formik
      initialValues={init}
      onSubmit={(values) => {
        dispatch(signInByEmailAndPassword(values));
      }}
      validationSchema={authSchema}
    >
      <Form className={classes.root}>
        <h3 className={classes.formLabel}>Login</h3>
        <FormGroup className={classes.emailGroup}>
          <Field name="email">
            {({ field, meta }: FieldProps) => (
              <TextField
                autoComplete="true"
                error={meta.touched && Boolean(meta.error)}
                helperText={meta.touched && meta.error}
                label="Email"
                fullWidth
                {...field}
              />
            )}
          </Field>
        </FormGroup>
        <FormGroup className={classes.passwordGroup}>
          <Field name="password">
            {({ field, meta }: FieldProps) => (
              <TextField
                autoComplete="true"
                error={meta.touched && Boolean(meta.error)}
                helperText={meta.touched && meta.error}
                label="Password"
                type="password"
                fullWidth
                {...field}
              />
            )}
          </Field>
        </FormGroup>
        <FormGroup>
          <Button color="primary" type="submit" variant="contained">
            Submit form
          </Button>
        </FormGroup>
        {errorMsg && (
          <Alert className={classes.errorMsg} severity="error">
            {errorMsg}
          </Alert>
        )}
        <div className={classes.registerText}>
          Don&apos;t have an account yet? <Link to="/register">Register</Link>
        </div>
      </Form>
    </Formik>
  );
}
