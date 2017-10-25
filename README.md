## 人机对战五子棋

在这个游戏里，玩家默认是黑棋先手，以后会逐步改进玩家可以选择棋子。

基本算法教程：http://www.imooc.com/learn/644
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

我是这么想的，先定义4个变量，保存每次落子时，黑子和白子最后的位置，点击悔棋按钮时，用画布擦除这两个点，并补齐网格，还要记得将赢法统计数组的值回退到上一步。
```
//悔棋时黑子下棋坐标
var bx = 0, by = 0;
//悔棋时白棋下棋坐标
var wx = 0, wy = 0;

```
```
//减去悔棋位置的赢法
    for (var k = 0; k < count; k++) {
        if (wins[bx][by][k]) {
            myWin[k]--;
            computerWin[k] = cWinValue;
        }
        if (wins[wx][wy][k]) {
            computerWin[k]--;
            myWin[k] = myWinValue;
        }
    }
```    

### 撤销悔棋功能

通过bx,by,wx,wy将棋子在画上去就行，记得更新赢法统计数组的值。

### 其他

[极大极小值实现AI五子棋](https://github.com/lihongxun945/gobang)

### 总结

其实有算法讲解，这个游戏并不是很难，主要注意的就是这几个按钮，尤其是“开始”按钮，这里出现的bug比较多。
游戏基本完成了，接下来打算将这个游戏改造成面向对象开发，因为平时接触面向对象比较少，都是别写边想下一步干什么面向过程的开发。为了防止出错，所有线提交到远程仓库里，= =！。



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

我是这么想的，先定义4个变量，保存每次落子时，黑子和白子最后的位置，点击悔棋按钮时，用画布擦除这两个点，并补齐网格，还要记得将赢法统计数组的值回退到上一步。
```
//悔棋时黑子下棋坐标
var bx = 0, by = 0;
//悔棋时白棋下棋坐标
var wx = 0, wy = 0;

```
```
//减去悔棋位置的赢法
    for (var k = 0; k < count; k++) {
        if (wins[bx][by][k]) {
            myWin[k]--;
            computerWin[k] = cWinValue;
        }
        if (wins[wx][wy][k]) {
            computerWin[k]--;
            myWin[k] = myWinValue;
        }
    }
```    

### 撤销悔棋功能

通过bx,by,wx,wy将棋子在画上去就行，记得更新赢法统计数组的值。

###其他

[极大极小值实现AI五子棋](https://github.com/lihongxun945/gobang)

### 总结

其实有算法讲解，这个游戏并不是很难，主要注意的就是这几个按钮，尤其是“开始”按钮，这里出现的bug比较多。
游戏基本完成了，接下来打算将这个游戏改造成面向对象开发，因为平时接触面向对象比较少，都是别写边想下一步干什么面向过程的开发。为了防止出错，所有线提交到远程仓库里，= =！。


