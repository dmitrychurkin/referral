import type FormSchema from "@/interfaces/form";
import { CompanyType, ReferralWorkspace } from "@/entities/referral";
import type { TFunction } from "next-i18next";

import { object, string, array } from "yup";

export type FormValues = ReferralWorkspace;

export const formSchema: FormSchema<FormValues> = {
    typeOfCompanies: {
        name: 'typeOfCompanies',
        rules: {
            required: false
        }
    },
    companiesPreferToWork: {
        name: 'companiesPreferToWork',
        rules: {
            required: false,
            minLength: 5,
            maxLength: 300
        }
    }
};

const useValidation = (t: TFunction) => {
    // TODO: include validation strings
    return object()
        .shape({
            [formSchema.typeOfCompanies.name]: array()
                .of(string().oneOf([
                    CompanyType.Startup,
                    CompanyType.Mid,
                    CompanyType.Large,
                    CompanyType.Agency,
                    CompanyType.Any
                ]))
                .notRequired(),
            [formSchema.companiesPreferToWork.name]: string()
                .min(
                    formSchema.companiesPreferToWork.rules.minLength as number,
                )
                .max(
                    formSchema.companiesPreferToWork.rules.maxLength as number,
                )
                .notRequired()
        });
};

export default useValidation;
