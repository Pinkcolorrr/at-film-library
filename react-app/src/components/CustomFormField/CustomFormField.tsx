import React from 'react';
import { TextField, InputLabelProps } from '@material-ui/core';
import { Field, FieldProps } from 'formik';

interface props {
  name: string;
  label: string;
  type: 'text' | 'password' | 'email' | 'number' | 'date';
  autoComplete?: 'true';
  InputLabelProps?: Partial<InputLabelProps>;
  rows?: number;
  multiline?: boolean;
  variant?: 'filled' | 'outlined' | 'standard';
}

export function CustomFormField(props: props): JSX.Element {
  return (
    <Field name={props.name}>
      {({ field, meta }: FieldProps) => (
        <TextField
          autoComplete={props.autoComplete || 'false'}
          InputLabelProps={props.InputLabelProps}
          label={props.label}
          multiline={props.multiline || false}
          rows={props.rows || 1}
          type={props.type}
          variant={props.variant || 'standard'}
          fullWidth
          {...field}
          error={meta.touched && Boolean(meta.error)}
          helperText={meta.touched && meta.error}
        />
      )}
    </Field>
  );
}
