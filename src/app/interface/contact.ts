export interface Contact {
  name: string | null;
  age: string;
  inquiryType: string;
  tel: string;
  email: string;
  address: string;
  notice: string | null;
  privacyPolicy: boolean;
  timestamp?: Date | null;
  contactId?: string;
  completed?: boolean;
}
