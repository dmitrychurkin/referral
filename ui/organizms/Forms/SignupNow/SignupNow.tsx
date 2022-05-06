import type { FormInitialValues, I18nForm } from '@/interfaces/form';
import type { FormValues } from './useValidation';

import { memo } from "react";

import FormField from "@/ui/atoms/FormField";
import SubmitAction from '@/ui/molecules/SubmitAction';

import { useFormik } from '@/infrastructure/form';

import Form from "@/ui/templates/Form";

import useValidation, { formSchema } from "./useValidation";

import styles from './SignupNow.module.css';

type Props =
    & I18nForm<FormValues>
    & typeof defaultProps;

export const getInitialValues = (formValues: Partial<FormValues> = {}) => ({
    email: '',
    ...formValues
});

const defaultProps: FormInitialValues<FormValues> = {
    initialValues: getInitialValues()
};

const SignupNow = ({ t, initialValues, ...formProps }: Props) => {
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
            classes={{
                action: styles.actionSlot
            }}
            actionSlot={
                <SubmitAction
                    className="register-button"
                    w100
                    isSubmitting={isSubmitting}
                    isValid={isValid}
                    t={t}
                />
            }
            onSubmit={formik.handleSubmit}
        >
            <FormField
                id={formSchema.email.name}
                name={formSchema.email.name}
                type='email'
                onChange={formik.handleChange}
                placeholder={t(
                    `form.fields.${formSchema.email.name}.placeholder`
                )}
                value={formik.values.email}
                required={formSchema.email.rules.required}
                maxLength={formSchema.email.rules.maxLength}
                classes={{
                    input: styles.input
                }}
            />
        </Form>
    );
};

SignupNow.defaultProps = defaultProps;

export default memo(SignupNow);
