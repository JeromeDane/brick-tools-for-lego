import React, {useRef, useState} from 'react'
import {ScrollView, Touchable, TouchableOpacity, View} from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import {Button, Checkbox, Dialog, Divider, List, Paragraph, Portal, Switch, TextInput} from 'react-native-paper'
import LoadingWrapper from './LoadingWrapper'

type SelectDialogProps = {
  label: string,
  items: {
    id: string|number,
    label: string
  }[],
  initialValues: string[]|number[]
}

export default function SelectDialog({label, items = [], initialValues = []}: SelectDialogProps) {
  const [dialogOpen, setDialogOpen] = useState(false),
        [checked, setChecked] = useState<string[]|number[]>(initialValues),
        textInputRef = useRef(),
        close = () => {
          textInputRef?.current?.blur()
          setDialogOpen(false)
        },
        toggleChecked = (id) => {
          const checkedIndex = checked.indexOf(id)
          setChecked(checkedIndex < 0
            ? checked.concat([id]) :
            [...checked.slice(0, checkedIndex), ...checked.slice(checkedIndex+1)])
        }
  return <View>
    <TextInput
      label={label}
      autoComplete={false}
      onFocus={() => {
        textInputRef?.current?.blur()
        setDialogOpen(true)
      }}
      ref={textInputRef} />
    <Portal>
      <Dialog
        visible={dialogOpen}
        style={{marginVertical: 100}}
        onDismiss={close}>
        <Dialog.Title>{label} ({checked.length} selected)</Dialog.Title>
        <Dialog.ScrollArea>
          <ScrollView>
            <LoadingWrapper>
              {items.map(({id, label}) => {
                const checkedIndex = checked.indexOf(id),
                      isChecked = checkedIndex > -1
                return <View
                  key={id}
                  onPress={() => toggleChecked(id)}
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 5
                  }}>
                  <Paragraph style={{flexGrow: 1}}>{label}</Paragraph>
                  <Switch value={isChecked} onValueChange={() => toggleChecked(id)} />
                  <Divider />
                </View>
              })}
            </LoadingWrapper>
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button onPress={close}>
            Done
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  </View>
}
