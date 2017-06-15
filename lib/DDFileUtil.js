'use strict';



// modules
const fs   = require('fs');
const path = require('path');



class DDFileUtil {



  /**
   * ファイルの存在確認
   * @return boolean
   */
  static isExistFile(file) {
    try {
      fs.statSync(file);
      return true
    } catch(err) {
      if(err.code === 'ENOENT') return false
    }
  }



  /**
   * ディレクトリであるかのチェック
   * @return boolean
   */
  static isDir(filePath) {
    return fs.existsSync(filePath) && fs.statSync(filePath).isDirectory();
  }



  /**
   * 指定のパス直下のパス一覧を取得
   * type: 0 -> 全て, 1 -> ファイルのみ, 2 -> ディレクトリのみ
   * @return array
   */
  static pathList(dirPath, type) {
    type = type === undefined ? 0 : type;

    try {
      let list = fs.readdirSync(dirPath);
      list = list.filter((file) => {
        let filePath = path.join(dirPath, file);
        if (type === 1) {
          return !DDFileUtil.isDir(filePath);
        } else if (type === 2) {
          return DDFileUtil.isDir(filePath);
        }
        return true;
      });
      return list;
    } catch (e) {
      console.error(e);
      return null;
    }
  }



  /**
   * 指定のパス直下のファイル一覧を取得
   * @return array
   */
  static fileList(dirPath) {
    return DDFileUtil.pathList(dirPath, 1);
  }



  /**
   * 指定のパス直下のディレクトリ一覧を取得
   * @return array
   */
  static dirList(dirPath) {
    return DDFileUtil.pathList(dirPath, 2);
  }



  /**
   * 指定のディレクトリ直下の全てのパス一覧を規定のオブジェクト形式のリストで取得（再帰）
   * @return array[{dir: ディレクトリ, filename: ファイル名, filepath: パス},...]
   */
  static getPathList(dir, re, list = []) {
    fs.readdirSync(dir).forEach(function(filename) {
      let stat = fs.statSync(path.join(dir, filename));
      if (stat.isFile() && filename.match(re)) {
        list.push({dir: dir, filename: filename, filepath: path.join(dir, filename)});
      } else if (stat.isDirectory()) {
        DDFileUtil.getPathList(path.join(dir, filename), re, list);
      }
    });
    return list;
  }
}



module.exports = DDFileUtil;
