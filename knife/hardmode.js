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
	var lines=[],points=[]
	var colors=[
		"236, 204, 104",
		"255, 71, 87",
		"112, 161, 255",
		"123, 237, 159"
	]
	var mx=innerWidth/2,my=innerHeight/2,mox=innerWidth/2+1,moy=innerHeight/2+1;
	window.addEventListener("mousemove",function(evt){
		mox=evt.x;
		moy=evt.y;
	})
	var cnt=0;
	function drawpoints(){
		document.body.children[0].innerHTML="<center><h1>"+hp+" Not Found</h1></center><hr><center>score/"+t+"."+sc+" (Games)</center>";
		if(hp<=0)
			return;
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
				hp-=t;
		}
		ctx.clearRect(0,0,canvas.width,canvas.height)
		ctx.beginPath()
		ctx.arc(mx,my,5,Math.PI*2,false)
		ctx.fillStyle="rgba(0,0,0,1)"
		ctx.fill()
		for(let i=0;i<points.length;i++){
			let point=points[i];
			ctx.beginPath();
			ctx.arc(point.sx,point.sy,point.size,Math.PI*2,false);
			ctx.fillStyle="rgba("+point.color+",1)";
			ctx.fill();
			point.life--;
			if(point.life<=0)
				points.splice(i,1);
		}
		for(let i=0;i<lines.length;i++){
			let line=lines[i];
			ctx.beginPath();
			ctx.moveTo(line.sx-20*Math.cos(line.r),line.sy-20*Math.sin(line.r));
			ctx.lineTo(line.sx+20*Math.cos(line.r),line.sy+20*Math.sin(line.r));
			ctx.moveTo(line.sx-20*Math.cos(line.r+Math.PI/3),line.sy-20*Math.sin(line.r+Math.PI/3));
			ctx.lineTo(line.sx+20*Math.cos(line.r+Math.PI/3),line.sy+20*Math.sin(line.r+Math.PI/3));
			ctx.moveTo(line.sx-20*Math.cos(line.r+Math.PI/3*2),line.sy-20*Math.sin(line.r+Math.PI/3*2));
			ctx.lineTo(line.sx+20*Math.cos(line.r+Math.PI/3*2),line.sy+20*Math.sin(line.r+Math.PI/3*2));
			ctx.strokeStyle="rgba(255,0,0,"+(50-line.life)/50+")";
			ctx.stroke();
			line.life--;
			if(line.life<=0){
				lines.splice(i,1);
				for(let x=-200;x<=200;x++){
					points.push({
						sx:line.sx+x*Math.cos(line.r)*5,
						sy:line.sy+x*Math.sin(line.r)*5,
						size:10,
						life:62.5,
						color:colors[parseInt(Math.random()*colors.length)],
					});
					points.push({
						sx:line.sx+x*Math.cos(line.r+Math.PI/3)*5,
						sy:line.sy+x*Math.sin(line.r+Math.PI/3)*5,
						size:10,
						life:37.5,
						color:colors[parseInt(Math.random()*colors.length)],
					});
					points.push({
						sx:line.sx+x*Math.cos(line.r+Math.PI/3*2)*5,
						sy:line.sy+x*Math.sin(line.r+Math.PI/3*2)*5,
						size:10,
						life:37.5,
						color:colors[parseInt(Math.random()*colors.length)],
					});
				}
			}
			line.r+=line.sp;
			line.sx+=(mx-line.sx)/50;
			line.sy+=(my-line.sy)/50;
		}
		if(cnt%25==0){
			lines.push({
				sx:mx,
				sy:my,
				sp:Math.PI/8*Math.random()-Math.PI/16,
				r:Math.PI*2*Math.random(),
				life:50,
			});
			t++;
		}
		cnt++;
	}
	setInterval(drawpoints,20);
})();
