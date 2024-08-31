import {Dimensions, StatusBar, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const scale = (size: number): number => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number): number =>
  (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor: number = 0.5): number =>
  size + (scale(size) - size) * factor;
const moderateScaleVertical = (size: number, factor: number = 0.5): number =>
  size + (verticalScale(size) - size) * factor;

const textScale = (percent: number): number => {
  const screenHeight = Dimensions.get('window').height;
  // Calculate absolute ratio for bigger screens requiring smaller scaling
  const ratio = screenHeight / width;
  // Guideline sizes are based on standard ~5″ screen mobile device
  const deviceHeight = 375
    ? screenHeight * (ratio > 1.8 ? 0.126 : 0.15) // Set guideline depending on absolute ratio
    : Platform.OS === 'android'
    ? screenHeight - (StatusBar.currentHeight ?? 0) // Ensure StatusBar.currentHeight is not undefined
    : screenHeight;

  const heightPercent = (percent * deviceHeight) / 100;
  return Math.round(heightPercent);
};

export {
  scale,
  verticalScale,
  textScale,
  moderateScale,
  moderateScaleVertical,
  width,
  height,
};