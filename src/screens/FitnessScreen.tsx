import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarcodeScanner } from '../components/BarcodeScanner';
import { FitnessIntegration } from '../components/FitnessIntegration';
import { Gamification } from '../components/Gamification';

export function FitnessScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <FitnessIntegration />
        </View>
        
        <View style={styles.section}>
          <BarcodeScanner />
        </View>
        
        <View style={styles.section}>
          <Gamification />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  section: {
    marginBottom: 20,
  },
}); 