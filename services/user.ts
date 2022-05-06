import type { User, UserEntity } from "@/entities/user";

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, setDoc, doc, serverTimestamp } from "firebase/firestore";

import { Collection } from "@/constants/firebase";
import { SeverityLevel } from "./notification";
import showNotification from "./notification";

export const signin = async ({ email, password }: Pick<User, 'email' | 'password'>) => {
    await signInWithEmailAndPassword(getAuth(), email, password)
        .catch(err => {
            // TODO: show adequate error, use error service
            showNotification(
                {
                    message: 'Something went wrong',
                    title: 'Error occured'
                },
                SeverityLevel.ERROR
            );
            throw err;
        });
};

export const register = async (user: User) => {
    const { email, password, name, linkedIn, twitter } = user;

    try {
        const { user } = await createUserWithEmailAndPassword(getAuth(), email, password);

        const userEntity: UserEntity = {
            id: user.uid,
            name,
            email,
            linkedIn,
            twitter
        };

        await setDoc(
            doc(getFirestore(), Collection.USERS, userEntity.id),
            {
                ...userEntity,
                timestamp: serverTimestamp()
            }
        );
    } catch (err) {
        // TODO: show adequate error, use error service
        // TODO: move this to UI, don't break SRP
        showNotification(
            {
                message: 'Something went wrong',
                title: 'Error occured'
            },
            SeverityLevel.ERROR
        );
        throw err;
    }
};

export const getCurrentUser = () => getAuth().currentUser;

export const signout = () => signOut(getAuth());

export const isNewUser = () =>
    Boolean(sessionStorage.getItem('new'));

export const setNewUserFlag = () =>
    sessionStorage.setItem('new', '1');

export const removeNewUserFlag = () =>
    sessionStorage.removeItem('new');
