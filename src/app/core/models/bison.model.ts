export interface Bison {
  id: string;
  name: string;
  age: number;
  weight: number;
  breed: string;
  gender: 'male' | 'female';
  healthStatus: 'healthy' | 'sick' | 'injured';
  currentLocation: string;
  dateOfBirth: string;
  caretakerId?: string;
}
