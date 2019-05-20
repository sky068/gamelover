require=function n(e,o,a){function c(i,t){if(!o[i]){if(!e[i]){var s="function"==typeof require&&require;if(!t&&s)return s(i,!0);if(p)return p(i,!0);var r=new Error("Cannot find module '"+i+"'");throw r.code="MODULE_NOT_FOUND",r}var h=o[i]={exports:{}};e[i][0].call(h.exports,function(t){return c(e[i][1][t]||t)},h,h.exports,n,e,o,a)}return o[i].exports}for(var p="function"==typeof require&&require,t=0;t<a.length;t++)c(a[t]);return c}({AStar:[function(t,i,s){"use strict";cc._RF.push(i,"449a1KCWrdH6YYLX3+nNJ6t","AStar");var h=cc.Class({ctor:function(){this.x=0,this.y=0,this.f=0,this.g=0,this.h=0,this.parent=null,this.type=0}});cc.Class({extends:cc.Component,properties:{map:cc.Graphics},onLoad:function(){this._gridW=50,this._gridH=50,this.mapH=13,this.mapW=24,this.is8dir=!0,this.node.on(cc.Node.EventType.TOUCH_MOVE,this.onTouchMove,this),this.node.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this),this.initMap()},onTouchMove:function(t){var i=t.getLocation(),s=Math.floor(i.x/(this._gridW+2)),r=Math.floor(i.y/(this._gridH+2));0==this.gridsList[s][r].type&&(this.gridsList[s][r].type=-1,this.draw(s,r,cc.Color.RED)),cc.log(s+","+r)},onTouchEnd:function(){this.findPath(cc.v2(3,8),cc.v2(19,5))},initMap:function(){this.openList=[],this.closeList=[],this.path=[],this.gridsList=new Array(this.mapW+1);for(var t=0;t<this.gridsList.length;t++)this.gridsList[t]=new Array(this.mapH+1);this.map.clear();for(var i=0;i<=this.mapW;i++)for(var s=0;s<=this.mapH;s++)this.draw(i,s),this.addGrid(i,s,0);this.gridsList[3][8].type=1,this.draw(3,8,cc.Color.YELLOW),this.gridsList[19][5].type=2,this.draw(19,5,cc.Color.BLUE)},addGrid:function(t,i,s){var r=new h;r.x=t,r.y=i,r.type=s,this.gridsList[t][i]=r},_sortFunc:function(t,i){return t.f-i.f},generatePath:function(t){for(this.path.push(t);t.parent;)t=t.parent,this.path.push(t);cc.log("path.length: "+this.path.length);for(var i=0;i<this.path.length;i++)if(0!=i&&i!=this.path.length-1){var s=this.path[i];this.draw(s.x,s.y,cc.Color.GREEN)}},findPath:function(t,i){var s=this.gridsList[t.x][t.y];this.gridsList[i.x][i.y];this.openList.push(s);for(var r=this.openList[0];0<this.openList.length&&2!=r.type;){if(2==(r=this.openList[0]).type)return cc.log("find path success."),void this.generatePath(r);for(var h=-1;h<=1;h++)for(var n=-1;n<=1;n++)if(0!=h||0!=n){var e=r.x+h,o=r.y+n;if(0<=e&&0<=o&&e<=this.mapW&&o<=this.mapH&&-1!=this.gridsList[e][o].type&&this.closeList.indexOf(this.gridsList[e][o])<0){if(this.is8dir){if(-1==this.gridsList[e-h][o].type||-1==this.gridsList[e][o-n].type)continue}else if(Math.abs(h)==Math.abs(n))continue;var a=r.g+parseInt(Math.sqrt(Math.pow(10*h,2)+Math.pow(10*n,2)));(0==this.gridsList[e][o].g||this.gridsList[e][o].g>a)&&(this.gridsList[e][o].g=a,this.gridsList[e][o].parent=r),this.gridsList[e][o].h=Math.abs(i.x-e)+Math.abs(i.y-o),this.gridsList[e][o].f=this.gridsList[e][o].g+this.gridsList[e][o].h,this.openList.indexOf(this.gridsList[e][o])<0&&this.openList.push(this.gridsList[e][o]),this.openList.sort(this._sortFunc)}}this.closeList.push(r),this.openList.splice(this.openList.indexOf(r),1),this.openList.length<=0&&cc.log("find path failed.")}},draw:function(t,i,s){s=null!=s?s:cc.Color.GRAY,this.map.fillColor=s;var r=2+t*(this._gridW+2),h=2+i*(this._gridH+2);this.map.fillRect(r,h,this._gridW,this._gridH)}});cc._RF.pop()},{}],GameCtrl:[function(t,i,s){"use strict";cc._RF.push(i,"ace97Sa/8dPsIhKkQoX9uZd","GameCtrl");t("./AStar");cc.Class({extends:cc.Component,properties:{},start:function(){},onBtnRestart:function(){this.node.getComponent("AStar").initMap()},onCheck:function(t,i){this.node.getComponent("AStar").is8dir=8==i?t.isChecked:!t.isChecked}}),cc._RF.pop()},{"./AStar":"AStar"}]},{},["AStar","GameCtrl"]);