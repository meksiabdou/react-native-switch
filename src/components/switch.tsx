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

const isNumbre = (value: any, defaultValue = 0) => {
  value = Number(value);
  if (typeof value === 'number' && !isNaN(value) && value !== null) {
    return value;
  }
  return defaultValue;
};

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
    switchPaddingRight,
    switchPaddingLeft,
    switchStyle,
  } = IProps;

  const circleTranslateX = useSharedValue<any>(0);
  const textTranslateXInActive = useSharedValue<any>(0);
  const textTranslateXActive = useSharedValue<any>(0);
  const opacity = useSharedValue<number>(1);
  const circleColor = useSharedValue<string | undefined>(circleInActiveColor);

  const [defaultWidth, setDefaultWidth] = useState<number>(
    isNumbre(width, 100)
  );
  const [defaultCircleSize, setDefaultCircleSize] = useState<number>(
    isNumbre(circleSize, 30)
  );
  const [defaultPadding, setDefaultPadding] = useState<{
    paddingLeft: number;
    paddingRight: number;
  }>({
    paddingLeft: isNumbre(switchPaddingLeft, PADDINGHORIZONTAL),
    paddingRight: isNumbre(switchPaddingRight, PADDINGHORIZONTAL),
  });

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

  const switchAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    setDefaultWidth(isNumbre(width, 100));
  }, [width]);

  useEffect(() => {
    setDefaultPadding({
      paddingLeft: isNumbre(switchPaddingLeft, PADDINGHORIZONTAL),
      paddingRight: isNumbre(switchPaddingRight, PADDINGHORIZONTAL),
    });
  }, [switchPaddingLeft, switchPaddingRight]);

  useEffect(() => {
    setDefaultCircleSize(isNumbre(circleSize, 30));
  }, [circleSize]);

  useEffect(() => {
    const size =
      defaultWidth -
      (defaultCircleSize +
        (defaultPadding.paddingLeft + defaultPadding.paddingRight));
    if (value) {
      circleTranslateX.value = spring(size, { damping: 15, stiffness: 120 });
      textTranslateXActive.value = spring(0);
      textTranslateXInActive.value = spring(defaultWidth);
      if (circleActiveColor) {
        circleColor.value = spring(circleActiveColor, {
          damping: 20,
          stiffness: 100,
        });
      }
    } else {
      circleTranslateX.value = spring(0, { damping: 15, stiffness: 120 });
      textTranslateXActive.value = spring(-defaultWidth);
      textTranslateXInActive.value = spring(0);
      if (circleInActiveColor) {
        circleColor.value = spring(circleInActiveColor, {
          damping: 20,
          stiffness: 100,
        });
      }
    }
  }, [value, defaultWidth, defaultCircleSize, defaultPadding]);

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
            borderRadius: isNumbre(switchBorderRadius, 30),
            width: defaultWidth,
          },
          switchStyle,
          defaultPadding,
          switchAnimatedStyle,
        ]}
      >
        <Reanimated.View
          style={[
            {
              position: 'relative',
              zIndex: 99,
              width: defaultCircleSize,
              height: defaultCircleSize,
              borderRadius: isNumbre(switchBorderRadius, 30),
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
              width:
                defaultWidth +
                (defaultPadding.paddingLeft + defaultPadding.paddingRight) / 2,
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
  onValueChange: undefined,
  activeText: 'ON',
  inActiveText: 'OFF',
  backgroundActive: '#249c00',
  backgroundInActive: '#333',
  circleActiveColor: '#fff',
  circleInActiveColor: '#fff',
  circleSize: 30,
  switchBorderRadius: 30,
  width: 100,
  switchPaddingRight: PADDINGHORIZONTAL,
  switchPaddingLeft: PADDINGHORIZONTAL,
};

const styles = StyleSheet.create({
  switch: {
    display: 'flex',
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
