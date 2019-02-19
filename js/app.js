var level = 1;
/*Enemies our player must avoid*/
var Enemy = function(X,Y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = X;
    this.y = Y;
    this.argument1 = X;
    this.argument2 = Y;
};
/*Update the enemy's position, required method for game
Parameter: dt, a time delta between ticks*/
Enemy.prototype.update = function(dt) {

/*speed of the Enemy based on the level*/
    if( level === 1){
        for(var i=0; i<allEnemies.length; i++){
            allEnemies[i].speed=160;
        }
    }
    if( level === 2 ){
        for(var j=0; j<allEnemies.length; j++){
            allEnemies[j].speed=210;
        }
    }
    if( level === 3 ){
        for(var k=0; k<allEnemies.length; k++){
            allEnemies[k].speed=260;
        }
    }
/*multiplying any movement by the dt parameter
which will ensure the game runs at the same speed for
all computers */

    this.x = this.x+this.speed*dt;

/*Reset enemy's position*/
    if( this.x >= 500 ){
        this.reset();
    }
/*handling collision with the enemies*/
    if( player.x >= this.x -40 && player.x <=this.x + 40 ){
        if( player.y >= this.y -40 && player.y <=  this.y+40 ){
            player.x = 200;
            player.y = 400;
        }
    }
};
Enemy.prototype.reset = function() {
    this.x = this.argument1;
    this.y = this.argument2;
};
/*Draw the enemy on the screen, required method for game*/
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*Player Class
This class requires an update(), render() and a handleInput() method.*/
var Player = function(x,y){
    this.sprite =  'images/char-boy.png';
    this.x = x;
    this.y = y;
};
Player.prototype.update = function(dt){
/*Changes, handles and displays the level*/
    if( this.y < -18 ){
        this.reset();
        level++;
        if(level > 3){
            $('h3').css("display","block").append('You Won!').addClass("animated infinite pulse");
            setTimeout(showResult,1500);
            level = 1;
        }
        document.getElementById("myspan").innerHTML= level;
    }

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(keyPress) {
    if( keyPress === 'left' && this.x > 0 )
        this.x = this.x - 20;
    else if( keyPress === 'right' && this.x < 400)
        this.x = this.x + 20;
    else if( keyPress === 'up' && this.y > -10)
        this.y = this.y - 20;
    else if( keyPress === 'down' && this.y < 400)
        this.y = this.y + 20;
};
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

var showResult = function() {
     $('h3').css("display","none").text("");
};

/* Now instantiate your objects
Place all enemy objects in an array called allEnemies*/
var allEnemies = [new Enemy(-50,60), new Enemy(-100,140), new Enemy(-150,140), new Enemy(-200,220)];
/*Place the player object in a variable called player*/
var player = new Player(200,430);

/*for playing with keyboard*/
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
