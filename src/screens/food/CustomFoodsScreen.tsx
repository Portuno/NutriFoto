import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useFoodStore } from '../../store/foodStore';
import { Food } from '../../types/food';

export function CustomFoodsScreen() {
  const { getCustomFoods, deleteCustomFood, isLoading, error } = useFoodStore();
  const [customFoods, setCustomFoods] = useState<Food[]>([]);

  useEffect(() => {
    loadCustomFoods();
  }, []);

  const loadCustomFoods = async () => {
    const foods = await getCustomFoods('1'); // TODO: Get from auth store
    setCustomFoods(foods);
  };

  const handleDeleteFood = async (foodId: string) => {
    Alert.alert(
      'Eliminar Alimento',
      '¿Estás seguro de que deseas eliminar este alimento?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteCustomFood(foodId);
              await loadCustomFoods();
              Alert.alert('Éxito', 'Alimento eliminado correctamente');
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar el alimento');
            }
          },
        },
      ]
    );
  };

  const renderFoodItem = ({ item }: { item: Food }) => (
    <View style={styles.foodItem}>
      <View style={styles.foodInfo}>
        <Text style={styles.foodName}>{item.name}</Text>
        <Text style={styles.foodDetails}>
          {item.calories} cal | P: {item.protein}g | C: {item.carbs}g | G: {item.fat}g
        </Text>
        <Text style={styles.servingSize}>
          Porción: {item.servingSize} {item.servingUnit}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteFood(item.id)}
      >
        <Text style={styles.deleteButtonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2E7D32" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {customFoods.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No tienes alimentos personalizados
          </Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              // TODO: Navigate to AddCustomFoodScreen
            }}
          >
            <Text style={styles.addButtonText}>Agregar Alimento</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={customFoods}
          renderItem={renderFoodItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  listContent: {
    padding: 20,
  },
  foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  foodDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  servingSize: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  deleteButton: {
    padding: 8,
  },
  deleteButtonText: {
    color: '#d32f2f',
    fontSize: 14,
  },
}); 