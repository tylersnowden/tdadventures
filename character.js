goog.provide('td.character');  

function character(name, gameMap, selected) {
    if (selected) var layer = new lime.Layer().setPosition(300,300);
    else {
        var x = 150+Math.round(Math.random()*400);
        var y = 150+Math.round(Math.random()*400);
        var layer = new lime.Layer().setPosition(x,y);
    }
    
    var animations = {
		down_idle: [
		  new lime.fill.Frame('img/'+name+'.png', 37, 94, 34, 46)
		],
		up_idle: [
		  new lime.fill.Frame('img/'+name+'.png', 37, 0, 34, 46)
		],
		left_idle: [
		  new lime.fill.Frame('img/'+name+'.png', 37, 146, 34, 46)
		],
		right_idle: [
		  new lime.fill.Frame('img/'+name+'.png', 37, 48, 34, 46)
		],
		right: [
		  new lime.fill.Frame('img/'+name+'.png', 0, 48, 34, 46), 
		  new lime.fill.Frame('img/'+name+'.png', 37, 48, 34, 46), 
		  new lime.fill.Frame('img/'+name+'.png', 74, 48, 34, 46), 
		  new lime.fill.Frame('img/'+name+'.png', 37, 48, 34, 46)
		],
		down: [
		  new lime.fill.Frame('img/'+name+'.png', 0, 94, 34, 46), 
		  new lime.fill.Frame('img/'+name+'.png', 37, 94, 34, 46), 
		  new lime.fill.Frame('img/'+name+'.png', 74, 94, 34, 46), 
		  new lime.fill.Frame('img/'+name+'.png', 37, 94, 34, 46)
		],
		left: [
		  new lime.fill.Frame('img/'+name+'.png', 0, 146, 34, 46), 
		  new lime.fill.Frame('img/'+name+'.png', 37, 146, 34, 46), 
		  new lime.fill.Frame('img/'+name+'.png', 74, 146, 34, 46), 
		  new lime.fill.Frame('img/'+name+'.png', 37, 146, 34, 46)
		],
		up: [
		  new lime.fill.Frame('img/'+name+'.png', 0, 0, 34, 46), 
		  new lime.fill.Frame('img/'+name+'.png', 37, 0, 34, 46), 
		  new lime.fill.Frame('img/'+name+'.png', 74, 0, 34, 46), 
		  new lime.fill.Frame('img/'+name+'.png', 37, 0, 34, 46)
		]
	};

	var sprite = new lime.Sprite().setSize(34,46).setFill(animations.down_idle[0]);   
	var lbl = new lime.Label().setText(name.charAt(0).toUpperCase() + name.slice(1)).setPosition(0,30).setFontFamily('Verdana').setFontColor('#fff').setFontSize(14).setFontWeight('bold');
	var lbl_shadow = new lime.Label().setText(name.charAt(0).toUpperCase() + name.slice(1)).setPosition(1,31).setFontFamily('Verdana').setFontColor('#000').setFontSize(14).setFontWeight('bold');
	
        layer.appendChild(sprite);
        layer.appendChild(lbl_shadow);
        layer.appendChild(lbl);
        
        if (selected) {
            goog.events.listen(gameMap, ['mousedown','touchstart'], function(e) {   
                    var speed = goog.math.Coordinate.distance(e.position, layer.getPosition()) / 100;
                    var movement = new lime.animation.MoveTo(e.position.x,e.position.y).setDuration(speed).setEasing(lime.animation.Easing.LINEAR); 	
                    var anim = new lime.animation.KeyframeAnimation();
                    for(var i=0;i<4;i++){
                            angle = goog.math.angle(e.position.x,e.position.y,layer.getPosition().x,layer.getPosition().y);
                            if ((angle > 45) && (angle <= 135)) anim.addFrame(animations.up[i]);
                            else if ((angle > 135) && (angle <= 225)) anim.addFrame(animations.right[i]);
                            else if ((angle > 225) && (angle <= 315)) anim.addFrame(animations.down[i]);
                            else if ((angle > 315) || (angle <= 45)) anim.addFrame(animations.left[i]);
                            else anim.addFrame(animations.down[i]);
                    }
                    sprite.runAction(anim);
                    layer.runAction(movement);  

                    goog.events.listen(movement,lime.animation.Event.STOP,function(){
                            anim.stop();
                            sprite.setFill(animations.down_idle[0]);
                    });
            });
        }
        gameMap.appendChild(layer);
};