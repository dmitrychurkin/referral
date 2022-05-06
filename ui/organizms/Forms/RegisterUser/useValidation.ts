import type FormSchema from "@/interfaces/form";
import type { User } from "@/entities/user";
import type { TFunction } from "next-i18next";

import { object, string } from "yup";

import useSignInValidationSchema, { formSchema as signInFormSchema } from '../Signin/useValidation';

export type FormValues = Pick<User, 'name' | 'email' | 'password' | 'linkedIn' | 'twitter'>;

export const formSchema: FormSchema<FormValues> = {
    ...signInFormSchema,
    name: {
        name: 'name',
        rules: {
            required: true,
            minLength: 3,
            maxLength: 300
        }
    },
    linkedIn: {
        name: 'linkedIn',
        rules: {
            required: true,
            maxLength: 400
        }
    },
    twitter: {
        name: 'twitter',
        rules: {
            required: false,
            maxLength: 400
        }
    }
};

const useValidation = (t: TFunction) => {
    // TODO: include validation strings
    const signInValidationSchema = useSignInValidationSchema(t);
    const registerValidationSchema = object()
        .shape({
            [formSchema.name.name]: string()
                .min(
                    formSchema.name.rules.minLength as number
                )
                .max(
                    formSchema.name.rules.maxLength as number
                )
                .required(),
            [formSchema.linkedIn.name]: string()
                .url()
                .max(
                    formSchema.linkedIn.rules.maxLength as number
                )
                .required(),
            [formSchema.twitter.name]: string()
                .url()
                .max(
                    formSchema.twitter.rules.maxLength as number
                )
                .optional()
        });

    return signInValidationSchema.concat(registerValidationSchema);
};

export default useValidation;
