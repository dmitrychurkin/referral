import type { ReactNode } from "react";
import type { FormikConfig } from "formik";
import type { PropsWithTFunc } from "./global";

type ValidationRuleTypes =
    | 'required'
    | 'minLength'
    | 'maxLength'
    | 'accept';

type ValidationRules<T extends ValidationRuleTypes> = Partial<
    Pick<
        Readonly<{
            required: boolean;
            minLength: number;
            maxLength: number;
            accept: string;
        }>,
        T
    >
>;

type FormSchema<F extends {}, T extends ValidationRuleTypes = ValidationRuleTypes> = {
    readonly [K in keyof F]: Readonly<{
        name: K;
        rules: ValidationRules<T>;
    }>
};

export type FormField = {
    readonly labelSlot?: ReactNode;
    readonly actionSlot?: ReactNode;
    readonly helperTextSlot?: ReactNode;
    readonly isValid?: boolean;
};

export type I18nForm<T> =
    & FormikConfig<T>
    & PropsWithTFunc;

export type FormInitialValues<T> = Pick<FormikConfig<T>, 'initialValues'>;

export default FormSchema;
