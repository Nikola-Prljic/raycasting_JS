const TILE_SIZE = 32;
const MAP_NUM_ROWS = 11;
const MAP_NUM_CLOS = 15;

const WINDOW_WIDTH = MAP_NUM_CLOS * TILE_SIZE;
const WINDOW_HEIGHT = MAP_NUM_ROWS * TILE_SIZE;

const FOV_ANGLE = 60 * (Math.PI / 180);

const WALL_STRIP_WITH = 1;
const NUM_RAYS = WINDOW_WIDTH / WALL_STRIP_WITH;

class Map {
    constructor() {
        this.grid = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];
    }
    render() {
        for (var y = 0; y < MAP_NUM_ROWS; y++){
            for (var x = 0; x < MAP_NUM_CLOS; x++){
                var tildeX = x * TILE_SIZE;
                var tildeY = y * TILE_SIZE;
                var tildeColor = this.grid[y][x] == 1 ? "#222" : "#fff";
                stroke("#222");
                fill(tildeColor);
                rect(tildeX, tildeY, TILE_SIZE, TILE_SIZE);
            }
        }
    }
    hasWallAt(y, x) {
        if ( x < 0 || x > WINDOW_WIDTH || y < 0 || y > WINDOW_HEIGHT)
            return 1;
        var mapGridIndexX = Math.floor(x / TILE_SIZE);
        var mapGridIndexY = Math.floor(y / TILE_SIZE);
        if(this.grid[mapGridIndexY][mapGridIndexX] == 0)
            return 0;
        return 1;
    }
}

class Player{
    constructor() {
        this.x = WINDOW_WIDTH / 2;
        this.y = WINDOW_HEIGHT / 2;
        this.radius = 3;
        this.turnDirection = 0; // -1 if left +1 if right
        this.walkDirection = 0; // -1 if back +1 if front
        this.rotationAngle = Math.PI / 2;
        this.moveSpeed = 2.0;
        this.rotationSpeed = 2 * (Math.PI / 180);
    }
    update() {
        this.rotationAngle += this.turnDirection * this.rotationSpeed;
        
        var moveStep = this.walkDirection * this.moveSpeed;
        
        var newPlayerX = this.x + moveStep * Math.cos(this.rotationAngle);
        var newPlayerY = this.y + moveStep * Math.sin(this.rotationAngle);
        if(!grid.hasWallAt(newPlayerY, newPlayerX))
        {
            this.x = newPlayerX;
            this.y = newPlayerY;
        }
    }
    render() {
        noStroke();
        fill("red");
        circle(this.x, this.y, this.radius);
        stroke("red");
        line(this.x, this.y, 
        this.x + Math.cos(this.rotationAngle) * 30,
        this.y + Math.sin(this.rotationAngle) * 30);
        console.log(this.rotationAngle);
    //var x = 0.1;
    //stroke("blue");
    //for(var i = 0; i < 62; i++)
    //{
        //    line(this.x, this.y, 
        //        this.x + Math.cos(this.rotationAngle + x) * 30,
        //        this.y + Math.sin(this.rotationAngle + x) * 30);
        //    x += 0.1;
        //}
    }
}

class Ray {
    constructor(rayAngel) {
        this.rayAngel = rayAngel;
    }
    render() {
        stroke("blue");
        var Ay = Math.floor(player.y / TILE_SIZE ) * TILE_SIZE;
        var Ax = player.x + (player.y - Ay) / Math.tan(this.rayAngel) * player.turnDirection;
        /* Ay += 32;
        Ax += 32 / Math.tan(this.rayAngel); */
        while(!grid.hasWallAt(Ay, Ax)){
            Ay += 32;
            Ax += 32 / Math.tan(this.rayAngel);
        }
        line(player.x, player.y, 
            Ax,
            Ay);
        line(player.x, player.y, 
            player.x + Math.cos(this.rayAngel) * 30,
            player.y + Math.sin(this.rayAngel) * 30);
    }
}

var player = new Player();
var grid = new Map();
var rays = [];

function keyPressed() {
    if (keyCode == UP_ARROW){
        player.walkDirection = +1;
    } else if (keyCode == DOWN_ARROW){
        player.walkDirection = -1;
    } else if (keyCode == RIGHT_ARROW){
        player.turnDirection = +1;
    } else if (keyCode == LEFT_ARROW){
        player.turnDirection = -1;
    }
}
            
function keyReleased() {
    if (keyCode == UP_ARROW){
        player.walkDirection = 0;
    } else if (keyCode == DOWN_ARROW){
        player.walkDirection = 0;
    } else if (keyCode == RIGHT_ARROW){
        player.turnDirection = 0;
    } else if (keyCode == LEFT_ARROW){
        player.turnDirection = 0;
    }
}

function castAllRays() {
    var columId = 0;

    // start firs thalf of FOV
    var rayAngel = player.rotationAngle - (FOV_ANGLE / 2);
    rays = [];
    //for(var i = 0; i < NUM_RAYS; i++)
    for(var i = 0; i < 1; i++) {
        var ray = new Ray(rayAngel);
        rays.push(ray);
        rayAngel += FOV_ANGLE / NUM_RAYS;
        columId++;
    }
}

function setup() {
    createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
}

function update() {
    player.update();
    castAllRays();
    // update game obj before next frame
} 

function draw() {
    update();
    grid.render();
    for (ray of rays){
        ray.render();
    }
    player.render();
}
