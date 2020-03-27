window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  AnswerCardCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "213d3rVkKFHLaiH2RxUhqwv", "AnswerCardCtrl");
    "use strict";
    cc.Class({
      extends: require("./CardBase"),
      properties: {
        contentLabel: cc.Label,
        content: {
          default: "",
          notify: function notify() {
            this.contentLabel.string = this.content;
          }
        }
      },
      init: function init(type, con) {
        this.ctype = type;
        this.content = con;
      }
    });
    cc._RF.pop();
  }, {
    "./CardBase": "CardBase"
  } ],
  CardBase: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "31aeaGI0IFBH7Lo2PWMExZX", "CardBase");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        ctype: -1
      }
    });
    cc._RF.pop();
  }, {} ],
  Game: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "29112Z6C4ZM5pLasAbq3c6d", "Game");
    "use strict";
    var questions = [ {
      url: "",
      answer: "hello"
    }, {
      url: "",
      answer: "world"
    }, {
      url: "",
      answer: "test"
    }, {
      url: "",
      answer: "aa"
    } ];
    var answers = [ "hello", "world", "test", "aa" ];
    var LineCtrl = require("./LineCtrl.js");
    var QuestionCardCtrl = require("./QuestionCardCtrl");
    var AnswerCardCtrl = require("./AnswerCardCtrl");
    cc.Class({
      extends: cc.Component,
      properties: {
        linePF: cc.Prefab,
        qCards: [ cc.Node ],
        aCards: [ cc.Node ]
      },
      start: function start() {
        this.canvas = cc.director.getScene().getChildByName("Canvas");
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchCancle, this);
        this.init();
      },
      init: function init() {
        for (var i = 0; i < this.qCards.length; i++) this.qCards[i].getComponent(QuestionCardCtrl).init(1, questions[i].url, questions[i].answer);
        for (var _i = 0; _i < this.aCards.length; _i++) this.aCards[_i].getComponent(AnswerCardCtrl).init(2, answers[_i]);
        this.startCard = null;
        this.lines = [];
      },
      test: function test() {
        var startNode = this.qCards[0];
        var startPos = startNode.getPosition();
        startPos.y -= startNode.height / 2;
        var endNode = this.aCards[2];
        var endPos = endNode.getPosition();
        endPos.y += endNode.height / 2;
        var line = cc.instantiate(this.linePF);
        line.parent = startNode.parent;
        var lineCtrl = line.getComponent(LineCtrl);
        lineCtrl.init(startPos, endPos);
      },
      touchStart: function touchStart(event) {
        var point = event.getLocation();
        var card = this._getTouchedCard(this.qCards.concat(this.aCards), point);
        this.startCard = card || null;
      },
      touchMove: function touchMove(event) {},
      touchEnd: function touchEnd(event) {
        var _this = this;
        var point = event.getLocation();
        var endCard = this._getTouchedCard(this.aCards.concat(this.qCards), point);
        if (this.startCard && endCard) {
          cc.log("\u5212\u7ebf\u5f00\u59cb");
          var startCardType = this.startCard.getComponent("CardBase").ctype;
          var endCardType = endCard.getComponent("CardBase").ctype;
          if (this.startCard == endCard || startCardType == endCardType) return;
          if (2 == startCardType) {
            var tmp = endCard;
            endCard = this.startCard;
            this.startCard = tmp;
          }
          if (this.startCard.line && cc.isValid(this.startCard.line, true)) {
            this._rmEleInArr(this.lines, this.startCard.line);
            this.startCard.line.destroy();
          }
          if (endCard.line && cc.isValid(endCard.line, true)) {
            this._rmEleInArr(this.lines, endCard.line);
            endCard.line.destroy();
          }
          var startPos = this.startCard.getPosition();
          startPos.y -= this.startCard.height / 2;
          var endPos = endCard.getPosition();
          endPos.y += endCard.height / 2;
          var line = cc.instantiate(this.linePF);
          line.parent = this.canvas;
          this.startCard.line = line;
          endCard.line = line;
          line.start = this.startCard;
          line.end = endCard;
          this.lines.push(line);
          var lineCtrl = line.getComponent(LineCtrl);
          lineCtrl.init(startPos, endPos);
          this.lines.length == this.qCards.length && this.scheduleOnce(function() {
            cc.log("\u8fde\u7ebf\u7ed3\u675f");
            var ret = _this.checkResult();
            cc.log("ret:", ret);
            cc.sys.isBrowser && alert(ret ? "\u6210\u529f" : "\u5931\u8d25");
          }, .5);
        }
      },
      _getTouchedCard: function _getTouchedCard(cards, touchPoint) {
        var point = this.canvas.convertToNodeSpaceAR(touchPoint);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = void 0;
        try {
          for (var _iterator = cards[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var card = _step.value;
            var rect = card.getBoundingBox();
            if (rect.contains(point)) return card;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            !_iteratorNormalCompletion && _iterator.return && _iterator.return();
          } finally {
            if (_didIteratorError) throw _iteratorError;
          }
        }
      },
      _rmEleInArr: function _rmEleInArr(arr, ele) {
        var index = arr.indexOf(ele);
        index >= 0 && arr.splice(index, 1);
        return arr;
      },
      touchCancle: function touchCancle(event) {},
      checkResult: function checkResult() {
        var ret = true;
        if (this.lines.length < this.qCards.length) ret = false; else {
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = void 0;
          try {
            for (var _iterator2 = this.lines[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var line = _step2.value;
              var question = line.start.getComponent(QuestionCardCtrl);
              var answer = line.end.getComponent(AnswerCardCtrl);
              if (question.answer != answer.content) {
                ret = false;
                break;
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              !_iteratorNormalCompletion2 && _iterator2.return && _iterator2.return();
            } finally {
              if (_didIteratorError2) throw _iteratorError2;
            }
          }
        }
        return ret;
      }
    });
    cc._RF.pop();
  }, {
    "./AnswerCardCtrl": "AnswerCardCtrl",
    "./LineCtrl.js": "LineCtrl.js",
    "./QuestionCardCtrl": "QuestionCardCtrl"
  } ],
  "LineCtrl.js": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3e89diF0BpABqQSbfC1bpbS", "LineCtrl.js");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      start: function start() {},
      init: function init(startPos, endPos) {
        var lineW = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 6;
        this.node.position = startPos;
        var p = endPos.sub(startPos);
        var len = p.mag();
        var pn = p.normalizeSelf();
        var origin = cc.v2(0, 1);
        var r = origin.signAngle(pn);
        var angle = cc.misc.radiansToDegrees(r);
        this.node.angle = angle - 180;
        this.node.height = len;
        this.node.width = lineW;
      }
    });
    cc._RF.pop();
  }, {} ],
  QuestionCardCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0c48d9ShadGy75oj/0FMrJ0", "QuestionCardCtrl");
    "use strict";
    cc.Class({
      extends: require("./CardBase"),
      properties: {
        url: {
          default: "",
          notify: function notify() {
            this.updateUI();
          }
        },
        answer: ""
      },
      init: function init(type, url, aw) {
        this.ctype = type;
        this.url = url;
        this.answer = aw;
      },
      updateUI: function updateUI() {}
    });
    cc._RF.pop();
  }, {
    "./CardBase": "CardBase"
  } ]
}, {}, [ "AnswerCardCtrl", "CardBase", "Game", "LineCtrl.js", "QuestionCardCtrl" ]);