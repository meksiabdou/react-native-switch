import { ReactElement } from 'react';
import type { TextStyle, ViewStyle } from 'react-native';

export interface SwitchProps {
  disabled?: boolean;
  value: boolean;
  onValueChange?: (value: boolean) => void;
  onAnimationEnd?: (value?: boolean) => void;
  width?: number;
  activeText?: string | null;
  inActiveText?: string | null;
  circleSize?: number;
  switchBorderRadius?: number;
  backgroundActive?: string;
  backgroundInActive?: string;
  circleActiveColor?: string;
  circleInActiveColor?: string;
  textStyle?: TextStyle;
  switchStyle?: ViewStyle;
  switchPaddingRight?: number;
  switchPaddingLeft?: number;
  circleChildrenActive?: ReactElement;
  circleChildrenInActive?: ReactElement;
}
