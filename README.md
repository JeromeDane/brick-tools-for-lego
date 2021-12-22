# Brick Tools for LEGO®

This project is free, open source, and maintained by volunteers out of a love of all things LEGO®.

**[Web-based version](https://jeromedane.github.io/brick-tools-for-lego/)**

Show your ❤️ and support for this project and help keep it alive by [making a donation](https://www.paypal.com/donate?hosted_button_id=LWSCPL34NZ6LJ)

LEGO® is a trademark of the LEGO Group of companies which does not sponsor, authorize or endorse this content.

## Development

### Android

You must have Java SDK 8 installed.

Your signing key file should be in `android/app/[key_name].keystore`. Put your signing key credentials in `~/.gradle/gradle.properties` as follows:

```
signingKey=[key_name].keystore
signingKeyPassword=[key_password]
signingKeyAlias=[key_alias_name]
signingKeyAliasPassword=[key_alias_password]
```

To build the file, cd into `android`, and run `[key_alias_name]`
