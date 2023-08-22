export interface Inquiry {
  key?: string;  // Realtime Databaseのキー
  name: string;
  age: string;
  inquiryType: string;
  tel: string;
  email: string;
  address: string;
  notice: string;
  date?: string;
  completed?: boolean;
}
