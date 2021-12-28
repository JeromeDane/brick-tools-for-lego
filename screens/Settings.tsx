import React, {useState} from 'react';
import { StyleSheet, Linking, Button, ScrollView } from 'react-native';
import { Text, TextInput, View } from '../components/Themed';
import { RootStackScreenProps } from '../navigation/types';
import { useApi } from '../api/brickset';

export default function SettingsScreen({ navigation }: RootStackScreenProps<'Settings'>) {
  const [isLoading, setIsLoading] = useState(false),
        [username, setUsername] = useState(''),
        [password, setPassword] = useState(''),
        {api, collection, login, logOut, loadCollection, isLoggedIn} = useApi()
  return (
    <ScrollView style={{padding: 20}}>
      <Text style={styles.heading}>Brickset</Text>
      {isLoggedIn
        ? <View>
          <Text style={{marginBottom: 10}}>
            Found {Object.keys(collection || {}).length.toLocaleString()} sets in your Brickset collection.
          </Text>
          <View style={{marginBottom: 20}}>
            <Button
              disabled={isLoading}
              title={isLoading ? 'loading ...' : 'Reload Collection'} onPress={() => {
              setIsLoading(true)
              loadCollection()
                .then(() => setIsLoading(false))
                .catch(() => setIsLoading(false))
            }}/>
          </View>
          <Button title="Log out" onPress={logOut} />
        </View>
        : <View>
          <Text style={{marginBottom: 10}}>
            Log into your{' '}
            <Text onPress={() => Linking.openURL('https://www.brickset.com')} style={{color: 'blue'}}>Brickset.com</Text>{' '}
            account to access your personal data.
          </Text>
          <TextInput label="username" onChangeText={setUsername} style={{marginBottom: 10}} />
          <TextInput label="password" secureTextEntry={true} onChangeText={setPassword} style={{marginBottom: 10}} />
          <Button disabled={isLoading} title={isLoading ? 'loading ...' : 'Login'} onPress={() => {
            setIsLoading(true)
            login(username, password)
              .then(() => setIsLoading(false))
              .catch(() => setIsLoading(false))
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
