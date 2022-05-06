import type { FormikErrors, FormikTouched, FormikConfig } from "formik";

import { useFormik as useFormikHook } from "formik";

type GetHelperTextParams<T> = {
    readonly errors: FormikErrors<T>,
    readonly touched: FormikTouched<T>
};

export const getHelperText = <T>({ errors, touched }: GetHelperTextParams<T>, formFieldName: keyof T) =>
    touched[formFieldName] && errors[formFieldName];

export const useFormik = <T>(config: FormikConfig<T>) => useFormikHook<T>({
    validateOnBlur: true,
    ...config
});

export const convertToMb = (fileSize: number) => fileSize / 1_000_000;
