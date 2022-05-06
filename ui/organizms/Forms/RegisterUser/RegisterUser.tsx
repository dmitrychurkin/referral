import type { FormInitialValues, I18nForm } from '@/interfaces/form';
import type { FormValues } from './useValidation';

import { memo } from "react";

import FormField from "@/ui/atoms/FormField";
import SubmitAction from '@/ui/molecules/SubmitAction';
import Form from "@/ui/templates/Form";

import { getHelperText, useFormik } from '@/infrastructure/form';

import { getInitialValues as getInitialSigninFormValues } from '../Signin';
import useValidation, { formSchema } from "./useValidation";

import styles from './RegisterUser.module.css';

type Props =
    & I18nForm<FormValues>
    & typeof defaultProps;

export const getInitialValues = (formValues: Partial<FormValues> = {}) => ({
    ...getInitialSigninFormValues(formValues),
    name: '',
    linkedIn: '',
    twitter: '',
    ...formValues
});

const defaultProps: FormInitialValues<FormValues> = {
    initialValues: getInitialValues()
};

const RegisterUser = ({ t, initialValues, ...formProps }: Props) => {
    const validationSchema = useValidation(t);

    const formik = useFormik<FormValues>({
        validationSchema,
        ...formProps,
        initialValues: getInitialValues(initialValues)
    });

    const { isSubmitting, isValid } = formik;

    return (
        <Form
            className={styles.root}
            titleSlot={t('form.title')}
            actionSlot={
                <SubmitAction
                    isSubmitting={isSubmitting}
                    isValid={isValid}
                    t={t}
                />
            }
            onSubmit={formik.handleSubmit}
        >
            <FormField
                className={styles.formFields}
                id={formSchema.name.name}
                name={formSchema.name.name}
                labelSlot={t(`form.fields.${formSchema.name.name}.label`)}
                placeholder={t(`form.fields.${formSchema.name.name}.placeholder`)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[formSchema.name.name]}
                required={formSchema.name.rules.required}
                maxLength={formSchema.name.rules.maxLength}
                minLength={formSchema.name.rules.minLength}
                helperTextSlot={getHelperText(formik, formSchema.name.name)}
                isValid={!getHelperText(formik, formSchema.name.name)}
            />
            <FormField
                className={styles.formFields}
                type='email'
                id={formSchema.email.name}
                name={formSchema.email.name}
                labelSlot={t(`form.fields.${formSchema.email.name}.label`)}
                placeholder={t(
                    `form.fields.${formSchema.email.name}.placeholder`,
                    'example@mail.com'
                )}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[formSchema.email.name]}
                required={formSchema.email.rules.required}
                maxLength={formSchema.email.rules.maxLength}
                helperTextSlot={getHelperText(formik, formSchema.email.name)}
                isValid={!getHelperText(formik, formSchema.email.name)}
            />
            <FormField
                className={styles.formFields}
                type='password'
                id={formSchema.password.name}
                name={formSchema.password.name}
                labelSlot={t(`form.fields.${formSchema.password.name}.label`)}
                placeholder={t(
                    `form.fields.${formSchema.password.name}.placeholder`,
                    '********'
                )}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[formSchema.password.name]}
                required={formSchema.password.rules.required}
                minLength={formSchema.password.rules.minLength}
                maxLength={formSchema.password.rules.maxLength}
                helperTextSlot={getHelperText(formik, formSchema.password.name)}
                isValid={!getHelperText(formik, formSchema.password.name)}
            />
            <FormField
                className={styles.formFields}
                type='textarea'
                id={formSchema.linkedIn.name}
                name={formSchema.linkedIn.name}
                labelSlot={t(`form.fields.${formSchema.linkedIn.name}.label`)}
                placeholder={t(`form.fields.${formSchema.linkedIn.name}.placeholder`)}
                actionSlot={t(`form.fields.${formSchema.linkedIn.name}.action`)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[formSchema.linkedIn.name]}
                required={formSchema.linkedIn.rules.required}
                maxLength={formSchema.linkedIn.rules.maxLength}
                helperTextSlot={getHelperText(formik, formSchema.linkedIn.name)}
                isValid={!getHelperText(formik, formSchema.linkedIn.name)}
            />
            <FormField
                className={styles.formFields}
                type='textarea'
                id={formSchema.twitter.name}
                name={formSchema.twitter.name}
                labelSlot={t(`form.fields.${formSchema.twitter.name}.label`)}
                placeholder={t(`form.fields.${formSchema.twitter.name}.placeholder`)}
                actionSlot={t(`form.fields.${formSchema.twitter.name}.action`)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[formSchema.twitter.name]}
                required={formSchema.twitter.rules.required}
                maxLength={formSchema.twitter.rules.maxLength}
                helperTextSlot={getHelperText(formik, formSchema.twitter.name)}
                isValid={!getHelperText(formik, formSchema.twitter.name)}
            />
        </Form>
    );
};

RegisterUser.defaultProps = defaultProps;

export default memo(RegisterUser);
