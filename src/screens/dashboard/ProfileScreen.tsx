import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/authStore';

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();

  const activityLevelLabels: Record<string, string> = {
    sedentary: 'Sedentario',
    light: 'Ligero',
    moderate: 'Moderado',
    active: 'Activo',
    very_active: 'Muy Activo',
  };

  const weightGoalLabels: Record<string, string> = {
    lose: 'Perder peso',
    maintain: 'Mantener peso',
    gain: 'Ganar peso',
  };

  const genderLabels: Record<string, string> = {
    male: 'Masculino',
    female: 'Femenino',
    other: 'Otro',
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Perfil</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Información Personal</Text>
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Nombre</Text>
                <Text style={styles.infoValue}>{user?.name}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Correo electrónico</Text>
                <Text style={styles.infoValue}>{user?.email}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Edad</Text>
                <Text style={styles.infoValue}>{user?.age} años</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Género</Text>
                <Text style={styles.infoValue}>{genderLabels[user?.gender || '']}</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Medidas</Text>
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Peso actual</Text>
                <Text style={styles.infoValue}>{user?.weight} kg</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Altura</Text>
                <Text style={styles.infoValue}>{user?.height} cm</Text>
              </View>
              {user?.targetWeight && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Peso objetivo</Text>
                  <Text style={styles.infoValue}>{user.targetWeight} kg</Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Objetivos</Text>
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Objetivo de peso</Text>
                <Text style={styles.infoValue}>
                  {weightGoalLabels[user?.weightGoal || '']}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Nivel de actividad</Text>
                <Text style={styles.infoValue}>
                  {activityLevelLabels[user?.activityLevel || '']}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Calorías diarias</Text>
                <Text style={styles.infoValue}>{user?.dailyCalorieGoal} kcal</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
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
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  infoCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#d32f2f',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 