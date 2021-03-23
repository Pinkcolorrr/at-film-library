import React, { useEffect } from 'react';
import { FormGroup, Button, TextField } from '@material-ui/core';
import { Field, FieldProps, Form, Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { UserAuthData } from '../../models/UserAuthData';
import { removeErrorMsg } from '../../store/User/userSlice';
import { selectErrorMsg } from '../../store/User/userSelectors';
import { registerByEmailAndPassword } from '../../store/User/userThunks/apiThunks';
import { authFormStyles } from './AuthFormStyles';

/** Validate schema for auth form */
export const registerSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(6, 'Password should be of minimum 6 characters length').required('Password is required'),
});

/** Register form */
export function Register(): JSX.Element {
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
        dispatch(registerByEmailAndPassword(values));
      }}
      validationSchema={registerSchema}
    >
      <Form className={classes.root}>
        <h3 className={classes.formLabel}>register</h3>

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
          Already have an account? <Link to="/login">Login in</Link>
        </div>
      </Form>
    </Formik>
  );
}
