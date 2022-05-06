
import type User from "@/entities/user";

import { getFirestore, setDoc, doc, serverTimestamp } from "firebase/firestore";

import { Collection } from "@/constants/firebase";

export const add = async (employer: Omit<User, 'linkedIn'>) =>
    setDoc(
        doc(getFirestore(), Collection.EMPLOYERS, employer.email),
        {
            ...employer,
            timestamp: serverTimestamp()
        }
    );
