import type { ChangeEvent } from 'react';
import type { FormInitialValues, I18nForm } from '@/interfaces/form';
import type { FormValues } from './useValidation';

import { memo } from "react";
import clsx from 'clsx';

import FormField from "@/ui/atoms/FormField";
import SubmitAction from '@/ui/molecules/SubmitAction';
import Form from "@/ui/templates/Form";

import { getHelperText, useFormik } from '@/infrastructure/form';

import useValidation, { formSchema } from "./useValidation";

import root from '../AddReferral.module.css';
import styles from './Info.module.css';

type Props =
    & I18nForm<FormValues>
    & typeof defaultProps;

export const getInitialValues = (formValues: Partial<FormValues> = {}) => ({
    name: '',
    email: '',
    linkedIn: '',
    resume: null,
    personalWebsite: '',
    coddingSkills: '',
    designSkills: '',
    ...formValues
});

const defaultProps: FormInitialValues<FormValues> = {
    initialValues: getInitialValues()
};

const Info = ({ t, initialValues, ...formProps }: Props) => {
    const validationSchema = useValidation(t);

    const formik = useFormik<FormValues>({
        validationSchema,
        ...formProps,
        initialValues: getInitialValues(initialValues)
    });

    const { isSubmitting, isValid } = formik;

    const onChangeFile = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { files, name } = target;

        if (files) {
            formik.setFieldTouched(name, true);
            formik.setFieldValue(name, files[0], true);
        }
    };

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
                className={root.formFields}
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
            <div
                className={clsx(
                    root.title,
                    styles.titleAdd
                )}
            >
                {t('form.titleAdditional')}
            </div>
            <div className={styles.sub}>
                {t('form.subAdditional')}
            </div>
            <FormField
                className={root.formFields}
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
                className={root.formFields}
                type='file'
                id={formSchema.resume.name}
                name={formSchema.resume.name}
                labelSlot={t(`form.fields.${formSchema.resume.name}.label`)}
                placeholder={t(`form.fields.${formSchema.resume.name}.placeholder`)}
                actionSlot={t(`form.fields.${formSchema.resume.name}.action`)}
                onChange={onChangeFile}
                onBlur={formik.handleBlur}
                accept={formSchema.resume.rules.accept}
                required={formSchema.resume.rules.required}
                maxLength={formSchema.resume.rules.maxLength}
                helperTextSlot={getHelperText(formik, formSchema.resume.name)}
                isValid={!getHelperText(formik, formSchema.resume.name)}
            />
            <FormField
                className={root.formFields}
                type='textarea'
                id={formSchema.personalWebsite.name}
                name={formSchema.personalWebsite.name}
                labelSlot={t(`form.fields.${formSchema.personalWebsite.name}.label`)}
                placeholder={t(`form.fields.${formSchema.personalWebsite.name}.placeholder`)}
                actionSlot={t(`form.fields.${formSchema.personalWebsite.name}.action`)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[formSchema.personalWebsite.name]}
                required={formSchema.personalWebsite.rules.required}
                maxLength={formSchema.personalWebsite.rules.maxLength}
                helperTextSlot={getHelperText(formik, formSchema.personalWebsite.name)}
                isValid={!getHelperText(formik, formSchema.personalWebsite.name)}
            />
            <FormField
                className={root.formFields}
                type='textarea'
                id={formSchema.coddingSkills.name}
                name={formSchema.coddingSkills.name}
                labelSlot={t(`form.fields.${formSchema.coddingSkills.name}.label`)}
                placeholder={t(`form.fields.${formSchema.coddingSkills.name}.placeholder`)}
                actionSlot={[
                    <>{t(`form.fields.${formSchema.coddingSkills.name}.action_0`)}</>,
                    <>{t(`form.fields.${formSchema.coddingSkills.name}.action_1`)}</>
                ]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[formSchema.coddingSkills.name]}
                required={formSchema.coddingSkills.rules.required}
                maxLength={formSchema.coddingSkills.rules.maxLength}
                helperTextSlot={getHelperText(formik, formSchema.coddingSkills.name)}
                isValid={!getHelperText(formik, formSchema.coddingSkills.name)}
            />
            <FormField
                className={root.formFields}
                type='textarea'
                id={formSchema.designSkills.name}
                name={formSchema.designSkills.name}
                labelSlot={t(`form.fields.${formSchema.designSkills.name}.label`)}
                placeholder={t(`form.fields.${formSchema.designSkills.name}.placeholder`)}
                actionSlot={[
                    <>{t(`form.fields.${formSchema.designSkills.name}.action_0`)}</>,
                    <>{t(`form.fields.${formSchema.designSkills.name}.action_1`)}</>
                ]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[formSchema.designSkills.name]}
                required={formSchema.designSkills.rules.required}
                maxLength={formSchema.designSkills.rules.maxLength}
                helperTextSlot={getHelperText(formik, formSchema.designSkills.name)}
                isValid={!getHelperText(formik, formSchema.designSkills.name)}
            />
        </Form>
    );
};

Info.defaultProps = defaultProps;

export default memo(Info);
