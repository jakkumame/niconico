import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export interface Contact {
  name: string | null;
  age: string;
  inquiryType: string;
  tel: string;
  email: string;
  address: string;
  notice: string | null;
  privacyPolicy: boolean;
  timestamp?: firebase.firestore.FieldValue;
  contactId?: string;
  completed?: boolean;
}
