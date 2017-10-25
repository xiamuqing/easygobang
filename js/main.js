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
//存储棋盘落子情况
//0:无子 1:黑棋 2:白棋
var chessBoard = [];
for(var i= 0; i<15;i++){
	chessBoard[i]=[];
	for(var j = 0;j<15;j++){
		chessBoard[i][j] =0;
	}
}


drawBoard(600,20);
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

// onestep(0, 0, 1);
// onestep(1, 1, 0);

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

chess.onclick = function(e){
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
    }
}