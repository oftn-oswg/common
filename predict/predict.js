/*********
  * Usage
  ** 
  *  Predictable text
  *  ``
  *  var predict = new Predict();
  *  predict.insertAll([
  *    'john', 'kelly', 'bobby', 
  *    'kevin', 'larry', 'bob', 
  *    'bill', 'stuart', 'jon'
  *  ]);
  * 
  *  predict.findAll('b')
  *    -> ['bill', 'bob', 'bobby']
  *  predict.findAll('jo')
  *    -> ['jon', 'john']
  *  predict.findAll('bob')
  *    -> ['bobby']
  *  ``
 **/

var namespace = (typeof window == 'undefined') ? {} : window;
;(function(global, undefined) {

  Array.prototype.valueOf = function(value) {
    var index = -1;
    this.forEach(function(t, i) {
      if (t === value) {
        index = i;
      }
    });
    return index;
  };

  var Predict = function() {
  };

  Predict.prototype = (function() {
    /**
     * Private
     **/
     var tree  = {},
         dict  = [];

    /**
     * Public
     **/

    return {
      Constructor: Predict,

      insert: function(string) {
        var i      = 0,
            parent = tree,
            n      = string.length;
        dict.push(string);
        while (i < n) {
          if (string[i] in parent) {
            parent = parent[string[i++]];
          } else {
            break;
          }
        }
        while (i < n) {
          parent[string[i]] = {};
          parent[string[i]].value = string.substr(0, i+1);
          parent = parent[string[i++]];
        }
      },

      insertAll: function(list) {
        list.forEach(function(e) {
          Predict.prototype.insert(e);
        });
      },
 
      find: function(string) {
        var prefix = tree;
        for (i in string) {
          if (string[i] in prefix === false) {
            return {};
          } else {
            prefix = prefix[string[i]];
          }
        }
        return prefix;
      },

      findAll: function(string) {
        var parent = Predict.prototype.find(string),
            ret    = [],
            stack  = [];
        if (Object.keys(parent).length >= 2) {
          while(1) {
            for(leaf in parent)  {
              if (leaf !== 'value') {
                stack.push(parent[leaf]);
                if (Object.keys(parent[leaf]).length < 2 
                ||  dict.valueOf(parent[leaf].value) !== -1) {
                  ret.push(parent[leaf].value);
                }
              }
            }
            if (stack.length >= 1) {
              parent = stack.pop();
            } else {
              break;
            }
          }
        }
        return ret;
      }
    };
  })();

  global.Predict = Predict;

})(namespace);

if (typeof exports !== 'undefined') {
  exports.Predict = namespace.Predict;
  return exports;
}
