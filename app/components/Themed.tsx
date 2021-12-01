/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Text as DefaultText, TouchableOpacity, View as DefaultView, TextInput as DefaultTextInput } from 'react-native';
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

type DefaultTextInputProps = React.ComponentProps<typeof DefaultTextInput>
interface TextInputProps extends DefaultTextInputProps {
  label?: string;
}

export function TextInput(props: TextInputProps ) {
  const { style, ...otherProps } = props;
  const backgroundColor = useThemeColor({}, 'background');
  const color = useThemeColor({}, 'text')

  return <View style={[{
    flex: 1,
    flexDirection: 'row',
    flexGrow: 1,
    position: 'relative',
    paddingTop: 8
  }, props.style]}>
    {props.label && <Text style={{
        position: 'absolute',
        top: 0,
        left: 6,
        zIndex: 100,
        paddingHorizontal: 4,
        backgroundColor,
        fontSize: 12
      }}>
        {props.label}
      </Text>
    }
    <DefaultTextInput style={[{
      backgroundColor,
      borderWidth: 1,
      borderColor: color,
      borderRadius: 4,
      color,
      padding: 10,
      flexGrow: 1
    }, style]} {...otherProps} />
  </View>
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

  return <View style={[{
    flex: 1,
    flexDirection: 'row',
    flexGrow: 1,
    position: 'relative'
  }, props.style]}>
    <View style={{
      borderColor: color,
      borderWidth: 1,
      borderRadius: 4,
      flexGrow: 1,
      flexDirection: 'row'
    }}>
      {props.label && <Text style={{
        position: 'absolute',
        top: -8,
        left: 4,
        zIndex: 100,
        paddingHorizontal: 4,
        backgroundColor,
        fontSize: 12
      }}>
        {props.label}
      </Text>}
      <DefaultPicker
        style={{
          color,
          flexGrow: 1,
          borderStyle: 'none',
          backgroundColor,
          padding: 10
        }} {...otherProps}
        dropdownIconColor={color} />
    </View>
  </View>
}

Picker.Item = DefaultPicker.Item

type PaginatorProps = {
  selectedValue: number,
  onPageChange: Function,
  onPageSizeChange: Function,
  numItems: number,
  pageSize: number
}

export const Paginator = (props: PaginatorProps) => {
  const numPages = Math.ceil(props.numItems/props.pageSize),
        pickerItems = []
  for(let i = 0; i < numPages; i++)
    pickerItems.push(
      <Picker.Item key={i} label={(i + 1).toString()} value={i} />
    )
  return <View style={{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1
  }}>
    <Picker
      prompt="Show"
      label="Show"
      selectedValue={props.pageSize}
      onValueChange={(num: number) => {
        props.onPageChange(0)
        props.onPageSizeChange(num)
      }}
      style={{marginRight: props.selectedValue == 0 ? 0 : 20}}>
      <Picker.Item label="10 per page" value={10} />
      <Picker.Item label="25 per page" value={25} />
      <Picker.Item label="50 per page" value={50} />
      <Picker.Item label="100 per page" value={100} />
    </Picker>
    {numPages > 1
      ? <>
        <TouchableOpacity
          style={{height: props.selectedValue == 0 ? 0 : 'auto'}}
          onPress={() =>
            props.onPageChange(props.selectedValue == 0 ? 0 : props.selectedValue - 1)
          }>
          <Icon name="chevron-left" style={{marginRight: 20}} />
        </TouchableOpacity>
        <Picker
          selectedValue={props.selectedValue}
          onValueChange={props.onPageChange}
          label="Current Page">
          {pickerItems}
        </Picker>
        <TouchableOpacity
          style={{height: props.selectedValue == numPages - 1 ? 0 : 'auto'}}
          onPress={() =>
            props.onPageChange(props.selectedValue + 1)
          }>
          <Icon name="chevron-right" style={{marginLeft: 20}} />
        </TouchableOpacity>
      </>
      : null
    }
  </View>
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
export function Icon(props: any) {
  const color = useThemeColor({}, 'text')
  return <FontAwesome size={30}  {...props} style={{ color, ...props.style }}/>;
}
