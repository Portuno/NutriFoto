import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/authStore';

export default function HomeScreen() {
  const { user } = useAuthStore();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.welcomeText}>
            ¡Hola, {user?.name}!
          </Text>

          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>
                {user?.dailyCalorieGoal || 0}
              </Text>
              <Text style={styles.statLabel}>Calorías objetivo</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Calorías consumidas</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statValue}>
                {user?.dailyCalorieGoal || 0}
              </Text>
              <Text style={styles.statLabel}>Calorías restantes</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Progreso del día</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '0%' }]} />
            </View>
            <Text style={styles.progressText}>0% del objetivo diario</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Resumen de la semana</Text>
            <View style={styles.weekSummary}>
              {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day) => (
                <View key={day} style={styles.dayColumn}>
                  <Text style={styles.dayText}>{day}</Text>
                  <View style={styles.dayBar} />
                  <Text style={styles.dayValue}>0</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Próximas comidas</Text>
            <View style={styles.mealCard}>
              <Text style={styles.mealTitle}>Desayuno</Text>
              <Text style={styles.mealSubtitle}>No hay comidas registradas</Text>
            </View>
            <View style={styles.mealCard}>
              <Text style={styles.mealTitle}>Almuerzo</Text>
              <Text style={styles.mealSubtitle}>No hay comidas registradas</Text>
            </View>
            <View style={styles.mealCard}>
              <Text style={styles.mealTitle}>Cena</Text>
              <Text style={styles.mealSubtitle}>No hay comidas registradas</Text>
            </View>
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
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
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
  progressBar: {
    height: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2E7D32',
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  weekSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  dayColumn: {
    alignItems: 'center',
    flex: 1,
  },
  dayText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  dayBar: {
    width: 20,
    height: 100,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  dayValue: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  mealCard: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  mealSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
}); 