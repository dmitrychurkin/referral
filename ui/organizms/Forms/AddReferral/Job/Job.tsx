import type { FormInitialValues, I18nForm } from '@/interfaces/form';
import type { FormValues } from './useValidation';

import { memo } from "react";

import FormField from "@/ui/atoms/FormField";
import SubmitAction from '@/ui/molecules/SubmitAction';
import Form from "@/ui/templates/Form";

import { getHelperText, useFormik } from '@/infrastructure/form';

import useValidation, { formSchema } from "./useValidation";

import root from '../AddReferral.module.css';

type Props =
    & I18nForm<FormValues>
    & typeof defaultProps;

export const getInitialValues = (formValues: Partial<FormValues> = {}) => ({
    skillset: '',
    suitableRoles: '',
    pitch: '',
    howDoYouKnow: '',
    ...formValues
});

const defaultProps: FormInitialValues<FormValues> = {
    initialValues: getInitialValues()
};

const Job = ({ t, initialValues, ...formProps }: Props) => {
    const validationSchema = useValidation(t);

    const formik = useFormik<FormValues>({
        validationSchema,
        ...formProps,
        initialValues: getInitialValues(initialValues)
    });

    const { isSubmitting, isValid } = formik;

    return (
        <Form
            classes={root}
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
                className={root.formFields}
                id={formSchema.skillset.name}
                name={formSchema.skillset.name}
                labelSlot={t(`form.fields.${formSchema.skillset.name}.label`)}
                placeholder={t(`form.fields.${formSchema.skillset.name}.placeholder`)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[formSchema.skillset.name]}
                required={formSchema.skillset.rules.required}
                maxLength={formSchema.skillset.rules.maxLength}
                minLength={formSchema.skillset.rules.minLength}
                helperTextSlot={getHelperText(formik, formSchema.skillset.name)}
                isValid={!getHelperText(formik, formSchema.skillset.name)}
            />
            <FormField
                className={root.formFields}
                id={formSchema.suitableRoles.name}
                name={formSchema.suitableRoles.name}
                labelSlot={t(`form.fields.${formSchema.suitableRoles.name}.label`)}
                placeholder={t(`form.fields.${formSchema.suitableRoles.name}.placeholder`)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[formSchema.suitableRoles.name]}
                required={formSchema.suitableRoles.rules.required}
                maxLength={formSchema.suitableRoles.rules.maxLength}
                helperTextSlot={getHelperText(formik, formSchema.suitableRoles.name)}
                isValid={!getHelperText(formik, formSchema.suitableRoles.name)}
            />
            <FormField
                className={root.formFields}
                type='textarea'
                id={formSchema.pitch.name}
                name={formSchema.pitch.name}
                labelSlot={t(`form.fields.${formSchema.pitch.name}.label`)}
                placeholder={t(`form.fields.${formSchema.pitch.name}.placeholder`)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[formSchema.pitch.name]}
                required={formSchema.pitch.rules.required}
                maxLength={formSchema.pitch.rules.maxLength}
                helperTextSlot={getHelperText(formik, formSchema.pitch.name)}
                isValid={!getHelperText(formik, formSchema.pitch.name)}
            />
            <FormField
                className={root.formFields}
                type='textarea'
                id={formSchema.howDoYouKnow.name}
                name={formSchema.howDoYouKnow.name}
                labelSlot={t(`form.fields.${formSchema.howDoYouKnow.name}.label`)}
                placeholder={t(`form.fields.${formSchema.howDoYouKnow.name}.placeholder`)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[formSchema.howDoYouKnow.name]}
                required={formSchema.howDoYouKnow.rules.required}
                maxLength={formSchema.howDoYouKnow.rules.maxLength}
                helperTextSlot={getHelperText(formik, formSchema.howDoYouKnow.name)}
                isValid={!getHelperText(formik, formSchema.howDoYouKnow.name)}
            />
        </Form>
    );
};

Job.defaultProps = defaultProps;

export default memo(Job);
