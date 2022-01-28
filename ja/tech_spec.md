---
title: 技術仕様
slug: tech_spec
toc:
  - name: 初めに 
    slug: main 
  - name: コレクション 
    slug: collectables 
  - name: 職業クラス 
    slug: classes 
  - name: マーケット 
    slug: markets 
  - name: 技術仕様 
    slug: tech_spec 
previous: 
   name: マーケット 
   slug: markets
---

# 技術仕様
NFTの技術仕様をご紹介いたします。

## ブロックチェインネットワークとコントラクト
Tokyo.Cards は下記のアドレスにて __Ethereum__ ・ __Polygon__ ・ __Binance Smart Chain__ といったブロックチェインに存在しています。

```
- Ethereum (1155): 0xf8ceca438577a00b415b1d4b412a910bf2e41bea
- Ethereum (721) (Adam.jp): 0xb30fC2D754C88c451275b743b6F530F19f643683
- Polygon (1155): 0xd4702deF69eA0083Ab9949b87708Ce0f4357bE1b
- Binance Smart Chain (1155): 0x364BDdcc00B10e8526998F2B81cFC8Db62bE671a
```
## なぜadam.jpがデプロイしたコントラクトが存在しているでしょうか？
Adam.jpは独自のスマートコントラクトが存在しています。

実際、すべてAdam.jpに販売されるNFTはERC721スマートコントラクトのアドレスを共有しています。

現在、ERC721コントラクトをERC1155コントラクトに変換する方法を開発しております。

## ブロックチェイン跨ぎトランセクション（開発中）
[Connext](https://connext.network/)でのブリッジも開発しております。

Tokyo.Cardsでは、Polygonネットワークの取引コストがEthereum Mainnetより低く決済できることから、主にPolygonネットワークで行うことといたしました。

今後、SolanaネットワークやEVM対応Polkadotサイドチェインのソリューション活用も視野に入れます。
