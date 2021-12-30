import * as React from 'react';
import { StyleSheet, Linking, Button, ScrollView } from 'react-native';
import { Text, View } from '../components/Themed';
import TextLink from '../components/TextLink'
import {version} from '../package.json'
import { RootStackScreenProps } from '../navigation/types';

export default function AboutScreen({ navigation }: RootStackScreenProps<'About'>) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        This project is free, open source, and maintained by volunteers out of a love of all things LEGO®.{' '}
        If you'd like to get involved in any way, check out this project's{' '}
        <TextLink url="https://github.com/JeromeDane/brick-tools-for-lego">
          GitHub page
        </TextLink>.
      </Text>
      <TextLink style={styles.paragraph} url="https://github.com/JeromeDane/brick-tools-for-lego/issues?q=is%3Aopen+is%3Aissue+label%3Aenhancement">
        Planned features
      </TextLink>
      <TextLink style={styles.paragraph} url="https://github.com/JeromeDane/brick-tools-for-lego/issues?q=is%3Aopen+is%3Aissue+label%3Abug">
        Known bugs
      </TextLink>
      <TextLink style={styles.paragraph} url="https://twitter.com/BrickTools4LEGO">
        @BrickTools4LEGO on Twitter
      </TextLink>
      <TextLink style={styles.paragraph} url="https://www.reddit.com/r/BrickToolsForLEGO/">
        Reddit community: r/BrickToolsForLEGO/
      </TextLink>
      <Text style={styles.paragraph}>
        Show your ❤️ for this project:
      </Text>
      <View style={styles.paragraph}>
        <Button
          title="Make a donation"
          onPress={() => Linking.openURL('https://www.paypal.com/donate?hosted_button_id=LWSCPL34NZ6LJ')} />
      </View>
      <Text style={styles.paragraph}>
        Author:{' '}
        <TextLink url="https://www.linkedin.com/in/JeromeDane/">
          Jerome Dane
        </TextLink>
      </Text>
      <Text style={styles.paragraph}>Version {version}</Text>
      <Text style={styles.paragraph}>
        Powered by data from{' '}
        <TextLink url="https://www.brickset.com/">Brickset.com</TextLink>
        {' '}and{' '}
        <TextLink url="https://www.rebrickable.com/">Rebrickable.com</TextLink>
      </Text>
      <Text style={styles.paragraph}>LEGO® is a trademark of the LEGO Group of companies which does not sponsor, authorize or endorse this project.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  linkText: {
    color: '#2e78b7',
  },
  paragraph: {
    marginBottom: 20,
    textAlign: 'center'
  }
});
