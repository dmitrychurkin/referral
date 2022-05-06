import type FormSchema from "@/interfaces/form";
import type User from "@/entities/user";
import type { TFunction } from "next-i18next";

import { object, string } from "yup";

import useSignupNowValidationSchema from '../SignupNow/useValidation';
import { formSchema as registerUserFormSchema } from '../RegisterUser/useValidation';

export type FormValues = Omit<User, 'linkedIn'>;

const { name, email } = registerUserFormSchema;

export const formSchema: FormSchema<FormValues> = {
    name, email
};

const useValidation = (t: TFunction) => {
    // TODO: include validation strings
    const signupNowValidationSchema = useSignupNowValidationSchema(t);
    const employerValidationSchema = object()
        .shape({
            [formSchema.name.name]: string()
                .min(
                    formSchema.name.rules.minLength as number
                )
                .max(
                    formSchema.name.rules.maxLength as number
                )
                .required()
        });

    return employerValidationSchema.concat(signupNowValidationSchema);
};

export default useValidation;
