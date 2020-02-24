var xr={
	bones: [
		{
			name:"none",
			pivot: [0, 0, 0],
			cubes: [
				
			]
		}
	]
}
var block={origin: [], size: [], uv: []};
/*matches*/
var cubtop=0;
const MeoWS = require('meowslib');
var uvstd=require("./uv.js");
var fs=require('fs');
const WSServer = MeoWS.WSServer;
const BuildSession = MeoWS.BuildSession;
let wss = new WSServer(23333);
var sizeu=[0,0,0];
var bodyname;
var ex1,ey1,ez1,ex2,ey2,ez2,ux,uy,uz,url;
wss.on('client', (session, request) => {
	console.log(request.connection.remoteAddress + ' connected!');
	BuildSession.createAndBind(session);
	session.on('onMessage',(msg, player)=>{
		if(msg=="get"){
			session.sendCommand("testforblock ~~~ air",(back)=>{
            	ux=back.position.x;
				uy=back.position.y;
				uz=back.position.z;
				session.tellraw(`get:${ux},${uy},${uz}`);
            });
		}else if(msg=="geta"){
            session.sendCommand("testforblock ~~~ air",(back)=>{
                ex1=back.position.x;
				ey1=back.position.y;
				ez1=back.position.z;
				session.tellraw(`e1:${ex1},${ey1},${ez1}`);
            });
        }else if(msg=="getb"){
            session.sendCommand("testforblock ~~~ air",(back)=>{
                ex2=back.position.x;
				ey2=back.position.y;
				ez2=back.position.z;
				session.tellraw(`e2:${ex2},${ey2},${ez2}`);
            });
        }else if(msg=="export"){
			xr.bones.name=bodyname;
			var sl=0,now=0;
			for(let x=ex1;(ex2>ex1)?x<=ex2:x>=ex2;(ex2>ex1)?x++:x--)
				for(let y=ey1;(ey2>ey1)?y<=ey2:y>=ey2;(ey2>ey1)?y++:y--)
					for(let z=ez1;(ez2>ez1)?z<=ez2:z>=ez2;(ez2>ez1)?z++:z--)
						sl++;
			console.log(`数量:${sl}`);
			for(let x=ex1;(ex2>ex1)?x<=ex2:x>=ex2;(ex2>ex1)?x++:x--)
				for(let y=ey1;(ey2>ey1)?y<=ey2:y>=ey2;(ey2>ey1)?y++:y--)
					for(let z=ez1;(ez2>ez1)?z<=ez2:z>=ez2;(ez2>ez1)?z++:z--){
						now++;
						console.log(`${now}/${sl}`)
						session.sendCommand(`testforblock ${x} ${y} ${z} air`,(back)=>{
							if(back.matches=false){
								block.origin=[ux-x,uy-y,uz-z];
								block.size=sizeu;
								let blockname=bacl.statusMessage.split[3];
								block.uv=uvstd[blockname];
								xr.bones.cubes[cubtop++]=block;
							}
						});
					}
			fs.appendFile(url,JSON.stringify(xr),()=>{});
			session.tellraw(`done:[${url}]`);
		}else{
			let spl=msg.split(" ");
			if(spl[0]=="size"){
				sizeu=[spl[1]*1.0,spl[2]*1.0,spl[3]*1.0];
				session.tellraw(`size:[${sizeu[0]},${sizeu[1]},${sizeu[2]}]`);
			}
			if(spl[0]=="bodyname"){
				bodyname=spl[1];
				session.tellraw(`bodyname:[${bodyname}]`);
			}
			if(spl[0]=="url"){
				url=spl[1];
				session.tellraw(`url:[${url}]`);
			}
		}
	});
});