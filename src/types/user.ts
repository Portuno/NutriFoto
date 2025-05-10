export type Gender = 'male' | 'female' | 'other';

export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';

export type WeightGoal = 'lose' | 'maintain' | 'gain';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  age: number;
  weight: number; // in kg
  height: number; // in cm
  gender: Gender;
  activityLevel: ActivityLevel;
  weightGoal: WeightGoal;
  targetWeight?: number; // in kg
  dailyCalorieGoal: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt' | 'dailyCalorieGoal'> {
  password: string;
  confirmPassword: string;
} 