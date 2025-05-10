import { create } from 'zustand';
import { Food, Meal, DailySummary, FoodSearchResult } from '../types/food';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FoodState {
  // Food search and management
  searchResults: FoodSearchResult | null;
  isLoading: boolean;
  error: string | null;
  
  // Current day's data
  currentDay: DailySummary | null;
  meals: Meal[];
  
  // Actions
  searchFoods: (query: string, page?: number) => Promise<void>;
  addCustomFood: (food: Omit<Food, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  addMeal: (meal: Omit<Meal, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateMeal: (mealId: string, meal: Partial<Meal>) => Promise<void>;
  deleteMeal: (mealId: string) => Promise<void>;
  getDailySummary: (date: string) => Promise<void>;
  getMealsByDate: (date: string) => Promise<Meal[]>;
  clearError: () => void;
}

const initialState = {
  searchResults: null,
  isLoading: false,
  error: null,
  currentDay: null,
  meals: [],
};

export const useFoodStore = create<FoodState>((set, get) => ({
  ...initialState,

  searchFoods: async (query: string, page = 1) => {
    try {
      set({ isLoading: true, error: null });
      
      // TODO: Implement actual API call
      // This is a mock implementation
      const mockResults: FoodSearchResult = {
        foods: [
          {
            id: '1',
            name: 'Arroz blanco',
            calories: 130,
            protein: 2.7,
            carbs: 28,
            fat: 0.3,
            servingSize: 100,
            servingUnit: 'g',
            isCustom: false,
          },
          // Add more mock foods...
        ],
        total: 1,
        page,
        hasMore: false,
      };

      set({ searchResults: mockResults, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  addCustomFood: async (food) => {
    try {
      set({ isLoading: true, error: null });
      
      // TODO: Implement actual API call
      const newFood: Food = {
        ...food,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Save to AsyncStorage
      const customFoods = await AsyncStorage.getItem('customFoods');
      const foods = customFoods ? JSON.parse(customFoods) : [];
      await AsyncStorage.setItem('customFoods', JSON.stringify([...foods, newFood]));

      set({ isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  addMeal: async (meal) => {
    try {
      set({ isLoading: true, error: null });
      
      // TODO: Implement actual API call
      const newMeal: Meal = {
        ...meal,
        id: Date.now().toString(),
        userId: '1', // TODO: Get from auth context
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Save to AsyncStorage
      const meals = await AsyncStorage.getItem('meals');
      const savedMeals = meals ? JSON.parse(meals) : [];
      await AsyncStorage.setItem('meals', JSON.stringify([...savedMeals, newMeal]));

      set((state) => ({
        meals: [...state.meals, newMeal],
        isLoading: false,
      }));

      // Update daily summary
      await get().getDailySummary(newMeal.date);
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  updateMeal: async (mealId, meal) => {
    try {
      set({ isLoading: true, error: null });
      
      // TODO: Implement actual API call
      const meals = await AsyncStorage.getItem('meals');
      const savedMeals = meals ? JSON.parse(meals) : [];
      const updatedMeals = savedMeals.map((m: Meal) =>
        m.id === mealId ? { ...m, ...meal, updatedAt: new Date().toISOString() } : m
      );
      await AsyncStorage.setItem('meals', JSON.stringify(updatedMeals));

      set((state) => ({
        meals: state.meals.map((m) =>
          m.id === mealId ? { ...m, ...meal, updatedAt: new Date().toISOString() } : m
        ),
        isLoading: false,
      }));

      // Update daily summary
      const updatedMeal = updatedMeals.find((m: Meal) => m.id === mealId);
      if (updatedMeal) {
        await get().getDailySummary(updatedMeal.date);
      }
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  deleteMeal: async (mealId) => {
    try {
      set({ isLoading: true, error: null });
      
      // TODO: Implement actual API call
      const meals = await AsyncStorage.getItem('meals');
      const savedMeals = meals ? JSON.parse(meals) : [];
      const updatedMeals = savedMeals.filter((m: Meal) => m.id !== mealId);
      await AsyncStorage.setItem('meals', JSON.stringify(updatedMeals));

      set((state) => ({
        meals: state.meals.filter((m) => m.id !== mealId),
        isLoading: false,
      }));

      // Update daily summary
      const deletedMeal = savedMeals.find((m: Meal) => m.id === mealId);
      if (deletedMeal) {
        await get().getDailySummary(deletedMeal.date);
      }
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  getDailySummary: async (date) => {
    try {
      set({ isLoading: true, error: null });
      
      // TODO: Implement actual API call
      const meals = await AsyncStorage.getItem('meals');
      const savedMeals = meals ? JSON.parse(meals) : [];
      const dayMeals = savedMeals.filter((m: Meal) => m.date === date);

      const summary: DailySummary = {
        date,
        totalCalories: dayMeals.reduce((sum: number, meal: Meal) => 
          sum + meal.foods.reduce((mealSum: number, food) => mealSum + food.calories, 0), 0),
        totalProtein: dayMeals.reduce((sum: number, meal: Meal) => 
          sum + meal.foods.reduce((mealSum: number, food) => mealSum + food.protein, 0), 0),
        totalCarbs: dayMeals.reduce((sum: number, meal: Meal) => 
          sum + meal.foods.reduce((mealSum: number, food) => mealSum + food.carbs, 0), 0),
        totalFat: dayMeals.reduce((sum: number, meal: Meal) => 
          sum + meal.foods.reduce((mealSum: number, food) => mealSum + food.fat, 0), 0),
        meals: dayMeals,
      };

      set({ currentDay: summary, meals: dayMeals, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  getMealsByDate: async (date: string) => {
    try {
      set({ isLoading: true, error: null });
      
      // TODO: Implement actual API call
      const meals = await AsyncStorage.getItem('meals');
      const savedMeals = meals ? JSON.parse(meals) : [];
      const dayMeals = savedMeals.filter((m: Meal) => m.date === date);

      set({ meals: dayMeals, isLoading: false });
      return dayMeals;
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      return [];
    }
  },

  clearError: () => set({ error: null }),
})); 