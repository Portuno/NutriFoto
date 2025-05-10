import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useFitnessStore } from '../store/fitnessStore';
import { BarcodeProduct } from '../types/fitness';
import { MaterialIcons } from '@expo/vector-icons';

export function BarcodeScanner() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const { addScannedProduct, setLoading, setError } = useFitnessStore();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    setScanned(true);
    setLoading(true);
    try {
      // Here you would typically call your API to get product information
      // For now, we'll simulate a response
      const mockProduct: BarcodeProduct = {
        barcode: data,
        name: 'Sample Product',
        brand: 'Sample Brand',
        nutritionalInfo: {
          calories: 100,
          protein: 10,
          carbs: 20,
          fat: 5,
          servingSize: 100,
          servingUnit: 'g',
        },
      };

      addScannedProduct(mockProduct);
      Alert.alert(
        'Producto Escaneado',
        `Nombre: ${mockProduct.name}\nCalorías: ${mockProduct.nutritionalInfo.calories} kcal`
      );
    } catch (error) {
      setError('Error al obtener información del producto');
      Alert.alert('Error', 'No se pudo obtener la información del producto');
    } finally {
      setLoading(false);
    }
  };

  if (hasPermission === null) {
    return <Text>Solicitando permiso de cámara...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sin acceso a la cámara</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.scanner}
      />
      {scanned && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setScanned(false)}
        >
          <MaterialIcons name="qr-code-scanner" size={24} color="white" />
          <Text style={styles.buttonText}>Escanear de nuevo</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scanner: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    backgroundColor: '#007AFF',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
}); 