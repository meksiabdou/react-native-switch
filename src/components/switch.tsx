import React, { useEffect, useState } from 'react';
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

const spring = (_value: any, config: any = { damping: 20, stiffness: 120 }) =>
  withSpring(_value, config);

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

  const circleTranslateX = useSharedValue<any>(0);
  const textTranslateXInActive = useSharedValue<any>(0);
  const textTranslateXActive = useSharedValue<any>(0);
  const opacity = useSharedValue<number>(1);
  const circleColor = useSharedValue<string>(circleInActiveColor);

  const [defaultWidth, setDefaultWidth] = useState<number>(width || 100);
  const [defaultCircleSize, setDefaultCircleSize] = useState<number>(
    circleSize || 30
  );

  const circleStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: circleColor.value,
      transform: [
        {
          translateX: circleTranslateX.value,
        },
      ],
    };
  });

  const textStyleViewInActive = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: textTranslateXInActive.value,
        },
      ],
    };
  });

  const textStyleViewActive = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: textTranslateXActive.value,
        },
      ],
    };
  });

  const switchStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    if (width && typeof width === 'number') {
      setDefaultWidth(width);
    }
  }, [width]);

  useEffect(() => {
    if (circleSize && typeof circleSize === 'number') {
      setDefaultCircleSize(circleSize);
    }
  }, [circleSize]);

  useEffect(() => {
    if (defaultWidth && typeof defaultWidth === 'number') {
      const size = defaultWidth - (defaultCircleSize + PADDINGHORIZONTAL * 2);
      if (value) {
        circleTranslateX.value = spring(size, { damping: 15, stiffness: 120 });
        textTranslateXActive.value = spring(0);
        textTranslateXInActive.value = spring(defaultWidth);
        circleColor.value = spring(circleActiveColor, {
          damping: 20,
          stiffness: 100,
        });
      } else {
        circleTranslateX.value = spring(0, { damping: 15, stiffness: 120 });
        textTranslateXActive.value = spring(-defaultWidth);
        textTranslateXInActive.value = spring(0);
        circleColor.value = spring(circleInActiveColor, {
          damping: 20,
          stiffness: 100,
        });
      }
    }
  }, [value, defaultWidth, defaultCircleSize]);

  useEffect(() => {
    if (disabled) {
      opacity.value = spring(0.8);
    } else {
      opacity.value = spring(1);
    }
  }, [disabled]);

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
          },
          switchStyle,
        ]}
      >
        <Reanimated.View
          style={[
            {
              position: 'relative',
              zIndex: 99,
              width: defaultCircleSize,
              height: defaultCircleSize,
              borderRadius: switchBorderRadius,
            },
            circleStyle,
          ]}
        />
        <Reanimated.View
          style={[
            {
              position: 'absolute',
              display: 'flex',
              right: 0,
              left: 0,
              top: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
              width: defaultWidth + PADDINGHORIZONTAL,
              backgroundColor: backgroundActive,
            },
            textStyleViewActive,
          ]}
        >
          <Reanimated.Text
            style={[
              styles.textStyle,
              textStyle,
              { left: -(defaultCircleSize / 2) },
            ]}
          >
            {activeText}
          </Reanimated.Text>
        </Reanimated.View>
        <Reanimated.View
          style={[
            {
              position: 'absolute',
              display: 'flex',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
              width: defaultWidth,
              backgroundColor: backgroundInActive,
            },
            textStyleViewInActive,
          ]}
        >
          <Reanimated.Text
            style={[
              styles.textStyle,
              textStyle,
              { left: defaultCircleSize / 2 },
            ]}
          >
            {inActiveText}
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
  backgroundInActive: '#333',
  circleActiveColor: '#fff',
  circleInActiveColor: '#fff',
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
    justifyContent: 'flex-start',
    position: 'relative',
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  textStyle: {
    fontSize: 14,
    color: '#fff',
    marginHorizontal: 2,
  },
});

export default Switch;
