(function() {  
    'use strict';
    while(document.body.children.length){
		document.body.children[0].remove();
	}
	window.document.body.appendChild(document.createElement("div"))
	var hp=404,t=1,tt=500;
	var canvas = document.createElement("canvas")
	var ctx = canvas.getContext("2d")
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
	canvas.setAttribute('style', 'position:fixed;left:0;top:0;pointer-events:none;filter:blur(2px);')
	window.document.body.appendChild(canvas)
	var clicks = []
	var points = [] //定义粒子数组
	var srolls = [] //定义粒子数组
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
	document.onkeydown= function (evt) { drawpoints();
	}
	var cnt=0;
	function drawpoints(){
	    mx+=(mox-mx)/20;
	    my+=(moy-my)/20;
	    document.body.children[0].innerHTML="<center><h1>"+hp+" Not Found</h1></center>";
	    for (let i = 0; i < points.length; i++){
	        let point=points[i]
	        if(point.life2<3&&Math.pow((mx-(point.sx+point.size/2)),2)+Math.pow((my-(point.sy+point.size/2)),2)<=Math.pow(point.size+5,2)){
	            hp--;
	//            points.splice(i, 1);
	        }
	    }
	    for (let i = 0; i < srolls.length; i++){
	        let point=srolls[i]
	        if(point.life2<3&&Math.pow((mx-(point.sx+point.size/2)),2)+Math.pow((my-(point.sy+point.size/2)),2)<=Math.pow(point.size+5,2)){
	            hp--;
	//            points.splice(i, 1);
	        }
	    }
	    ctx.clearRect(0, 0, canvas.width, canvas.height)
	    ctx.beginPath()
	    ctx.arc(rx, ry, 5, Math.PI * 2, false)
	    ctx.fillStyle = "rgba(255,0,0,1)"
	    ctx.fill()
	     for (let i = 0; i < points.length; i++){
	        let point=points[i]
	        if(point.sx<=0){
	            point.vx=-point.vx;
	        }
	        if(point.sx>=innerWidth){
	            point.vx=-point.vx;
	        }
	        if(point.sy<=0){
	            point.vy=-point.vy;
	        }
	        if(point.sy>=innerHeight){
	            point.vy=-point.vy;
	        }
	    }
	    for (let i = 0; i < srolls.length; i++){
	        let point=srolls[i]
	        if(point.sx<=0){
	            point.vx=-point.vx;
	        }
	        if(point.sx>=innerWidth){
	            point.vx=-point.vx;
	        }
	        if(point.sy<=0){
	            point.vy=-point.vy;
	        }
	        if(point.sy>=innerHeight){
	            point.vy=-point.vy;
	        }
	    }
	    for (let i = 0; i < clicks.length; i++){
	        let point=clicks[i]
	        if(point.sx<=0){
	            point.vx=-point.vx;
	        }
	        if(point.sx>=innerWidth){
	            point.vx=-point.vx;
	        }
	        if(point.sy<=0){
	            point.vy=-point.vy;
	        }
	        if(point.sy>=innerHeight){
	            point.vy=-point.vy;
	        }
	    }
	    for(let i=0;i<points.length;i++){ 
		        if(i>1000){
		            points.splice(i, 1);
		            continue;
		        }
		        let point = points[i]
		        ctx.beginPath()
		        ctx.arc(point.sx, point.sy, point.size, Math.PI * 2, false)
		        ctx.fillStyle="rgba("+point.color+","+255+")"
		        ctx.fill()
		        point.life--
		        if (point.life<=0){
			        if(point.life2){
				        for(let i=0;i<2;i++){
					        points.push({
					            sx: point.sx,
					            sy: point.sy,
					            vx:(point.life2)*(0.5 - Math.random()),
					            vy: (point.life2)*(0.5 - Math.random()),
					            life: live,
					            life2:point.life2-1,
					            color: colors[parseInt(Math.random()*colors.length)],
					            size:point.life2*2+2,
					            rt:0
					        })
					    }
					}
		            points.splice(i, 1)
		        }
		//        point.sx += point.vx * 3
		//        point.sy += point.vy * 3
		        point.rt++;
		}
	    for (let i = 0; i < srolls.length; i++) {
	        if(i>1000){
	            srolls.splice(i, 1);
	            continue;
	        }
	        let sroll = srolls[i]
	        ctx.beginPath()
	        ctx.arc(sroll.sx, sroll.sy, sroll.size, Math.PI * 2, false)
	        ctx.fillStyle = "rgba(" + sroll.color + "," + (sroll.life+50) / live + ")"
	        ctx.fill()
	        sroll.sx += sroll.vx * 10
	        sroll.sy += sroll.vy * 10
	        sroll.life--
	        if (sroll.life <= 0) {
	            if(sroll.life2==2){srolls.push({
	                    sx: sroll.sx,
	                    sy: sroll.sy,
	                   vx: (mx- sroll.sx)/1000,
	                    vy: (my- sroll.sy)/1000,
	//                    vx: (mx-sroll.sx)/200,
	//                    vy: (my-sroll.sy)/200,
	                    life: 200,
	                    life2:1,
	                    color:sroll.color,
	                    size:10,
	                    rt:10
	                })
	        
	            }
	            srolls.splice(i, 1)
	        }
	    }
	    cnt++;
	        srolls.push({
	                    sx: rx,
	                    sy: ry,
	                    vx: Math.sin(tt*Math.PI*2/360),
	                    vy: Math.cos(tt*Math.PI*2/360),
	                    life: live*2,
	                    life2:2,
	                    color:colors[parseInt(Math.random() * colors.length)],
	                    size:5
	                })
	    ctx.beginPath()
	    ctx.arc(mx, my, 5, Math.PI * 2, false)
	    ctx.fillStyle = "rgba(0,0,0,1)"
	    ctx.fill()
	    tt++
	}
})();
