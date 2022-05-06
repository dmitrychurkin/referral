import type { FormInitialValues, I18nForm } from '@/interfaces/form';
import type { FormValues } from './useValidation';

import { memo } from "react";

import FormField from "@/ui/atoms/FormField";
import Form from "@/ui/templates/Form";

import { getHelperText, useFormik } from '@/infrastructure/form';

import ActionSlot from './ActionSlot';

import { getInitialValues as getInitialSignupNowFormValues } from '../SignupNow';
import useValidation, { formSchema } from "./useValidation";

import Key from "public/key.svg";

import styles from './Signin.module.css';

type Props =
    & I18nForm<FormValues>
    & typeof defaultProps;

export const getInitialValues = (formValues: Partial<FormValues> = {}) => ({
    ...getInitialSignupNowFormValues(formValues),
    password: '',
    ...formValues
});

const defaultProps: FormInitialValues<FormValues> = {
    initialValues: getInitialValues()
};

const Signin = ({ t, initialValues, ...formProps }: Props) => {
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
            classes={{
                action: styles.actionSlot
            }}
            actionSlot={
                <ActionSlot
                    startIcon={<Key />}
                    t={t}
                    isSubmitting={isSubmitting}
                    isValid={isValid}
                />
            }
            onSubmit={formik.handleSubmit}
        >
            <FormField
                className={styles.formFields}
                type='email'
                id={formSchema.email.name}
                name={formSchema.email.name}
                labelSlot={t(`form.fields.${formSchema.email.name}.label`)}
                placeholder={t(
                    `form.fields.${formSchema.email.name}.placeholder`,
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
                maxLength={formSchema.password.rules.maxLength}
                minLength={formSchema.password.rules.minLength}
                helperTextSlot={getHelperText(formik, formSchema.password.name)}
                isValid={!getHelperText(formik, formSchema.password.name)}
            />
            {/* TODO: convert this to link */}
            <div className={styles.link}>{t('passwordReset')}</div>
        </Form>
    );
};

Signin.defaultProps = defaultProps;

export default memo(Signin);
