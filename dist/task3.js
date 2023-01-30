"use strict";
// All Rights Reserved. Copyright (C) Kazuo Misue (2020)
window.addEventListener('load', function(){
    new App().init(0);
}, false);

var originalArcs = [];
var defaultVertices = 51;
var minVertices = 5;
var nVertices = 50;

var App = /** @class */ (function(){
    function App(){
        this.arcs = [];     // 頂点座標
        this.nPoints = 0;   // すべての頂点数
        this.area = 0;      // 面積
        this.cvs = document.getElementById("canvas");
        this.ctx = this.cvs.getContext("2d");
        this.dataId = 0;
        this.dataList = [];
    }

    App.prototype.init = function(arcs){
        var me = this;
        me.setupUI();

        if(arcs == 0){
            var filename = $("#filename").attr("value");
            var prefectures = this.getCsv("data/" + filename);
            console.log("filename:" + filename);
            console.log(prefectures);

            var t = prefectures[8][0];
            this.dataId = 0;
            for(var i = 0; i < t; i++){
                this.dataId++;
            }

            for(var i = 0; i < prefectures[12].length; i++){
                var filename = `topodata/${prefectures[13][i].slice(2)}`;
                this.dataList.push(filename);
            }

            console.log("prefecture:" + this.dataList[this.dataId]);
            me.setupData(this.dataList[this.dataId]);
        }else{
            me.setupData2(arcs);
        }

        console.log(me);
    }

    App.prototype.setupUI = function(){
        var button1 = document.getElementById("make_faithful");
        var button2 = document.getElementById("make_simple");
        var button3 = document.getElementById("submit");

        button1.onclick = function(){
            console.log("input update_vertices");
            nVertices++;
            if(nVertices >= defaultVertices) nVertices = defaultVertices - 1;

            new App().init(0);
        };

        button2.onclick = function(){
            console.log("input update_vertices");
            nVertices--;
            if(nVertices < minVertices) nVertices = minVertices;

            new App().init(0);
        };

        button3.onclick = function(){
            $.ajax({
                async: true,
                type: "POST",
                url: "answer3.php",
                data: {number: nVertices}
            });
        };
    };

    App.prototype.setupData = function(url){
        var me = this;

        console.log("url", url, me);

        fetch(url).then(function(response){
            response.text().then(function(jsonString){
                var topoJsonData = JSON.parse(jsonString);            
                originalArcs = decodeArcs(topoJsonData, topoJsonData.arcs);
                originalArcs = scaling(originalArcs);
                me.arcs = [[]];
                
                var max = 0;
                for(var i = 0; i < originalArcs.length; i++){
                    if(originalArcs[i].length > originalArcs[max].length) max = i;
                }

                me.arcs[0] = originalArcs[max];
                me.nPoints = me.arcs[0].length;
                me.area = calcArea(me.arcs[0]);
                
                me.arcs = me.reduceEdge(me.arcs);
                me.arcs = me.updateVertices(me.arcs, nVertices);
                me.drawAbsArcs(me.ctx, me.arcs[0], me.area);
            });
        });
    };
    
    App.prototype.setupData2 = function(arcs){
        var me = this;

        me.arcs = arcs;
        me.nPoints = me.arcs[0].length;
        me.area = calcArea(me.arcs[0]);        
        me.drawAbsArcs(me.ctx, me.arcs[0], me.area);
    };

    App.prototype.drawAbsArcs = function(ctx, arcs){
        // background
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 600, 600);

        // number of vertices
        ctx.fillStyle = "black";
        ctx.font = "20pt sans-serif";
        ctx.fillText(arcs.length, 10, 30);

        // vertice
        /*
        ctx.strokeStyle = "black";
        for (var i = 0; i < arcs.length; i++){
            ctx.beginPath();
            ctx.arc(arcs[i].x, arcs[i].y, 3, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
            ctx.closePath();
            ctx.fill();
        }
        */

        //console.log(arcs);

        // edge
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(arcs[0].x, arcs[0].y);
        for (var i = 1; i < arcs.length; i++){
            ctx.lineTo(arcs[i].x, arcs[i].y);
        }
        ctx.closePath();
        ctx.stroke();
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

    // ここからデフォルメ
    App.prototype.Schematization1 = function(arcs, edgeId){
        var me = this;
        var schemArea;                  // 面積
        var newPoint = new Vertex();    // 座標
        var ε = 0.01;                   // ゼロ割対策
        var arcForArea = [[], []];
        
        arcs.forEach(function(arc){
            // 座標計算
            for(var i = 0; i < arc.length; i++){
                var id1, id2;
                if(i == edgeId){
                    id1 = i % arc.length;
                    id2 = (i + 1) % arc.length;
                    var a = (arc[id1].y - arc[id2].y) / (arc[id1].x - arc[id2].x + ε);
                }else if(i == (arc.length + edgeId - 1) % arc.length){
                    id1 = i % arc.length;
                    id2 = (i + 1) % arc.length;
                    var a1 = (arc[id1].y - arc[id2].y) / (arc[id1].x - arc[id2].x + ε);
                    var b1 = (arc[id1].x * arc[id2].y - arc[id2].x * arc[id1].y) / (arc[id1].x - arc[id2].x + ε);
                }
            }

            var x2 = arc[(edgeId + 2) % arc.length].x;
            var y2 = arc[(edgeId + 2) % arc.length].y;

            newPoint.x = (b1 - y2 + a * x2) / (a - a1);
            newPoint.y = (a * a1 * x2 - a1 * y2 + a * b1) / (a - a1);

            // 面積計算
            //var arcForArea = [[], []];
            var id = 0;
            for(var i = 0; i < arc.length; i++){
                if(i == edgeId){
                    arcForArea[id] = newPoint;
                    id++;
                }else if(i == (edgeId + 1) % arc.length){
                    ;
                }else{
                    arcForArea[id] = arc[i];
                    id++;
                }
            }
            schemArea = calcArea(arcForArea);
        });

        if(schemArea > me.area){
            //[Negative or Positive, Area, New Coordinate]
            return [1, Math.abs(me.area - schemArea), newPoint];
        }else{
            return [0, Math.abs(me.area - schemArea), newPoint];
        }
    };

    App.prototype.Schematization2 = function(arcs, edgeId){
        var me = this;
        var schemArea;  // 面積
        var newPoint = new Vertex(); // 座標
        var ε = 0.01;   // ゼロ割対策
        var arcForArea = [[], []];

        arcs.forEach(function(arc){
            // 座標計算
            for(var i = 0; i < arc.length; i++){
                var id1, id2;
                if(i == edgeId){
                    id1 = i % arc.length;
                    id2 = (i + 1) % arc.length;
                    var a = (arc[id1].y - arc[id2].y) / ((arc[id1].x - arc[id2].x) + ε);
                }else if(i == (edgeId + 1) % arc.length){
                    id1 = i % arc.length;
                    id2 = (i + 1) % arc.length;
                    var a2 = (arc[id1].y - arc[id2].y) / (arc[id1].x - arc[id2].x + ε);
                    var b2 = (arc[id1].x * arc[id2].y - arc[id2].x * arc[id1].y) / (arc[id1].x - arc[id2].x + ε);
                }
            }
            
            var x2 = arc[(arc.length + edgeId - 1) % arc.length].x;
            var y2 = arc[(arc.length + edgeId - 1) % arc.length].y;

            newPoint.x = (b2 - y2 + a * x2) / (a - a2);
            newPoint.y = (a * a2 * x2 - a2 * y2 + a * b2) / (a - a2);

            // 面積計算
            // var arcForArea = [[], []];
            var id = 0;
            for(var i = 0; i < arc.length; i++){
                if(i == edgeId){
                    arcForArea[id] = newPoint;
                    id++;
                }else if(i == (edgeId + 1) % arc.length){
                    ;
                }else{
                    arcForArea[id] = arc[i % arc.length];
                    id++;
                }
            }
            schemArea = calcArea(arcForArea);
        });

        if(schemArea > me.area){
            // [Negative or Positive, Area, New Coordinate]
            return [1, Math.abs(me.area - schemArea), newPoint];
        }else{
            return [0, Math.abs(me.area - schemArea), newPoint];
        }
    };

    App.prototype.getSchemMatrix = function(arcs){
        var me = this;
        var schemMatrix = [];

        arcs.forEach(function(arc){
            for(var i = 0; i < arc.length; i++){
                var temp1 = me.Schematization1(arcs, i);
                var temp2 = me.Schematization2(arcs, i);

                if(temp1[0] == 0){
                    if(temp2[0] == 0){
                        // N, N
                        if(temp1[1] < temp2[1]){
                            schemMatrix[i] = [temp1[1], temp1[2], 1, NaN, NaN, NaN];
                        }else{
                            schemMatrix[i] = [temp2[1], temp2[2], 2, NaN, NaN, NaN];
                        }
                    }else if(temp2[0] == 1){
                        // N, P
                        schemMatrix[i] = [temp1[1], temp1[2], 1, temp2[1], temp2[2], 2];
                    }else{
                        // N, O
                        schemMatrix[i] = [temp1[1], temp1[2], 1, NaN, NaN, NaN];
                    }
                }else if(temp1[0] == 1){
                    if(temp2[0] == 0){
                        // P, N
                        schemMatrix[i] = [temp2[1], temp2[2], 2, temp1[1], temp1[2], 1];
                    }else if(temp2[0] == 1){
                        // P, P
                        if(temp1[1] < temp2[1]){
                            schemMatrix[i] = [NaN, NaN, NaN, temp1[1], temp1[2], 1];
                        }else{
                            schemMatrix[i] = [NaN, NaN, NaN, temp2[1], temp2[2], 2];
                        }
                    }else{
                        // P, O
                        schemMatrix[i] = [NaN, NaN, NaN, temp1[1], temp1[2], 1];
                    }
                }else{
                    if(temp2[0] == 0){
                        // O, N
                        schemMatrix[i] = [temp2[1], temp2[2], 2, NaN, NaN, NaN];
                    }else if(temp2[0] == 1){
                        // O, P
                        schemMatrix[i] = [NaN, NaN, NaN, temp2[1], temp2[2], 2];
                    }else{
                        // O, O
                        schemMatrix[i] = [NaN, NaN, NaN, NaN, NaN, NaN];
                    }
                }
            }
        });

        return schemMatrix;
    };

    App.prototype.updateVertices = function(arcs, nVertices){
        var me = this;
        var outArcs = arcs[0];
        var outArcs2 = [];

        while(outArcs.length > nVertices){
            var tempArcs = outArcs;
            outArcs = [];
            outArcs2 = [];

            // ネガティブ
            var schemMatrix = me.getSchemMatrix([tempArcs]);
            var minIdList = getIdList(schemMatrix, 0);
            var minId = minIdList[0];
            var minId = 0;
            var min = Infinity;
            for(var i = 0; i < schemMatrix.length; i++){       
                if(schemMatrix[i][0] < min){
                    minId = i;
                    min = schemMatrix[i][0];
                }
            }

            var id = 0;
            var schemType = schemMatrix[minId][2];
            var areaDiff = schemMatrix[minId][0];
            if(minId != undefined){
                for(var i = 0; i < tempArcs.length; i++){
                    if(i == minId){
                        outArcs[id] = schemMatrix[i][1];
                        id++;
                    }else if(i == (minId + 1) % tempArcs.length){
                        ;
                    }else{
                        outArcs[id] = tempArcs[i];
                        id++;
                    }
                }
            }else{
                for(var i = 0; i < tempArcs.length; i++){
                    outArcs[id] = tempArcs[i];
                    id++;
                }
            }
            me.area = calcArea(outArcs);

            // ポジティブ
            schemMatrix = me.getSchemMatrix([outArcs]);
            var maxIdList = getIdList(schemMatrix, 3);
            var maxId = maxIdList[0];
        
            for(var i = 0; i < maxIdList.length - 1; i++){
                if(maxId == undefined) return;
                if(areaDiff > schemMatrix[maxId][3]) maxId = maxIdList[i + 1];
            }

            schemType = schemMatrix[maxId][5];
            id = 0;

            if(schemType == 1){
                var newPoints = getNewPoints(outArcs[maxId], outArcs[(maxId + 1) % outArcs.length], outArcs[(maxId + 2)  % outArcs.length], schemMatrix[maxId][4], areaDiff);
            }else if(schemType == 2){
                var newPoints = getNewPoints(outArcs[maxId], outArcs[(maxId + 1) % outArcs.length], schemMatrix[maxId][4], outArcs[(outArcs.length + maxId - 1) % outArcs.length], areaDiff);
            }
        
            var newA = new Vertex(newPoints[0][0], newPoints[0][1]);
            var newB = new Vertex(newPoints[1][0], newPoints[1][1]);
        
            if(maxId != undefined){
                for(var i = 0; i < outArcs.length; i++){
                    if((schemType == 1) && (i == maxId)){
                        outArcs2[id] = newA;
                        id++;
                    }else if((schemType == 2) && (i == maxId)){
                        outArcs2[id] = newA;
                        id++;
                    }else if((schemType == 1) && (i == (maxId + 1) % outArcs.length)){
                        outArcs2[id] = newB;
                        id++;
                    }else if((schemType == 2) && (i == (maxId + 1) % outArcs.length)){
                        outArcs2[id] = newB;
                        id++;
                    }else{
                        outArcs2[id] = outArcs[i];
                        id++;
                    }
                }
            }else{
                for(var i = 0; i < outArcs.length; i++){
                    outArcs2[id] = outArcs[i];
                    id++;
                }
            }
        }

        var out = [outArcs2];
        return out;
        //this.setupData2(out);
    };

    App.prototype.reduceEdge = function(arcs){
        var target = 0;
        var outArcs = arcs[0];

        while(outArcs.length > defaultVertices){
            var tempArcs = outArcs;
            var minArea = Infinity;

            for(var i = 0; i < tempArcs.length; i++){
                var v0, v1, v2;
                
                if(i == 0){
                    v0 = tempArcs.length - 1;
                }else{
                    v0 = i - 1;
                }

                v1 = i;
                
                if(i == tempArcs.length - 1){
                    v2 = 0;
                }else{
                    v2 = i + 1;
                }

                if(minArea > triangleArea(tempArcs[v0], tempArcs[v1], tempArcs[v2])){
                    minArea = triangleArea(tempArcs[v0], tempArcs[v1], tempArcs[v2]);
                    target = i;
                }
            }

            outArcs = [];
            var id = 0;
            for(var i = 0; i < tempArcs.length; i++){
                if(i != target){
                    outArcs[id] = tempArcs[i];
                    id++;
                }
            }
        }

        var out = [outArcs];
        return out;
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
    return arcs.map(function(arc){ 
        return decodeArc(topology, arc);
    });
}

// topojsonのarcを絶対座標（緯度・経度）に変換する
function decodeArc(topology, arc){
    var x = 0, y = 0;
    return arc.map(function(position){
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

// ソート
function getIdList(matrix, id){  
    var idList = [];
    var ans;

    for(var i = 0; i < 10; i++){
        var min = Infinity;
        for(var j = 0; j < matrix.length; j++){
            var flag = 0;
            for(var k = 0; k < idList.length; k++){
                if(j == idList[k]) flag = 1;
            }
            if(flag == 0 && min > matrix[j][id]){
                min = matrix[j][id];
                ans = j;
            }
        }
        idList[i] = ans;
    }
    
    return idList;
}

// 面積計算
function calcArea(arcs){
    var sum = 0;

    for(var i = 0; i < arcs.length; i++){
        var x = arcs[i].x - arcs[(i + 1) % arcs.length].x;
        var y = arcs[i].y + arcs[(i + 1) % arcs.length].y;
        sum += x * y;
    }

    return Math.abs(sum / 2);
}

// 面積保存した新しい頂点
function getNewPoints(a, b, c, d, area){
    var AB = Math.sqrt(Math.pow(b.x-a.x, 2) + Math.pow(b.y-a.y, 2));
    var CD = Math.sqrt(Math.pow(d.x-c.x, 2) + Math.pow(d.y-c.y, 2));

    if(AB == CD){
        var h = 2 * squareArea(a, b, c, d) / (AB + CD);
        var newH = area / AB;
        var ratio = 1 - (newH / h);
    } else if(AB < CD){
        var h = 2 * squareArea(a, b, c, d) / (AB + CD);
        var quadA = CD - AB;
        var quadB = 2 * AB * h;
        var quadC = -2 * area * h;
        var newH = (-quadB + Math.sqrt(Math.pow(quadB, 2) - 4 * quadA * quadC)) / (2 * quadA);
        var ratio = 1 - (newH / h);
    } else if(AB > CD){
        var h = 2 * squareArea(a, b, c, d) / (AB + CD);
        var quadA = AB - CD;
        var quadB = -2 * AB * h;
        var quadC = 2 * area * h;
        var newH = (-quadB - Math.sqrt(Math.pow(quadB, 2) - 4 * quadA * quadC)) / (2 * quadA);
        var ratio = 1 - (newH / h);
    }

    return　[[ratio * (a.x - d.x) + d.x, ratio * (a.y - d.y) + d.y], [ratio * (b.x - c.x) + c.x, ratio * (b.y - c.y) + c.y]];
}

function triangleArea(p1, p2, p3){
    return Math.abs((p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y)) / 2;
}

function squareArea(p1, p2, p3, p4){
    return triangleArea(p1, p2, p3) + triangleArea(p1, p3, p4);
}