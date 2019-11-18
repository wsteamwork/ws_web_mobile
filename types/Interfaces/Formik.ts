import { FormikHandlers, FormikState, FormikHelpers } from 'formik';

export interface FormikProps<V> extends FormikHandlers, FormikState<V>, FormikHelpers<V> {}
