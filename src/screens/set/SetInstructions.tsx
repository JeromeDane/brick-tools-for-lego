import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs'
import React, {useEffect, useState} from 'react'
import {ScrollView} from 'react-native'
import {Button} from 'react-native-paper'
import WebView from 'react-native-webview'
import {Text, View} from '../../components/Themed'
import {SetTabsParamList} from './SetScreen'
import {useApi} from '../../api/brickset'
import RequireAPISupport from '../../components/APISupport'
import {useSet} from '../../data/sets'

export default function SetInstructionsScreen({route: {params: {id}}}: MaterialTopTabScreenProps<SetTabsParamList, 'SetDetails'>) {
  const set = useSet(id),
        [instructions, setInstructions] = useState(null),
        [downloadUrl, setDownloadUrl] = useState(''),
        [error, setError] = useState(false),
        api = useApi()
  useEffect(() => {
    api('getInstructions2', {setNumber: id})
      .then(response => {
        setInstructions(response?.instructions) // TODO: Fix typing
      })
      .catch(() => setError(true))
  }, [set])
  return <ScrollView style={{padding: 20}}>
    {set
      ? <RequireAPISupport>
        {error
          ? <Text>An error occured while loading instructions.</Text>
          : null
        }
        {(instructions && instructions.length == 0)
          ? <Text>No instructions found.</Text>
          : null
        }
        {instructions?.map((instruction, i: number) =>
          <Button
            key={i}
            disabled={instruction.URL === downloadUrl}
            onPress={() => {
              setDownloadUrl(instruction.URL)
              setTimeout(() => setDownloadUrl(''), 500)
            }}>
            {instruction.description}
          </Button>
        )}
        {downloadUrl
          ? <WebView style={{display: 'none'}} source={{uri: downloadUrl}} />
          : null
        }
      </RequireAPISupport>
      : <Text>Unable to find set number &quot;{id}&quot;</Text>
    }
  </ScrollView>
}
