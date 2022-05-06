import type { PropsWithChildren } from 'react';
import type { User } from 'firebase/auth';

import { createContext, useState, useEffect, memo } from "react";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

type AuthState = User | null | undefined;

export const AuthContext = createContext<AuthState>(undefined);

const AuthProvider = (props: PropsWithChildren<object>) => {
    const auth = getAuth();
    const [user, setUser] = useState<AuthState>();

    useEffect(() =>
        onAuthStateChanged(auth, setUser)
        , [auth]);

    return (
        <AuthContext.Provider
            {...props}
            value={user}
        />
    );
};

export default memo(AuthProvider);
