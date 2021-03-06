# DEPRECATED - Sting is now deprecated and no longer maintained. Please use the [official Elrond wallet](https://wallet.elrond.com) instead.

[![Join the community](https://img.shields.io/badge/Chat%20on-Telegram-brightgreen.svg?color=0088cc)](https://t.me/erdDEV)
[![Follow on Twitter](https://img.shields.io/twitter/url/http/shields.io.svg?style=social&label=Follow&maxAge=2592000)](https://twitter.com/erd_dev)

Cross-browser web wallet for the [Elrond](https://elrond.com) blockchain.

Features:
* Unified balance view (staking/delegation + wallet).
* Send transactions, with full gas customization.
* Import wallet via seed/mnemonic, JSON/PEM file, Ledger nano.
* Switch between networks (currently supported: mainnet, testnet).

## Developer guide

_Note: Instructions are for OS X_.

Install all pre-requisites:

```shell
npm install
```

To run in dev mode:

```shell
npm run dev
```

To build:

```shell
npm run build
```

To deploy:

```
NOW_TOKEN=... npm run deploy
```

Automatic deploy: `git push` to master and Vercel will auto-deploy the site.

## License

AGPLv3

## Why "Sting"?

According to the [LOTR wiki](https://lotr.fandom.com/wiki/Sting), Sting was an _"ancient Elvish blade made by weapon-smiths in Gondolin"_. It was carried by
some of the main characters in the story.
