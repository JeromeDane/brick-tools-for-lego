/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import * as React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Text as DefaultText, TouchableOpacity, View as DefaultView } from 'react-native';
import {Picker as DefaultPicker, PickerProps} from '@react-native-picker/picker'

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function Picker(props: PickerProps) {
  const { style, ...otherProps } = props;
  const backgroundColor = useThemeColor({}, 'background');
  const color = useThemeColor({}, 'text');

  return <DefaultPicker
    style={[{
      backgroundColor,
      color,
      minWidth: 100
    }, style]} {...otherProps}
    dropdownIconColor={color} />;
}

Picker.Item = DefaultPicker.Item

type PaginatorProps = {
  selectedValue: number,
  onValueChange: Function,
  numItems: number,
  pageSize: number
}

export const Paginator = (props: PaginatorProps) => {
  const numPages = Math.ceil(props.numItems/props.pageSize),
        pickerItems = []
  for(let i = 0; i < numPages; i++)
    pickerItems.push(<Picker.Item label={`Page ${(i + 1)}`} value={i} />)
  return <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
    <TouchableOpacity
      style={{height: props.selectedValue == 0 ? 0 : 'auto'}}
      onPress={() =>
        props.onValueChange(props.selectedValue == 0 ? 0 : props.selectedValue - 1)
      }>
      <Icon name="chevron-left" style={{marginRight: 20}} />
    </TouchableOpacity>
    <Picker
      style={{width: 150}}
      selectedValue={props.selectedValue}
      onValueChange={props.onValueChange}>
      {pickerItems}
    </Picker>
    <TouchableOpacity
      style={{height: props.selectedValue == numPages - 1 ? 0 : 'auto'}}
      onPress={() =>
        props.onValueChange(props.selectedValue + 1)
      }>
      <Icon name="chevron-right" style={{marginLeft: 20}} />
    </TouchableOpacity>
  </View>
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
export function Icon(props: any) {
  const color = useThemeColor({}, 'text')
  return <FontAwesome size={30}  {...props} style={{ color, ...props.style }}/>;
}