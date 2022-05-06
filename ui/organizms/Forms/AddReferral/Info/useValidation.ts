import type FormSchema from "@/interfaces/form";
import type { ReferralInfo } from "@/entities/referral";
import type { TFunction } from "next-i18next";
import type { ValidationMemoObject } from "@/infrastructure/form";

import { useRef } from "react";
import { object, string, mixed } from "yup";

import { SUPPORTED_FORMATS, MAX_FILE_SIZE } from "@/constants/file";

import { formSchema as signInFormSchema } from '@/ui/organizms/Forms/RegisterUser/useValidation';

import { convertToMb, validateEmailExists, validateFileSize, validateFileType } from "@/infrastructure/form";

import { getCurrentUser } from "@/services/user";

export type FormValues = ReferralInfo;

const { name, email, twitter: { rules } } = signInFormSchema;

export const formSchema: FormSchema<FormValues> = {
    name,
    email,
    linkedIn: {
        name: 'linkedIn',
        rules
    },
    resume: {
        name: 'resume',
        rules: {
            required: false,
            accept: SUPPORTED_FORMATS
        }
    },
    personalWebsite: {
        name: 'personalWebsite',
        rules
    },
    coddingSkills: {
        name: 'coddingSkills',
        rules
    },
    designSkills: {
        name: 'designSkills',
        rules
    }
};

const useValidation = (t: TFunction) => {
    // TODO: include validation strings
    // TODO: refactor into hook
    const validationMemo = useRef<ValidationMemoObject>({ value: '', isValid: false });

    return object()
        .shape({
            [formSchema.name.name]: string()
                .min(
                    formSchema.name.rules.minLength as number
                )
                .max(
                    formSchema.name.rules.maxLength as number
                )
                .required(),
            [formSchema.email.name]: string()
                .email()
                .test(
                    'DUBLICATE_REFERRAL',
                    t(`form.fields.${formSchema.email.name}.validation.exists`),
                    validateEmailExists(getCurrentUser()!.uid, validationMemo)
                )
                .max(
                    formSchema.email.rules.maxLength as number,
                )
                .required(),
            [formSchema.linkedIn.name]: string()
                .url()
                .max(
                    formSchema.linkedIn.rules.maxLength as number
                )
                .notRequired(),
            [formSchema.resume.name]: mixed()
                .nullable()
                .notRequired()
                .test(
                    'FILE_SIZE',
                    t(
                        `form.fields.${formSchema.resume.name}.validation.fileSize`,
                        { fileSize: convertToMb(MAX_FILE_SIZE) }
                    ),
                    validateFileSize(MAX_FILE_SIZE)
                )
                .test(
                    'FILE_TYPE',
                    t(
                        `form.fields.${formSchema.resume.name}.validation.fileType`,
                        { fileType: SUPPORTED_FORMATS }
                    ),
                    validateFileType(SUPPORTED_FORMATS)
                ),
            [formSchema.personalWebsite.name]: string()
                .url()
                .max(
                    formSchema.personalWebsite.rules.maxLength as number
                )
                .notRequired(),
            [formSchema.coddingSkills.name]: string()
                .url()
                .max(
                    formSchema.coddingSkills.rules.maxLength as number
                )
                .notRequired(),
            [formSchema.designSkills.name]: string()
                .url()
                .max(
                    formSchema.designSkills.rules.maxLength as number
                )
                .notRequired()
        });
};

export default useValidation;
