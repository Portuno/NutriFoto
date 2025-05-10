import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFoodStore } from '../../store/foodStore';
import { RootStackParamList } from '../../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function DashboardScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { getDailySummary } = useFoodStore();

  const handleAddMeal = () => {
    navigation.navigate('Food', { screen: 'AddMeal', params: { id: undefined } });
  };

  const handleViewSummary = () => {
    navigation.navigate('Food', { screen: 'DailySummary', params: { id: undefined } });
  };

  const handleCustomFoods = () => {
    navigation.navigate('Food', { screen: 'CustomFoods', params: { id: undefined } });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nutrifoto</Text>
        <Text style={styles.subtitle}>Tu asistente de nutrición</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.card}
          onPress={handleAddMeal}
        >
          <Text style={styles.cardTitle}>Agregar Comida</Text>
          <Text style={styles.cardDescription}>
            Registra tus comidas y mantén un seguimiento de tu ingesta diaria
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={handleViewSummary}
        >
          <Text style={styles.cardTitle}>Resumen Diario</Text>
          <Text style={styles.cardDescription}>
            Revisa tu consumo de calorías y macronutrientes del día
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={handleCustomFoods}
        >
          <Text style={styles.cardTitle}>Mis Alimentos</Text>
          <Text style={styles.cardDescription}>
            Gestiona tus alimentos personalizados
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#2E7D32',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    marginTop: 4,
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
}); 