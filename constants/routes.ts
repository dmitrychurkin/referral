export enum Routes {
    HOME = '/',
    EMPLOYER = '/employer',
    REGISTER = '/register',
    SIGNIN = '/signin',
    DASHBOARD = '/dashboard',
    ADD_REFERRAL_INFO = '/dashboard/referral',
    ADD_REFERRAL_JOB = '/dashboard/referral/job',
    ADD_REFERRAL_WORKPACE = '/dashboard/referral/workspace',
};

export const redirectQueryParam = 'r';
export const redirectSignOutRoute = Routes.SIGNIN;
export const redirectSignInRoute = Routes.DASHBOARD;
export const shouldRememberSignOutRoute = true;
