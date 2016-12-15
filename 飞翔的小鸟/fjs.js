var biggest1=document.getElementById("biggest");
var middle1=document.getElementById("middle");
var bird1=document.getElementById("bird1");
var f1=false;
var bird2=document.getElementById("bird2");
var gameoverimg=document.getElementById("gameoverimg"),
    message=document.getElementById("message"),
    submit1=document.getElementById("submit"),
    ok=document.getElementById("ok");

var guandaotimer=null;

var bullet=document.getElementById("bullet"),
    gamemusic=document.getElementById("gamemusic"),
    overmusic=document.getElementById("overmusic");

var nowscore=0;
var bestscore=0;
var fenshu=document.getElementById("fenshu");
var fenshu2=document.getElementById("fenshu2");
var best=document.getElementById("best");



function rand(min, max) {
    return parseInt(Math.random()*(max-min+1)+min);
}

 var fly=setInterval(function () {
     if (f1==false) {
         bird1.style.backgroundImage='url("images/bird0.png")';
         f1=true;
     }else {
         bird1.style.backgroundImage='url("images/bird1.png")';
         f1=false;
     }
 },120);


//界面标题
var head1=document.getElementById("head");
var x=0.6;
setInterval(function () {
    if (head1.offsetTop<150) {
        x=0.6;
    }
    if (head1.offsetTop>170) {
        x=(-0.6);
    }
    head1.style.top=head1.offsetTop+x+"px";
    // console.log(head1.offsetTop);
},40);

//草地
var slider=document.getElementById("slider");
var slidertimer=null;
function slidert() {
    slidertimer=setInterval(function () {
        if (slider.offsetLeft<=-343) {
            slider.style.left=0;
        }
        slider.style.left=slider.offsetLeft-2+"px";
    },30);
}
slidert();


//管道创建
function guandao() {
    guandaotimer=setInterval(function () {
        // clearInterval(clearguandao);
        var divup=document.createElement("div");
        var divdown=document.createElement("div");
        divup.className="divup";
        divdown.className="divdown";
        var h=rand(60,210);//150的空隙
        divup.style.height=h+"px";
        divdown.style.height=423-h-150+"px";
        middle1.appendChild(divup);
        middle1.appendChild(divdown);
    },3000);
}

//开始游戏
var big=false;//只有点击了start，游戏才能开始
start.onclick=function () {
    head1.style.display="none";
    start.style.display="none";
    score.style.display="none";
    bird2.style.display="block";
    fenshu.style.display="block";
    big=true;

    //音乐
    gamemusic.loop="loop";
    gamemusic.play();

    guandao();


    //管道移动//由于移动频率与飞行动画频率相同，因此可以移到下面的飞行中，也方便做判断，但有缺陷，1,每点击一次会关闭打开定时器，有一定卡顿，时间很短几乎看不出来,2,鸟在碰撞到顶端或管道时，在下落过程中管道仍然向前移动，直到清除了飞行动画为止(接触到底端)，可以重写一个定时器解决(我感觉没有必要)
    // yingdong=setInterval(function () {
    //     var divupc=document.getElementsByClassName("divup");
    //     var divdownc=document.getElementsByClassName("divdown");
    //     for (var i=0;i<divupc.length;i++) {
    //         divupc[i].style.left=divupc[i].offsetLeft-2+"px";
    //         if (divupc[i].offsetLeft<=-62) {
    //             divupc[i].style.display="none";
    //         }
    //     }
    //     for (var j=0;j<divdownc.length;j++) {
    //         divdownc[j].style.left=divdownc[j].offsetLeft-2+"px";
    //         if (divdownc[j].offsetLeft<=-62) {
    //             divdownc[j].style.display="none";
    //         }
    //     }
    //
    // },30);


};

//游戏主体

var flyup=null;
var big2=true;
var flyuptimer=null;
var flydowntimer=null;
var flyflage=true;

biggest1.onclick=function () {
    if (big&&big2) {
        bullet.play();
        //清除定时器
        clearInterval(fly);
        clearInterval(flyup);
        clearInterval(flyuptimer);
        clearInterval(flydowntimer);


        //上升动画
        clearInterval(flydowntimer);
        flyuptimer=setInterval(function () {
            if (flyflage) {
                bird2.style.backgroundImage='url("images/up_bird1.png")';
                flyflage=false;
            }else {
                bird2.style.backgroundImage='url("images/up_bird0.png")';
                flyflage=true;
            }
        },12);

        //飞行
        var speed=10;
        flyup=setInterval(function () {
            //运动方程
            speed--;
            bird2.style.top=bird2.offsetTop-speed+"px";

            //下降动画
            if (speed==0) {
                clearInterval(flyuptimer);
                flydowntimer=setInterval(function () {
                    if (flyflage) {
                        bird2.style.backgroundImage='url("images/down_bird1.png")';
                        flyflage=false;
                    }else {
                        bird2.style.backgroundImage='url("images/down_bird0.png")';
                        flyflage=true;
                    }
                },12)
            }



            //触碰地板
            if (bird2.offsetTop>=397) {
                gameover1();
                clearInterval(flyup);
                bird2.style.top="397px";
            }
            //触碰顶端
            if (bird2.offsetTop<=0) {
                gameover1();
            }

            var bt=bird2.offsetTop;//鸟到顶端高度

            //碰撞到顶端与管道
            function gameover1() {
                clearInterval(flyuptimer);
                clearInterval(flydowntimer);
                clearInterval(slidertimer);
                clearInterval(guandaotimer);
                speed=-10;
                bird2.style.backgroundImage='url("images/down_bird0.png")';
                big2=false;
                overmusic.play();
                gamemusic.pause();
                gameoverimg.style.display="block";
                message.style.display="block";
                submit1.style.display="block";
                ok.style.display="block";
                fenshu.style.display="none";
            }

            //管道移动
            var divupc=document.getElementsByClassName("divup");
            var divdownc=document.getElementsByClassName("divdown");
            //上管道
            for (var i=0;i<divupc.length;i++) {
                divupc[i].style.left=divupc[i].offsetLeft-2+"px";
                //碰撞判断，管道碰鸟
                if (divupc[i].offsetLeft>22&&divupc[i].offsetLeft<120&&divupc[i].offsetHeight>bt) {
                    gameover1();
                }
                //记录分数
                if (divupc[i].offsetLeft==50) {
                    nowscore++;
                    fenshu.innerHTML=nowscore;
                    fenshu2.innerHTML=nowscore;
                    if (nowscore>bestscore) {
                        bestscore=nowscore;
                        best.innerHTML=bestscore;
                    }
                }

                //去除上管道
                if (divupc[i].offsetLeft<=-62) {
                    middle1.removeChild(divupc[i]);
                }
            }

            //下管道
            for (var j=0;j<divdownc.length;j++) {
                divdownc[j].style.left=divdownc[j].offsetLeft-2+"px";
                //判断碰撞
                if (divdownc[j].offsetLeft>22&&divdownc[j].offsetLeft<120&&divdownc[j].offsetTop<(bt+26)) {
                    gameover1();
                }

                //去除下管道
                if (divdownc[j].offsetLeft<=-62) {
                    middle1.removeChild(divdownc[j]);
                }
            }

        },30);
    }
};

//重新开始

ok.onclick=function () {



    middle1.innerHTML="";

    big=true;
    big2=true;
    gamemusic.play();
    guandao();
    slidert();
    bird2.style.left="80px";
    bird2.style.top="200px";
    nowscore=0;
    fenshu.innerHTML=nowscore;
    fenshu2.innerHTML=nowscore;
    gameoverimg.style.display="none";
    message.style.display="none";
    submit1.style.display="none";
    ok.style.display="none";
    fenshu.style.display="block";
};



