import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFoodStore } from '../../store/foodStore';
import DateTimePicker from '@react-native-community/datetimepicker';

const mealSchema = z.object({
  name: z.string().min(1, 'El nombre de la comida es requerido'),
  date: z.string(),
  time: z.string(),
  notes: z.string().optional(),
});

type MealFormData = z.infer<typeof mealSchema>;

interface AddMealFormProps {
  onSubmit: (data: {
    name: string;
    date: string;
    time: string;
    notes?: string;
  }) => Promise<void>;
}

export function AddMealForm({ onSubmit }: AddMealFormProps) {
  const { isLoading, error, clearError } = useFoodStore();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const { control, handleSubmit, formState: { errors }, watch } = useForm<MealFormData>({
    resolver: zodResolver(mealSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().slice(0, 5),
    },
  });

  const handleFormSubmit = async (data: MealFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      Alert.alert('Error', 'No se pudo agregar la comida');
    }
  };

  const date = watch('date');
  const time = watch('time');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nombre de la comida</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej: Desayuno saludable"
                onChangeText={onChange}
                value={value}
              />
              {errors.name && (
                <Text style={styles.errorText}>{errors.name.message}</Text>
              )}
            </View>
          )}
        />

        <Controller
          control={control}
          name="date"
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Fecha</Text>
              <TouchableOpacity
                style={styles.dateTimeButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.dateTimeText}>{value}</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={new Date(value)}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      onChange(selectedDate.toISOString().split('T')[0]);
                    }
                  }}
                />
              )}
            </View>
          )}
        />

        <Controller
          control={control}
          name="time"
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Hora</Text>
              <TouchableOpacity
                style={styles.dateTimeButton}
                onPress={() => setShowTimePicker(true)}
              >
                <Text style={styles.dateTimeText}>{value}</Text>
              </TouchableOpacity>
              {showTimePicker && (
                <DateTimePicker
                  value={new Date(`2000-01-01T${value}`)}
                  mode="time"
                  display="default"
                  onChange={(event, selectedTime) => {
                    setShowTimePicker(false);
                    if (selectedTime) {
                      onChange(selectedTime.toTimeString().slice(0, 5));
                    }
                  }}
                />
              )}
            </View>
          )}
        />

        <Controller
          control={control}
          name="notes"
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Notas (opcional)</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Agrega notas sobre tu comida..."
                multiline
                numberOfLines={4}
                onChangeText={onChange}
                value={value}
              />
            </View>
          )}
        />

        {error && (
          <Text style={styles.errorText} onPress={clearError}>
            {error}
          </Text>
        )}

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleSubmit(handleFormSubmit)}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Agregando...' : 'Agregar Comida'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  dateTimeButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
  },
  dateTimeText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#2E7D32',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.7,
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