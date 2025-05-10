import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  const [biometricAuth, setBiometricAuth] = React.useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Configuración</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferencias</Text>
          <View style={styles.settingCard}>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Notificaciones</Text>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={notifications ? '#2E7D32' : '#f4f3f4'}
              />
            </View>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Modo oscuro</Text>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={darkMode ? '#2E7D32' : '#f4f3f4'}
              />
            </View>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Autenticación biométrica</Text>
              <Switch
                value={biometricAuth}
                onValueChange={setBiometricAuth}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={biometricAuth ? '#2E7D32' : '#f4f3f4'}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cuenta</Text>
          <View style={styles.settingCard}>
            <TouchableOpacity style={styles.settingButton}>
              <Text style={styles.settingButtonText}>Cambiar contraseña</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingButton}>
              <Text style={styles.settingButtonText}>Actualizar información personal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingButton}>
              <Text style={styles.settingButtonText}>Exportar datos</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acerca de</Text>
          <View style={styles.settingCard}>
            <TouchableOpacity style={styles.settingButton}>
              <Text style={styles.settingButtonText}>Términos y condiciones</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingButton}>
              <Text style={styles.settingButtonText}>Política de privacidad</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingButton}>
              <Text style={styles.settingButtonText}>Versión 1.0.0</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  settingCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  settingButton: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  settingButtonText: {
    fontSize: 16,
    color: '#2E7D32',
  },
}); 