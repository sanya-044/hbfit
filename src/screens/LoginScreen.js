 import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { ALLOWED_DOMAIN } from '../config/constants';

export default function LoginScreen() {
  const { loginWithGoogle, simulateLogin, authError, loading } = useContext(AuthContext);

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <View style={styles.headerBox}>
          <Text style={styles.brandTitle}>ENTERPRISE PORTAL</Text>
          <View style={styles.domainPill}>
            <Text style={styles.domainPillText}>SECURE GATEWAY • @{ALLOWED_DOMAIN.toUpperCase()}</Text>
          </View>
        </View>

        <Text style={styles.description}>
          Authenticate securely using your authorized corporate workspace credentials.
        </Text>

        {authError ? (
          <View style={styles.errorAlert}>
            <Text style={styles.errorSymbol}>⚠️</Text>
            <Text style={styles.errorAlertText}>{authError}</Text>
          </View>
        ) : null}

        <TouchableOpacity
          disabled={loading}
          style={styles.primaryAuthButton}
          onPress={loginWithGoogle}
        >
          {loading ? (
            <ActivityIndicator color="#09090B" />
          ) : (
            <Text style={styles.primaryAuthText}>Authenticate with Google</Text>
          )}
        </TouchableOpacity>

        <View style={styles.simulationWrapper}>
          <Text style={styles.simulationHeader}>QUICK TEST HARNESS</Text>
          <View style={styles.simButtonGroup}>
            <TouchableOpacity
              style={[styles.simButton, styles.simButtonSuccess]}
              onPress={() => simulateLogin(`alex@${ALLOWED_DOMAIN}`)}
            >
              <Text style={styles.simButtonText}>Simulate User (@{ALLOWED_DOMAIN})</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.simButton, styles.simButtonAdmin]}
              onPress={() => simulateLogin(`admin@${ALLOWED_DOMAIN}`)}
            >
              <Text style={styles.simButtonText}>Simulate Admin (@{ALLOWED_DOMAIN})</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.simButton, styles.simButtonDanger]}
              onPress={() => simulateLogin('user@gmail.com')}
            >
              <Text style={styles.simButtonText}>Simulate Blocked (@gmail.com)</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#060608', justifyContent: 'center', alignItems: 'center', padding: 24 },
  card: { width: '100%', maxWidth: 460, backgroundColor: '#121216', borderRadius: 16, borderWidth: 1, borderColor: '#22222B', padding: 36 },
  headerBox: { marginBottom: 20 },
  brandTitle: { color: '#F4F4F5', fontSize: 20, fontWeight: '800', letterSpacing: 1 },
  domainPill: { marginTop: 10, alignSelf: 'flex-start', backgroundColor: '#1C1C24', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6, borderWidth: 1, borderColor: '#2A2A35' },
  domainPillText: { color: '#A1A1AA', fontSize: 10, fontWeight: '700', fontFamily: 'monospace' },
  description: { color: '#94A3B8', fontSize: 13, lineHeight: 20, marginBottom: 28 },
  errorAlert: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1F1214', borderWidth: 1, borderColor: '#7F1D1D', borderRadius: 8, padding: 14, marginBottom: 24 },
  errorSymbol: { marginRight: 10, fontSize: 14 },
  errorAlertText: { color: '#FCA5A5', fontSize: 12, fontWeight: '500', flex: 1 },
  primaryAuthButton: { backgroundColor: '#F4F4F5', height: 50, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  primaryAuthText: { color: '#09090B', fontSize: 14, fontWeight: '700' },
  simulationWrapper: { marginTop: 32, paddingTop: 24, borderTopWidth: 1, borderTopColor: '#22222B' },
  simulationHeader: { color: '#71717A', fontSize: 10, fontFamily: 'monospace', fontWeight: '700', marginBottom: 12 },
  simButtonGroup: { gap: 10 },
  simButton: { height: 38, borderRadius: 6, justifyContent: 'center', alignItems: 'center', borderWidth: 1 },
  simButtonSuccess: { backgroundColor: '#0D2318', borderColor: '#166534' },
  simButtonAdmin: { backgroundColor: '#1C2611', borderColor: '#3F6212' },
  simButtonDanger: { backgroundColor: '#2A1212', borderColor: '#991B1B' },
  simButtonText: { color: '#F4F4F5', fontSize: 12, fontWeight: '600' },
});