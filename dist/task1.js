"use strict";
// All Rights Reserved. Copyright (C) Kazuo Misue (2020)
window.addEventListener('load', function(){
    new App().init(0);
}, false);

var originalArcs = [];
  
var App = /** @class */ (function(){
    function App(){
        this.cvs = document.getElementById("canvas");
        this.ctx = this.cvs.getContext("2d");
        this.dataId = 0;
        this.dataList = [];
    }

    App.prototype.init = function(){
        var filename = $("#filename").attr("value");
        var prefectures = this.getCsv("data/" + filename);
        console.log("filename:" + filename);

        var t = prefectures[6][0];
        //console.log("t:" + t);
        this.dataId = 0;
        for(var i = 0; i < t; i++){
            this.dataId++;
        }

        for(var i = 0; i < prefectures[0].length; i++){
            if(prefectures[0][i] == prefectures[2][i]){
                var filename = `topodata/${prefectures[4][i].slice(2)}`;
                this.dataList.push(filename);
            }
        }

        console.log("prefecture:" + prefectures[4][this.dataId]);
        console.log(prefectures);
        this.setupData(this.dataList[this.dataId]);
        console.log(this);
    }

    App.prototype.setupData = function(url){
        var me = this;

        fetch(url).then(function(response){
            response.text().then(function(jsonString){
                var topoJsonData = JSON.parse(jsonString);                
                originalArcs = decodeArcs(topoJsonData, topoJsonData.arcs);
                originalArcs = scaling(originalArcs);
                me.drawAbsArcs(me.ctx, originalArcs);
            });
        });
    };

    App.prototype.drawAbsArcs = function(ctx, arcs){
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 600, 600);

        arcs.forEach(function(arc){
            ctx.strokeStyle = "black";
            ctx.beginPath();
            ctx.moveTo(arc[0].x, arc[0].y);
            for(var i = 1; i < arc.length; i++) {
                ctx.lineTo(arc[i].x, arc[i].y);
            }
            ctx.closePath();
            ctx.stroke();
        });        
    };

    App.prototype.getCsv = function(url){
        var txt = new XMLHttpRequest();
        txt.open("get", url, false);
        txt.send();

        var arr = txt.responseText.split("\n");
        var res = [];
        for(var i = 0; i < arr.length; i++){
          if(arr[i] == "") break;
          res[i] = arr[i].split(",");
        }
        return res;
    };
    return App;
}());

var Vertex = /** @class */ (function(){
    function Vertex(x, y){
        this.x = x;
        this.y = y;
    }
    return Vertex;
}());

// 緯度経度の組みから距離（km）を求める
function distance(x1, y1, x2, y2){
    var r = 6378.137; // km
    var x1r = degToRad(x1);
    var y1r = degToRad(y1);
    var x2r = degToRad(x2);
    var y2r = degToRad(y2);
    var dx = x2r - x1r;
    return r * Math.acos(Math.sin(y1r) * Math.sin(y2r) + Math.cos(y1r) * Math.cos(y2r) * Math.cos(dx));
    
    function degToRad(d){
        return d * Math.PI / 180;
    }
}

// topojsonのarcsを絶対座標（緯度・経度）に変換する
function decodeArcs(topology, arcs){
    return arcs.map(function (arc){ 
        return decodeArc(topology, arc);
    });
}

// topojsonのarcを絶対座標（緯度・経度）に変換する
function decodeArc(topology, arc){
    var x = 0, y = 0;
    return arc.map(function (position){
        x += position[0];
        y += position[1];
        var px = x * topology.transform.scale[0] + topology.transform.translate[0];
        var py = y * topology.transform.scale[1] + topology.transform.translate[1];
        return new Vertex(px, py);
    });
}

// 描画用座標に変換
function scaling(arcs){
    var x0 = 190;
    var y0 = 190;
    var x1 = -190;
    var y1 = -190;
    
    arcs.forEach(function(arc){
        arc.forEach(function(p){
            if (p.x < x0) x0 = p.x;
            if (p.x > x1) x1 = p.x;
            if (p.y < y0) y0 = p.y;
            if (p.y > y1) y1 = p.y;
        });
    });

    var distX = distance(x0, y0, x0 + 1, y0);
    var distY = distance(x0, y0, x0, y0 + 1);
    var ratioXY = distX / distY;
    var cx = (x0 + x1) / 2;
    var cy = (y0 + y1) / 2;
    var scaleX0 = ratioXY * 500 / (x1 - x0);
    var scaleY0 = 500 / (y1 - y0);
    var scaleY = Math.min(scaleX0, scaleY0);
    var scaleX = scaleY * ratioXY;

    arcs.forEach(function(arc){
        arc[0].x = 300 + scaleX * (arc[0].x - cx);
        arc[0].y = 300 - scaleY * (arc[0].y - cy);
        for (var i = 1; i < arc.length; i++){
          arc[i].x = 300 + scaleX * (arc[i].x - cx);
          arc[i].y = 300 - scaleY * (arc[i].y - cy);
        }
    });
    return arcs;
}