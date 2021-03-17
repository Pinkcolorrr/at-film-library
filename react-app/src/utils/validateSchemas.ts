import * as yup from 'yup';

/** Validate schema for auth form */
export const authSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(6, 'Password should be of minimum 6 characters length').required('Password is required'),
});

/** Validate schema for film form */
export const filmSchema = yup.object({
  title: yup.string().required('title is required'),
  episodeId: yup.string().required('episodeId is required'),
  releaseDate: yup.string().required('releaseDate is required'),
});
