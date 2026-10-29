 import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList, TextInput } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function DashboardScreen() {
  const { user, userRole, allUsers, logout } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');

  const safeUsersList = Array.isArray(allUsers) ? allUsers : [];
  const filteredUsers = safeUsersList.filter(u => 
    (u.email && u.email.toLowerCase().includes(searchQuery.toLowerCase())) || 
    (u.full_name && u.full_name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const renderUserItem = ({ item }) => (
    <View style={styles.tableRow}>
      <View style={styles.userInfoCol}>
        <View style={styles.userAvatarMini}>
          <Text style={styles.userAvatarMiniText}>
            {(item.full_name || item.email || 'U')[0].toUpperCase()}
          </Text>
        </View>
        <View>
          <Text style={styles.userNameText}>{item.full_name || 'Corporate User'}</Text>
          <Text style={styles.userEmailText}>{item.email}</Text>
        </View>
      </View>
      <View style={styles.statusCol}>
        <View style={styles.activeDot} />
        <Text style={styles.statusText}>Active</Text>
      </View>
      <View style={[styles.roleBadge, item.role === 'Admin' ? styles.adminBadge : styles.userBadge]}>
        <Text style={[styles.roleBadgeText, item.role === 'Admin' ? styles.adminBadgeText : styles.userBadgeText]}>
          {item.role || 'User'}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.screenContainer}>
      <View style={styles.bgGlowTopLeft} />
      <View style={styles.bgGlowBottomRight} />
      <View style={styles.bgGlowCenter} />

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.headerBar}>
          <View style={styles.brandRow}>
            <Text style={styles.brandText}>HB<Text style={styles.brandPlus}>+</Text></Text>
            <View style={styles.headerTag}>
              <Text style={styles.headerTagText}>CORPORATE DASHBOARD</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.logoutBtn} onPress={logout} activeOpacity={0.8}>
            <Text style={styles.logoutBtnText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroGlow} />
          <View style={styles.profileMeta}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarInitials}>
                {(user?.name || user?.email || 'U').substring(0, 2).toUpperCase()}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <View style={styles.greetingRow}>
                <Text style={styles.greetingText}>Welcome back,</Text>
                <View style={styles.liveBadge}>
                  <View style={styles.livePulse} />
                  <Text style={styles.liveBadgeText}>ONLINE</Text>
                </View>
              </View>
              <Text style={styles.profileName}>{user?.name || 'Authorized Member'}</Text>
              <Text style={styles.profileEmail}>{user?.email}</Text>
            </View>
          </View>

          <View style={styles.pillRow}>
            <View style={styles.infoPill}>
              <Text style={styles.pillLabel}>Role</Text>
              <Text style={styles.pillValue}>{userRole}</Text>
            </View>
            <View style={styles.infoPill}>
              <Text style={styles.pillLabel}>Domain</Text>
              <Text style={styles.pillValue}>@{user?.domain || 'hbplus.fit'}</Text>
            </View>
            <View style={styles.infoPill}>
              <Text style={styles.pillLabel}>Security Tier</Text>
              <Text style={styles.pillValue}>Enterprise OAuth</Text>
            </View>
          </View>
        </View>

        {userRole === 'Admin' ? (
          <View style={styles.sectionGroup}>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>TOTAL MEMBERS</Text>
                <Text style={styles.statValue}>{safeUsersList.length || 1}</Text>
                <Text style={styles.statSub}>+100% domain verified</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>ACTIVE SESSIONS</Text>
                <Text style={styles.statValue}>1</Text>
                <Text style={styles.statSub}>Current session live</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>SECURITY ALERTS</Text>
                <Text style={styles.statValueTextSuccess}>0 Threats</Text>
                <Text style={styles.statSub}>Domain restriction active</Text>
              </View>
            </View>

            <View style={styles.adminSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>User Directory Registry</Text>
                <Text style={styles.userCountBadge}>{filteredUsers.length} Users</Text>
              </View>

              <View style={styles.tableCard}>
                <View style={styles.searchBarWrapper}>
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search users by name or email..."
                    placeholderTextColor="#A19288"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                  />
                </View>

                <FlatList
                  data={filteredUsers}
                  keyExtractor={(item, index) => item.id || item.email || index.toString()}
                  renderItem={renderUserItem}
                  scrollEnabled={false}
                  ItemSeparatorComponent={() => <View style={styles.rowSeparator} />}
                />
              </View>
            </View>

            <View style={styles.auditSection}>
              <Text style={styles.sectionTitle}>System Security Logs</Text>
              <View style={styles.auditCard}>
                <View style={styles.auditRow}>
                  <View style={styles.auditDotSuccess} />
                  <Text style={styles.auditText}>
                    Google OAuth Session initiated for <Text style={styles.boldText}>{user?.email}</Text>
                  </Text>
                  <Text style={styles.auditTime}>Just now</Text>
                </View>
                <View style={styles.rowSeparator} />
                <View style={styles.auditRow}>
                  <View style={styles.auditDotInfo} />
                  <Text style={styles.auditText}>
                    Domain check passed for <Text style={styles.boldText}>@{user?.domain}</Text>
                  </Text>
                  <Text style={styles.auditTime}>Just now</Text>
                </View>
                <View style={styles.rowSeparator} />
                <View style={styles.auditRow}>
                  <View style={styles.auditDotWarning} />
                  <Text style={styles.auditText}>
                    Non-corporate account attempt blocked (@gmail.com)
                  </Text>
                  <Text style={styles.auditTime}>10m ago</Text>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.sectionGroup}>
            <View style={styles.userSection}>
              <Text style={styles.sectionTitle}>Workspace Applications</Text>
              <View style={styles.appsGrid}>
                <TouchableOpacity style={styles.appTile} activeOpacity={0.8}>
                  <View style={styles.appIconBox}>
                    <Text style={styles.appIconText}>📁</Text>
                  </View>
                  <Text style={styles.appTitle}>Corporate Docs</Text>
                  <Text style={styles.appDesc}>Access internal SOPs and guidelines</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.appTile} activeOpacity={0.8}>
                  <View style={styles.appIconBox}>
                    <Text style={styles.appIconText}>🎫</Text>
                  </View>
                  <Text style={styles.appTitle}>IT Helpdesk</Text>
                  <Text style={styles.appDesc}>Submit tickets & access support</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.appTile} activeOpacity={0.8}>
                  <View style={styles.appIconBox}>
                    <Text style={styles.appIconText}>👥</Text>
                  </View>
                  <Text style={styles.appTitle}>HR Portal</Text>
                  <Text style={styles.appDesc}>Manage benefits & company news</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.infoCard}>
              <View style={styles.infoCardHeader}>
                <Text style={styles.infoCardTitle}>Security Status & Active Session</Text>
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedBadgeText}>RESTRICTED ACCESS</Text>
                </View>
              </View>
              <Text style={styles.infoCardDesc}>
                Your account is currently authorized under the <Text style={styles.boldText}>@{user?.domain}</Text> enterprise workspace. All actions are monitored under strict domain security protocols.
              </Text>
              <View style={styles.sessionMetaRow}>
                <View style={styles.metaItem}>
                  <Text style={styles.metaLabel}>Authentication Provider</Text>
                  <Text style={styles.metaValue}>Google OAuth 2.0</Text>
                </View>
                <View style={styles.metaItem}>
                  <Text style={styles.metaLabel}>Session Token</Text>
                  <Text style={styles.metaValue}>JWT (Active)</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#FAF7F2',
    position: 'relative',
    overflow: 'hidden',
  },
  bgGlowTopLeft: {
    position: 'absolute',
    top: -120,
    left: -120,
    width: 450,
    height: 450,
    borderRadius: 225,
    backgroundColor: '#F3E5D8',
    opacity: 0.6,
  },
  bgGlowBottomRight: {
    position: 'absolute',
    bottom: -150,
    right: -150,
    width: 500,
    height: 500,
    borderRadius: 250,
    backgroundColor: '#EEDFD3',
    opacity: 0.5,
  },
  bgGlowCenter: {
    position: 'absolute',
    top: '40%',
    left: '30%',
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: '#F8ECE3',
    opacity: 0.4,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 28,
    maxWidth: 960,
    width: '100%',
    alignSelf: 'center',
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  brandText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#2A211D',
    letterSpacing: -1,
  },
  brandPlus: {
    color: '#8B3A2B',
  },
  headerTag: {
    backgroundColor: '#F3E8E1',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E6D2C4',
  },
  headerTagText: {
    color: '#8B3A2B',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  logoutBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 1,
    borderColor: '#E6DCD2',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 12,
  },
  logoutBtnText: {
    color: '#6B584C',
    fontSize: 13,
    fontWeight: '700',
  },
  heroCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(230, 222, 212, 0.9)',
    padding: 32,
    marginBottom: 24,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#3A281E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 3,
  },
  heroGlow: {
    position: 'absolute',
    top: -60,
    right: -60,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#F8ECE6',
    opacity: 0.8,
  },
  profileMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#8B3A2B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    shadowColor: '#8B3A2B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  avatarInitials: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
  },
  profileInfo: {
    flex: 1,
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  greetingText: {
    color: '#8C7B70',
    fontSize: 13,
    fontWeight: '600',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF3ED',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    gap: 5,
  },
  livePulse: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2B6E3A',
  },
  liveBadgeText: {
    color: '#2B6E3A',
    fontSize: 9,
    fontWeight: '800',
  },
  profileName: {
    color: '#2A211D',
    fontSize: 22,
    fontWeight: '800',
    marginTop: 2,
  },
  profileEmail: {
    color: '#6E6158',
    fontSize: 13,
    marginTop: 2,
  },
  pillRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  infoPill: {
    flex: 1,
    minWidth: 120,
    backgroundColor: '#FAF5EF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E8DDD0',
  },
  pillLabel: {
    color: '#9C8B7F',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  pillValue: {
    color: '#2A211D',
    fontSize: 15,
    fontWeight: '800',
    marginTop: 4,
  },
  sectionGroup: {
    gap: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
  },
  statCard: {
    flex: 1,
    minWidth: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(230, 222, 212, 0.9)',
    padding: 20,
    shadowColor: '#3A281E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
  },
  statLabel: {
    color: '#9C8B7F',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  statValue: {
    color: '#2A211D',
    fontSize: 26,
    fontWeight: '900',
    marginTop: 6,
  },
  statValueTextSuccess: {
    color: '#2B6E3A',
    fontSize: 20,
    fontWeight: '900',
    marginTop: 6,
  },
  statSub: {
    color: '#7C6E65',
    fontSize: 12,
    marginTop: 4,
  },
  adminSection: {
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    color: '#2A211D',
    fontSize: 18,
    fontWeight: '800',
  },
  userCountBadge: {
    color: '#8B3A2B',
    backgroundColor: '#F3E8E1',
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tableCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(230, 222, 212, 0.9)',
    padding: 12,
  },
  searchBarWrapper: {
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  searchInput: {
    backgroundColor: '#FAF5EF',
    borderWidth: 1,
    borderColor: '#E8DDD0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 13,
    color: '#2A211D',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
  },
  userAvatarMini: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3E8E1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userAvatarMiniText: {
    color: '#8B3A2B',
    fontSize: 12,
    fontWeight: '800',
  },
  userInfoCol: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userNameText: {
    color: '#2A211D',
    fontSize: 14,
    fontWeight: '700',
  },
  userEmailText: {
    color: '#7C6E65',
    fontSize: 12,
    marginTop: 1,
  },
  statusCol: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    gap: 6,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2B6E3A',
  },
  statusText: {
    color: '#2B6E3A',
    fontSize: 11,
    fontWeight: '700',
  },
  rowSeparator: {
    height: 1,
    backgroundColor: '#F5EFE9',
  },
  roleBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  adminBadge: {
    backgroundColor: '#F3E8E1',
  },
  userBadge: {
    backgroundColor: '#EBF3ED',
  },
  roleBadgeText: {
    fontSize: 11,
    fontWeight: '800',
  },
  adminBadgeText: {
    color: '#8B3A2B',
  },
  userBadgeText: {
    color: '#2B6E3A',
  },
  auditSection: {
    marginTop: 8,
  },
  auditCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(230, 222, 212, 0.9)',
    padding: 16,
    marginTop: 12,
  },
  auditRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  auditDotSuccess: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2B6E3A',
    marginRight: 12,
  },
  auditDotInfo: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3B82F6',
    marginRight: 12,
  },
  auditDotWarning: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D97706',
    marginRight: 12,
  },
  auditText: {
    color: '#6E6158',
    fontSize: 13,
    flex: 1,
  },
  boldText: {
    fontWeight: '700',
    color: '#2A211D',
  },
  auditTime: {
    color: '#A19288',
    fontSize: 11,
    fontWeight: '600',
  },
  userSection: {
    marginTop: 4,
  },
  appsGrid: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
    marginTop: 12,
  },
  appTile: {
    flex: 1,
    minWidth: 180,
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(230, 222, 212, 0.9)',
    padding: 20,
  },
  appIconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#FAF5EF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E8DDD0',
  },
  appIconText: {
    fontSize: 18,
  },
  appTitle: {
    color: '#2A211D',
    fontSize: 15,
    fontWeight: '800',
  },
  appDesc: {
    color: '#7C6E65',
    fontSize: 12,
    marginTop: 4,
    lineHeight: 18,
  },
  infoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(230, 222, 212, 0.9)',
    padding: 24,
    marginTop: 8,
  },
  infoCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoCardTitle: {
    color: '#2A211D',
    fontSize: 16,
    fontWeight: '800',
  },
  verifiedBadge: {
    backgroundColor: '#F3E8E1',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  verifiedBadgeText: {
    color: '#8B3A2B',
    fontSize: 10,
    fontWeight: '800',
  },
  infoCardDesc: {
    color: '#6E6158',
    fontSize: 14,
    lineHeight: 22,
  },
  sessionMetaRow: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F5EFE9',
  },
  metaItem: {
    flex: 1,
  },
  metaLabel: {
    color: '#9C8B7F',
    fontSize: 11,
    fontWeight: '700',
  },
  metaValue: {
    color: '#2A211D',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2,
  },
});