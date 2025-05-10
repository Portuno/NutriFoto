export interface Food {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servingSize: number;
  servingUnit: string;
  isCustom: boolean;
  userId?: string; // For custom foods
  createdAt?: string;
  updatedAt?: string;
}

export interface Meal {
  id: string;
  userId: string;
  type: MealType;
  foods: MealFood[];
  date: string;
  time: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MealFood {
  foodId: string;
  food: Food;
  quantity: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface DailySummary {
  date: string;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  meals: Meal[];
}

export interface NutritionGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface FoodSearchResult {
  foods: Food[];
  total: number;
  page: number;
  hasMore: boolean;
} 