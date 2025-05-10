import { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Welcome: { id?: string };
  Login: { id?: string };
  Register: { id?: string };
};

export type DashboardStackParamList = {
  Home: { id?: string };
  Profile: { id?: string };
  Settings: { id?: string };
};

export type FoodStackParamList = {
  AddMeal: { id?: string };
  DailySummary: { id?: string };
  CustomFoods: { id?: string };
  AddCustomFood: { id?: string };
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Dashboard: NavigatorScreenParams<DashboardStackParamList>;
  Food: NavigatorScreenParams<FoodStackParamList>;
}; 