// src/Request/RequestScreen.jsx
import React, { useState, useLayoutEffect, memo } from 'react';
import Animated, { FadeIn, SlideInRight, SlideOutLeft } from 'react-native-reanimated';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Image,
  Modal,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Card from '../shared/Components/Card';
import PrimaryButton from '../shared/Components/PrimaryButton';
import LoadingIndicator from '../shared/Components/LoadingIndicator';
import SkeletonLoader from '../shared/Components/SkeletonLoader';

import { COLORS as AppColors, SIZES } from '../shared/theme';
import { unifiedCompaniesData } from '../Data/unifiedData';

const { width } = Dimensions.get('window');
const CARD_SHADOW = Platform.select({
  ios: { shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 3, shadowOffset: { width: 0, height: 1 } },
  android: { elevation: 2 },
});

const PRESET_SLOTS = ['8:00 – 9:00', '9:00 – 10:00', '10:00 – 11:00', 'Custom'];
const addressOptions = ['123 Main St', '456 Oak Ave', '789 Pine Rd'];

const categoryLabels = {
  discounts: 'Discounts',
  electrical_plumbing: 'Electrical & Plumbing',
  cleaning_pest: 'Cleaning & Pest',
  home_repairs: 'Home Repairs',
};

const CategoryCard = memo(({ id, label, onPress, themeColors }) => (
  <Pressable
    onPress={() => onPress(id)}
    style={({ pressed }) => [
      styles.categoryCard,
      { backgroundColor: themeColors.card, borderColor: themeColors.border },
      pressed && styles.pressed,
    ]}
    accessibilityRole="button"
    accessibilityLabel={`Category ${label}`}
  >
    <View style={styles.iconPlaceholder} />
    <Text style={[styles.categoryText, { color: themeColors.textDark }]} numberOfLines={2}>
      {label}
    </Text>
  </Pressable>
));

const CompanyCard = memo(({ company, onPress, themeColors }) => (
  <Pressable
    style={[styles.companyCard, CARD_SHADOW, { backgroundColor: themeColors.card }]}
    onPress={() => onPress(company)}
    accessibilityRole="button"
    accessibilityLabel={`Select company ${company.name}`}
  >
    {company.logo ? (
      <Image source={{ uri: company.logo }} style={styles.companyLogo} />
    ) : (
      <View style={[styles.companyLogo, { backgroundColor: themeColors.border, justifyContent: 'center', alignItems: 'center' }]}>
        <Ionicons name="business-outline" size={24} color={themeColors.textGray} />
      </View>
    )}
    <Text style={[styles.companyName, { color: themeColors.textDark }]} numberOfLines={1}>
      {company.name}
    </Text>
  </Pressable>
));

export default function RequestScreen({ navigation }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const parentTab = navigation.getParent();

  const [step, setStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [description, setDescription] = useState('');

  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [tempTime, setTempTime] = useState(new Date());
  const [isStart, setIsStart] = useState(true);

  const [errors, setErrors] = useState({ title: false, address: false, timeSlot: false });

  const companies = Object.values(unifiedCompaniesData);
  const categoryIds = Array.from(new Set(companies.map(c => c.categoryId)));

  useLayoutEffect(() => {
    parentTab?.setOptions({ tabBarStyle: { display: step === 0 ? 'flex' : 'none' } });
  }, [parentTab, step]);

  const validate = () => {
    const next = { title: !title.trim(), address: !address, timeSlot: !timeSlot };
    setErrors(next);
    return !Object.values(next).some(Boolean);
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
    else if (step === 1) setStep(0);
    else navigation.goBack();
  };

  const onSubmit = () => {
    if (!validate()) return Alert.alert('Please fill all required fields.');
    Alert.alert('Request submitted');
    navigation.navigate('OrdersTab', { screen: 'Orders', params: { status: '🕒 Pending' } });
  };

  const renderStepCategories = () => (
    <Animated.View style={styles.screen} entering={FadeIn} exiting={SlideOutLeft}>
      <Text style={[styles.heading, { color: colors.textDark }]}>Select Category</Text>
      {categoryIds.length === 0 ? (
        <SkeletonLoader height={110} borderRadius={SIZES.radius} />
      ) : (
        <FlatList
          horizontal
          data={categoryIds}
          keyExtractor={id => id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: SIZES.screenPadding }}
          ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
          renderItem={({ item }) => (
            <CategoryCard
              id={item}
              label={categoryLabels[item] || item}
              onPress={id => { setSelectedCategory(id); setStep(1); }}
              themeColors={colors}
            />
          )}
        />
      )}
    </Animated.View>
  );

  const renderStepCompanies = () => {
    const filtered = companies.filter(c => c.categoryId === selectedCategory);
    return (
      <Animated.View style={styles.screen} entering={SlideInRight} exiting={SlideOutLeft}>
        <Text style={[styles.heading, { color: colors.textDark, paddingHorizontal: SIZES.screenPadding }]}>
          Companies – {categoryLabels[selectedCategory]}
        </Text>
        {filtered.length === 0 ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <LoadingIndicator message="No companies found" size="small" />
          </View>
        ) : (
          <FlatList
            data={filtered}
            keyExtractor={i => i.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.companyList}
            renderItem={({ item }) => (
              <CompanyCard
                company={item}
                onPress={comp => { setSelectedCompany(comp); setStep(2); }}
                themeColors={colors}
              />
            )}
          />
        )}
      </Animated.View>
    );
  };

  const renderStepForm = () => (
    <View style={styles.flex}>
      <Animated.View style={styles.flex} entering={SlideInRight} exiting={SlideOutLeft}>
        <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              contentContainerStyle={{
                paddingHorizontal: SIZES.screenPadding,
                paddingBottom: insets.bottom + 120,
                paddingTop: 10,
              }}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <Text style={[styles.subheading, { color: colors.textDark }]}>{selectedCompany.name}</Text>

              <Card style={styles.formCard}>
                <Text style={[styles.label, { color: colors.textDark }]}>Title *</Text>
                <TextInput
                  style={[
                    styles.input,
                    { borderColor: colors.border, color: colors.textDark },
                    errors.title && styles.inputError,
                  ]}
                  placeholder="Broken AC, Leaking Pipe…"
                  placeholderTextColor={colors.textGray}
                  value={title}
                  onChangeText={t => { setTitle(t); if (errors.title) setErrors(e => ({ ...e, title: false })); }}
                  accessibilityLabel="Title input"
                />
                {errors.title && <Text style={styles.error}>Required</Text>}
              </Card>

              <Card style={styles.formCard}>
                <Text style={[styles.label, { color: colors.textDark }]}>Address *</Text>
                <Pressable
                  style={[
                    styles.input,
                    { borderColor: colors.border, justifyContent: 'center' },
                    errors.address && styles.inputError,
                  ]}
                  onPress={() => setShowAddressModal(true)}
                  accessibilityRole="button"
                  accessibilityLabel="Select address"
                >
                  <Text style={{ color: address ? colors.textDark : colors.textGray }}>
                    {address || 'Select address'}
                  </Text>
                </Pressable>
                {errors.address && <Text style={styles.error}>Required</Text>}
              </Card>

              <Card style={styles.formCard}>
                <Text style={[styles.label, { color: colors.textDark }]}>Time Slot *</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {PRESET_SLOTS.map(slot => {
                    const active = timeSlot === slot;
                    return (
                      <Pressable
                        key={slot}
                        style={[
                          styles.chip,
                          active
                            ? { backgroundColor: colors.primary }
                            : { backgroundColor: colors.card, borderColor: colors.border },
                          { marginRight: 10 },
                        ]}
                        onPress={() => {
                          if (slot === 'Custom') setShowTimePicker(true);
                          else {
                            setTimeSlot(slot);
                            if (errors.timeSlot) setErrors(e => ({ ...e, timeSlot: false }));
                          }
                        }}
                        accessibilityRole="button"
                        accessibilityLabel={`Select time slot ${slot}`}
                      >
                        <Text style={[styles.chipText, active && { color: '#fff' }]}>{slot}</Text>
                      </Pressable>
                    );
                  })}
                </ScrollView>
                {errors.timeSlot && <Text style={styles.error}>Required</Text>}
              </Card>

              <Card style={styles.formCard}>
                <Text style={[styles.label, { color: colors.textDark }]}>Tags</Text>
                <View style={styles.tagRow}>
                  <TextInput
                    style={[styles.input, { flex: 1, borderColor: colors.border, color: colors.textDark }]}
                    placeholder="e.g. High Rated"
                    placeholderTextColor={colors.textGray}
                    value={tagInput}
                    onChangeText={setTagInput}
                    onSubmitEditing={() => {
                      const t = tagInput.trim();
                      if (t) setTags(ts => [...ts, t]);
                      setTagInput('');
                    }}
                    accessibilityLabel="Tag input"
                  />
                  <Pressable
                    onPress={() => {
                      const t = tagInput.trim();
                      if (t) setTags(ts => [...ts, t]);
                      setTagInput('');
                    }}
                    style={styles.tagBtn}
                    accessibilityRole="button"
                    accessibilityLabel="Add tag"
                  >
                    <Ionicons name="add-circle-outline" size={28} color={colors.primary} />
                  </Pressable>
                </View>
                <View style={styles.tagsContainer}>
                  {tags.map((t, i) => (
                    <View key={t + i} style={[styles.tag, { backgroundColor: colors.primary }]}>
                      <Text style={{ color: '#fff', marginRight: 4 }}>{t}</Text>
                      <Pressable
                        onPress={() => setTags(ts => ts.filter((_, idx) => idx !== i))}
                        accessibilityRole="button"
                        accessibilityLabel={`Remove tag ${t}`}
                      >
                        <Ionicons name="close-circle" size={18} color="#fff" />
                      </Pressable>
                    </View>
                  ))}
                </View>
              </Card>

              <Card style={[styles.formCard, { paddingBottom: 10 }]}>
                <Text style={[styles.label, { color: colors.textDark }]}>Description</Text>
                <TextInput
                  style={[styles.textArea, { borderColor: colors.border, color: colors.textDark }]}
                  placeholder="Describe the service…"
                  placeholderTextColor={colors.textGray}
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  accessibilityLabel="Description input"
                />
              </Card>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Animated.View>

      <View
        style={[
          styles.actions,
          { bottom: insets.bottom, borderTopColor: colors.border, backgroundColor: colors.background },
        ]}
      >
        <PrimaryButton
          title="Submit Request"
          onPress={onSubmit}
          disabled={!(title && address && timeSlot)}
          style={{ width: '100%', height: 56, borderRadius: 28 }}
          textStyle={{ fontSize: 18 }}
        />
        <Pressable
          onPress={() => Alert.alert('Draft saved')}
          style={{ marginTop: 8, alignItems: 'center' }}
          accessibilityRole="button"
          accessibilityLabel="Save draft"
        >
          <Text style={{ color: colors.secondary, fontSize: 14, fontWeight: '600' }}>
            Save Draft
          </Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Pressable onPress={handleBack} style={styles.headerBtn} accessibilityRole="button" accessibilityLabel="Go back">
          <Ionicons name="arrow-back" size={24} color={colors.textDark} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.textDark }]}>Request a Service</Text>
        <View style={styles.headerBtn} />
      </View>

      {step === 0 && renderStepCategories()}
      {step === 1 && renderStepCompanies()}
      {step === 2 && renderStepForm()}

      {/* Address Modal */}
      <Modal visible={showAddressModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <Card style={[styles.modal, { backgroundColor: colors.card }]}>
            <Text style={[styles.modalTitle, { color: colors.textDark }]}>Select Address</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {addressOptions.map((a, idx) => (
                <Pressable
                  key={idx}
                  style={[styles.modalItem, { borderBottomColor: colors.border }]}
                  onPress={() => {
                    setAddress(a);
                    if (errors.address) setErrors(e => ({ ...e, address: false }));
                    setShowAddressModal(false);
                  }}
                  accessibilityRole="button"
                  accessibilityLabel={`Choose address ${a}`}
                >
                  <Text style={{ color: colors.textDark }}>{a}</Text>
                </Pressable>
              ))}
            </ScrollView>
            <Pressable onPress={() => setShowAddressModal(false)} style={styles.modalClose}>
              <Text style={{ color: colors.primary }}>Cancel</Text>
            </Pressable>
          </Card>
        </View>
      </Modal>

      {/* Time Picker */}
      {showTimePicker && (
        <DateTimePicker
          value={tempTime}
          mode="time"
          display="default"
          onChange={(_, sel) => {
            if (sel) {
              if (isStart) {
                setTempTime(sel);
                setIsStart(false);
              } else {
                const fmt = d => `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
                setTimeSlot(`${fmt(tempTime)} – ${fmt(sel)}`);
                if (errors.timeSlot) setErrors(e => ({ ...e, timeSlot: false }));
                setShowTimePicker(false);
                setIsStart(true);
              }
            } else {
              setShowTimePicker(false);
              setIsStart(true);
            }
          }}
          style={{ backgroundColor: colors.card }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  flex: { flex: 1 },

  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.screenPadding,
    borderBottomWidth: 1,
  },
  headerBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: SIZES.fontSubtitle + 2, fontWeight: '600' },

  screen: { flex: 1 },
  heading: { fontSize: SIZES.fontSubtitle, fontWeight: '500', marginBottom: 16 },
  subheading: { fontSize: SIZES.fontSubtitle + 2, fontWeight: '600', marginBottom: 16 },

  categoryCard: {
    width: 90,
    height: 110,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 8,
  },
  iconPlaceholder: { width: '60%', height: '60%', backgroundColor: '#EFEFEF', borderRadius: 8, marginBottom: 8 },
  categoryText: { fontSize: SIZES.fontRegular, fontWeight: '600', textAlign: 'center' },

  companyList: { paddingHorizontal: 12 },
  companyCard: {
    width: (width - 64) / 2,
    borderRadius: SIZES.radius,
    padding: 16,
    margin: 8,
    alignItems: 'center',
  },
  companyLogo: { width: 60, height: 60, borderRadius: 30, marginBottom: 12 },
  companyName: { fontSize: 14, fontWeight: '500' },

  formCard: { marginBottom: SIZES.screenPadding },
  label: { fontSize: SIZES.fontRegular, fontWeight: '500', marginBottom: 10 },
  input: { height: 50, borderWidth: 1, borderRadius: SIZES.radius, paddingHorizontal: 16, fontSize: SIZES.fontRegular },
  inputError: { borderColor: '#d9534f' },
  textArea: {
    minHeight: 120,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    padding: 16,
    fontSize: SIZES.fontRegular,
    textAlignVertical: 'top',
  },
  error: { color: '#d9534f', marginTop: 6 },

  chip: { borderWidth: 1, borderRadius: 24, paddingVertical: 10, paddingHorizontal: 18 },
  chipText: { fontSize: SIZES.fontRegular },
  pressed: { opacity: 0.6 },

  tagRow: { flexDirection: 'row', alignItems: 'center' },
  tagBtn: { marginLeft: 10, padding: 4 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 },
  tag: { flexDirection: 'row', alignItems: 'center', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4, margin: 4 },

  actions: { position: 'absolute', left: 0, right: 0, padding: 16, borderTopWidth: 1 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', padding: 24 },
  modal: { borderRadius: SIZES.radius, overflow: 'hidden', maxHeight: '70%' },
  modalTitle: { fontSize: SIZES.fontSubtitle, fontWeight: '600', padding: 16 },
  modalItem: { padding: 16, borderBottomWidth: 1 },
  modalClose: { padding: 16, alignItems: 'center' },
});
