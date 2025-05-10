import { create } from 'zustand';
import { AuthState, LoginCredentials, RegisterData, UserProfile } from '../types/user';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
};

export const useAuthStore = create<AuthState & {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  authenticateWithBiometrics: () => Promise<void>;
  clearError: () => void;
}>((set) => ({
  ...initialState,

  login: async (credentials) => {
    try {
      set({ isLoading: true, error: null });
      // TODO: Implement actual API call
      const mockUser: UserProfile = {
        id: '1',
        email: credentials.email,
        name: 'Test User',
        age: 25,
        weight: 70,
        height: 175,
        gender: 'male',
        activityLevel: 'moderate',
        weightGoal: 'maintain',
        dailyCalorieGoal: 2000,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      set({ isAuthenticated: true, user: mockUser, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  register: async (data) => {
    try {
      set({ isLoading: true, error: null });
      // TODO: Implement actual API call
      const mockUser: UserProfile = {
        id: '1',
        email: data.email,
        name: data.name,
        age: data.age,
        weight: data.weight,
        height: data.height,
        gender: data.gender,
        activityLevel: data.activityLevel,
        weightGoal: data.weightGoal,
        dailyCalorieGoal: 2000, // This should be calculated based on user data
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      set({ isAuthenticated: true, user: mockUser, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true });
      await AsyncStorage.removeItem('user');
      set({ ...initialState, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  authenticateWithBiometrics: async () => {
    try {
      set({ isLoading: true, error: null });
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !isEnrolled) {
        throw new Error('Biometric authentication is not available');
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to continue',
      });

      if (result.success) {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          set({ isAuthenticated: true, user: JSON.parse(userData), isLoading: false });
        } else {
          throw new Error('No saved user data found');
        }
      } else {
        throw new Error('Authentication failed');
      }
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
})); 