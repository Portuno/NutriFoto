import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useFitnessStore } from '../store/fitnessStore';
import { MaterialIcons } from '@expo/vector-icons';
import { Challenge, Achievement } from '../types/fitness';

export function Gamification() {
  const { userProgress, challenges, achievements } = useFitnessStore();

  const renderChallenge = (challenge: Challenge) => (
    <View key={challenge.id} style={styles.challengeCard}>
      <View style={styles.challengeHeader}>
        <MaterialIcons
          name={challenge.isCompleted ? 'check-circle' : 'schedule'}
          size={24}
          color={challenge.isCompleted ? '#4CAF50' : '#FFA000'}
        />
        <Text style={styles.challengeTitle}>{challenge.title}</Text>
      </View>
      <Text style={styles.challengeDescription}>{challenge.description}</Text>
      <View style={styles.challengeFooter}>
        <Text style={styles.challengeReward}>
          Recompensa: {challenge.reward.points} puntos
        </Text>
        {challenge.reward.badge && (
          <MaterialIcons name="emoji-events" size={20} color="#FFD700" />
        )}
      </View>
    </View>
  );

  const renderAchievement = (achievement: Achievement) => (
    <View key={achievement.id} style={styles.achievementCard}>
      <View style={styles.achievementHeader}>
        <MaterialIcons
          name={achievement.unlockedAt ? 'emoji-events' : 'lock'}
          size={24}
          color={achievement.unlockedAt ? '#FFD700' : '#9E9E9E'}
        />
        <Text style={styles.achievementTitle}>{achievement.title}</Text>
      </View>
      <Text style={styles.achievementDescription}>
        {achievement.description}
      </Text>
      {achievement.unlockedAt && (
        <Text style={styles.achievementDate}>
          Desbloqueado: {new Date(achievement.unlockedAt).toLocaleDateString()}
        </Text>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.progressSection}>
        <Text style={styles.sectionTitle}>Tu Progreso</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <MaterialIcons name="stars" size={24} color="#FFD700" />
            <Text style={styles.statValue}>{userProgress?.points || 0}</Text>
            <Text style={styles.statLabel}>Puntos</Text>
          </View>
          <View style={styles.statItem}>
            <MaterialIcons name="military-tech" size={24} color="#FFD700" />
            <Text style={styles.statValue}>{userProgress?.level || 1}</Text>
            <Text style={styles.statLabel}>Nivel</Text>
          </View>
          <View style={styles.statItem}>
            <MaterialIcons name="local-fire-department" size={24} color="#FF6B6B" />
            <Text style={styles.statValue}>{userProgress?.currentStreak || 0}</Text>
            <Text style={styles.statLabel}>Racha</Text>
          </View>
        </View>
      </View>

      <View style={styles.challengesSection}>
        <Text style={styles.sectionTitle}>Desafíos Activos</Text>
        {challenges.map(renderChallenge)}
      </View>

      <View style={styles.achievementsSection}>
        <Text style={styles.sectionTitle}>Logros</Text>
        {achievements.map(renderAchievement)}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  progressSection: {
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  challengesSection: {
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  challengeCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  challengeDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  challengeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  challengeReward: {
    fontSize: 14,
    color: '#4CAF50',
  },
  achievementsSection: {
    padding: 20,
    backgroundColor: 'white',
  },
  achievementCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  achievementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  achievementDate: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
}); 