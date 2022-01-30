---
title: Tech Spec 
slug: tech_spec
toc:
  - name: Introduction
    slug: main 
  - name: Collectables 
    slug: collectables 
    children:
      - name: Primals
        slug: /collectables/primals 
      - name: Non-Primals 
        slug: /collectables/non_primals
      - name: Rarity 
        slug: /collectables/rarity
  - name: Classes 
    slug: classes 
  - name: Markets 
    slug: markets 
  - name: Tech Spec 
    slug: tech_spec
previous: 
   name: Markets 
   slug: markets
---

# Technical Spec
The technical Specs of the NFTs.

## Networks and Contracts
Tokyo.Cards is avaliable on __Ethereum__, __Polygon__ and __Binance Smart Chain__, with the following addresses.

```
- Ethereum (1155): 0xf8ceca438577a00b415b1d4b412a910bf2e41bea
- Ethereum (721) (Adam.jp): 0xb30fC2D754C88c451275b743b6F530F19f643683
- Polygon (1155): 0xd4702deF69eA0083Ab9949b87708Ce0f4357bE1b
- Binance Smart Chain (1155): 0x364BDdcc00B10e8526998F2B81cFC8Db62bE671a
```
## Why is there a contract deployed by adam.jp ?
Adam.jp, has it's own smart contract. Actually, all NFTs that are sold on Adam.jp shares the same ERC721 Smart Contract Address. Meanwhile, the team is working on a way to convert the ERC721 contract to the ERC1155.

## Cross Chain Transactions (Implementing)
The team is also working on a bridge at [Connext](https://connext.network/).
Most of our transactions exists on Polygon simply because of it's more cheaper than the Ethereum Mainnet.
And in the future, we are looking at Solana and EVM compatible Polkadot Sidechains.
