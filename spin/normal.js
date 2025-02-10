(function() {
    'use strict';
	while(document.body.children.length)
		document.body.children[0].remove();
	window.document.body.appendChild(document.createElement("div"))
	var hp=404,t=2,tt=10,sc=0;
	var canvas=document.createElement("canvas")
	var ctx=canvas.getContext("2d")
	window.document.body.appendChild(canvas)
	canvas.width=window.innerWidth
	canvas.height=window.innerHeight
	canvas.setAttribute('style', 'position:fixed;left:0;top:0;pointer-events:none;filter:blur(2px);')
	var points=[]
	var fpoints=[]
	var colors=[
		"236, 204, 104",
		"255, 71, 87",
		"112, 161, 255",
		"123, 237, 159"
	]
	var mx=innerWidth/2,my=innerHeight/2,mox=0,moy=0;
	window.addEventListener("mousemove",function(evt){
		mox=evt.x;
		moy=evt.y;
	})
	var cnt=0;
	function drawpoints(){
		document.body.children[0].innerHTML="<center><h1>"+hp+" Not Found</h1></center><hr><center>score/"+t+"."+sc+" (Games)</center>";
		if(hp<=0)
			return
		var deg=Math.atan((mox-mx)/(moy-my));
		if(moy-my<=0)
			deg+=Math.PI;
		if(Math.abs((mox-mx)/10)<Math.abs(20*Math.sin(deg)))
			mx+=(mox-mx)/10;
		else
			mx+=20*Math.sin(deg);
		if(Math.abs((moy-my)/10)<Math.abs(20*Math.cos(deg)))
			my+=(moy-my)/10;
		else
			my+=20*Math.cos(deg);
		for (let i=0;i<points.length;i++){
			let point=points[i]
			if(Math.pow((mx-(point.sx+point.size/2)),2)+Math.pow((my-(point.sy+point.size/2)),2)<=Math.pow(point.size+5,2))
				hp--;
		}
		for (let i=0;i<fpoints.length;i++){
			let point=fpoints[i]
			if(Math.pow((mx-(point.sx+point.size/2)),2)+Math.pow((my-(point.sy+point.size/2)),2)<=Math.pow(point.size+5,2))
				hp--;
		}
		ctx.clearRect(0,0,canvas.width,canvas.height)
		ctx.beginPath()
		ctx.arc(mx,my,5,Math.PI*2,false)
		ctx.fillStyle="rgba(0,0,0,1)"
		ctx.fill()
		for(let i=0;i<points.length;i++){
			let point=points[i]
			ctx.beginPath()
			ctx.arc(point.sx,point.sy,point.size,Math.PI*2,false)
			ctx.fillStyle="rgba("+point.color+","+255+")"
			ctx.fill()
			point.life--
			if(point.life<=0)
				points.splice(i,1)
			point.r+=Math.PI/12;
			point.tx+=point.vtx
			point.ty+=point.vty
			point.sx=point.tx+Math.sin(point.r)*point.dis;
			point.sy=point.ty+Math.cos(point.r)*point.dis;
			if(cnt%10==0){
				fpoints.push({
					dis:len,
					sx:point.sx,
					sy:point.sy,
					vx:-Math.sin(point.r)*point.dis/10,
					vy:-Math.cos(point.r)*point.dis/10,
					life: 500,
					color:colors[parseInt(Math.random() * colors.length)],
					size:10
				})
			}
		}
		for(let i=0;i<fpoints.length;i++){
			let point=fpoints[i]
			ctx.beginPath()
			ctx.arc(point.sx,point.sy,point.size,Math.PI*2,false)
			ctx.fillStyle="rgba("+point.color+","+255+")"
			ctx.fill()
			point.life--
			if(point.life<=0)
				fpoints.splice(i,1)
			point.sx+=point.vx;
			point.sy+=point.vy;
		}
		if(cnt%50==0){
			sc++;
			for(let i=1;i<=t;i++){
				var len=Math.random()*50+50,vx,vy,deg=Math.random()*2*Math.PI,sx,sy;
				if(parseInt(Math.random()+0.5)){
					sx=Math.random()*innerWidth
					sy=parseInt(Math.random()+0.5)*innerHeight
					if(sy==0){
						vx=Math.random()*10-5
						vy=Math.random()*10
					}
					else{
						vx=Math.random()*10-5
						vy=-Math.random()*10
					}
				}
				else{
					sx=parseInt(Math.random()+0.5)*innerWidth
					sy=Math.random()*innerHeight
					if(sx==0){
						vx=Math.random()*10
						vy=Math.random()*10-5
					}
					else{
						vx=-Math.random()*10
						vy=Math.random()*10-5
					}
				}
				for(let i=1;i<=t;i++){
					points.push({
						dis:len,
						r:deg,
						sx:sx+Math.sin(deg)*len,
						sy:sy+Math.cos(deg)*len,
						tx:sx,
						ty:sy,
						vtx:vx,
						vty:vy,
						life: 500,
						color:colors[parseInt(Math.random() * colors.length)],
						size:10
					})
					deg+=2*Math.PI/t
				}
			}
			if(sc%tt==0){
				t++;
				if(tt>2)
					tt--;
			}
		}
		cnt++;
	}
	setInterval(drawpoints,20)
})();
