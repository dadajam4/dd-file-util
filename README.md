# dd-file-util
Simple Log

It is a thing created to be used very privately.

## Installation

```
$ npm install dd-file-util
```

## How to use
```
const DDFileUtil = require('dd-file-util');

DDFileUtil.isExistFile('path/to/file');
```

## Api

### isExistFile
ファイルの存在確認

* **param** (`string`) - filepath.
* **return** (`boolean`) - result.

### isDir
ディレクトリであるかのチェック

* **param** (`string`) - filepath.
* **return** (`boolean`) - result.

### pathList
指定のパス直下のパス一覧を取得
type: 0 -> 全て, 1 -> ファイルのみ, 2 -> ディレクトリのみ

* **param** (`string`, `string`) - dirPath, type
* **return** (`Array`) - result.

### fileList
指定のパス直下のファイル一覧を取得

* **param** (`string`) - dirPath
* **return** (`Array`) - result.

### dirList
指定のパス直下のディレクトリ一覧を取得

* **param** (`string`) - dirPath
* **return** (`Array`) - result.
