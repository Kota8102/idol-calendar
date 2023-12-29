# idol_schedule

[![Build React on S3](https://github.com/Kota8102/idol_schedule/actions/workflows/main.yml/badge.svg)](https://github.com/Kota8102/idol_schedule/actions/workflows/main.yml)

以下にサイトがあります
[idol calendar](https://idolcalendar.info/)

# overview

地下アイドルのライブ情報をまとめたサイトです。

フロントエンドは、React + TypeScript + Tailwind CSS を用て実装しています。
バックエンドは、AWS を用いたサーバーレス構成を採用しています。

## Production Build

本番環境用のビルドを作成するには、以下のコマンドを実行します。

```bash
npm install
npm start
```

ビルドされたファイルは、build ディレクトリに出力されます。これらのファイルをデプロイして使用してください。

## Development

本プロジェクトは、GitHub Actions を用いて AWS S3 に自動デプロイされます。デプロイされたサイトは、AWS CloudFront を介して配信されます。

デプロイする際は、以下の環境変数を設定してください。

-   AWS_ACCESS_KEY_ID
-   AWS_SECRET_ACCESS_KEY
-   AWS_REGION
-   S3_BUCKET_NAME
-   CLOUDFRONT_DISTRIBUTION_ID

## Support

もし問題や質問があれば、GitHub の issue で報告してください。また、プロジェクトに関する議論や提案なども大歓迎です。

## Author

-   Kota8102 (@Kota8102)
