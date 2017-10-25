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

//判断是玩家还是电脑
var me = true;
var over = false;
//存储棋盘落子情况
//0:无子 1:黑棋 2:白棋
var chessBoard = [];

//存储所有赢法
var wins =[];

//赢法统计数组
var mywin =[];
var computerwin =[];

//赢法个数
var count = 0;

//初始化chessBoard、wins数组
for(var i= 0; i<15;i++){
	chessBoard[i]=[];
	wins[i] =[];
	for(var j = 0;j<15;j++){
		chessBoard[i][j] =0;
		wins[i][j]=[];
	}
}


drawBoard(600,20);

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

for(var i = 0;i<count;i++){
	mywin[i]=0;
	computerwin[i] =0;
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
	ctx.strokeStyle = "#ccc";
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
//玩家落子
chess.onclick = function(e){
	if(over){
		return;
	}
	var x = e.offsetX;
	var y = e.offsetY;
	i = Math.floor(x / (2*20));  
    j = Math.floor(y / (2*20)); 
    if(chessBoard[i][j] == 0){
	    onestep(i, j, me); 
    	if(me){		
    		chessBoard[i][j] = 1;
    	}else{
    		chessBoard[i][j] = 2;
    	}
    	me = !me;
    	for(var k =0 ;k<count;k++){
    		if(wins[i][j][k]){
    			mywin[k]++;
    			computerwin[k] = -1;
    			if(mywin[k] ==5){
    				window.alert('你赢了！');
    				over = true;
    			}
    		}
    	}
    }
}