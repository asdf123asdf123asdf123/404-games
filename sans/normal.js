(function() { 
    'use strict';
while(document.body.children.length){
	document.body.children[0].remove();
}
window.document.body.appendChild(document.createElement("div"))
var hp=404,t=1,tt=10,sc=0;
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
var mx=innerWidth/2,my=innerHeight/2,mox=0,moy=0;
var rx=innerWidth/2,ry=innerHeight/2
window.addEventListener("mousemove", function (evt) { //监听点击事件
    mox=evt.x;
    moy=evt.y;
})
var jp=0,g=0,nowjp=25,on=0;
window.addEventListener("mousedown", function (evt) { //监听点击事件
	on=1;
})
window.addEventListener("mouseup", function (evt) { //监听点击事件
	on=0;
    jp=0;
})
var cnt=0;
function drawpoints() { //绘制粒子
    document.body.children[0].innerHTML="<center><h1>"+hp+" Not Found</h1></center><hr><center>score/"+t+"."+sc+" (Games)</center>";
    if(hp<=0){
    	return
	}
	if(Math.abs((mox-mx)/10)<=20)
		mx+=(mox-mx)/10;
	else
		if(mx<=mox)
			mx+=20;
		else
			mx-=20;
    my+=g;
    g+=1;
    my=Math.min(my,innerHeight)
    if(jp&&on){
        my-=nowjp
        nowjp-=1;
    }
    if(my==innerHeight){
        jp=1;
        g=0;
        nowjp=35;
    }
    for (let i = 0; i < points.length; i++){
        let point=points[i]
        if(Math.pow((mx-(point.sx+point.size/2)),2)+Math.pow((my-(point.sy+point.size/2)),2)<=Math.pow(point.size+5,2))
            hp--;
    }
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
    ctx.clearRect(0, 0, canvas.width, canvas.height) //清屏
    ctx.beginPath()
    ctx.arc(mx, my, 5, Math.PI * 2, false) //根据粒子属性画圆
    ctx.fillStyle = "rgba(0,0,255,1)" //根据粒子属性设置填充颜色及透明度
    ctx.fill() //填充颜色
    for (let i = 0; i < points.length; i++) { //遍历粒子
        let point = points[i] //定义单个粒子
        ctx.beginPath()
        ctx.arc(point.sx, point.sy, point.size, Math.PI * 2, false) //根据粒子属性画圆
        ctx.fillStyle = "rgba(" + point.color + "," + 255 + ")" //根据粒子属性设置填充颜色及透明度
        ctx.fill() //填充颜色
        point.life-- //生命值减1
        point.sx += point.vx * 3 //根据向量值改变粒子位置
        point.sy += point.vy * 3
    }
    if(cnt%50==0){
        sc++;
		for(let i=innerHeight-100-t;i<=innerHeight;i+=10){
	        points.push({
	            sx: innerWidth-1,
	            sy: i,
                vx: -2,
                vy: 0,
	            color:colors[parseInt(Math.random() * colors.length)],
	            size:10
	        })
	        points.push({
	            sx: 1,
	            sy: i,
                vx: 2,
                vy: 0,
	            color:colors[parseInt(Math.random() * colors.length)],
	            size:10
	        })
	        points.push({
	            sx: innerWidth-1,
	            sy: i,
                vx:-5,
                vy:0,
	            color:colors[parseInt(Math.random() * colors.length)],
	            size:10
	        })
	        points.push({
	            sx: 1,
	            sy: i,
                vx:5,
                vy:0,
	            color:colors[parseInt(Math.random() * colors.length)],
	            size:10
	        })
		}
		for(let i=mx-100;i<=mx+100;i+=10){
	        points.push({
	            sx: i,
	            sy: 0,
                vx: 0,
                vy: 10,
	            color:colors[parseInt(Math.random() * colors.length)],
	            size:10
	        })
		}
		if(sc%tt==0){
			t++;
			if(tt>2){
				tt--;
			}
		}
	}cnt++;
}
setInterval(drawpoints, 20) //20毫秒绘制一次
document.body.onselectstart = function () {
    return false;
};
})();
