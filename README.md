# 株式会社ゆめみ フロントエンドコーディング試験

株式会社ゆめみの[フロントエンドコーディング試験](https://notion.yumemi.co.jp/0e9ef27b55704d7882aab55cc86c999d)にて作成した都道府県別の総人口推移グラフを表示するwebアプリケーションです。

## 成果物
https://k-ishida-yumemi-coding-test.web.app/

## 導入ツール

|名前|備考|
|---|---|
|React|create-react-appを使用|
|TypeScript|-|
|Axios|API|
|Highcharts|グラフ|
|Jest|テスト create-react-appに同梱されていたもののみを使用|
|ESLint|静的解析|
|Prettier|コードフォーマット|
|EditorConfig|コーディングスタイルの指定|
|Firebase|Hosting|

## 環境
- Windows 10
- VSCode 1.75.0
- Node.js 18.12.1

## 環境構築

```
git clone https://github.com/ishida-0622/yumemi-coding-test
```

package.jsonがあるディレクトリで以下のコマンドを実行

```
npm install
```

srcディレクトリ直下に `.env` ファイルを作成し、API keyを設定

```
REACT-APP-API-KEY = "Your API key"
```

localhostを建てて実行

```
npm start
```

## アピールポイント
- APIの取得結果をキャッシュしているため二度目以降は取得処理が走らない
- 都道府県ごとに折れ線の色、形が固定

## 懸念点
- テストコードを書くのが初めてだったので、テストの手法が間違っているかもしれない
- axiosをモックする方法がよくわからなかったので、API関連のテストができていない
- 折れ線の追加・削除時に挙動がおかしかったのを回避するためにグラフのアニメーションを消した
- useMemoを使っているものの、依存配列に渡す値が配列やObjectなので恐らく意味がない
- useCallbackを使っているものの、関連するメモ化処理がないため意味がない
- [PR#13](https://github.com/ishida-0622/yumemi-coding-test/pull/13)のタイトルを英語にしてしまい、そのまま気づかずマージしてしまった
