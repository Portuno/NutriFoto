import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFoodStore } from '../../store/foodStore';
import { Meal } from '../../types/food';

export function DailySummaryScreen() {
  const { getMealsByDate } = useFoodStore();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadMeals();
  }, []);

  const loadMeals = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const today = new Date().toISOString().split('T')[0];
      const meals = await getMealsByDate(today);
      setMeals(meals);
    } catch (err) {
      setError('Error al cargar las comidas');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotals = () => {
    return meals.reduce(
      (acc, meal) => {
        meal.foods.forEach((food) => {
          acc.calories += food.calories;
          acc.protein += food.protein;
          acc.carbs += food.carbs;
          acc.fat += food.fat;
        });
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };

  const getMealTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      breakfast: 'Desayuno',
      lunch: 'Almuerzo',
      dinner: 'Cena',
      snack: 'Snack',
    };
    return labels[type] || type;
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2E7D32" />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  const totals = calculateTotals();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Resumen del Día</Text>

          <View style={styles.totalsContainer}>
            <Text style={styles.totalsTitle}>Totales</Text>
            <View style={styles.totalsGrid}>
              <View style={styles.totalItem}>
                <Text style={styles.totalValue}>{totals.calories}</Text>
                <Text style={styles.totalLabel}>Calorías</Text>
              </View>
              <View style={styles.totalItem}>
                <Text style={styles.totalValue}>{totals.protein}g</Text>
                <Text style={styles.totalLabel}>Proteína</Text>
              </View>
              <View style={styles.totalItem}>
                <Text style={styles.totalValue}>{totals.carbs}g</Text>
                <Text style={styles.totalLabel}>Carbos</Text>
              </View>
              <View style={styles.totalItem}>
                <Text style={styles.totalValue}>{totals.fat}g</Text>
                <Text style={styles.totalLabel}>Grasa</Text>
              </View>
            </View>
          </View>

          {meals.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No hay comidas registradas hoy</Text>
            </View>
          ) : (
            meals.map((meal) => (
              <View key={meal.id} style={styles.mealContainer}>
                <Text style={styles.mealTitle}>{getMealTypeLabel(meal.type)}</Text>
                {meal.foods.map((food) => (
                  <View key={food.foodId} style={styles.foodItem}>
                    <View style={styles.foodInfo}>
                      <Text style={styles.foodName}>{food.food.name}</Text>
                      <Text style={styles.foodDetails}>
                        {food.quantity} {food.food.servingUnit}
                      </Text>
                    </View>
                    <View style={styles.foodNutrition}>
                      <Text style={styles.foodCalories}>{food.calories} cal</Text>
                      <Text style={styles.foodMacros}>
                        P: {food.protein}g | C: {food.carbs}g | G: {food.fat}g
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 16,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 20,
  },
  totalsContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  totalsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  totalsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalItem: {
    alignItems: 'center',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  totalLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  mealContainer: {
    marginBottom: 24,
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    color: '#333',
  },
  foodDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  foodNutrition: {
    alignItems: 'flex-end',
  },
  foodCalories: {
    fontSize: 16,
    color: '#2E7D32',
    fontWeight: '500',
  },
  foodMacros: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
}); 