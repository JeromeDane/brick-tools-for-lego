import React, {useState} from 'react';
import { StyleSheet, Linking, Button, ScrollView } from 'react-native';
import { Text, TextInput, View } from '../components/Themed';
import Spinner from '../components/Spinner'
import { RootStackScreenProps } from '../navigation/types';
import { useCollection, useIsLoggedIn, useLoadCollection, useLogin, useLogOut } from '../api/brickset';
import TextLink from '../components/TextLink';

export default function SettingsScreen({ navigation }: RootStackScreenProps<'Settings'>) {
  const [isLoading, setIsLoading] = useState(false),
        [username, setUsername] = useState(''),
        [password, setPassword] = useState(''),
        [loadingMessage, setLoadingMessage] = useState(''),
        collection = useCollection(),
        login = useLogin(),
        logOut = useLogOut(),
        isLoggedIn = useIsLoggedIn(),
        loadCollection = useLoadCollection()
  return (
    <ScrollView style={{padding: 20}}>
      <Spinner visible={Boolean(loadingMessage)} textContent={loadingMessage} />
      <Text style={styles.heading}>Brickset</Text>
      {isLoggedIn
        ? <View>
          <Text style={{marginBottom: 10}}>
            Found {Object.keys(collection || {}).length.toLocaleString()} sets you have tracked on Brickset.
          </Text>
          <View style={{marginBottom: 20}}>
            <Button
              title="Import my collection from Brickset" onPress={() => {
                setLoadingMessage('Importing collection from Brickset ...')
                loadCollection()
                  .then(() => setLoadingMessage(''))
                  .catch(() => setLoadingMessage(''))
              }}/>
          </View>
          <Button title="Log out" onPress={() => {
            setLoadingMessage('Logging out from Brickset ...')
            logOut()
              .then(() => setLoadingMessage(''))
              .catch(() => setLoadingMessage(''))
          }} />
        </View>
        : <View>
          <Text style={{marginBottom: 10}}>
            Log into your{' '}
            <TextLink url="https://www.brickset.com">Brickset.com</TextLink>{' '}
            account to access your personal data. If you don't already have one, you'll need to{' '}
            <TextLink url="https://brickset.com/signup">create an account</TextLink>.
          </Text>
          <TextInput label="username" onChangeText={setUsername} style={{marginBottom: 10}} />
          <TextInput label="password" secureTextEntry={true} onChangeText={setPassword} style={{marginBottom: 10}} />
          <Button disabled={isLoading} title="Login" onPress={() => {
            setLoadingMessage('Logging in to Brickset ...')
            login(username, password)
              .then(() => setLoadingMessage(''))
              .catch(() => setLoadingMessage(''))
          }}/>
        </View>
        }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  linkText: {
    color: '#2e78b7',
  },
  heading: {
    marginBottom: 20,
    fontWeight: 'bold'
  }
});
