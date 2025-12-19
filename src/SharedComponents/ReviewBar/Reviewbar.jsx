import React, { useMemo, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TOTAL_REVIEWS = 2350;

const STAR_COUNTS = {
  5: 1249,
  4: 400,
  3: 500,
  2: 100,
  1: 101,
};

const BAR_WIDTH = 220; 

const ReviewBar = ({ onFilterByStars }) => {
  const [starsRowWidth, setStarsRowWidth] = useState(0);

  const { totalCount, average } = useMemo(() => {
    const counts = STAR_COUNTS;
    const total = Object.values(counts).reduce((s, c) => s + c, 0);
    const sum = Object.entries(counts).reduce(
      (s, [star, count]) => s + Number(star) * Number(count),
      0
    );
    const avg = total > 0 ? sum / total : 0;
    return { totalCount: total, average: avg };
  }, []);

  const handleRowPress = star => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (typeof onFilterByStars === 'function') onFilterByStars(star);
  };

  const getBarPercent = count => {
    const denom = totalCount || 1;
    return Math.min(1, Math.max(0, count / denom));
  };

  const starFillPercent = Math.max(0, Math.min(1, average / 5));
  const avgDisplay = (Math.round(average * 10) / 10).toFixed(1);

  const overlayWidthPx = Math.round(starFillPercent * (starsRowWidth || 0));

  const onStarsLayout = useCallback(event => {
    const { width } = event.nativeEvent.layout;
    setStarsRowWidth(prev => (Math.round(prev) === Math.round(width) ? prev : width));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.headerTitle}>Reviews</Text>
        <Text style={styles.headerCount}>({TOTAL_REVIEWS})</Text>
      </View>

      <Text style={styles.bigTitle}>Reviews</Text>

      <Text style={styles.sectionTitle}>Rating Snapshot</Text>
      <Text style={styles.helperText}>Select a row below to filter reviews.</Text>

      <View style={styles.barsContainer}>
        {[5, 4, 3, 2, 1].map(star => {
          const count = STAR_COUNTS[star] || 0;
          const percent = getBarPercent(count);
          const filledWidth = Math.round(BAR_WIDTH * percent);
          return (
            <TouchableOpacity
              key={`row-${star}`}
              activeOpacity={0.8}
              style={styles.barRow}
              onPress={() => handleRowPress(star)}
            >
              <Text style={styles.barLabel}>{`${star} ${star === 1 ? 'star' : 'stars'}`}</Text>

              <View style={[styles.barTrack, { width: BAR_WIDTH }]}>
                <View style={[styles.barFill, { width: filledWidth }]} />
              </View>

              <Text style={styles.barCount}>{count}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Overall Rating</Text>
      <View style={styles.overallRow}>
        <Text style={styles.averageNumber}>{avgDisplay}</Text>

        <View style={styles.starsOuter}>
          <View
            style={styles.starsRowContainer}
            onLayout={onStarsLayout}
          >
            <Text style={[styles.star, styles.starGray]}>★★★★★</Text>
            {starsRowWidth > 0 && (
              <View style={[styles.starsOverlay, { width: overlayWidthPx }]}>
                <Text style={[styles.star, styles.starFilled]}>★★★★★</Text>
              </View>
            )}
          </View>
        </View>

        <TouchableOpacity onPress={() => {}} activeOpacity={0.7}>
          <Text style={styles.reviewsLink}>{`${TOTAL_REVIEWS} Reviews`}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReviewBar;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingVertical: 18,
    backgroundColor: '#fff',
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
  },
  headerCount: {
    marginLeft: 8,
    fontSize: 18,
    color: '#222',
  },

  bigTitle: {
    fontSize: 34,
    fontWeight: '700',
    marginTop: 6,
    marginBottom: 12,
    color: '#111',
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
  },
  helperText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },

  barsContainer: {
    marginTop: 6,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },

  barLabel: {
    width: 70,
    fontSize: 18,
    color: '#333',
  },

  barTrack: {
    height: 20,
    backgroundColor: '#e6e6e6',
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 12,
  },

  barFill: {
    height: '100%',
    backgroundColor: '#4b4b4b',
  },

  barCount: {
    width: 44,
    fontSize: 18,
    color: '#333',
    textAlign: 'right',
  },

  overallRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },

  averageNumber: {
    fontSize: 54,
    fontWeight: '700',
    color: '#222',
    marginRight: 12,
  },

  starsOuter: {
    marginRight: 12,
    justifyContent: 'center',
  },

  starsRowContainer: {
    position: 'relative',
    overflow: 'hidden',
  },

  star: {
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 1,
  },

  starGray: {
    color: '#d1d1d1',
  },

  starsOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    overflow: 'hidden',
  },

  starFilled: {
    color: '#222222',
  },

  reviewsLink: {
    textDecorationLine: 'underline',
    color: '#333',
    fontSize: 16,
  },
});
