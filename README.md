## <u>TodoDemoアプリ(フロントエンド)</u>

<br>

### 概要図
---

<img src="https://databucketyamaji.s3.us-east-2.amazonaws.com/images/frontend.png">

<br>

### サイトURL
---
https://yuichiroyamaji-todo.s3.ap-northeast-1.amazonaws.com/index.html

<br>

### 基本構成
---

|NO|項目|環境|ソフトウェア|
|--|--|--|--|
|1|静的ファイル|S3（静的Webサイトホスティング）|html, css|
|3|フロントプログラミング言語|S3（静的Webサイトホスティング）|Javascript|
|4|フロントフレームワーク|S3（静的Webサイトホスティング）|Vue.js v2.6.14|

<br>

### 利用AWSサービス
---

- CodePipeline (CodeCommit, CodeDeploy)
- S3

<br>

### リポジトリ
---

|項目|値|
|--|--|
|バージョン管理システム|Git|
|ソースコード管理ツール|GitHub|
|リポジトリURL|https://github.com/yuichiroyamaji/todo-frontend.git|
|ブランチ|main, develop|

<br>

### ディレクトリ構成
---

```
[プロジェクトルート]
  ├ assets/            ・・・ アセットファイル
  │  └ css/
  │  └ img/
  │  └ js/
  ├ index.html
  └ README.md
```

<br>

### ビルド/デプロイ
---

|利用サービス|内訳|動作|
|--|--|--|
|AWS CodePipeline|CodeCommit|リポジトリ<b>【deveop】</b>ブランチへのプッシュで起動|
||CodeDeploy|S3へソースを反映|