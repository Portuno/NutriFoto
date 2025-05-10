import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthStackParamList } from '../../navigation/types';
import { useAuthStore } from '../../store/authStore';
import { ActivityLevel, Gender, WeightGoal } from '../../types/user';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

const registerSchema = z.object({
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: z.string(),
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  age: z.number().min(13, 'Debes tener al menos 13 años').max(120, 'Edad inválida'),
  weight: z.number().min(30, 'Peso inválido').max(300, 'Peso inválido'),
  height: z.number().min(100, 'Altura inválida').max(250, 'Altura inválida'),
  gender: z.enum(['male', 'female', 'other'] as const),
  activityLevel: z.enum(['sedentary', 'light', 'moderate', 'active', 'very_active'] as const),
  weightGoal: z.enum(['lose', 'maintain', 'gain'] as const),
  targetWeight: z.number().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const activityLevels: { label: string; value: ActivityLevel }[] = [
  { label: 'Sedentario', value: 'sedentary' },
  { label: 'Ligero', value: 'light' },
  { label: 'Moderado', value: 'moderate' },
  { label: 'Activo', value: 'active' },
  { label: 'Muy Activo', value: 'very_active' },
];

const genders: { label: string; value: Gender }[] = [
  { label: 'Masculino', value: 'male' },
  { label: 'Femenino', value: 'female' },
  { label: 'Otro', value: 'other' },
];

const weightGoals: { label: string; value: WeightGoal }[] = [
  { label: 'Perder peso', value: 'lose' },
  { label: 'Mantener peso', value: 'maintain' },
  { label: 'Ganar peso', value: 'gain' },
];

export default function RegisterScreen({ navigation }: Props) {
  const { register: registerUser, isLoading, error, clearError } = useAuthStore();
  const { control, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      gender: 'male',
      activityLevel: 'moderate',
      weightGoal: 'maintain',
    },
  });

  const weightGoal = watch('weightGoal');

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data);
    } catch (error) {
      // Error is handled by the store
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Crear Cuenta</Text>

          <View style={styles.form}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Correo electrónico"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={onChange}
                    value={value}
                  />
                  {errors.email && (
                    <Text style={styles.errorText}>{errors.email.message}</Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    secureTextEntry
                    onChangeText={onChange}
                    value={value}
                  />
                  {errors.password && (
                    <Text style={styles.errorText}>{errors.password.message}</Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Confirmar contraseña"
                    secureTextEntry
                    onChangeText={onChange}
                    value={value}
                  />
                  {errors.confirmPassword && (
                    <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Nombre completo"
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
              name="age"
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Edad"
                    keyboardType="numeric"
                    onChangeText={(text) => onChange(Number(text))}
                    value={value?.toString()}
                  />
                  {errors.age && (
                    <Text style={styles.errorText}>{errors.age.message}</Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="weight"
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Peso (kg)"
                    keyboardType="numeric"
                    onChangeText={(text) => onChange(Number(text))}
                    value={value?.toString()}
                  />
                  {errors.weight && (
                    <Text style={styles.errorText}>{errors.weight.message}</Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="height"
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Altura (cm)"
                    keyboardType="numeric"
                    onChangeText={(text) => onChange(Number(text))}
                    value={value?.toString()}
                  />
                  {errors.height && (
                    <Text style={styles.errorText}>{errors.height.message}</Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="gender"
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Género</Text>
                  <View style={styles.optionsContainer}>
                    {genders.map((gender) => (
                      <TouchableOpacity
                        key={gender.value}
                        style={[
                          styles.optionButton,
                          value === gender.value && styles.optionButtonSelected,
                        ]}
                        onPress={() => onChange(gender.value)}
                      >
                        <Text
                          style={[
                            styles.optionButtonText,
                            value === gender.value && styles.optionButtonTextSelected,
                          ]}
                        >
                          {gender.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            />

            <Controller
              control={control}
              name="activityLevel"
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Nivel de actividad</Text>
                  <View style={styles.optionsContainer}>
                    {activityLevels.map((level) => (
                      <TouchableOpacity
                        key={level.value}
                        style={[
                          styles.optionButton,
                          value === level.value && styles.optionButtonSelected,
                        ]}
                        onPress={() => onChange(level.value)}
                      >
                        <Text
                          style={[
                            styles.optionButtonText,
                            value === level.value && styles.optionButtonTextSelected,
                          ]}
                        >
                          {level.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            />

            <Controller
              control={control}
              name="weightGoal"
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Objetivo de peso</Text>
                  <View style={styles.optionsContainer}>
                    {weightGoals.map((goal) => (
                      <TouchableOpacity
                        key={goal.value}
                        style={[
                          styles.optionButton,
                          value === goal.value && styles.optionButtonSelected,
                        ]}
                        onPress={() => onChange(goal.value)}
                      >
                        <Text
                          style={[
                            styles.optionButtonText,
                            value === goal.value && styles.optionButtonTextSelected,
                          ]}
                        >
                          {goal.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            />

            {weightGoal !== 'maintain' && (
              <Controller
                control={control}
                name="targetWeight"
                render={({ field: { onChange, value } }) => (
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Peso objetivo (kg)"
                      keyboardType="numeric"
                      onChangeText={(text) => onChange(Number(text))}
                      value={value?.toString()}
                    />
                    {errors.targetWeight && (
                      <Text style={styles.errorText}>{errors.targetWeight.message}</Text>
                    )}
                  </View>
                )}
              />
            )}

            {error && (
              <Text style={styles.errorText} onPress={clearError}>
                {error}
              </Text>
            )}

            <TouchableOpacity
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleSubmit(onSubmit)}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? 'Cargando...' : 'Registrarse'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.linkText}>
                ¿Ya tienes una cuenta? Inicia sesión
              </Text>
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 30,
    textAlign: 'center',
  },
  form: {
    gap: 15,
  },
  inputContainer: {
    gap: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
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
  button: {
    backgroundColor: '#2E7D32',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  linkButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  linkText: {
    color: '#2E7D32',
    fontSize: 14,
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 12,
    marginTop: 5,
  },
}); 