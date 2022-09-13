import type { TextStyle } from 'react-native';

export interface SwitchProps {
  disabled?: boolean;
  value: boolean;
  onValueChange?: (value: boolean) => void;
  width?: number;
  activeText?: string;
  inActiveText?: string;
  circleSize?: number;
  switchBorderRadius?: number;
  backgroundActive?: string;
  backgroundInActive?: string;
  circleActiveColor?: string;
  circleInActiveColor?: string;
  textStyle?: TextStyle;
}
