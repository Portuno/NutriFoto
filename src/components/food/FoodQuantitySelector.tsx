import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface FoodQuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export function FoodQuantitySelector({ quantity, onQuantityChange }: FoodQuantitySelectorProps) {
  const handleIncrement = () => {
    onQuantityChange(quantity + 0.5);
  };

  const handleDecrement = () => {
    if (quantity > 0.5) {
      onQuantityChange(quantity - 0.5);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, quantity <= 0.5 && styles.buttonDisabled]}
        onPress={handleDecrement}
        disabled={quantity <= 0.5}
      >
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.quantity}>{quantity}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleIncrement}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  button: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#2E7D32',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 16,
    color: '#333',
    minWidth: 40,
    textAlign: 'center',
  },
}); 