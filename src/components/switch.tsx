import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  I18nManager,
} from 'react-native';
import Reanimated, {
  AnimationCallback,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
  withTiming,
} from 'react-native-reanimated';
import type { SwitchProps } from '../types';

const spring = (
  _value: any,
  config: any = { damping: 15, stiffness: 120 },
  callback?: AnimationCallback
) => withSpring(_value, config, callback);

const timing = (
  _value: any,
  config: any = { duration: 350 },
  callback?: AnimationCallback
) => withTiming(_value, config, callback);

const PADDINGHORIZONTAL = 2;

const isNumber = (value: any, defaultValue = 0) => {
  value = Number(value);
  if (typeof value === 'number' && !isNaN(value) && value !== null) {
    return value;
  }
  return defaultValue;
};

const Switch = (IProps: SwitchProps): React.JSX.Element => {
  const {
    value = false,
    activeText = 'ON',
    inActiveText = 'OFF',
    backgroundActive = '#249c00',
    backgroundInActive = '#333',
    circleActiveColor = '#fff',
    circleInActiveColor = '#fff',
    circleSize = 30,
    width = 100,
    onValueChange = undefined,
    switchBorderRadius = 30,
    textStyle,
    disabled = false,
    switchPaddingRight = PADDINGHORIZONTAL,
    switchPaddingLeft = PADDINGHORIZONTAL,
    switchStyle,
    circleChildrenActive,
    circleChildrenInActive,
    onAnimationEnd = undefined,
  } = IProps;

  const { isRTL } = I18nManager;
  const circleTranslateX = useSharedValue<any>(0);
  const textTranslateXInActive = useSharedValue<any>(0);
  const textTranslateXActive = useSharedValue<any>(0);
  const opacity = useSharedValue<number>(1);
  const circleChildrenActiveOpacity = useSharedValue<number>(1);
  const circleChildrenInActiveOpacity = useSharedValue<number>(0);
  const circleColor = useSharedValue<string | undefined>(circleInActiveColor);

  const [defaultWidth, setDefaultWidth] = useState<number>(
    isNumber(width, 100)
  );
  const [defaultCircleSize, setDefaultCircleSize] = useState<number>(
    isNumber(circleSize, 30)
  );
  const [defaultPadding, setDefaultPadding] = useState<{
    paddingLeft: number;
    paddingRight: number;
  }>({
    paddingLeft: isNumber(switchPaddingLeft, PADDINGHORIZONTAL),
    paddingRight: isNumber(switchPaddingRight, PADDINGHORIZONTAL),
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

  const circleChildrenInActiveStyle = useAnimatedStyle(() => {
    return {
      opacity: circleChildrenInActiveOpacity.value,
    };
  });

  const circleChildrenActiveStyle = useAnimatedStyle(() => {
    return {
      opacity: circleChildrenActiveOpacity.value,
    };
  });

  const translateXSpringConfig = { damping: 15, stiffness: 300 };

  const onActive = (size: number, factory: number) => {
    textTranslateXActive.value = timing(0);
    textTranslateXInActive.value = timing(factory * defaultWidth);
    if (circleActiveColor) {
      circleColor.value = spring(circleActiveColor, {
        damping: 20,
        stiffness: 100,
      });
    }
    circleChildrenActiveOpacity.value = spring(1);
    circleChildrenInActiveOpacity.value = spring(0);
    circleTranslateX.value = spring(
      size,
      translateXSpringConfig,
      (finished?: boolean) => {
        'worklet';
        if (finished && onAnimationEnd) {
          runOnJS(onAnimationEnd)(true);
        }
      }
    );
  };

  const onInActive = (_: number, factory: number) => {
    textTranslateXActive.value = timing(-(defaultWidth * factory));
    textTranslateXInActive.value = timing(0);
    if (circleInActiveColor) {
      circleColor.value = spring(circleInActiveColor, {
        damping: 20,
        stiffness: 100,
      });
    }
    circleChildrenActiveOpacity.value = spring(0);
    circleChildrenInActiveOpacity.value = spring(1);
    circleTranslateX.value = spring(
      0,
      translateXSpringConfig,
      (finished?: boolean) => {
        'worklet';
        if (finished && onAnimationEnd) {
          runOnJS(onAnimationEnd)(false);
        }
      }
    );
  };

  useEffect(() => {
    setDefaultWidth(isNumber(width, 100));
  }, [width]);

  useEffect(() => {
    setDefaultPadding({
      paddingLeft: isNumber(switchPaddingLeft, PADDINGHORIZONTAL),
      paddingRight: isNumber(switchPaddingRight, PADDINGHORIZONTAL),
    });
  }, [switchPaddingLeft, switchPaddingRight]);

  useEffect(() => {
    setDefaultCircleSize(isNumber(circleSize, 30));
  }, [circleSize]);

  useEffect(() => {
    const factory = isRTL ? -1 : 1;
    const size =
      factory *
      (defaultWidth -
        (defaultCircleSize +
          (defaultPadding.paddingLeft + defaultPadding.paddingRight)));
    if (value) {
      onActive(size, factory);
    } else {
      onInActive(size, factory);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, defaultWidth, defaultCircleSize, defaultPadding, isRTL]);

  useEffect(() => {
    if (disabled) {
      opacity.value = spring(0.8);
    } else {
      opacity.value = spring(1);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled]);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (!disabled) {
          onValueChange?.(!value);
        }
      }}
    >
      <Reanimated.View
        style={[
          styles.switch,
          {
            borderRadius: isNumber(switchBorderRadius, 30),
            width: defaultWidth,
          },
          switchStyle,
          defaultPadding,
          switchAnimatedStyle,
        ]}
      >
        <Reanimated.View
          style={[
            styles.switchTextView,
            styles.center,
            {
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
            styles.switchTextView,
            styles.center,
            {
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
        <Reanimated.View
          style={[
            styles.circleStyle,
            {
              width: defaultCircleSize,
              height: defaultCircleSize,
              borderRadius: isNumber(switchBorderRadius, 30),
            },
            circleStyle,
          ]}
        >
          <Reanimated.View
            style={[
              styles.circleChildren,
              styles.center,
              circleChildrenActiveStyle,
            ]}
          >
            {circleChildrenActive}
          </Reanimated.View>
          <Reanimated.View
            style={[
              styles.circleChildren,
              styles.center,
              circleChildrenInActiveStyle,
            ]}
          >
            {circleChildrenInActive}
          </Reanimated.View>
        </Reanimated.View>
      </Reanimated.View>
    </TouchableWithoutFeedback>
  );
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
  switchTextView: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  textStyle: {
    fontSize: 14,
    color: '#fff',
    marginHorizontal: 2,
  },
  circleStyle: {
    position: 'relative',
    zIndex: 99,
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleChildren: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

export default Switch;
