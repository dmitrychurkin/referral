import type { AggregateRoot, BaseEntity } from "@/interfaces/aggregate";
import type UserBase from "./user";

export interface Referral extends AggregateRoot, Omit<ReferralInfo, 'resume'>, ReferralJob, ReferralWorkspace {
    readonly userId: string;
}

export interface ReferralEntity extends BaseEntity, Referral {}

export interface ReferralInfo extends UserBase {
    readonly resume: File | null;
    readonly personalWebsite: string;
    readonly coddingSkills: string;
    readonly designSkills: string;
}

export interface ReferralJob {
    readonly skillset: string;
    readonly suitableRoles: string;
    readonly pitch: string;
    readonly howDoYouKnow: string;
}


export interface ReferralWorkspace {
    readonly typeOfCompanies: Array<CompanyType>;
    readonly companiesPreferToWork: string;
}

export enum CompanyType {
    Startup = 'Startup',
    Mid = 'Mid-size company',
    Large = 'Large company',
    Agency = 'Agency',
    Any = `Doesn't matter`
};
