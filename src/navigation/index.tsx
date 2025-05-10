import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuthStore } from '../store/authStore';
import { RootStackParamList, AuthStackParamList, DashboardStackParamList, FoodStackParamList } from './types';

// Auth Screens
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

// Dashboard Screens
import HomeScreen from '../screens/dashboard/HomeScreen';
import ProfileScreen from '../screens/dashboard/ProfileScreen';
import SettingsScreen from '../screens/dashboard/SettingsScreen';

// Food Screens
import { AddMealScreen } from '../screens/food/AddMealScreen';
import { DailySummaryScreen } from '../screens/food/DailySummaryScreen';
import { CustomFoodsScreen } from '../screens/food/CustomFoodsScreen';
import { AddCustomFoodScreen } from '../screens/food/AddCustomFoodScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const DashboardStack = createNativeStackNavigator<DashboardStackParamList>();
const FoodStack = createNativeStackNavigator<FoodStackParamList>();
const Tab = createBottomTabNavigator<DashboardStackParamList>();

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
}

function DashboardNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function FoodNavigator() {
  return (
    <FoodStack.Navigator>
      <FoodStack.Screen name="AddMeal" component={AddMealScreen} />
      <FoodStack.Screen name="DailySummary" component={DailySummaryScreen} />
      <FoodStack.Screen name="CustomFoods" component={CustomFoodsScreen} />
      <FoodStack.Screen name="AddCustomFood" component={AddCustomFoodScreen} />
    </FoodStack.Navigator>
  );
}

export function Navigation() {
  const { isAuthenticated } = useAuthStore();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <>
            <Stack.Screen name="Dashboard" component={DashboardNavigator} />
            <Stack.Screen name="Food" component={FoodNavigator} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
} 