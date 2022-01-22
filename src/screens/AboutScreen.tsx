import * as React from 'react'
import {StyleSheet, Linking, ScrollView} from 'react-native'
import {Button, Card, Paragraph} from 'react-native-paper'
import TextLink from '../components/TextLink'
import {version} from '../../package.json'

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <Card style={{marginBottom: 20}}>
        <Card.Title title="Project Overview" />
        <Card.Content>
          <Paragraph>
            This project is free, open source, and maintained by volunteers out of a love of all things LEGO®.{' '}
            If you&apos;d like to get involved in any way, check out this project&apos;s{' '}
            <TextLink url="https://github.com/JeromeDane/brick-tools-for-lego">
              GitHub page
            </TextLink>
            . Show your ❤️ for this project:
          </Paragraph>
          <Button style={{marginTop: 10}} mode="contained" icon="gift-outline"
            onPress={() => Linking.openURL('https://www.paypal.com/donate?hosted_button_id=LWSCPL34NZ6LJ')}>
              Make a donation
          </Button>
          <Paragraph style={{marginTop: 20}}>
            Version {version}
          </Paragraph>
          <Paragraph>
            Author:{' '}
            <TextLink url="https://www.linkedin.com/in/JeromeDane/">
              Jerome Dane
            </TextLink>
          </Paragraph>
          <Paragraph style={{marginTop: 20}}>
            Powered by data from{' '}
            <TextLink url="https://www.brickset.com/">Brickset.com</TextLink>
            {' '}and{' '}
            <TextLink url="https://www.rebrickable.com/">Rebrickable.com</TextLink>
          </Paragraph>
          <Paragraph style={{marginTop: 20, fontStyle: 'italic'}}>
            LEGO® is a trademark of the LEGO Group of companies which does not sponsor, authorize or endorse this project.
          </Paragraph>
        </Card.Content>
      </Card>
      <Card>
        <Card.Title title="Project Links" />
        <Card.Content>
          <Button icon="chart-gantt" onPress={() => Linking.openURL('https://github.com/JeromeDane/brick-tools-for-lego/issues?q=is%3Aopen+is%3Aissue+label%3Aenhancement')}>
            Planned features
          </Button>
          <Button icon="bug" onPress={() => Linking.openURL('https://github.com/JeromeDane/brick-tools-for-lego/issues?q=is%3Aopen+is%3Aissue+label%3Abug')}>
            Known bugs
          </Button>
          <Button icon="twitter" onPress={() => Linking.openURL('https://twitter.com/BrickTools4LEGO')}>
            @BrickTools4LEGO on Twitter
          </Button>
          <Button icon="reddit" onPress={() => Linking.openURL('https://www.reddit.com/r/BrickToolsForLEGO/')}>
            Reddit community: r/BrickToolsForLEGO/
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  linkText: {
    color: '#2e78b7'
  },
  paragraph: {
    marginBottom: 20,
    textAlign: 'center'
  }
})
