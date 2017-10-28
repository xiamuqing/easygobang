function GoBang(obj){
   var parent = document.getElementById(obj.parentID);
   var width = obj.width;
   var radius = obj.radius;
   this.init(parent , width,radius);
}
GoBang.prototype = {
    constructor:GoBang,
    init:function(parent , width,radius){
        this.initElements(parent,width);
        this.newGame(width,radius);
        this.bindEvents(radius,width);
    },
    //给页面插入元素
    initElements:function(parent,width){
        var html ='<div id="gobang">'+
            '<div id="gb-father"></div>'+
            '<div id="gb-opt-father">'+
                '<div id="gb-opt">'+
                    '<button id="gb-start">重新开始</button>'+
                    '<button id="gb-retract">悔    棋</button>'+
                    '<button id="gb-backout">撤销悔棋</button>'+
                '</div>'+
            '</div>'+
        '</div>';
        parent.innerHTML=html;
        this.father = document.getElementById('gb-father');  
        this.start = document.getElementById('gb-start');  
        this.retract = document.getElementById('gb-retract');  
        this.backout = document.getElementById('gb-backout');
        this.chess = document.createElement( 'canvas' );
        this.chess.id="gb-chess";
        this.chess.width = width;
        this.chess.height = width;
        this.father.appendChild( this.chess );
        this.ctx = this.chess.getContext('2d');  

        //声明变量
        this.statementVariate();
    },
    //开始新游戏
    newGame:function(width,radius){
        //擦除画布
        this.ctx.clearRect(0, 0, width, width);
        this.drawBoard(width,radius);
        //初始化变量
        this.me = true;
        this.over = false;
        // startClick = false;
        this.gameStart = true;
        this.count = 0;
        this.haveChess = false;
        this.bx = -1;
        this.by = -1;
        this.wx = -1;
        this.wy = -1;
        //初始化chessBoard、wins数组,wins[][]棋盘坐标
        for(var i= 0; i<15;i++){
            this.chessBoard[i]=[];
            this.wins[i] =[];
            for(var j = 0;j<15;j++){
                this.chessBoard[i][j] =0;
                this.wins[i][j]=[];
            }
        }
        //所有竖线赢法|
        for (var i = 0; i < 15; i++) {  
         for (var j = 0; j < 11; j++) {  
             for (var k = 0; k < 5; k++) {  
                 this.wins[i][j + k][this.count] = true;  
             }  
             this.count++;  
         }  
        }  
        //所有横线线赢法-
        for (var i = 0; i < 15; i++) {  
         for (var j = 0; j < 11; j++) {  
             for (var k = 0; k < 5; k++) {  
                 this.wins[j + k][i][this.count] = true;  
             }  
             this.count++;  
         }  
        }  
        //所有斜线赢法 /
        for (var i = 0; i < 11; i++) {  
         for (var j = 0; j <11 ; j++) {  
             for (var k = 0; k < 5; k++) {  
                 this.wins[i + k][j + k][this.count] = true;  
             }  
             this.count++;  
         }  
        }  
        //所有反斜线赢法 \
        for (var i = 0; i < 11; i++) {  
         for (var j = 14; j > 3; j--) {  
             for (var k = 0; k < 5; k++) {  
                 this.wins[i + k][j - k][this.count] = true;  
             }  
             this.count++;  
         }  
        }
        //初始化黑白棋落子赢法
        for(var i = 0;i<this.count;i++){
            this.myWin[i]=0;
            this.computerWin[i] =0;
        }
    },
    //画棋盘
    drawBoard:function(width,radius){
        this.ctx.beginPath();  
        for (var i = 0; i < 15; i++) {  
            //横线
            this.ctx.moveTo(radius, radius + i * 2*radius);  
            this.ctx.lineTo(width-radius, radius + i * 2*radius); 
            //竖线 
            this.ctx.moveTo(radius + i * 2*radius, radius);  
            this.ctx.lineTo(radius + i * 2*radius, width-radius);  
        }  
        this.ctx.stroke();  
        // ctx.strokeStyle = "#ccc";
        this.ctx.closePath();
    },
    //画棋子
    oneStep:function(radius,i, j, me){
        var r = radius>10?radius-5:radius;
        this.ctx.beginPath();  
        this.ctx.arc(radius + i * 2*radius, r + j * 2*radius, r, 0, 2 * Math.PI);  
        var gradient = this.ctx.createRadialGradient(radius + i * 2*radius + 2, radius + j * 2*radius - 2, r, radius + i * 2*radius + 2, r + j * 2*radius - 2, 0);  
        if (me) {  
            gradient.addColorStop(0, "#0A0A0A");  
            gradient.addColorStop(1, "#636766");  
        }  
        else {  
            gradient.addColorStop(0, "#c8c8c8");  
            gradient.addColorStop(1, "#F9F9F9");  
        }  
        this.ctx.fillStyle = gradient;  
        this.ctx.fill();  
        this.ctx.closePath();  
    },
    //初始化变量
    statementVariate:function(){
        //me:true:黑棋(玩家) false:白棋
        this.me = true;
        this.over = false;

        //棋盘上是否有子
        this.haveChess = false;
        //是否点击了悔棋按钮
        this.retrBtn = false;
        //是否点击了撤销悔棋按钮
        this.backBtn = false;
        //保存点击悔棋按钮之前赢法统计数组(computerWin,myWin)的值
        this.oldcWin = [], oldmyWin = [];
        //保存点击撤销悔棋按钮之前赢法统计数组(computerWin,myWin)的值
        this.newcWin = [], newmyWin = [];

        //悔棋时黑子下棋坐标
        this.bx=-1;
        this.by =-1;
        //悔棋时白棋下棋坐标
        this.wx=-1;
        this.wy=-1 ;

        //存储棋盘落子情况
        //0:无子 1:黑棋 2:白棋
        this.chessBoard = [];

        //存储所有赢法
        this.wins =[];

        //赢法统计数组
        this.myWin =[];
        this.computerWin =[];

        this.myScore =[];
        this.computerScore =[];

        //赢法个数
        this.count = 0;
    },
    //按钮绑定事件
    bindEvents:function(radius,width){
        var self=this;
        //玩家落子事件
        self.chess.onclick =function(e){
            self.haveChess = true;
            if(self.over){
                return;
            }
            if(!self.me){
                return;
            }
            var x = e.offsetX;
            var y = e.offsetY;
            i = Math.floor(x / (2*20));  
            j = Math.floor(y / (2*20)); 
            if(self.chessBoard[i][j] == 0){
                self.oneStep(radius,i, j, self.me); 
                self.chessBoard[i][j] = 1;
                self.bx = i;
                self.by = j;
                if(self.retrBtn&&!self.backBtn){
                    //retrBtn:防止点悔棋后，再下子时撤销的老棋子被画出来 
                    //backBtn:防止点击撤销悔棋，再下棋时高亮的棋子一直高亮
                    self.wx= -1,self.wy =-1;
                }
                
                self.backBtn = false;
                self.retrBtn = false;
                //为悔棋功能保存最后落子的前一次落子的赢法数组
                //concat()深拷贝
                self.oldmyWin = self.myWin.concat();
                self.oldcWin = self.computerWin.concat();
                for(var k =0 ;k<self.count;k++){
                    if(self.wins[i][j][k]){
                        self.myWin[k]++;
                        self.computerWin[k] = -1;
                        if(self.myWin[k] ==5){
                            self.over = true;
                            setTimeout(function () {
                                self.gameOver(width,radius,self.me);
                                return;
                            }, 100)
                        }
                    }
                }
                //为撤销悔棋功能保存最后一次落子的赢法数组
                self.newmyWin = self.myWin.concat();
                self.newcWin = self.computerWin.concat();
                if(!self.over){
                    self.me = !self.me;
                    setTimeout(function(){
                        self.computerAI(radius,width,self.wx,self.wy,true);
                    }, 200);
                }
            }
        }
        //点击重新开始按钮
        self.start.onclick = function () {
            if (self.haveChess) {
                if (window.confirm('是否重新开始游戏？')) {
                    self.newGame(width,radius);
                    self.haveChess = false;
                }
            } 
        }
        //点击悔棋按钮
        self.retract.onclick = function () {
            var r=radius;
            if(!self.haveChess){
                return;
            }
            self.retrBtn = true;
            self.chessBoard[self.bx][self.by] = 0;
            self.chessBoard[self.wx][self.wy] = 0;
            //擦除棋子
            self.ctx.clearRect(self.bx * (2*r), self.by * (2*r), (2*r), (2*r));
            self.ctx.clearRect(self.wx * (2*r), self.wy * (2*r), (2*r), (2*r));
            //补齐网格
            self.ctx.beginPath();
            self.ctx.moveTo(self.bx * (2*r), self.by * (2*r) + r);
            self.ctx.lineTo(self.bx * (2*r) + (2*r), self.by * (2*r) + r);
            self.ctx.moveTo(self.bx * (2*r) + r, self.by * (2*r));
            self.ctx.lineTo(self.bx * (2*r) + r, self.by * (2*r) + (2*r));
            self.ctx.moveTo(self.wx * (2*r), self.wy * (2*r) + r);
            self.ctx.lineTo(self.wx * (2*r) + (2*r), self.wy * (2*r) + r);
            self.ctx.moveTo(self.wx * (2*r) + r, self.wy * (2*r));
            self.ctx.lineTo(self.wx * (2*r) + r, self.wy * (2*r) + (2*r));
            self.ctx.stroke();
            self.ctx.closePath();
            //减去悔棋位置的赢法
            self.myWin= self.oldmyWin.concat();
            self.computerWin= self.oldcWin.concat();
             for(var k =0 ;k<self.count;k++){
                    if(self.wins[self.bx][self.by][k]){
                        if(self.myWin[k] ==4){
                            self.myWin[k]--;
                        }
                    }
                }

            self.computerAI(radius,width);
        }

        //撤销悔棋
        self.backout.onclick = function () {
            if (self.retrBtn) {
                self.chessBoard[self.bx][self.by] = 2;
                self.chessBoard[self.wx][self.wy] = 1;
                self.oneStep(radius,self.bx, self.by, 1);
                self.heightLight(radius,self.wx,self.wy);
                self.myWin = self.newmyWin.concat();
                self.computerWin= self.newcWin.concat();
                self.computerAI(radius,width);
                self.backBtn = true;
            }
        }
    },
    //计算机AI
    computerAI:function(radius,width,wx,wy,isDraw){
        if(!this.retrBtn){
            this.oneStep(radius,wx,wy,0);
        }
        this.myScore =[];
        this.computerScore =[];
        //保存最高分数
        var max = 0;
        //最高分数坐标
        var u = 0, v = 0;
        //初始化数组
        for(var i = 0; i<15;i++){
            this.myScore[i]=[];
            this.computerScore[i]=[];
            for(var j = 0;j<15;j++){
                this.myScore[i][j]=0;
                this.computerScore[i][j]=0;
            }
        }
        //遍历棋盘
        for (var i = 0; i < 15; i++) {
            for (var j = 0; j < 15; j++) {
                if (this.chessBoard[i][j] == 0) {
                    for (var k = 0; k < this.count; k++) {
                        if (this.wins[i][j][k]) {
                            if (this.myWin[k] == 1) {
                                //第K种赢法 黑棋(玩家)落了第一颗子
                                this.myScore[i][j] += 200;
                            } else if (this.myWin[k] == 2) {
                                this.myScore[i][j] += 1000;
                            } else if (this.myWin[k] == 3) {
                                this.myScore[i][j] += 2000;
                            } else if (this.myWin[k] == 4) {
                                this.myScore[i][j] += 10000;
                            }
                            if (this.computerWin[k] == 1) {
                                //第K种赢法 白棋(电脑)落了第一颗子
                                this.computerScore[i][j] += 200;
                            } else if (this.computerWin[k] == 2) {
                                this.computerScore[i][j] += 1200;
                            } else if (this.computerWin[k] == 3) {
                                this.computerScore[i][j] += 2400;
                            } else if (this.computerWin[k] == 4) {
                                this.computerScore[i][j] += 20000;
                            }
                        }
                    }
                    if (this.myScore[i][j] > max) {
                        max = this.myScore[i][j];
                        u = i;
                        v = j;
                    } else if (this.myScore[i][j] == max) {
                        if (this.computerScore[i][j] > this.computerScore[u][v]) {
                            u = i;
                            v = j;
                        }
                    }
                    if (this.computerScore[i][j] > max) {
                        max = this.computerScore[i][j];
                        u = i;
                        v = j;
                    } else if (this.computerScore[i][j] == max) {
                        if (this.myScore[i][j] > this.myScore[u][v]) {
                            u = i;
                            v = j;
                        }
                    }
                }
            }
        }
        
        if(isDraw){
            this.heightLight(radius,u,v);
            this.chessBoard[u][v] =2;
            this.wx = u;
            this.wy = v;
            for(var k =0 ;k<this.count;k++){
                if(this.wins[u][v][k]){
                    this.computerWin[k]++;
                    this.oldmyWin[k] = this.myWin[k];
                    this.myWin[k] = -1;
                    if(this.computerWin[k] ==5){
                        this.over = true;
                        var self = this;
                        setTimeout(function () {
                            self.gameOver(width,radius);
                        }, 100)
                    }
                }
            }
            if(!this.over){
                this.me =!this.me;
            }
        }
    },
    //结束游戏
    gameOver:function(width,radius,me){
        if (me) {
            if (window.confirm('恭喜你，击败了电脑，是否重新开始？')) {
                this.newGame(width,radius);
            }
        } else {
            if (window.confirm('电脑赢了，是否重新开始？')) {
                this.newGame(width,radius);
            }
        }
    },
    //白棋高亮
    heightLight:function(radius,i,j){
        var r = radius>10?radius-5:radius;
        this.ctx.beginPath();  
        this.ctx.arc(radius + i * 2*radius, r + j * 2*radius, r, 0, 2 * Math.PI);  
        var gradient = this.ctx.createRadialGradient(r + i * 2*r + 2, r + j * 2*r - 2, 15, r + i * 2*r + 2, 15 + j * 2*r - 2, 0.2);   
        gradient.addColorStop(0, "#e2e2e2");  
        gradient.addColorStop(1, "#F9F9F9");  
        this.ctx.fillStyle = gradient;  
        this.ctx.fill();  
        this.ctx.closePath();         
    }
}


