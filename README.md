## 人机对战五子棋

在这个游戏里，玩家默认是黑棋先手，以后会逐步改进玩家可以选择棋子。

游戏地址：https://xiamuqing.github.io/easygobang/

基本算法教程：http://www.imooc.com/learn/644

上面的教程中包括了简易五子棋的基本算法，大家有空可以学习一下，如果看不懂老师的赢法数组，其实可以手动画几个循环，很快就能明白。

以下三个功能是我自己写的

### 开始功能

根据是否有点击了开始按钮，和棋盘上是否有棋子来判断是否有弹出框提示。

```
//棋盘上是否有子
var haveChess = false;
//是否点击了开始按钮
var startBtn = false;
```
```
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
```


### 悔棋功能

我是这么想的，先定义4个变量，保存每次落子时，黑子和白子最后的位置，然后定义两个数组，保存赢法统计数组的值。点击悔棋按钮时，用画布擦除这两个点，并补齐网格，还要记得将赢法统计数组的值回退到上一步。
```
//悔棋时黑子下棋坐标
var bx = 0, by = 0;
//悔棋时白棋下棋坐标
var wx = 0, wy = 0;

//保存点击悔棋按钮之前赢法统计数组(computerWin,myWin)的值
var oldcWin = [], oldmyWin = [];
//保存点击撤销悔棋按钮之前赢法统计数组(computerWin,myWin)的值
var newcWin = [], newmyWin = [];

```
```
//减去悔棋位置的赢法
//这一步用数组的深拷贝
    myWin= oldmyWin.concat();
    computerWin= oldcWin.concat();
    //这一步是为了解决测试中出现四子悔棋再下同一地方弹出玩家胜利的bug
     for(var k =0 ;k<count;k++){
            if(wins[bx][by][k]){
                if(myWin[k] ==4){
                    myWin[k]--;
                }
            }
        }
```    

### 撤销悔棋功能

通过bx,by,wx,wy将棋子在画上去就行，记得更新赢法统计数组的值。

### 其他

[极大极小值实现AI五子棋](https://github.com/lihongxun945/gobang)

### 总结

其实有算法讲解，这个游戏并不是很难，主要注意的就是这几个按钮，尤其是“开始”按钮，这里出现的bug比较多。
游戏基本完成了，接下来打算将这个游戏改造成面向对象开发，因为平时接触面向对象比较少，都是别写边想下一步干什么面向过程的开发。为了防止出错，所有先提交到远程仓库里，= =！。

***
2017.10.28修改部分
### 面向对象开发
使用面向对象开发，增加加代码的灵活性和扩展性，使得代码整洁明了。

```
var gbObj={
    //五子棋的父元素的id
    parent:'gobangBox',
    //棋盘width
    width:600,
    //棋子半径
    radius:20
}
//五子棋实例
var goBang = new GoBang(gbObj);
   
```
```
//GoBang对象
function GoBang(obj){
   var parent = document.getElementById(obj.parentID);
   var width = obj.width;
   var radius = obj.radius;
   this.init(parent , width,radius);
}
```
```
//替换原型对象实现继承
GoBang.prototype = {
    constructor:GoBang,
    init:function(parent , width,radius){
        //给页面插入元素
        this.initElements(parent,width);
        //渲染棋盘
        this.newGame(width,radius);
        // //绑定事件
        this.bindEvents(radius,width);
    },
    ...
}    
```