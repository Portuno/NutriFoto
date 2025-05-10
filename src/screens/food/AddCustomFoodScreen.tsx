import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFoodStore } from '../../store/foodStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

const foodSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  calories: z.number().min(0, 'Las calorías deben ser mayores a 0'),
  protein: z.number().min(0, 'La proteína debe ser mayor a 0'),
  carbs: z.number().min(0, 'Los carbohidratos deben ser mayores a 0'),
  fat: z.number().min(0, 'La grasa debe ser mayor a 0'),
  servingSize: z.number().min(0.1, 'El tamaño de la porción debe ser mayor a 0'),
  servingUnit: z.string().min(1, 'La unidad de medida es requerida'),
});

type FoodFormData = z.infer<typeof foodSchema>;

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const servingUnits = ['g', 'ml', 'oz', 'cup', 'tbsp', 'tsp'];

export function AddCustomFoodScreen() {
  const { addCustomFood } = useFoodStore();
  const navigation = useNavigation<NavigationProp>();
  const { control, handleSubmit, formState: { errors } } = useForm<FoodFormData>({
    resolver: zodResolver(foodSchema),
    defaultValues: {
      servingSize: 100,
      servingUnit: 'g',
    },
  });

  const onSubmit = async (data: FoodFormData) => {
    try {
      await addCustomFood({
        name: data.name,
        calories: data.calories,
        protein: data.protein,
        carbs: data.carbs,
        fat: data.fat,
        servingSize: data.servingSize,
        servingUnit: data.servingUnit,
        isCustom: true,
      });
      navigation.goBack();
    } catch (error) {
      // TODO: Show error message
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Agregar Alimento Personalizado</Text>

          <View style={styles.form}>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Nombre</Text>
                  <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChange}
                    placeholder="Ej: Ensalada de pollo"
                  />
                  {errors.name && (
                    <Text style={styles.errorText}>{errors.name.message}</Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="calories"
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Calorías</Text>
                  <TextInput
                    style={styles.input}
                    value={value?.toString()}
                    onChangeText={(text) => onChange(Number(text) || 0)}
                    keyboardType="numeric"
                    placeholder="Ej: 150"
                  />
                  {errors.calories && (
                    <Text style={styles.errorText}>{errors.calories.message}</Text>
                  )}
                </View>
              )}
            />

            <View style={styles.macrosContainer}>
              <Controller
                control={control}
                name="protein"
                render={({ field: { onChange, value } }) => (
                  <View style={styles.macroInput}>
                    <Text style={styles.label}>Proteína (g)</Text>
                    <TextInput
                      style={styles.input}
                      value={value?.toString()}
                      onChangeText={(text) => onChange(Number(text) || 0)}
                      keyboardType="numeric"
                      placeholder="0"
                    />
                    {errors.protein && (
                      <Text style={styles.errorText}>{errors.protein.message}</Text>
                    )}
                  </View>
                )}
              />

              <Controller
                control={control}
                name="carbs"
                render={({ field: { onChange, value } }) => (
                  <View style={styles.macroInput}>
                    <Text style={styles.label}>Carbos (g)</Text>
                    <TextInput
                      style={styles.input}
                      value={value?.toString()}
                      onChangeText={(text) => onChange(Number(text) || 0)}
                      keyboardType="numeric"
                      placeholder="0"
                    />
                    {errors.carbs && (
                      <Text style={styles.errorText}>{errors.carbs.message}</Text>
                    )}
                  </View>
                )}
              />

              <Controller
                control={control}
                name="fat"
                render={({ field: { onChange, value } }) => (
                  <View style={styles.macroInput}>
                    <Text style={styles.label}>Grasa (g)</Text>
                    <TextInput
                      style={styles.input}
                      value={value?.toString()}
                      onChangeText={(text) => onChange(Number(text) || 0)}
                      keyboardType="numeric"
                      placeholder="0"
                    />
                    {errors.fat && (
                      <Text style={styles.errorText}>{errors.fat.message}</Text>
                    )}
                  </View>
                )}
              />
            </View>

            <View style={styles.servingContainer}>
              <Controller
                control={control}
                name="servingSize"
                render={({ field: { onChange, value } }) => (
                  <View style={styles.servingInput}>
                    <Text style={styles.label}>Tamaño de porción</Text>
                    <TextInput
                      style={styles.input}
                      value={value?.toString()}
                      onChangeText={(text) => onChange(Number(text) || 0)}
                      keyboardType="numeric"
                      placeholder="100"
                    />
                    {errors.servingSize && (
                      <Text style={styles.errorText}>{errors.servingSize.message}</Text>
                    )}
                  </View>
                )}
              />

              <Controller
                control={control}
                name="servingUnit"
                render={({ field: { onChange, value } }) => (
                  <View style={styles.servingInput}>
                    <Text style={styles.label}>Unidad</Text>
                    <View style={styles.unitSelector}>
                      {servingUnits.map((unit) => (
                        <TouchableOpacity
                          key={unit}
                          style={[
                            styles.unitButton,
                            value === unit && styles.unitButtonSelected,
                          ]}
                          onPress={() => onChange(unit)}
                        >
                          <Text
                            style={[
                              styles.unitButtonText,
                              value === unit && styles.unitButtonTextSelected,
                            ]}
                          >
                            {unit}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                    {errors.servingUnit && (
                      <Text style={styles.errorText}>{errors.servingUnit.message}</Text>
                    )}
                  </View>
                )}
              />
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.buttonText}>Guardar Alimento</Text>
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
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
  },
  macrosContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  macroInput: {
    flex: 1,
    gap: 10,
  },
  servingContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  servingInput: {
    flex: 1,
    gap: 10,
  },
  unitSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  unitButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2E7D32',
    backgroundColor: '#fff',
  },
  unitButtonSelected: {
    backgroundColor: '#2E7D32',
  },
  unitButtonText: {
    color: '#2E7D32',
    fontSize: 14,
  },
  unitButtonTextSelected: {
    color: '#fff',
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