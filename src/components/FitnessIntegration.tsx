import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { useFitnessStore } from '../store/fitnessStore';
import { FitnessData } from '../types/fitness';
import { MaterialIcons } from '@expo/vector-icons';
import * as AppleHealthKit from 'react-native-health';
import { GoogleFit, Scopes } from 'react-native-google-fit';

export function FitnessIntegration() {
  const { addFitnessData, setError } = useFitnessStore();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    initializeHealthKit();
  }, []);

  const initializeHealthKit = async () => {
    if (Platform.OS === 'ios') {
      try {
        const permissions = {
          permissions: {
            read: [
              AppleHealthKit.Constants.Permissions.Steps,
              AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
              AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
            ],
            write: [],
          },
        };

        await AppleHealthKit.initHealthKit(permissions);
        setIsConnected(true);
      } catch (error) {
        setError('Error al conectar con Apple Health');
      }
    } else if (Platform.OS === 'android') {
      try {
        const options = {
          scopes: [
            Scopes.FITNESS_ACTIVITY_READ,
            Scopes.FITNESS_BODY_READ,
          ],
        };

        await GoogleFit.authorize(options);
        setIsConnected(true);
      } catch (error) {
        setError('Error al conectar con Google Fit');
      }
    }
  };

  const fetchFitnessData = async () => {
    if (Platform.OS === 'ios') {
      try {
        const steps = await AppleHealthKit.getStepCount({
          date: new Date().toISOString(),
        });

        const distance = await AppleHealthKit.getDistanceWalkingRunning({
          date: new Date().toISOString(),
        });

        const calories = await AppleHealthKit.getActiveEnergyBurned({
          date: new Date().toISOString(),
        });

        const fitnessData: FitnessData = {
          steps: steps.value,
          caloriesBurned: calories.value,
          distance: distance.value,
          activeMinutes: 0, // Calculate based on steps or other metrics
          timestamp: new Date(),
        };

        addFitnessData(fitnessData);
      } catch (error) {
        setError('Error al obtener datos de Apple Health');
      }
    } else if (Platform.OS === 'android') {
      try {
        const today = new Date();
        const options = {
          startDate: today.toISOString(),
          endDate: today.toISOString(),
        };

        const steps = await GoogleFit.getDailySteps(options);
        const calories = await GoogleFit.getDailyCalories(options);
        const distance = await GoogleFit.getDailyDistance(options);

        const fitnessData: FitnessData = {
          steps: steps.steps,
          caloriesBurned: calories.calories,
          distance: distance.distance,
          activeMinutes: 0, // Calculate based on steps or other metrics
          timestamp: new Date(),
        };

        addFitnessData(fitnessData);
      } catch (error) {
        setError('Error al obtener datos de Google Fit');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Integración de Actividad Física</Text>
      <View style={styles.statusContainer}>
        <MaterialIcons
          name={isConnected ? 'check-circle' : 'error'}
          size={24}
          color={isConnected ? '#4CAF50' : '#F44336'}
        />
        <Text style={styles.statusText}>
          {isConnected
            ? 'Conectado a ' + (Platform.OS === 'ios' ? 'Apple Health' : 'Google Fit')
            : 'No conectado'}
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.button, !isConnected && styles.buttonDisabled]}
        onPress={fetchFitnessData}
        disabled={!isConnected}
      >
        <MaterialIcons name="fitness-center" size={24} color="white" />
        <Text style={styles.buttonText}>Sincronizar Datos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusText: {
    marginLeft: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
}); 