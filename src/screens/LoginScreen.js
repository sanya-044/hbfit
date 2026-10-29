 import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { ALLOWED_DOMAIN } from '../config/constants';

export default function LoginScreen() {
  const { loginWithGoogle, simulateLogin, authError, loading } = useContext(AuthContext);

  return (
    <View style={styles.screen}>
      <View style={styles.bgGlowTopRight} />
      <View style={styles.bgGlowBottomLeft} />
      <View style={styles.bgGlowCenter} />

      <View style={styles.card}>
        <View style={styles.brandRow}>
          <Text style={styles.brandText}>HB<Text style={styles.brandPlus}>+</Text></Text>
          <View style={styles.portalTag}>
            <Text style={styles.portalTagText}>ENTERPRISE PORTAL</Text>
          </View>
        </View>

        <View style={styles.domainBadge}>
          <View style={styles.statusDot} />
          <Text style={styles.domainBadgeText}>Restricted Domain • @{ALLOWED_DOMAIN}</Text>
        </View>

        <Text style={styles.description}>
          Welcome to HB+ Enterprise Gateway. Authenticate with your corporate credentials to access workspace resources.
        </Text>

        {authError ? (
          <View style={styles.errorAlert}>
            <Text style={styles.errorAlertText}>{authError}</Text>
          </View>
        ) : null}

        <TouchableOpacity
          disabled={loading}
          style={styles.primaryAuthButton}
          onPress={loginWithGoogle}
          activeOpacity={0.88}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.primaryAuthText}>Authenticate with Google</Text>
          )}
        </TouchableOpacity>

        <View style={styles.simulationWrapper}>
          <Text style={styles.simulationHeader}>QUICK TEST HARNESS</Text>
          <View style={styles.simButtonGroup}>
            <TouchableOpacity
              style={styles.simButton}
              onPress={() => simulateLogin(`alex@${ALLOWED_DOMAIN}`)}
            >
              <Text style={styles.simButtonText}>Simulate User (@{ALLOWED_DOMAIN})</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.simButton}
              onPress={() => simulateLogin(`admin@${ALLOWED_DOMAIN}`)}
            >
              <Text style={styles.simButtonText}>Simulate Admin (@{ALLOWED_DOMAIN})</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.simButton, styles.simButtonDanger]}
              onPress={() => simulateLogin('user@gmail.com')}
            >
              <Text style={styles.simButtonDangerText}>Simulate Blocked (@gmail.com)</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FAF7F2',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  bgGlowTopRight: {
    position: 'absolute',
    top: -80,
    right: -80,
    width: 380,
    height: 380,
    borderRadius: 190,
    backgroundColor: '#F3E5D8',
    opacity: 0.8,
  },
  bgGlowBottomLeft: {
    position: 'absolute',
    bottom: -100,
    left: -100,
    width: 420,
    height: 420,
    borderRadius: 210,
    backgroundColor: '#EEDFD3',
    opacity: 0.7,
  },
  bgGlowCenter: {
    position: 'absolute',
    top: '35%',
    left: '40%',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#F5ECE3',
    opacity: 0.5,
  },
  card: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(230, 222, 212, 0.9)',
    padding: 36,
    shadowColor: '#3A281E',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.07,
    shadowRadius: 24,
    elevation: 8,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  brandText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#2A211D',
    letterSpacing: -1,
  },
  brandPlus: {
    color: '#8B3A2B',
  },
  portalTag: {
    backgroundColor: '#F3E8E1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E6D2C4',
  },
  portalTagText: {
    color: '#8B3A2B',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  domainBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF5EF',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E8DDD0',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#8B3A2B',
    marginRight: 8,
  },
  domainBadgeText: {
    color: '#6B584C',
    fontSize: 12,
    fontWeight: '600',
  },
  description: {
    color: '#6E6158',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 28,
  },
  errorAlert: {
    backgroundColor: '#FDF2F0',
    borderWidth: 1,
    borderColor: '#F1C7C1',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
  },
  errorAlertText: {
    color: '#A82A18',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryAuthButton: {
    backgroundColor: '#8B3A2B',
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8B3A2B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 4,
  },
  primaryAuthText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  simulationWrapper: {
    marginTop: 32,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#EFE8DE',
  },
  simulationHeader: {
    color: '#9C8B7F',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 14,
  },
  simButtonGroup: {
    gap: 10,
  },
  simButton: {
    height: 42,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: '#FAF5EF',
    borderColor: '#E3D7CC',
  },
  simButtonText: {
    color: '#4A3B32',
    fontSize: 12,
    fontWeight: '700',
  },
  simButtonDanger: {
    backgroundColor: '#FFF0ED',
    borderColor: '#F2C8C2',
  },
  simButtonDangerText: {
    color: '#A82A18',
    fontSize: 12,
    fontWeight: '700',
  },
});