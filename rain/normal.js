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
			let point=points[i]
			ctx.beginPath()
			ctx.arc(point.sx,point.sy,point.size,Math.PI*2,false)
			ctx.fillStyle="rgba("+point.color+","+255+")"
			ctx.fill()
			point.life--
			if(point.life<=0)
				points.splice(i,1)
			point.sx=point.sx+Math.sin(point.r)*point.sp;
			point.sy=point.sy+Math.cos(point.r)*point.sp;
		}
		if(cnt%10==0){
			if(cnt%50==0)
				sc++;
	    	for(let i=1;i<=10;i++){
		        points.push({
		            sx:Math.random()*canvas.width,
		            sy:0,
		            sp:Math.random()*5+1,
		            r:0,
		            life:2000,
		            color:colors[parseInt(Math.random() * colors.length)],
		            size:10
		        })
			}
	    	for(let i=0;i<5;i++){
	    		let ch=parseInt(Math.random()*points.length);
	    		points[ch].r=Math.atan((mx-points[ch].sx)/(my-points[ch].sy));
                if(my-points[ch].sy<=0)
        			points[ch].r+=Math.PI;
			}
			if(sc%tt==0){
                sc=1;
				t++;
				if(tt>2)
					tt--;
			}
		}
		cnt++;
	}
	setInterval(drawpoints,20)
})();