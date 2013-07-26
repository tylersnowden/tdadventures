//set main namespace 
goog.provide('td');   

//get requirements 
goog.require('lime.Director'); 
goog.require('lime.Scene'); 
goog.require('lime.Layer');   
goog.require('lime.fill.Frame');
goog.require('lime.SpriteSheet');
goog.require('lime.animation.KeyframeAnimation');
goog.require('lime.animation.Easing');

//entrypoint 
td.start = function(){          
    var director = new lime.Director(document.body,640,1010);     
    director.makeMobileWebAppCapable();     
    director.setDisplayFPS(false);          
    var mapScene = new lime.Scene();
	var mapLayer = new lime.Layer().setPosition(0,0).setRenderer(lime.Renderer.CANVAS).setAnchorPoint(0,0);

	var gameMap = new lime.Sprite().setSize(640,1010).setFill('img/sandbg.png').setPosition(0,0).setAnchorPoint(0,0);
	
	var daniel_animations = {
		down_idle: [
		  new lime.fill.Frame('img/daniel.png', 37, 94, 34, 46)
		],
		up_idle: [
		  new lime.fill.Frame('img/daniel.png', 37, 0, 34, 46)
		],
		left_idle: [
		  new lime.fill.Frame('img/daniel.png', 37, 146, 34, 46)
		],
		right_idle: [
		  new lime.fill.Frame('img/daniel.png', 37, 48, 34, 46)
		],
		right: [
		  new lime.fill.Frame('img/daniel.png', 0, 48, 34, 46), 
		  new lime.fill.Frame('img/daniel.png', 37, 48, 34, 46), 
		  new lime.fill.Frame('img/daniel.png', 74, 48, 34, 46), 
		  new lime.fill.Frame('img/daniel.png', 37, 48, 34, 46)
		],
		down: [
		  new lime.fill.Frame('img/daniel.png', 0, 94, 34, 46), 
		  new lime.fill.Frame('img/daniel.png', 37, 94, 34, 46), 
		  new lime.fill.Frame('img/daniel.png', 74, 94, 34, 46), 
		  new lime.fill.Frame('img/daniel.png', 37, 94, 34, 46)
		],
		left: [
		  new lime.fill.Frame('img/daniel.png', 0, 146, 34, 46), 
		  new lime.fill.Frame('img/daniel.png', 37, 146, 34, 46), 
		  new lime.fill.Frame('img/daniel.png', 74, 146, 34, 46), 
		  new lime.fill.Frame('img/daniel.png', 37, 146, 34, 46)
		],
		up: [
		  new lime.fill.Frame('img/daniel.png', 0, 0, 34, 46), 
		  new lime.fill.Frame('img/daniel.png', 37, 0, 34, 46), 
		  new lime.fill.Frame('img/daniel.png', 74, 0, 34, 46), 
		  new lime.fill.Frame('img/daniel.png', 37, 0, 34, 46)
		]
	};
	
	var daniel = new lime.Sprite().setSize(34,46).setFill(daniel_animations.down_idle[0]).setPosition(300,300);   
	var daniel_lbl = new lime.Label().setText('Daniel').setPosition(300,330).setFontFamily('Verdana').setFontColor('#fff').setFontSize(14).setFontWeight('bold');
	var daniel_lbl_shadow = new lime.Label().setText('Daniel').setPosition(301,331).setFontFamily('Verdana').setFontColor('#000').setFontSize(14).setFontWeight('bold');
	
	goog.events.listen(gameMap, ['mousedown','touchstart'], function(e) {   
		var speed = goog.math.Coordinate.distance(e.position, daniel.getPosition()) / 100;
		var movement = new lime.animation.MoveTo(e.position.x,e.position.y).setDuration(speed).setEasing(lime.animation.Easing.LINEAR); 
		var movement_lbl = new lime.animation.MoveTo(e.position.x,e.position.y+30).setDuration(speed).setEasing(lime.animation.Easing.LINEAR);	
		var movement_lbl_shadow = new lime.animation.MoveTo(e.position.x+1,e.position.y+31).setDuration(speed).setEasing(lime.animation.Easing.LINEAR);		
		var anim = new lime.animation.KeyframeAnimation();
		for(var i=0;i<4;i++){
			angle = goog.math.angle(e.position.x,e.position.y,daniel.getPosition().x,daniel.getPosition().y);
			if ((angle > 45) && (angle <= 135)) anim.addFrame(daniel_animations.up[i]);
			else if ((angle > 135) && (angle <= 225)) anim.addFrame(daniel_animations.right[i]);
			else if ((angle > 225) && (angle <= 315)) anim.addFrame(daniel_animations.down[i]);
			else if ((angle > 315) || (angle <= 45)) anim.addFrame(daniel_animations.left[i]);
			else anim.addFrame(daniel_animations.down[i]);
		}
		daniel.runAction(anim);
		daniel.runAction(movement);  
		daniel_lbl.runAction(movement_lbl);  
		daniel_lbl_shadow.runAction(movement_lbl_shadow);
		
		goog.events.listen(movement,lime.animation.Event.STOP,function(){
			anim.stop();
			daniel.setFill(daniel_animations.down_idle[0]);
		});
	});
	
	tyler_animations = {
		down_idle: [
		  new lime.fill.Frame('img/tyler.png', 37, 94, 34, 46)
		]
	};
	var tyler = new lime.Sprite().setSize(34,46).setFill(tyler_animations.down_idle[0]).setPosition(200,200);
	var tyler_lbl = new lime.Label().setText('Tyler').setPosition(200,230).setFontFamily('Verdana').setFontColor('#fff').setFontSize(14).setFontWeight('bold');	
	var tyler_lbl_shadow = new lime.Label().setText('Tyler').setPosition(201,231).setFontFamily('Verdana').setFontColor('#000').setFontSize(14).setFontWeight('bold');	
	
	mapLayer.appendChild(gameMap);
	mapLayer.appendChild(tyler);
	mapLayer.appendChild(tyler_lbl_shadow);
	mapLayer.appendChild(tyler_lbl);
	mapLayer.appendChild(daniel);
	mapLayer.appendChild(daniel_lbl_shadow);
	mapLayer.appendChild(daniel_lbl);
	mapScene.appendChild(mapLayer);
    director.replaceScene(mapScene); 
}