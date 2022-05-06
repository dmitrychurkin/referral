import type FormSchema from "@/interfaces/form";
import type { User } from "@/entities/user";
import type { TFunction } from "next-i18next";

import { object, string } from 'yup';

import useSignupNowValidationSchema, { formSchema as signupNowFormSchema } from '../SignupNow/useValidation';

export type FormValues = Pick<User, 'email' | 'password'>;

export const formSchema: FormSchema<FormValues> = {
    ...signupNowFormSchema,
    password: {
        name: 'password',
        rules: {
            required: true,
            minLength: 6,
            maxLength: 50
        }
    }
};

const useValidation = (t: TFunction) => {
    const sugnupNowValidationSchema = useSignupNowValidationSchema(t);
    const signupValidationSchema = object()
        .shape({
            [formSchema.password.name]: string()
                .min(
                    formSchema.password.rules.minLength as number,
                    t(
                        `form.fields.${formSchema.password.name}.validation.min`,
                        { min: formSchema.password.rules.minLength }
                    )
                )
                .max(
                    formSchema.password.rules.maxLength as number,
                    t(
                        `form.fields.${formSchema.password.name}.validation.max`,
                        { max: formSchema.password.rules.maxLength }
                    )
                )
                .required(
                    t(`form.fields.${formSchema.password.name}.validation.required`)
                )
        });

    return sugnupNowValidationSchema.concat(signupValidationSchema);
};

export default useValidation;
