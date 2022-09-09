import React, { useEffect } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Reanimated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import type { SwitchProps } from '../types';

const TouchableAnimated = Reanimated.createAnimatedComponent(
  TouchableWithoutFeedback
);

const PADDINGHORIZONTAL = 2;

const Switch = (IProps: SwitchProps): JSX.Element => {
  const {
    value,
    activeText,
    inActiveText,
    backgroundActive,
    backgroundInActive,
    circleActiveColor,
    circleInActiveColor,
    circleSize,
    width,
    onValueChange,
    switchBorderRadius,
    textStyle,
    disabled,
  } = IProps;

  const defaultCircleSize = circleSize || 30;
  const circleTranslateX = useSharedValue<any>(0);
  const textTranslateX = useSharedValue<any>(0);

  const circleStyle = useAnimatedStyle(() => {
    return {
      //backgroundColor: circleColor.value,
      transform: [
        {
          translateX: circleTranslateX.value,
        },
      ],
    };
  });

  const TextStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: textTranslateX.value,
        },
      ],
    };
  });

  const spring = (_value: any) =>
    withSpring(_value, { damping: 15, stiffness: 120 });

  useEffect(() => {
    if (width && typeof width === 'number' && !disabled) {
      const size = (width || 100) - (defaultCircleSize + PADDINGHORIZONTAL * 2);
      if (value) {
        circleTranslateX.value = spring(size);
        textTranslateX.value = spring(-defaultCircleSize);
      } else {
        circleTranslateX.value = spring(PADDINGHORIZONTAL / 2);
        textTranslateX.value = spring(0);
      }
    }
  }, [value]);

  return (
    <TouchableAnimated
      onPress={() => {
        if (typeof onValueChange === 'function' && !disabled) {
          onValueChange(!value);
        }
      }}
    >
      <Reanimated.View
        style={[
          styles.switch,
          {
            borderRadius: switchBorderRadius,
            width: width,
            backgroundColor: value ? backgroundActive : backgroundInActive,
            opacity: disabled ? 0.8 : 1,
          },
        ]}
      >
        <Reanimated.View
          style={[
            {
              position: 'relative',
              zIndex: 1,
              width: circleSize,
              height: circleSize,
              borderRadius: switchBorderRadius,
              backgroundColor: value ? circleActiveColor : circleInActiveColor,
            },
            circleStyle,
          ]}
        />
        <Reanimated.View
          style={[{ position: 'relative', marginHorizontal: 2 }, TextStyle]}
        >
          <Reanimated.Text style={[styles.textStyle, textStyle]}>
            {value ? activeText : inActiveText}
          </Reanimated.Text>
        </Reanimated.View>
      </Reanimated.View>
    </TouchableAnimated>
  );
};

Switch.defaultProps = {
  disabled: false,
  value: false,
  activeText: 'on',
  inActiveText: 'off',
  backgroundActive: '#249c00',
  backgroundInActive: '#b5b5b5',
  circleActiveColor: '#fff',
  circleInActiveColor: '#000',
  circleSize: 30,
  switchBorderRadius: 30,
  width: 100,
};

const styles = StyleSheet.create({
  switch: {
    display: 'flex',
    paddingHorizontal: 2,
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  textStyle: {
    fontSize: 14,
    color: '#fff',
    marginHorizontal: 2,
  },
});

export default Switch;
