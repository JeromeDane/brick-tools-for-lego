# Brick Tools for LEGO®

**This project is currently in ALPHA.** It's still slow, buggy, and unpolished, but we love feedback if you'd like to give it a try!

Brick Tools for LEGO® is free, open source, and maintained by volunteers out of a love of all things LEGO®. It integrates with your [Brickset](https://www.brickset.com) account (and soon [Rebrickable](https://www.rebrickable.com)) to let you track your collection, mark sets as wanted, and much more!

LEGO® is a trademark of the LEGO Group of companies which does not sponsor, authorize or endorse this project.

Show your ❤️ and support for this project and help keep it alive by [making a donation](https://www.paypal.com/donate?hosted_button_id=LWSCPL34NZ6LJ).

Follow the project [on Twitter](https://twitter.com/BrickTools4LEGO) for updates/announcements, or join the Reddit community at [r/BrickToolsForLEGO/](https://www.reddit.com/r/BrickToolsForLEGO/).

## Features


* Full database of LEGO sets and parts (powered by [Brickset](https://www.brickset.com) and [Rebrickable](https://www.rebrickable.com))
* Filter and sort sets by name, year, collection status, and more!
* Sortable parts lists for each set (powered by [Rebrickable](https://www.rebrickable.com))
* Download PDF instructions (powered by [Brickset](https://www.brickset.com))
* Connect to your [Brickset](https://www.brickset.com) account and import your collection and wanted sets
* Mark sets as wanted or quantity owned, automatically syncing to your [Brickset](https://www.brickset.com) account

See also our [planned features](https://github.com/JeromeDane/brick-tools-for-lego/issues?q=is%3Aopen+is%3Aissue+label%3Aenhancement).
## Platforms & Installation

This project is written in [React Native](https://reactnative.dev/) in order to support:

* **Android** - This is the main and most updated/tested version. See [releases page](https://github.com/JeromeDane/brick-tools-for-lego/releases) to download and manually install an alpha preview APK file). Play Protect may warn you about not recognizing the author. This is because a Play Store account hasn't been created yet that would recognize our signing key.
* **iOS** (planned ... eventually)
* **[Web](https://jeromedane.github.io/brick-tools-for-lego/)** - Currently buggy, unstable, and lacking support for API calls to [Brickset](https://www.brickset.com) or [Rebrickable](https://www.rebrickable.com). We need a way around the CORS issue for API calls without having to have its own back-end, _or_ someone needs to pay for hosting and write a small back-end to do the proxying of API calls. The JavaScript bundle download is also insanely large and up front the way things are currently written.

## Development & Contributing Code

This project is open source, and we love contributors! Want to help add a feature, fix a bug, or generally clean up code? You can do so through pull requests following these guidelines:

* Write good commit messages! 🙏 If you want some tips, check out [this article](https://chris.beams.io/posts/git-commit/).
* All commits should be atomic (small), do one thing, and pass all tests (as soon as we've implemented them 🙈).
* Follow code style guidelines for this project. You can run `yarn lint` to check your code style.
* The most important software design principles for this project are [KISS](https://en.wikipedia.org/wiki/KISS_principle) and [YAGNI](https://martinfowler.com/bliki/Yagni.html). Remember that every line of code you write is a landmine for someone else to trip over later, even if that other person is future you. 😬
* Avoid over-abstraction! If you find yourself creating "services", "engines", or "factories" you've gone too far. 🤦
* Be explicit. Name things for what they are or what they do with enough words to do so clearly.
* Don't use acronyms or abbreviations in your code. They just create ambiguity and the compiler will shorten everything anyway, 🤖 so be clear for the humans!
* Co-locate code, organizing things by component or where they are used, not what type of file or abstraction they are. This makes it easy to find things that go together, and most importantly makes it easier to avoid dead code when deleting features we no longer want.

_Disclaimer: The code so far was written quickly, and things are not necessarily as clean or well organized as they could/should be. For There are only so many hours in the day, and we need to go back and clean things up. For starters, we need to add testing, and there are currently [linting errors](https://github.com/JeromeDane/brick-tools-for-lego/issues/33). Don't let existing bad examples keep you from doing better or leaving things better than you found them!_

### Development Prerequisites

This project has been developed using a Mac, so any *nix flavor of operating system should work fine for you. We've tried using Linux Subsystem for Windows, but ran into issues with having to tunnel ADB connections, and building release versions seems to be a nightmare.

You'll need to install the following to get started:

* [Node](https://nodejs.dev/). We've tested everything using v16.4.0, but you're welcome to try other versions and let us know how it goes. [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm) is your friend. 😏
* This project uses [yarn](https://classic.yarnpkg.com/lang/en/) over `npm`, so please stick with that for consistency.  We've got everything tested and working with v1.22.17, but feel free to try newer versions and let us know how it goes.
* Run `yarn install` in the root of the project to download dependencies.
* You will need a [Brickset API Key](https://brickset.com/tools/webservices/requestkey) for development purposes. It should be set as an environment variable.

### Data

There are `json` files in this repository with set and part data from [Brickset](https://www.brickset.com) and [Rebrickable](https://www.rebrickable.com), but it should not be used elsewhere. Both sites provide APIs to get this information, but we gather it at build time to keep a separate copy for this project in order to avoid hammering either site. This data is tracked with the rest of the source code to be able to see when the data was updated and how.

To download the latest data from [Brickset](https://www.brickset.com) and [Rebrickable](https://www.rebrickable.com) run `yarn cli --updateData`.
### Android

This is the main and most updated/tested version. See [releases page](https://github.com/JeromeDane/brick-tools-for-lego/releases) to download and manually install an alpha preview APK file). Play Protect may warn you about not recognizing the author. This is because a Play Store account hasn't been created yet that would recognize our signing key.
#### Android Specific Prerequisites

* Java SDK 8 (for Android development)
* Android Studio / command line tools
* Android SDK 29

#### Running Development Mode for Android

Make sure you have an Android device connected to your computer with ADB debugging enabled, or a virtual Android device running on your machine and run `yarn android`.

#### Building a Release for Android

Your signing key file should be in `android/app/[key_name].keystore`. Put your signing key credentials in `~/.gradle/gradle.properties` as follows:

```
signingKey=[key_name].keystore
signingKeyPassword=[key_password]
signingKeyAlias=[key_alias_name]
signingKeyAliasPassword=[key_alias_password]
```

To build an bundle suitable for uploading to the Google Play Store run `yarn build:playstore` which will be in `android/app/build/outputs/bundle/release`. To build a universal `APK` for direct installation to an Android device or uploading to a 3rd party app store run `yarn build:apk`, which will output to `android/app/build/outputs/apk/`.

### iOS

iOS development hasn't begun in earnest, but it's certainly supported given the nature of [React Native](https://reactnative.dev/). If you're willing to give it a shot create a PR with updated instructions. We'd love the help!

### Web

There is _technically_ a web version, but it's not the primary target for right now. You can launch it in development using `yarn web`. There are some issues:

* The JavaScript bundle that needs to be downloaded up front is _massive_, resulting in a long loading time. This could be mitigated with lazy loading or a proper back-end but that's a lot of work to go through for now, so it hasn't been a priority, and whatever we do needs to maintain support for native Android and iOS.
* The [Brickset](https://www.brickset.com) and [Rebrickable](https://www.rebrickable.com) APIs don't currently support cross-origin calls (CORS), so we'd need a back-end to proxy the requests. For now