import { FormGroup, Button, TextField } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Field, FieldProps, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Auth.module.css';

import { UserAuthData } from '../../models/UserAuthData';
import { signInByEmailAndPassword } from '../../store/User/userThunks';
import { removeErrorMsg, selectErrorMsg } from '../../store/User/userSlice';

const loginSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(6, 'Password should be of minimum 6 characters length').required('Password is required'),
});

export function Login(): JSX.Element {
  const errorMsg = useSelector(selectErrorMsg);
  const dispatch = useDispatch();
  const init: UserAuthData = {
    email: '',
    password: '',
  };

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
      validationSchema={loginSchema}
    >
      <Form className={styles.root}>
        <h3 className={styles.formLabel}>Login</h3>

        <FormGroup className={styles.emailGroup}>
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

        <FormGroup className={styles.passwordGroup}>
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

        <FormGroup className={styles.submitButton}>
          <Button color="primary" type="submit" variant="contained">
            Submit form
          </Button>
        </FormGroup>

        {errorMsg ? (
          <Alert className={styles.errorMsg} severity="error">
            {errorMsg}
          </Alert>
        ) : null}
        <div className={styles.registerText}>
          Don't have an account yet? <Link to="/register">Register</Link>
        </div>
      </Form>
    </Formik>
  );
}
