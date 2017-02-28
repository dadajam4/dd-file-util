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
}



module.exports = DDFileUtil;
