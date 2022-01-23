import React, {createRef, useState} from 'react'
import {TextInput as DefaultTextInput} from 'react-native-paper'

type TextInputProps = React.ComponentProps<typeof DefaultTextInput> & {
  autoComplete?: boolean;
  clearable?: boolean;
  value?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onChangeText?: (text: string) => void;
}

export default function TextInput(props: TextInputProps) {
  const ref = createRef(),
        [isFocuses, setIsFocused] = useState(false)
  return <DefaultTextInput
    {...props}
    ref={ref}
    onFocus={() => {
      setIsFocused(true)
      if(props.onFocus) props.onFocus()
    }}
    onBlur={() => {
      setIsFocused(false)
      if(props.onBlur) props.onBlur()
    }}
    right={(props.clearable && props.value && !isFocuses)
      ? <TextInput.Icon name="close" onPress={() => {
        props.onChangeText('')
        ref.current.blur()
      }} />
      : null
    }
    autoComplete={false}
    mode={'outlined'} />
}

TextInput.Icon = DefaultTextInput.Icon
