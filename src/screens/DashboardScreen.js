 import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function DashboardScreen() {
  const { user, userRole, allUsers, logout } = useContext(AuthContext);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.card}>
        <View style={styles.navHeader}>
          <View style={styles.userInfoLeft}>
            <View style={styles.avatarPill}>
              <Text style={styles.avatarText}>{user?.name?.charAt(0) || 'U'}</Text>
            </View>
            <View>
              <Text style={styles.userName}>{user?.name}</Text>
              <Text style={styles.userEmail}>{user?.email}</Text>
            </View>
          </View>
          <View style={[styles.roleBadge, userRole === 'Admin' ? styles.roleAdmin : styles.roleUser]}>
            <Text style={styles.roleBadgeText}>{userRole.toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.metricGrid}>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>DOMAIN STATUS</Text>
            <Text style={styles.metricValueVerified}>VALIDATED (@{user?.domain})</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>DATABASE ACCESS</Text>
            <Text style={styles.metricValue}>SUPABASE CONNECTED</Text>
          </View>
        </View>

        {userRole === 'Admin' ? (
          <View style={styles.adminSection}>
            <Text style={styles.adminTitle}>ADMINISTRATOR SYSTEM DIRECTORY</Text>
            <Text style={styles.adminSubtitle}>All database user records</Text>
            {allUsers.map((item) => (
              <View key={item.id} style={styles.tableRow}>
                <View style={styles.colFlex2}>
                  <Text style={styles.rowName}>{item.full_name || item.email}</Text>
                  <Text style={styles.rowEmail}>{item.email}</Text>
                </View>
                <Text style={[styles.rowRole, styles.colFlex1]}>{item.role}</Text>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.userSection}>
            <Text style={styles.userSectionTitle}>PROTECTED USER DASHBOARD</Text>
            <Text style={styles.userSectionText}>Verified under @{user?.domain} domain.</Text>
          </View>
        )}

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, backgroundColor: '#060608', justifyContent: 'center', alignItems: 'center', padding: 24 },
  card: { width: '100%', maxWidth: 620, backgroundColor: '#121216', borderRadius: 16, borderWidth: 1, borderColor: '#22222B', padding: 32 },
  navHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 24, borderBottomWidth: 1, borderBottomColor: '#22222B', marginBottom: 24 },
  userInfoLeft: { flexDirection: 'row', alignItems: 'center' },
  avatarPill: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#22222B', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginRight: 12 },
  avatarText: { color: '#FAFAFA', fontSize: 16, fontWeight: '700' },
  userName: { color: '#FAFAFA', fontSize: 16, fontWeight: '700' },
  userEmail: { color: '#A1A1AA', fontSize: 12 },
  roleBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4 },
  roleAdmin: { backgroundColor: '#365314' },
  roleUser: { backgroundColor: '#22222B' },
  roleBadgeText: { color: '#FAFAFA', fontSize: 10, fontWeight: '800', fontFamily: 'monospace' },
  metricGrid: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  metricCard: { flex: 1, backgroundColor: '#060608', padding: 16, borderRadius: 8, borderWidth: 1, borderColor: '#22222B' },
  metricLabel: { color: '#71717A', fontSize: 10, fontFamily: 'monospace', fontWeight: '700', marginBottom: 6 },
  metricValueVerified: { color: '#22C55E', fontSize: 12, fontWeight: '700' },
  metricValue: { color: '#A1A1AA', fontSize: 12, fontWeight: '700' },
  adminSection: { backgroundColor: '#060608', borderRadius: 8, padding: 20, borderWidth: 1, borderColor: '#22222B', marginBottom: 24 },
  adminTitle: { color: '#FAFAFA', fontSize: 12, fontFamily: 'monospace', fontWeight: '800' },
  adminSubtitle: { color: '#71717A', fontSize: 12, marginBottom: 16 },
  colFlex1: { flex: 1 },
  colFlex2: { flex: 2 },
  tableRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#121216' },
  rowName: { color: '#FAFAFA', fontSize: 12, fontWeight: '600' },
  rowEmail: { color: '#71717A', fontSize: 11 },
  rowRole: { color: '#A1A1AA', fontSize: 11, fontFamily: 'monospace' },
  userSection: { backgroundColor: '#060608', borderRadius: 8, padding: 20, borderWidth: 1, borderColor: '#22222B', marginBottom: 24 },
  userSectionTitle: { color: '#FAFAFA', fontSize: 12, fontFamily: 'monospace', fontWeight: '800', marginBottom: 8 },
  userSectionText: { color: '#A1A1AA', fontSize: 13 },
  logoutButton: { borderWidth: 1, borderColor: '#3F3F46', height: 44, borderRadius: 6, justifyContent: 'center', alignItems: 'center' },
  logoutText: { color: '#FAFAFA', fontSize: 13, fontWeight: '600' },
});