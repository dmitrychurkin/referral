import type { FormInitialValues, I18nForm } from '@/interfaces/form';
import type { FormValues } from './useValidation';

import { memo } from "react";

import FormField from "@/ui/atoms/FormField";
import SubmitAction from '@/ui/molecules/SubmitAction';
import Form from "@/ui/templates/Form";

import { getHelperText, useFormik } from '@/infrastructure/form';

import Lock from "public/lock.svg";

import useValidation, { formSchema } from "./useValidation";

import styles from './Employer.module.css';

type Props =
    & I18nForm<FormValues>
    & typeof defaultProps;

export const getInitialValues = (formValues: Partial<FormValues> = {}) => ({
    name: '',
    email: '',
    ...formValues
});

const defaultProps: FormInitialValues<FormValues> = {
    initialValues: getInitialValues()
};

const Employer = ({ t, initialValues, ...formProps }: Props) => {
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
                <SubmitAction
                    startIcon={<Lock />}
                    w100
                    isSubmitting={isSubmitting}
                    isValid={isValid}
                    t={t}
                />
            }
            onSubmit={formik.handleSubmit}
        >
            <div className={styles.sub}>{t('form.sub')}</div>
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
                placeholder={t(`form.fields.${formSchema.email.name}.placeholder`)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[formSchema.email.name]}
                required={formSchema.email.rules.required}
                maxLength={formSchema.email.rules.maxLength}
                helperTextSlot={getHelperText(formik, formSchema.email.name)}
                isValid={!getHelperText(formik, formSchema.email.name)}
            />
        </Form>
    );
};

Employer.defaultProps = defaultProps;

export default memo(Employer);
