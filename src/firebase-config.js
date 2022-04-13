// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

// import { db } from '../../firebase-config';
// import { collection, getDoc } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyB-sFIFn4Ne4b2Io94-4B1mJO-olC8wzkY',
	authDomain: 'phz-backend.firebaseapp.com',
	projectId: 'phz-backend',
	storageBucket: 'phz-backend.appspot.com',
	messagingSenderId: '426131847521',
	appId: '1:426131847521:web:07855790cc51b1a6fced20',
	measurementId: 'G-98N8MT61KQ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
