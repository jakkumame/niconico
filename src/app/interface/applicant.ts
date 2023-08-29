export interface Applicant {
  name: string;
  furigana: string;
  gender: 'male' | 'female' | 'other';
  mealType: 'adult' | 'child' | 'baby';
  arrivalTime: string | null;
  remarks: string | null;
  age: number;
  timestamp?: string; // 送信時に追加
}
