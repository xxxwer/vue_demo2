'use strict';

import myConfig from '@/config/config.js'

let myAjax = {
  base: function(ajaxParam) {
    let baseArguments = {}
    baseArguments.complete = function(jqXHR, textStatus) {
      // console.log(jqXHR)
      // console.log(textStatus)
    }

    if (ajaxParam.complete && typeof ajaxParam.complete === 'function') {
      ajaxParam.complete = function(jqXHR, textStatus) {
        baseArguments.complete(jqXHR, textStatus)
        ajaxParam.complete(jqXHR, textStatus)
      }
    } else {
      ajaxParam.complete = baseArguments.complete
    }

    $.ajax(ajaxParam);
  },

  getRankingData: function(callback, page){
    let ajaxParam = {
      url: myConfig.indexUrl + '?page=' + page,
      success: function(result){
        callback(result)
      },
      type: 'POST'
    }
    this.base(ajaxParam)
  },

  getKeywordDetail: function(callback, id){
    let ajaxParam = {
      url: myConfig.detailUrl + '?id_keyword=' + id,
      success: function(result){
        callback(result)
      },
      type: 'POST'
    }
    this.base(ajaxParam)
  },

  searchKeyword: function(callback, keyword){
    let ajaxParam = {
      url: myConfig.searchUrl + '?keyword=' + keyword,
      success: function(result){
        callback(result)
      },
      type: 'POST'
    }
    this.base(ajaxParam)
  }
}

export default myAjax;
