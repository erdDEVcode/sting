<p align="center">
  <img width="250" height="250" src="https://raw.githubusercontent.com/erdDEVcode/sting/assets/logo.png">
</p>

# Sting

[![Join our community](https://img.shields.io/badge/discord-join%20chat-738bd7.svg)](https://discord.gg/v9PDKRN)
[![Follow on Twitter](https://img.shields.io/twitter/url/http/shields.io.svg?style=social&label=Follow&maxAge=2592000)](https://twitter.com/erd_dev)

Cross-browser wallet for the [Elrond](https://elrond.com) blockchain.

Features:
* Unified balance view (staking/delegation + wallet).
* Send transactions, with full gas customization.
* Import wallet via seed/mnemonic, JSON/PEM file, Ledger nano.
* Switch between networks (currently supported: mainnet, testnet).

## Developer guide

_Note: Instructions are for OS X_.

Install all pre-requisites:

```shell
yarn
```

To run in dev mode:

```shell
yarn dev
```

To build:

```shell
yarn build
```

To deploy:

```
NOW_TOKEN=... yarn deploy
```

Automatic deploy: `git push` to master and Vercel will auto-deploy the site.

## License

AGPLv3

## Why "Sting"?

According to the [LOTR wiki](https://lotr.fandom.com/wiki/Sting), Sting was an _"ancient Elvish blade made by weapon-smiths in Gondolin"_. It was carried by
some of the main characters in the story.
