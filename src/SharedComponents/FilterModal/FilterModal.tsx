import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Switch,
  TextInput,
} from 'react-native';

type FilterOption = {
  label: string;
  count: number;
};

type FilterSection = {
  title: string;
  options: FilterOption[];
};

type Props = {
  visible: boolean;
  onClose: () => void;
  selectedFilters: string[];
  setSelectedFilters: (filters: string[]) => void;
  resultCount: number;
};

const FILTER_SECTIONS: FilterSection[] = [
  {
    title: 'Category',
    options: [
      { label: 'Shirts + tops', count: 267 },
      { label: 'Handbags', count: 49 },
      { label: 'Skirts', count: 47 },
      { label: 'Blazers', count: 1 },
      { label: 'Pants', count: 125 },
      { label: 'Dresses', count: 22 },
      { label: 'Sweaters', count: 150 },
      { label: 'Coats + jackets', count: 37 },
      { label: 'Earrings', count: 219 },
    ],
  },
  {
    title: 'Style',
    options: [
      { label: 'Casual', count: 320 },
      { label: 'Formal', count: 180 },
      { label: 'Party', count: 95 },
      { label: 'Athleisure', count: 60 },
    ],
  },
  {
    title: 'Womens Size Range',
    options: [
      { label: 'XS', count: 120 },
      { label: 'S', count: 230 },
      { label: 'M', count: 310 },
      { label: 'L', count: 200 },
      { label: 'XL', count: 90 },
      { label: 'Plus Size', count: 40 },
    ],
  },
  {
    title: 'Size',
    options: [
      { label: '2', count: 15 },
      { label: '4', count: 40 },
      { label: '6', count: 70 },
      { label: '8', count: 90 },
      { label: '10', count: 60 },
      { label: '12', count: 30 },
    ],
  },
  {
    title: 'Brand',
    options: [
      { label: 'Brand A', count: 120 },
      { label: 'Brand B', count: 95 },
      { label: 'Brand C', count: 60 },
      { label: 'Brand D', count: 30 },
    ],
  },
];

const FilterModal: React.FC<Props> = ({
  visible,
  onClose,
  selectedFilters,
  setSelectedFilters,
  resultCount,
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [sameDayPickup, setSameDayPickup] = useState(false);

  const [searchQueries, setSearchQueries] = useState<Record<string, string>>({});

  const toggleFilter = (value: string) => {
    if (selectedFilters.includes(value)) {
      setSelectedFilters(selectedFilters.filter(f => f !== value));
    } else {
      setSelectedFilters([...selectedFilters, value]);
    }
  };

  const removeFilter = (value: string) => {
    setSelectedFilters(selectedFilters.filter(f => f !== value));
  };

  const toggleSection = (title: string) => {
    setExpandedSection(prev => (prev === title ? null : title));
  };

  const handleSearchChange = (title: string, text: string) => {
    setSearchQueries(prev => ({ ...prev, [title]: text }));
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.headerBackArea}>
            <Text style={styles.headerBack}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Filter</Text>
          <TouchableOpacity onPress={onClose} style={styles.headerCloseArea}>
            <Text style={styles.headerClose}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Selected Filters</Text>
            <View style={styles.pillsContainer}>
              {selectedFilters.length === 0 ? (
                <Text style={styles.noFiltersText}>None</Text>
              ) : (
                selectedFilters.map(item => (
                  <View key={item} style={styles.pill}>
                    <Text style={styles.pillText}>{item}</Text>
                    <TouchableOpacity onPress={() => removeFilter(item)}>
                      <Text style={styles.pillClose}>✕</Text>
                    </TouchableOpacity>
                  </View>
                ))
              )}
            </View>
          </View>

          <View style={[styles.section, styles.sameDayRow]}>
            <View style={styles.sameDayLeft}>
              <Text style={styles.sameDayTitle}>Same Day Pickup</Text>
              <Text style={styles.sameDaySubTitle}>Select Store</Text>
            </View>
            <Switch
              value={sameDayPickup}
              onValueChange={setSameDayPickup}
              trackColor={{ false: '#e0e0e0', true: '#e60012' }}
              thumbColor="#ffffff"
            />
          </View>

          {FILTER_SECTIONS.map(section => {
            const isExpanded = expandedSection === section.title;
            const query = (searchQueries[section.title] || '')
              .trim()
              .toLowerCase();

            const filteredOptions = section.options.filter(option =>
              option.label.toLowerCase().includes(query),
            );

            return (
              <View key={section.title} style={styles.section}>
                <TouchableOpacity
                  style={styles.accordionHeader}
                  onPress={() => toggleSection(section.title)}
                >
                  <Text style={styles.accordionPlus}>
                    {isExpanded ? '✕' : '+'}
                  </Text>
                  <Text style={styles.accordionTitle}>{section.title}</Text>
                </TouchableOpacity>

                {isExpanded && (
                  <View style={styles.optionsList}>
                    <View style={styles.searchRow}>
                      <TextInput
                        style={styles.searchInput}
                        placeholder={`Search ${section.title}`}
                        placeholderTextColor="#aaa"
                        value={searchQueries[section.title] || ''}
                        onChangeText={text =>
                          handleSearchChange(section.title, text)
                        }
                      />
                      <Text style={styles.searchIcon}>🔍</Text>
                    </View>

                    {filteredOptions.map(option => {
                      const isSelected = selectedFilters.includes(option.label);
                      return (
                        <TouchableOpacity
                          key={option.label}
                          style={styles.optionRow}
                          onPress={() => toggleFilter(option.label)}
                        >
                          <View
                            style={[
                              styles.checkbox,
                              isSelected && styles.checkboxSelected,
                            ]}
                          >
                            {isSelected && (
                              <Text style={styles.checkboxTick}>✓</Text>
                            )}
                          </View>
                          <Text style={styles.optionLabel}>
                            {option.label}
                          </Text>
                          <Text style={styles.optionCount}>
                            ({option.count})
                          </Text>
                        </TouchableOpacity>
                      );
                    })}

                    {filteredOptions.length === 0 && (
                      <Text style={styles.noResultsText}>
                        No results found
                      </Text>
                    )}
                  </View>
                )}
              </View>
            );
          })}
        </ScrollView>

        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.resultsButton} onPress={onClose}>
            <Text style={styles.resultsButtonText}>
              {`See ${resultCount.toLocaleString()} Result${
                resultCount === 1 ? '' : 's'
              }`}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
  },
  headerBackArea: {
    width: 40,
    alignItems: 'flex-start',
  },
  headerBack: {
    fontSize: 22,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
  },
  headerCloseArea: {
    width: 40,
    alignItems: 'flex-end',
  },
  headerClose: {
    fontSize: 22,
  },

  contentContainer: {
    paddingBottom: 120,
  },

  section: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },

  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  pillText: {
    fontSize: 14,
    marginRight: 6,
  },
  pillClose: {
    fontSize: 14,
  },
  noFiltersText: {
    fontSize: 14,
    color: '#888',
  },

  sameDayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sameDayLeft: {},
  sameDayTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  sameDaySubTitle: {
    fontSize: 14,
    textDecorationLine: 'underline',
    marginTop: 4,
  },

  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accordionPlus: {
    fontSize: 26,
    marginRight: 10,
  },
  accordionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 4,
  },
  searchIcon: {
    fontSize: 18,
    marginLeft: 6,
  },

  optionsList: {
    marginTop: 12,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#9b9b9b',
    marginRight: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  checkboxSelected: {
    borderColor: '#9b9b9b',
    backgroundColor: '#e0e0e0', 
  },
  checkboxTick: {
    fontSize: 14,
    color: '#555',
  },
  optionLabel: {
    flex: 1,
    fontSize: 16,
  },
  optionCount: {
    fontSize: 16,
  },
  noResultsText: {
    marginTop: 8,
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
  },

  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e0e0e0',
  },
  resultsButton: {
    backgroundColor: '#e60012',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  resultsButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default FilterModal;
