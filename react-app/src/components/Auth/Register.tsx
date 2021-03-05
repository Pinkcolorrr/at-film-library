import { FormGroup, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Field, FieldProps, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import styles from './Auth.module.css';
import * as yup from 'yup';
import { TextField } from '@material-ui/core';
import { UserAuthData } from '../../models/UserAuthData';
import { useSelector, useDispatch } from 'react-redux';
import { removeErrorMsg, selectErrorMsg } from '../../store/User/userSlice';
import { registerByEmailAndPassword } from '../../store/User/userThunks';
import { Link } from 'react-router-dom';

const registerSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
});

export function Register(): JSX.Element {
  const errorMsg = useSelector(selectErrorMsg);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(removeErrorMsg());
    };
  }, [dispatch]);

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
                  fullWidth
                  label="Email"
                  error={meta.touched && Boolean(meta.error)}
                  helperText={meta.touched && meta.error}
                  autoComplete="true"
                  {...field}
                />
              )}
            </Field>
          </FormGroup>

          <FormGroup className={styles.passwordGroup}>
            <Field name="password">
              {({ field, meta }: FieldProps) => (
                <TextField
                  fullWidth
                  label="Password"
                  error={meta.touched && Boolean(meta.error)}
                  helperText={meta.touched && meta.error}
                  autoComplete="true"
                  type="password"
                  {...field}
                />
              )}
            </Field>
          </FormGroup>

          <FormGroup className={styles.submitButton}>
            <Button variant="contained" color="primary" type="submit">
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
