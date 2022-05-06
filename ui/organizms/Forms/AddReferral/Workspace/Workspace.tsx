import type { FormInitialValues, I18nForm } from '@/interfaces/form';
import type { FormValues } from './useValidation';

import { memo } from "react";

import FormField from "@/ui/atoms/FormField";
import SubmitAction from '@/ui/molecules/SubmitAction';
import Form from "@/ui/templates/Form";

import { getHelperText, useFormik } from '@/infrastructure/form';

import useValidation, { formSchema } from "./useValidation";

import root from '../AddReferral.module.css';
import { CompanyType } from '@/entities/referral';

type Props =
    & I18nForm<FormValues>
    & typeof defaultProps;

export const getInitialValues = (formValues: Partial<FormValues> = {}) => ({
    typeOfCompanies: [],
    companiesPreferToWork: '',
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
            <div>{t(`form.fields.${formSchema.typeOfCompanies.name}.label`)}</div>
            <div role="group" aria-labelledby="checkbox-group">
                {[
                    {
                        value: CompanyType.Startup,
                        label: t(`form.fields.${formSchema.typeOfCompanies.name}.values.startup`)
                    },
                    {
                        value: CompanyType.Mid,
                        label: t(`form.fields.${formSchema.typeOfCompanies.name}.values.mid`)
                    },
                    {
                        value: CompanyType.Large,
                        label: t(`form.fields.${formSchema.typeOfCompanies.name}.values.large`)
                    },
                    {
                        value: CompanyType.Agency,
                        label: t(`form.fields.${formSchema.typeOfCompanies.name}.values.agency`)
                    },
                    {
                        value: CompanyType.Any,
                        label: t(`form.fields.${formSchema.typeOfCompanies.name}.values.any`)
                    }
                ].map(({ value, label }) => (
                    <div key={value}>
                        <label>
                            <input
                                type='checkbox'
                                name={formSchema.typeOfCompanies.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                checked={formik.values[formSchema.typeOfCompanies.name].includes(value)}
                                value={value}
                                required={formSchema.typeOfCompanies.rules.required}
                            />
                            {label}
                        </label>
                    </div>
                ))}
            </div>
            <FormField
                className={root.formFields}
                type='textarea'
                id={formSchema.companiesPreferToWork.name}
                name={formSchema.companiesPreferToWork.name}
                labelSlot={t(`form.fields.${formSchema.companiesPreferToWork.name}.label`)}
                placeholder={t(`form.fields.${formSchema.companiesPreferToWork.name}.placeholder`)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[formSchema.companiesPreferToWork.name]}
                required={formSchema.companiesPreferToWork.rules.required}
                maxLength={formSchema.companiesPreferToWork.rules.maxLength}
                helperTextSlot={getHelperText(formik, formSchema.companiesPreferToWork.name)}
                isValid={!getHelperText(formik, formSchema.companiesPreferToWork.name)}
            />
        </Form>
    );
};

Job.defaultProps = defaultProps;

export default memo(Job);
