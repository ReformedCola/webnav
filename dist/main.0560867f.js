// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $('.siteList');
var $lastLi = $siteList.find('li.last');
var x = localStorage.getItem('x');
var xObject = JSON.parse(x);
var hashMap = xObject || [{
  logo: 'A',
  url: 'https://www.acfun.cn'
}, {
  logo: 'B',
  url: 'https://www.bilibili.com'
}];
var colors = ['rgb(61, 192, 176)', 'rgb(175, 61, 78)', 'rgb(162, 104, 54)', 'rgb(91, 161, 80)', 'rgb(230, 79, 82)', 'rgb(0, 188, 212)', 'rgb(96, 125, 139)', 'rgb(132, 92, 78)', 'rgb(225, 116, 33)',
/*------------------*/
'rgb(72, 85, 100)', 'rgb(78, 169, 219)', 'rgb(137, 48, 61)', 'rgb(48, 63, 159)', 'rgb(69, 90, 100)'];

var simplifyUrl = function simplifyUrl(url) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, ''); // remove everything after '/'
};

var logoList = function logoList(e) {
  return 'https://www.' + e + '/favicon.ico';
};

var magicColor = function magicColor() {
  color = colors[Math.floor(Math.random() * colors.length)];

  if (color === 'rgb(72, 85, 100)' || color === 'rgb(78, 169, 219)' || color === 'rgb(137, 48, 61)' || color === 'rgb(48, 63, 159)' || color === 'rgb(69, 90, 100)') {
    $('body').css("background", color);
    $('.snowflake').css("background", 'white');
    $('.siteList').css("color", 'white');
    $('.icon2').css("fill", 'white');
    $('.magicText').css("color", 'white');
    $('.searchButton').css("background", 'white');
    $('.searchButton').css("color", color);
  } else {
    $('body').css("background", 'white');
    $('.snowflake').css("background", color);
    $('.siteList').css("color", color);
    $('.icon2').css("fill", color);
    $('.magicText').css("color", color);
    $('.searchButton').css("background", color);
    $('.searchButton').css("color", 'white');
  }
};

magicColor(); // <div class="logo">${node.logo}</div>

var render = function render() {
  $siteList.find('li:not(.last)').remove();
  hashMap.forEach(function (node, index) {
    node.logo = logoList(simplifyUrl(node.url));
    var $li = $("<li>\n      <div class=\"site\">\n         <div class=\"logo\">\n            <img class=\"fav\" src=\"".concat(node.logo, "\" alt=\"\" width=\"50%\" height=\"50%\">\n          </div> \n        <div class=\"link\">").concat(simplifyUrl(node.url), "</div>\n        <div class=\"close\">\n          <svg class=\"icon\" aria-hidden=\"true\">\n            <use xlink:href=\"#icon-close\"></use>\n          </svg>\n         </div>\n      </div>\n     </li>")).insertBefore($lastLi);
    $li.on('click', function () {
      window.open(node.url);
    });
    $li.on('click', '.close', function (e) {
      e.stopPropagation(); // to stop opening the website while clicking on the 'x'

      console.log(hashMap);
      hashMap.splice(index, 1);
      render();
    });
  });
};

render();
$('.magicButton').on('click', function () {
  magicColor();
  render();
});
$('.addButton').on("click", function () {
  var url = window.prompt('Which website would you like to add?');

  if (url.indexOf('http') !== 0) {
    url = 'https://' + url;
  }

  console.log(url);
  hashMap.push({
    logo: simplifyUrl(url)[0],
    //simplifyUrl(url)[0]
    logoType: 'text',
    url: url
  });
  render();
});

window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap);
  localStorage.setItem('x', string);
};

$(document).on('keypress', function (e) {
  var key = e.key; // const key = e.key

  for (var i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.0560867f.js.map