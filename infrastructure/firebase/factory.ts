import credentials from '@/constants/firebase';
import { initializeApp } from 'firebase/app';

const createFirebaseApp = (options = credentials) =>
    initializeApp(options);

export default createFirebaseApp;
