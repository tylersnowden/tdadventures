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
goog.require('td.character');

//entrypoint 
td.start = function(){          
    td.director = new lime.Director(document.body,640,1010);     
    td.director.makeMobileWebAppCapable();     
    td.director.setDisplayFPS(false);          
    
    td.welcome();
};

td.welcome = function() {
    var welcomeScene = new lime.Scene();
    var welcomeLayer = new lime.Layer().setPosition(0,0).setRenderer(lime.Renderer.CANVAS).setAnchorPoint(0,0);
    var bg = new lime.Sprite().setSize(640,1010).setFill('img/home.png').setPosition(0,0).setAnchorPoint(0,0);
    
    var startBtn = new lime.Sprite().setSize(234,50).setFill('img/start.png').setPosition(320,500);
    
    goog.events.listen(startBtn,['mousedown','touchstart'],function(e){
        td.play();
    });
    
    welcomeLayer.appendChild(bg);
    welcomeLayer.appendChild(startBtn);
    welcomeScene.appendChild(welcomeLayer);
    td.director.replaceScene(welcomeScene);
};

td.play = function() {
    var playScene = new lime.Scene();
    var mapLayer = new lime.Layer().setPosition(0,0).setRenderer(lime.Renderer.CANVAS).setAnchorPoint(0,0);

    var gameMap = new lime.Sprite().setSize(640,1010).setFill('img/bg.png').setPosition(0,0).setAnchorPoint(0,0);
	
    var tyler = new character('tyler', gameMap, false);
    var daniel = new character('daniel', gameMap, false);
    var kristie = new character('kristie', gameMap, true);
    
    mapLayer.appendChild(gameMap);
    playScene.appendChild(mapLayer);
    td.director.replaceScene(playScene); 
};
