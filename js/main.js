var start = document.getElementById('start');  
var retract = document.getElementById('retract');  
var backout = document.getElementById('backout');  

//新建画布
var chess = document.createElement( 'canvas' );
chess.id="chess";
chess.width = 600;
chess.height = 600;
document.body.appendChild( chess );
var ctx = chess.getContext('2d');  

//me:true:黑棋(玩家) false:白棋
var me = true;
var over = false;

//棋盘上是否有子
var haveChess = false;
//是否点击了开始按钮
var startBtn = false;

//存储棋盘落子情况
//0:无子 1:黑棋 2:白棋
var chessBoard = [];

//存储所有赢法
var wins =[];

//赢法统计数组
var myWin =[];
var computerWin =[];

//赢法个数
var count = 0;

window.onload = function () {
    drawBoard(600,20);
};

function newGame(){
	//擦除画布
	ctx.clearRect(0, 0, chess.width, chess.height);
    drawBoard(600,20);
    //初始化变量
    me = true;
    over = false;
    startClick = false;
    gameStart = true;
    count = 0;
    //初始化chessBoard、wins数组,wins[][]棋盘坐标
	for(var i= 0; i<15;i++){
		chessBoard[i]=[];
		wins[i] =[];
		for(var j = 0;j<15;j++){
			chessBoard[i][j] =0;
			wins[i][j]=[];
		}
	}
	//所有竖线赢法|
	for (var i = 0; i < 15; i++) {  
	 for (var j = 0; j < 11; j++) {  
	     for (var k = 0; k < 5; k++) {  
	         wins[i][j + k][count] = true;  
	     }  
	     count++;  
	 }  
	}  
	//所有横线线赢法-
	for (var i = 0; i < 15; i++) {  
	 for (var j = 0; j < 11; j++) {  
	     for (var k = 0; k < 5; k++) {  
	         wins[j + k][i][count] = true;  
	     }  
	     count++;  
	 }  
	}  
	//所有斜线赢法 /
	for (var i = 0; i < 11; i++) {  
	 for (var j = 0; j <11 ; j++) {  
	     for (var k = 0; k < 5; k++) {  
	         wins[i + k][j + k][count] = true;  
	     }  
	     count++;  
	 }  
	}  
	//所有反斜线赢法 \
	for (var i = 0; i < 11; i++) {  
	 for (var j = 14; j > 3; j--) {  
	     for (var k = 0; k < 5; k++) {  
	         wins[i + k][j - k][count] = true;  
	     }  
	     count++;  
	 }  
	}
	//初始化黑白棋落子赢法
	for(var i = 0;i<count;i++){
		myWin[i]=0;
		computerWin[i] =0;
	}

}

//画棋盘
function  drawBoard(w,r){
	ctx.beginPath();  
	for (var i = 0; i < 15; i++) {  
		//横线
		ctx.moveTo(r, r + i * 2*r);  
		ctx.lineTo(w-r, r + i * 2*r); 
		//竖线 
		ctx.moveTo(r + i * 2*r, r);  
		ctx.lineTo(r + i * 2*r, w-r);  
	}  
	ctx.stroke();  
	// ctx.strokeStyle = "#ccc";
	ctx.closePath();
}

//画棋子
function onestep(i, j, me) {  
    ctx.beginPath();  
    ctx.arc(20 + i * 2*20, 15 + j * 2*20, 15, 0, 2 * Math.PI);  
    var gradient = ctx.createRadialGradient(20 + i * 2*20 + 2, 20 + j * 2*20 - 2, 15, 20 + i * 2*20 + 2, 15 + j * 2*20 - 2, 0);  
    if (me) {  
        gradient.addColorStop(0, "#0A0A0A");  
        gradient.addColorStop(1, "#636766");  
    }  
    else {  
        gradient.addColorStop(0, "#D1D1D1");  
        gradient.addColorStop(1, "#F9F9F9");  
    }  
    ctx.fillStyle = gradient;  
    ctx.fill();  
    ctx.closePath();  
}  
//玩家落子事件
chess.onclick = function (e) {
    myClick(e);
}
//落子
function myClick(e){
	if (startBtn) {
        haveChess = true;
    } else if (!startBtn && !haveChess) {
        return;
    }
	if(over){
		return;
	}
	if(!me){
		return;
	}
	var x = e.offsetX;
	var y = e.offsetY;
	i = Math.floor(x / (2*20));  
    j = Math.floor(y / (2*20)); 
    if(chessBoard[i][j] == 0){
	    onestep(i, j, me); 
    	chessBoard[i][j] = 1;
    	for(var k =0 ;k<count;k++){
    		if(wins[i][j][k]){
    			myWin[k]++;
    			computerWin[k] = -1;
    			if(myWin[k] ==5){
    				over = true;
    				setTimeout(function () {
                   		gameOver();
                	}, 100)
    			}
    		}
    	}
    	if(!over){
    		me = !me;
    		setTimeout(computerAI, 100);
    	}
    }
}

//计算机AI
function computerAI(){
	var myScore =[];
	var computerScore =[];
	//保存最高分数
    var max = 0;
    //最高分数坐标
    var u = 0, v = 0;
    //初始化数组
	for(var i = 0; i<15;i++){
		myScore[i]=[];
		computerScore[i]=[];
		for(var j = 0;j<15;j++){
			myScore[i][j]=0;
			computerScore[i][j]=0;
		}
	}
	for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 15; j++) {
            if (chessBoard[i][j] == 0) {
                for (var k = 0; k < count; k++) {
                    if (wins[i][j][k]) {
                        if (myWin[k] == 1) {
                            //第K种赢法 黑棋(玩家)落了第一颗子
                            myScore[i][j] += 200;
                        } else if (myWin[k] == 2) {
                            myScore[i][j] += 400;
                        } else if (myWin[k] == 3) {
                            myScore[i][j] += 2000;
                        } else if (myWin[k] == 4) {
                            myScore[i][j] += 10000;
                        }
                        if (computerWin[k] == 1) {
                            //第K种赢法 白棋(电脑)落了第一颗子
                            computerScore[i][j] += 200;
                        } else if (computerWin[k] == 2) {
                            computerScore[i][j] += 420;
                        } else if (computerWin[k] == 3) {
                            computerScore[i][j] += 2100;
                        } else if (computerWin[k] == 4) {
                            computerScore[i][j] += 20000;
                        }
                    }
                }
                if (myScore[i][j] > max) {
                    max = myScore[i][j];
                    u = i;
                    v = j;
                } else if (myScore[i][j] == max) {
                    if (computerScore[i][j] > computerScore[u][v]) {
                        u = i;
                        v = j;
                    }
                }
                if (computerScore[i][j] > max) {
                    max = computerScore[i][j];
                    u = i;
                    v = j;
                } else if (computerScore[i][j] == max) {
                    if (computerScore[i][j] > myScore[u][v]) {
                        u = i;
                        v = j;
                    }
                }
            }
        }
    }
    onestep(u,v,0);
    chessBoard[u][v] =2;
    for(var k =0 ;k<count;k++){
		if(wins[u][v][k]){
			computerWin[k]++;
			myWin[k] = -1;
			if(computerWin[k] ==5){
    			over = true;
				setTimeout(function () {
                    gameOver();
                }, 100)
			}
		}
	}
	if(!over){
		me =!me;
	}
}

//结束函数
function gameOver(me) {
    if (me) {
        if (window.confirm('恭喜你，击败了电脑，是否重新开始？')) {
            newGame();
        }
    } else {
        if (window.confirm('电脑赢了，是否重新开始？')) {
            newGame();
        }
    }
}

//点击开始按钮
start.onclick = function () {
    startBtn = true;
    if (haveChess && startBtn) {
        if (window.confirm('是否重新开始游戏？')) {
            newGame();
            haveChess = false;
        }
    } else {
        newGame();
        haveChess = false;
    }

}