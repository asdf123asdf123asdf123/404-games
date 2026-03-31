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
var points = []
var life = 50
var colors = [
    "236, 204, 104",
    "255, 71, 87",
    "112, 161, 255",
    "123, 237, 159"
]
var mx=1,my=1,mox=0,moy=0;
var rx=innerWidth/2,ry=innerHeight/2
window.addEventListener("mousemove", function (evt) {
    mox=evt.x;
    moy=evt.y;
})
var cnt=0;
function drawpoints() {
    document.body.children[0].innerHTML="<center><h1>"+hp+" Not Found</h1></center><hr><center>score/"+t+"."+(sc-1)+" (Games)</center>";
    if(hp<=0){
    	return
	}
	mx+=(mox-mx)/10;
	my+=(moy-my)/10;
    for (let i = 0; i < points.length; i++){
        let point=points[i]
        if(Math.pow((mx-(point.sx+point.size/2)),2)+Math.pow((my-(point.sy+point.size/2)),2)<=Math.pow(point.size+5,2))
            hp--;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath()
    ctx.arc(mx, my, 5, Math.PI * 2, false)
    ctx.fillStyle = "rgba(0,0,0,1)"
    ctx.fill()
    ctx.beginPath()
    ctx.arc(rx, ry, 5, Math.PI * 2, false)
    ctx.fillStyle = "rgba(255,0,0,1)"
    ctx.fill()
    for (let i = 0; i < points.length; i++) {
        let point = points[i]
        ctx.beginPath()
        ctx.arc(point.sx, point.sy, point.size, Math.PI * 2, false) 
        ctx.fillStyle = "rgba(" + point.color + "," + 255 + ")"
        ctx.fill()
        point.life--
        if (point.life <= 0) {
            points.splice(i, 1)
        }
        var deg=Math.atan((point.tx-point.sx)/(point.ty-point.sy));
        if(point.ty-point.sy<=0)
			deg+=Math.PI;
        if(point.life>=life&&point.life<=life*4){
    	    point.tx=mx;
	        point.ty=my;
		}
		else{
            point.tx+=point.sp*Math.sin(deg);
            point.ty+=point.sp*Math.cos(deg);
        }
        point.sx += point.sp*Math.sin(deg)
        point.sy += point.sp*Math.cos(deg)
    }
    cnt++;
    if(cnt%50<t){
	    points.push({
	        sx: rx,
	        sy: ry,
	        tx: mx,
	        ty: my,
	        sp: Math.max(60*t/(t+10),t*5),
	        life: life*5,
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
setInterval(drawpoints, 20)
})();
