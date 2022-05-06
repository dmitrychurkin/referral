import type { Referral, ReferralEntity } from "@/entities/referral";

import { getFirestore, setDoc, doc, collection, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

import { Collection } from "@/constants/firebase";
import { STORAGE_PATH } from "@/constants/file";

import showNotification, { SeverityLevel } from "./notification";

export const save = async (referral: Referral) => {
    const referralRef = doc(collection(getFirestore(), Collection.REFERRALS));
    const { id } = referralRef;

    const referralEntity: ReferralEntity = {
        ...referral,
        id
    };

    return setDoc(referralRef, {
        ...referralEntity,
        timestamp: serverTimestamp()
    })
        .then(() => id)
        .catch(err => {
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

export const uploadFile = async (file: File, path: string) =>
    uploadBytes(
        ref(getStorage(), path),
        file
    );

export const isReferralExists = async (email: string, userId?: string) => {
    const baseCondition = [
        where('email', '==', email)
    ];

    if (userId) {
        baseCondition.push(where('userId', '==', userId));
    }

    const referralQuery = query(
        collection(getFirestore(), Collection.REFERRALS),
        ...baseCondition
    );

    const querySnapshot = await getDocs(referralQuery);

    return !querySnapshot.empty;
};

export const getFilePath = (id: string) => `${STORAGE_PATH}/${id}`;

export const getReferralsByUserId = async (userId: string) => {
    const referralQuery = query(
        collection(getFirestore(), Collection.REFERRALS),
        where('userId', '==', userId)
    );

    const querySnapshot = await getDocs(referralQuery);

    return querySnapshot.size;
};
