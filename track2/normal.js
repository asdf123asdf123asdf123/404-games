(function() {
    'use strict';
while(document.body.children.length){
	document.body.children[0].remove();
}
window.document.body.appendChild(document.createElement("div"))
var hp=404,t=1,tt=10,sc=1;
var canvas = document.createElement("canvas")
var ctx = canvas.getContext("2d")
window.document.body.appendChild(canvas)
canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas.setAttribute('style', 'position:fixed;left:0;top:0;pointer-events:none;filter:blur(2px);')
var points = [] //定义粒子数组
var live = 50 //存活50个周期
var colors = [ //备选粒子颜色数组
    "236, 204, 104",
    "255, 71, 87",
    "112, 161, 255",
    "123, 237, 159"
]
var mx=1,my=1,mox=0,moy=0;
var rx=innerWidth/2,ry=innerHeight/2
window.addEventListener("mousemove", function (evt) { //监听点击事件
    mox=evt.x;
    moy=evt.y;
})
var cnt=0;
function drawpoints() { //绘制粒子
    document.body.children[0].innerHTML="<center><h1>"+hp+" Not Found</h1></center><hr><center>score/"+t+"."+(sc-1)+" (Games)</center>";
    if(hp<=0){
    	return
	}
	var deg=Math.atan((mox-mx)/(moy-my));
	if(moy-my<=0)
		deg+=Math.PI;
	if(Math.abs((mox-mx)/10)<Math.abs(20*Math.sin(deg))){
		mx+=(mox-mx)/10;
	}
	else{
		mx+=20*Math.sin(deg);
	}
	if(Math.abs((moy-my)/10)<Math.abs(20*Math.cos(deg))){
		my+=(moy-my)/10;
	}
	else{
		my+=20*Math.cos(deg);
	}
    for (let i = 0; i < points.length; i++){
        let point=points[i]
        if(Math.pow((mx-(point.sx+point.size/2)),2)+Math.pow((my-(point.sy+point.size/2)),2)<=Math.pow(point.size+5,2))
            hp--;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height) //清屏
    ctx.beginPath()
    ctx.arc(mx, my, 5, Math.PI * 2, false) //根据粒子属性画圆
    ctx.fillStyle = "rgba(0,0,0,1)" //根据粒子属性设置填充颜色及透明度
    ctx.fill() //填充颜色
    ctx.beginPath()
    ctx.arc(rx, ry, 5, Math.PI * 2, false) //根据粒子属性画圆
    ctx.fillStyle = "rgba(255,0,0,1)" //根据粒子属性设置填充颜色及透明度
    ctx.fill() //填充颜色
     for (let i = 0; i < points.length; i++){
        let point=points[i]
        if(point.sx<=0){
            points.splice(i, 1)
        }
        if(point.sx>=innerWidth){
            points.splice(i, 1)
        }
        if(point.sy<=0){
            points.splice(i, 1)
        }
        if(point.sy>=innerHeight){
            points.splice(i, 1)
        }
    }
    for (let i = 0; i < points.length; i++) { //遍历粒子
        let point = points[i] //定义单个粒子
        ctx.beginPath()
        ctx.arc(point.sx, point.sy, point.size, Math.PI * 2, false) //根据粒子属性画圆
        ctx.fillStyle = "rgba(" + point.color + "," + 255 + ")" //根据粒子属性设置填充颜色及透明度
        ctx.fill() //填充颜色
        point.life-- //生命值减1
        if (point.life <= 0) { //生命值为0则从粒子数组中删除
            points.splice(i, 1)
        }
        var deg=Math.atan((point.tx-point.sx)/(point.ty-point.sy));
        if(point.ty-point.sy<=0)
			deg+=Math.PI;
        if(point.life>=live*2){
    	    point.tx=rx;
	        point.ty=ry;
		}
		else{
			point.tx+=point.sp*Math.sin(deg);
			point.ty+=point.sp*Math.cos(deg);
		}
        point.sx += point.sp*Math.sin(deg)
        point.sy += point.sp*Math.cos(deg)
    }
    var deg=Math.atan((mx-rx)/(my-ry));
    if(my-ry<=0)
    	deg+=Math.PI;
    rx += 5*Math.sin(deg)
    ry += 5*Math.cos(deg)
    cnt++;
    if(cnt%50<t){
	    points.push({
	        sx: rx,
	        sy: ry,
	        tx: rx+Math.random()*10-5,
	        ty: ry+Math.random()*10-5,
	        sp: 60*t/(t+10),
	        life: live*5,
	        color:colors[parseInt(Math.random() * colors.length)],
	        size:10
	    })
	}
    if(cnt%50==0){
	    sc++;
		if(sc%5==0)
			t++;
	}
	tt+=7;
}
setInterval(drawpoints, 20) //20毫秒绘制一次
    // Your code here...
})();
