import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Switch,
  Image,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import {moderateScale} from '../../constants/responsiveSize';

const ProfileSettingScreen = () => {
  const [form, setForm] = useState({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: false,
  });

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App</Text>

          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
            style={styles.row}>
            <View style={[styles.rowIcon, {backgroundColor: '#FFBF00'}]}>
              <FeatherIcon color="#fff" name="disc" size={20} />
            </View>

            <Text style={styles.rowLabel}>Tutorial</Text>

            <View style={styles.rowSpacer} />

            <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
            style={styles.row}>
            <View style={[styles.rowIcon, {backgroundColor: '#fe9400'}]}>
              <FeatherIcon color="#fff" name="globe" size={20} />
            </View>

            <Text style={styles.rowLabel}>Language</Text>

            <View style={styles.rowSpacer} />

            <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
          </TouchableOpacity>

          <View style={styles.row}>
            <View style={[styles.rowIcon, {backgroundColor: '#007afe'}]}>
              <FeatherIcon color="#fff" name="moon" size={20} />
            </View>

            <Text style={styles.rowLabel}>Dark Mode</Text>

            <View style={styles.rowSpacer} />

            <Switch
              onValueChange={darkMode => setForm({...form, darkMode})}
              value={form.darkMode}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
            style={styles.row}>
            <View style={[styles.rowIcon, {backgroundColor: '#6495ED'}]}>
              <FeatherIcon color="#fff" name="database" size={20} />
            </View>

            <Text style={styles.rowLabel}>Data Import/Export</Text>

            <View style={styles.rowSpacer} />

            <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
            style={styles.row}>
            <View style={[styles.rowIcon, {backgroundColor: '#FF69B4'}]}>
              <FeatherIcon color="#fff" name="list" size={20} />
            </View>

            <Text style={styles.rowLabel}>Rerder Habits</Text>

            <View style={styles.rowSpacer} />

            <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
          </TouchableOpacity>

          <View style={styles.row}>
            <View style={[styles.rowIcon, {backgroundColor: '#38C959'}]}>
              <FeatherIcon color="#fff" name="bell" size={20} />
            </View>

            <Text style={styles.rowLabel}>Push Notifications</Text>

            <View style={styles.rowSpacer} />

            <Switch
              onValueChange={pushNotifications =>
                setForm({...form, pushNotifications})
              }
              value={form.pushNotifications}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>

          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
            style={styles.row}>
            <View style={[styles.rowIcon, {backgroundColor: '#E97451'}]}>
              <FeatherIcon color="#fff" name="lock" size={20} />
            </View>

            <Text style={styles.rowLabel}>Privacy Policy</Text>

            <View style={styles.rowSpacer} />

            <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
            style={styles.row}>
            <View style={[styles.rowIcon, {backgroundColor: '#007afe'}]}>
              <FeatherIcon color="#fff" name="mail" size={20} />
            </View>

            <Text style={styles.rowLabel}>Contact Us</Text>

            <View style={styles.rowSpacer} />

            <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
            style={styles.row}>
            <View style={[styles.rowIcon, {backgroundColor: '#32c759'}]}>
              <FeatherIcon color="#fff" name="star" size={20} />
            </View>

            <Text style={styles.rowLabel}>Rate in App Store</Text>

            <View style={styles.rowSpacer} />

            <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileSettingScreen;

const styles = StyleSheet.create({
  /** Section */
  section: {
    paddingHorizontal: moderateScale(24),
  },
  sectionTitle: {
    paddingVertical: moderateScale(12),
    fontSize: 12,
    fontWeight: '600',
    color: '#9e9e9e',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  /** Row */
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 50,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: moderateScale(12),
    paddingHorizontal: moderateScale(12),
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginRight: moderateScale(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '400',
    color: '#0c0c0c',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});
