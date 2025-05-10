import { User } from './user';

export interface FitnessData {
  steps: number;
  caloriesBurned: number;
  distance: number;
  activeMinutes: number;
  timestamp: Date;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly';
  startDate: Date;
  endDate: Date;
  requirements: {
    type: 'steps' | 'calories' | 'meals' | 'water' | 'exercise';
    target: number;
  };
  reward: {
    points: number;
    badge?: string;
  };
  isCompleted: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  badge: string;
  unlockedAt?: Date;
  requirements: {
    type: 'streak' | 'total' | 'milestone';
    value: number;
  };
}

export interface UserProgress {
  userId: string;
  points: number;
  level: number;
  badges: string[];
  currentStreak: number;
  longestStreak: number;
  challenges: Challenge[];
  achievements: Achievement[];
  fitnessData: FitnessData[];
}

export interface BarcodeProduct {
  barcode: string;
  name: string;
  brand?: string;
  nutritionalInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    servingSize: number;
    servingUnit: string;
  };
} 