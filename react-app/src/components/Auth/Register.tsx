import { FormGroup, Button, TextField } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Field, FieldProps, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Auth.module.css';

import { UserAuthData } from '../../models/UserAuthData';
import { removeErrorMsg, selectErrorMsg } from '../../store/User/userSlice';
import { registerByEmailAndPassword } from '../../store/User/userThunks';

const registerSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(6, 'Password should be of minimum 6 characters length').required('Password is required'),
});

export function Register(): JSX.Element {
  const errorMsg = useSelector(selectErrorMsg);
  const dispatch = useDispatch();

  useEffect(
    () => () => {
      dispatch(removeErrorMsg());
    },
    [dispatch],
  );

  const init: UserAuthData = {
    email: '',
    password: '',
  };

  return (
    <Formik
      initialValues={init}
      onSubmit={(values) => {
        dispatch(registerByEmailAndPassword(values));
      }}
      validationSchema={registerSchema}
    >
      {() => (
        <Form className={styles.root}>
          <h3 className={styles.formLabel}>register</h3>

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
            Already have an account? <Link to="/login">Login in</Link>
          </div>
        </Form>
      )}
    </Formik>
  );
}
