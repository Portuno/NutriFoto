import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useFoodStore } from '../../store/foodStore';
import { Food } from '../../types/food';

interface FoodSearchProps {
  onSelectFood: (food: { id: string; name: string }) => void;
}

export function FoodSearch({ onSelectFood }: FoodSearchProps) {
  const { searchFoods, searchResults, isLoading, error } = useFoodStore();
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (query.length >= 2) {
      searchFoods(query);
    }
  }, [query]);

  const renderFoodItem = ({ item }: { item: Food }) => (
    <TouchableOpacity
      style={styles.foodItem}
      onPress={() => onSelectFood({ id: item.id, name: item.name })}
    >
      <View style={styles.foodInfo}>
        <Text style={styles.foodName}>{item.name}</Text>
        <Text style={styles.foodDetails}>
          {item.calories} cal | P: {item.protein}g | C: {item.carbs}g | G: {item.fat}g
        </Text>
        <Text style={styles.servingSize}>
          Porción: {item.servingSize} {item.servingUnit}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar alimentos..."
          value={query}
          onChangeText={setQuery}
          autoCapitalize="none"
        />
        {isLoading && (
          <ActivityIndicator style={styles.loader} color="#2E7D32" />
        )}
      </View>

      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      {query.length >= 2 && searchResults && searchResults.foods.length > 0 && (
        <FlatList
          data={searchResults.foods}
          renderItem={renderFoodItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
        />
      )}

      {query.length >= 2 && !isLoading && searchResults?.foods.length === 0 && (
        <Text style={styles.noResults}>
          No se encontraron resultados para "{query}"
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  loader: {
    marginLeft: 10,
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 10,
  },
  foodItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  foodInfo: {
    gap: 4,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  foodDetails: {
    fontSize: 14,
    color: '#666',
  },
  servingSize: {
    fontSize: 12,
    color: '#999',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  noResults: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
    fontSize: 16,
  },
}); 