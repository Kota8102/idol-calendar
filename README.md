# idol-calendar

![Alt text](./document/images/image.png)

![Amazon AWS](https://img.shields.io/badge/-Amazon%20AWS-232F3E.svg?logo=amazon-aws&style=flat)
![vscode](https://img.shields.io/badge/-Visual%20Studio%20Code-007ACC.svg?logo=visual-studio-code&style=flat)
![React](https://img.shields.io/badge/-React-555.svg?logo=react&style=flat)
![TypeScript](https://img.shields.io/badge/-TypeScript-007ACC.svg?logo=typescript&style=flat)
![ESLint](https://img.shields.io/badge/-ESLint-4B32C3.svg?logo=eslint&style=flat)
![Prettier](https://img.shields.io/badge/-Prettier-1A2B34.svg?logo=prettier&style=flat)
![Yarn](https://img.shields.io/badge/-Yarn-2C8EBB.svg?logo=yarn&style=flat)
![GitHub](https://img.shields.io/badge/-GitHub-181717.svg?logo=github&style=flat)

このプロジェクトは、アイドルのライブ情報をまとめたカレンダーを作成することを目的としています。

## インストール

vscode + devcontainer を用いて開発を行うことを想定しています。

## 使い方

### フロントエンド

以下を用いて開発サーバーを起動することができます。

```bash
yarn dev
```

### バックエンド

Serverless Frameworkの使い方について

#### Serverless Frameworkのプラグインのインストール方法

以下のコマンドを実行することで、Pythonの外部ライブラリを利用することができる

```bash
serverless plugin install -n serverless-python-requirements
```

#### Serverless Frameworkのサービスの作成方法

以下のコマンドを実行する

```bash
sls create --template aws-python3 --path ディレクトリ名
```

Pythonの外部ライブラリを利用する場合は、以下のコマンドを実行する

```bash
serverless plugin install -n serverless-python-requirements
```

## 環境

- node v20.10.0
- yarn v1.22.19
- next v14.0.4
- react v18
- typescript v5
- eslint v8.0.1
- prettier v3.1.1

## インフラ

インフラは以下のように構成されています。

![インフラ](./document/images/アーキテクチャ図.drawio.svg)



## デプロイ

### フロントエンド


### バックエンド

0. 外部モジュールを利用する場合は、requirements.txtを作成する
    
```bash
pip freeze > requirements.txt
```

1. dev環境へとデプロイする

```bash
sls deploy --stage dev
```

2. デプロイしたものをテストを行う(以下はlambda関数のテストを行う場合)

```bash
sls invoke --stage dev -f hello
```

3. 問題なれば、dev環境を削除する

```bash
sls remove --stage dev
```

4. prod環境へとデプロイする

```bash
sls deploy --stage prod
```

## Note

### バックエンド

#### デプロイ時にエラーが発生した場合の対処法

`--verbose`オプションをつけることで、詳細なエラーが表示される

```bash
sls deploy --stage dev --verbose```