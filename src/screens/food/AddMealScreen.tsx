import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFoodStore } from '../../store/foodStore';
import { MealType, Food, MealFood } from '../../types/food';
import { FoodSearch } from '../../components/food/FoodSearch';
import { FoodQuantitySelector } from '../../components/food/FoodQuantitySelector';

const mealSchema = z.object({
  type: z.enum(['breakfast', 'lunch', 'dinner', 'snack']),
  foods: z.array(z.object({
    foodId: z.string(),
    quantity: z.number().min(0.1),
  })).min(1, 'Debes agregar al menos un alimento'),
});

type MealFormData = z.infer<typeof mealSchema>;

const mealTypes: { label: string; value: MealType }[] = [
  { label: 'Desayuno', value: 'breakfast' },
  { label: 'Almuerzo', value: 'lunch' },
  { label: 'Cena', value: 'dinner' },
  { label: 'Snack', value: 'snack' },
];

export function AddMealScreen() {
  const { addMeal, searchResults } = useFoodStore();
  const [selectedFoods, setSelectedFoods] = useState<Array<{ food: Food; quantity: number }>>([]);
  const { control, handleSubmit, formState: { errors } } = useForm<MealFormData>({
    resolver: zodResolver(mealSchema),
    defaultValues: {
      type: 'breakfast',
      foods: [],
    },
  });

  const handleAddFood = (foodId: string) => {
    const food = searchResults?.foods.find(f => f.id === foodId);
    if (food) {
      setSelectedFoods([...selectedFoods, { food, quantity: 1 }]);
    }
  };

  const handleUpdateQuantity = (foodId: string, quantity: number) => {
    setSelectedFoods(selectedFoods.map(item => 
      item.food.id === foodId ? { ...item, quantity } : item
    ));
  };

  const handleRemoveFood = (foodId: string) => {
    setSelectedFoods(selectedFoods.filter(item => item.food.id !== foodId));
  };

  const onSubmit = async (data: MealFormData) => {
    try {
      const mealFoods: MealFood[] = selectedFoods.map(item => ({
        foodId: item.food.id,
        food: item.food,
        quantity: item.quantity,
        calories: Math.round(item.food.calories * item.quantity),
        protein: Math.round(item.food.protein * item.quantity * 10) / 10,
        carbs: Math.round(item.food.carbs * item.quantity * 10) / 10,
        fat: Math.round(item.food.fat * item.quantity * 10) / 10,
      }));

      await addMeal({
        type: data.type,
        foods: mealFoods,
        date: new Date().toISOString(),
      });
      // TODO: Navigate back or show success message
    } catch (error) {
      // TODO: Show error message
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Agregar Comida</Text>

          <View style={styles.form}>
            <Controller
              control={control}
              name="type"
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Tipo de comida</Text>
                  <View style={styles.optionsContainer}>
                    {mealTypes.map((type) => (
                      <TouchableOpacity
                        key={type.value}
                        style={[
                          styles.optionButton,
                          value === type.value && styles.optionButtonSelected,
                        ]}
                        onPress={() => onChange(type.value)}
                      >
                        <Text
                          style={[
                            styles.optionButtonText,
                            value === type.value && styles.optionButtonTextSelected,
                          ]}
                        >
                          {type.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            />

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Buscar alimentos</Text>
              <FoodSearch onSelectFood={handleAddFood} />
            </View>

            {selectedFoods.length > 0 && (
              <View style={styles.selectedFoodsContainer}>
                <Text style={styles.label}>Alimentos seleccionados</Text>
                {selectedFoods.map((item) => (
                  <View key={item.food.id} style={styles.foodItem}>
                    <View style={styles.foodInfo}>
                      <Text style={styles.foodName}>{item.food.name}</Text>
                      <Text style={styles.foodDetails}>
                        {Math.round(item.food.calories * item.quantity)} cal | {item.food.servingSize}{item.food.servingUnit}
                      </Text>
                    </View>
                    <FoodQuantitySelector
                      quantity={item.quantity}
                      onQuantityChange={(quantity) => handleUpdateQuantity(item.food.id, quantity)}
                    />
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => handleRemoveFood(item.food.id)}
                    >
                      <Text style={styles.removeButtonText}>Eliminar</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            {errors.foods && (
              <Text style={styles.errorText}>{errors.foods.message}</Text>
            )}

            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.buttonText}>Guardar Comida</Text>
            </TouchableOpacity>
          </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 20,
  },
  form: {
    gap: 20,
  },
  inputContainer: {
    gap: 10,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2E7D32',
    backgroundColor: '#fff',
  },
  optionButtonSelected: {
    backgroundColor: '#2E7D32',
  },
  optionButtonText: {
    color: '#2E7D32',
    fontSize: 14,
  },
  optionButtonTextSelected: {
    color: '#fff',
  },
  selectedFoodsContainer: {
    gap: 10,
  },
  foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
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
    marginTop: 4,
  },
  removeButton: {
    padding: 8,
  },
  removeButtonText: {
    color: '#d32f2f',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#2E7D32',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 12,
    marginTop: 5,
  },
}); 