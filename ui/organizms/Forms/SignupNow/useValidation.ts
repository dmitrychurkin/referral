import type FormSchema from "@/interfaces/form";
import type { User } from "@/entities/user";
import type { TFunction } from "next-i18next";

import { object, string } from 'yup';

export type FormValues = Pick<User, 'email'>;

export const formSchema: FormSchema<FormValues> = {
    email: {
        name: 'email',
        rules: {
            required: true,
            maxLength: 400
        }
    }
};

const useValidation = (t: TFunction) =>
    object()
        .shape({
            [formSchema.email.name]: string()
                .email(t(`form.fields.${formSchema.email.name}.validation.email`))
                .max(
                    formSchema.email.rules.maxLength as number,
                    t(
                        `form.fields.${formSchema.email.name}.validation.max`,
                        { max: formSchema.email.rules.maxLength }
                    )
                )
                .required(
                    t(`form.fields.${formSchema.email.name}.validation.required`)
                )
        });

export default useValidation;
