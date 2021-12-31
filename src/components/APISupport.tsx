import React from 'react'
import {Platform, View} from 'react-native'
import TextLink from './TextLink'
import {Text} from './Themed'

const RequireAPISupport = ({children}: {children: JSX.Element[] | JSX.Element}) => {
  return <View>
    {Platform.OS === 'web'
      ? <Text>
        Unfortunately API calls to sites like{' '}
        <TextLink url="https://www.brickset.com">Brickset</TextLink>
        {' '}and{' '}
        <TextLink url="https://www.rebrickable.com">Rebrickable</TextLink>{' '}
        do not work on the web platform at this time. Why not try the{' '}
        <TextLink url="https://github.com/JeromeDane/brick-tools-for-lego#platforms--installation">
          Android version
        </TextLink>{' '}
        instead?
      </Text>
      : children
    }
  </View>
}

export default RequireAPISupport
