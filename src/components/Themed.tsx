/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import React from 'react'
import {FontAwesome} from '@expo/vector-icons'
import {Text as DefaultText, View as DefaultView, TextInput as DefaultTextInput} from 'react-native'
import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme()
  const colorFromProps = props[theme]

  if(colorFromProps) {
    return colorFromProps
  } else {
    return Colors[theme][colorName]
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function Text(props: TextProps) {
  const {style, lightColor, darkColor, ...otherProps} = props
  const color = useThemeColor({light: lightColor, dark: darkColor}, 'text')

  return <DefaultText style={[{color}, style]} {...otherProps} />
}

type DefaultTextInputProps = React.ComponentProps<typeof DefaultTextInput>
interface TextInputProps extends DefaultTextInputProps {
  label?: string;
  style: any // TODO: type this properly
}

export function TextInput(props: TextInputProps) {
  const {style, ...otherProps} = props
  const backgroundColor = useThemeColor({}, 'background')
  const color = useThemeColor({}, 'text')

  return <View style={[{
    flex: 1,
    flexDirection: 'row',
    flexGrow: 1,
    position: 'relative',
    paddingTop: 8
  },
  props.style]}>
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
    },
    style]} {...otherProps} />
  </View>
}

export function View(props: ViewProps) {
  const {style, lightColor, darkColor, ...otherProps} = props,
        backgroundColor = useThemeColor({light: lightColor, dark: darkColor}, 'background')
  return <DefaultView style={[{backgroundColor}, style]} {...otherProps} />
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
export function Icon(props: any) {
  const color = useThemeColor({}, 'text')
  return <FontAwesome size={30}  {...props} style={{color, ...props.style}}/>
}
