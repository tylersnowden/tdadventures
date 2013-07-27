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
	
    characters = new Array();
    characters.push(new character('tyler', gameMap, false, 200, 400));
    characters.push(new character('daniel', gameMap, false, 250, 450));
    characters.push(new character('kristie', gameMap, true, 340, 300));
    
    goog.events.listen(characters[0].layer, ['mousedown','touchstart'], function(e) { 
            for(var j=0;j<characters.length;j++) characters[j].selected = false;
            characters[0].selected = true;
    });   
    goog.events.listen(characters[1].layer, ['mousedown','touchstart'], function(e) { 
        for(var j=0;j<characters.length;j++) characters[j].selected = false;
        characters[1].selected = true;
    });
    goog.events.listen(characters[2].layer, ['mousedown','touchstart'], function(e) { 
            for(var j=0;j<characters.length;j++) characters[j].selected = false;
            characters[2].selected = true;
     });
    
    mapLayer.appendChild(gameMap);
    playScene.appendChild(mapLayer);
    td.director.replaceScene(playScene); 
};