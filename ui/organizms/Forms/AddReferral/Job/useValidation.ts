import type FormSchema from "@/interfaces/form";
import type { ReferralJob } from "@/entities/referral";
import type { TFunction } from "next-i18next";

import { object, string } from "yup";

export type FormValues = ReferralJob;

export const formSchema: FormSchema<FormValues> = {
    skillset: {
        name: 'skillset',
        rules: {
            required: true,
            minLength: 3,
            maxLength: 100
        }
    },
    suitableRoles: {
        name: 'suitableRoles',
        rules: {
            required: true,
            minLength: 2,
            maxLength: 100
        }
    },
    pitch: {
        name: 'pitch',
        rules: {
            required: true,
            minLength: 10,
            maxLength: 500
        }
    },
    howDoYouKnow: {
        name: 'howDoYouKnow',
        rules: {
            required: true,
            minLength: 10,
            maxLength: 500
        }
    }
};

const useValidation = (t: TFunction) => {
    // TODO: include validation strings
    return object()
        .shape({
            [formSchema.skillset.name]: string()
                .min(
                    formSchema.skillset.rules.minLength as number
                )
                .max(
                    formSchema.skillset.rules.maxLength as number
                )
                .required(),
            [formSchema.suitableRoles.name]: string()
                .min(
                    formSchema.suitableRoles.rules.minLength as number,
                )
                .max(
                    formSchema.suitableRoles.rules.maxLength as number,
                )
                .required(),
            [formSchema.pitch.name]: string()
                .min(
                    formSchema.pitch.rules.minLength as number,
                )
                .max(
                    formSchema.pitch.rules.maxLength as number
                )
                .required(),
            [formSchema.howDoYouKnow.name]: string()
                .min(
                    formSchema.howDoYouKnow.rules.minLength as number,
                )
                .max(
                    formSchema.howDoYouKnow.rules.maxLength as number
                )
                .required()
        });
};

export default useValidation;
