import referral from '@/features/referral';
import user from '@/features/user';

const config = {
    reducer: {
        [user.name]: user.reducer,
        [referral.name]: referral.reducer
    },
    devTools: false
};

export default config;
