const TILE_SIZE = 40;
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
                var tildeX = x * TILE_SIZE / 4;
                var tildeY = y * TILE_SIZE / 4;
                var tildeColor = this.grid[y][x] == 1 ? "#222" : "#fff";
                stroke("#222");
                fill(tildeColor);
                rect(tildeX, tildeY, TILE_SIZE / 4, TILE_SIZE / 4);
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
        circle(this.x / 4, this.y / 4, this.radius / 4);
        /* stroke("red");
        line(this.x, this.y, 
        this.x + Math.cos(this.rotationAngle) * 30,
        this.y + Math.sin(this.rotationAngle) * 30); */
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
        this.rayAngel = normalizeAngle(rayAngel);
        this.wallHitX = 0;
        this.wallHitY = 0;
        this.distance = 0;
        this.wasHitVerttical = false;

        this.isRayFacingDowm = this.rayAngel > 0 && this.rayAngel < Math.PI;
        this.isRayFacingUp = !this.isRayFacingDowm;

        this.isRayFacingRight = this.rayAngel < 0.5 * Math.PI || this.rayAngel > 1.5 * Math.PI;
        this.isRayFacingLeft = !this.isRayFacingRight;
    }
    cast(columId) {
        var xintercept, yintercept;
        var xstep, ystep;

        //////////////////
        /// HORIZONTAL ///
        //////////////////
        var foundHorzWallhit = false;
        var HorzWallHitX = 0;
        var HorzWallHitY = 0;

        //find the y cor of the cosest horizontal
        yintercept = Math.floor(player.y / TILE_SIZE) * TILE_SIZE;
        yintercept += this.isRayFacingDowm ? TILE_SIZE : 0;

        //find the x of the closest inter
        xintercept = player.x + (yintercept - player.y) / Math.tan(this.rayAngel);

        // calc the incroment
        ystep = TILE_SIZE;
        ystep *= this.isRayFacingUp ? -1 : 1;

        xstep = TILE_SIZE / Math.tan(this.rayAngel);
        xstep *= (this.isRayFacingLeft && xstep > 0) ? -1 : 1;
        xstep *= (this.isRayFacingRight && xstep < 0) ? -1 : 1;

        var nextHorzTouchX = xintercept;
        var nextHorzTouchY = yintercept;

        //if (this.isRayFacingUp)
        //    nextHorzTouchY--;
        // increment xstep and y step until wall
        while(nextHorzTouchX >= 0 && nextHorzTouchX <= WINDOW_WIDTH && nextHorzTouchY >= 0 && nextHorzTouchY <= WINDOW_HEIGHT) {
            if(grid.hasWallAt(nextHorzTouchY - (this.isRayFacingUp ? 1 : 0), nextHorzTouchX) == 1){
                foundHorzWallhit = true;
                HorzWallHitX= nextHorzTouchX;
                HorzWallHitY = nextHorzTouchY;
                break ;
            }
            else{
                nextHorzTouchX += xstep;
                nextHorzTouchY += ystep;
            }
        }
        //////////////////
        ///  VERTICAL  ///
        //////////////////
        var foundVertWallhit = false;
        var vertWallHitX = 0;
        var vertWallHitY = 0;

        xintercept = Math.floor(player.x / TILE_SIZE) * TILE_SIZE;
        xintercept += this.isRayFacingRight ? TILE_SIZE : 0;

        yintercept = player.y + (xintercept - player.x) * Math.tan(this.rayAngel);

        // calc the incroment
        xstep = TILE_SIZE;
        xstep *= this.isRayFacingLeft ? -1 : 1;

        ystep = TILE_SIZE * Math.tan(this.rayAngel);
        ystep *= (this.isRayFacingUp && ystep > 0) ? -1 : 1;
        ystep *= (this.isRayFacingDowm && ystep < 0) ? -1 : 1;

        var nextVertTouchX = xintercept;
        var nextVertTouchY = yintercept;

        /* if (this.isRayFacingLeft)
            nextVertTouchX--; */
        // increment xstep and y step until wall
        while(nextVertTouchX >= 0 && nextVertTouchX <= WINDOW_WIDTH && nextVertTouchY >= 0 && nextVertTouchY <= WINDOW_HEIGHT) {
            if(grid.hasWallAt(nextVertTouchY, nextVertTouchX - (this.isRayFacingLeft ? 1 : 0)) == 1){
                foundVertWallhit = true;
                vertWallHitX = nextVertTouchX;
                vertWallHitY = nextVertTouchY;
                break ;
            }
            else{
                nextVertTouchX += xstep;
                nextVertTouchY += ystep;
            }
        }
        
        // look for the smallest ray
        var horzHitDistance = (foundHorzWallhit)
        ? distanceBetweenPoints(player.x, player.y, HorzWallHitX, HorzWallHitY)
        : Number.MAX_VALUE;
        var vertHitDistance = (foundVertWallhit)
        ? distanceBetweenPoints(player.x, player.y, vertWallHitX, vertWallHitY)
        : Number.MAX_VALUE;
        this.wallHitX = (horzHitDistance < vertHitDistance) ? HorzWallHitX : vertWallHitX;
        this.wallHitY = (horzHitDistance < vertHitDistance) ? HorzWallHitY : vertWallHitY;
        this.distance = (horzHitDistance < vertHitDistance) ? horzHitDistance : vertHitDistance;
        this.wasHitVerttical = (vertHitDistance < horzHitDistance);
        
        var distanceProjPlane = (WINDOW_WIDTH / 2) / Math.tan(FOV_ANGLE / 2);
        var wallStripHeight = (TILE_SIZE / this.distance) * distanceProjPlane;
    
        noStroke();
        fill('#6CD238');
        if(columId % 8 == 0)
            rect(columId * WALL_STRIP_WITH, WINDOW_HEIGHT / 2 - wallStripHeight / 2,  WALL_STRIP_WITH, wallStripHeight);
        else
        {
            fill("grey");
            rect(columId * WALL_STRIP_WITH, WINDOW_HEIGHT / 2 - wallStripHeight / 2,  WALL_STRIP_WITH, wallStripHeight);
        }
    }
    render() {
        stroke("red");
        line(player.x / 4, player.y / 4, this.wallHitX / 4, this.wallHitY / 4);

        
        /* var Ay = Math.floor(player.y / TILE_SIZE ) * TILE_SIZE;
        var Ax = player.x + (Ay - player.y) / Math.tan(this.rayAngel);
        while(!grid.hasWallAt(Ay, Ax)){
            Ay += 32;
            Ax += 32 / Math.tan(this.rayAngel);
        }
        line(player.x, player.y,
            Ax,
            Ay); */
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
    for(var i = 0; i < NUM_RAYS; i++) {
        var ray = new Ray(rayAngel);
        ray.cast(columId);
        rays.push(ray);
        rayAngel += FOV_ANGLE / NUM_RAYS;
        columId++;
    }
}

function normalizeAngle(angle) {
    angle = angle % (2 * Math.PI);
    if(angle < 0)
        angle = (2 * Math.PI) + angle;
    return angle;
}

function distanceBetweenPoints(x1, y1, x2, y2){
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

function setup() {
    createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
}

function update() {
    player.update();
    fill('#6EE8FF');
    rect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT / 2);
    fill('#865900');
    rect(0, WINDOW_HEIGHT / 2, WINDOW_WIDTH, WINDOW_HEIGHT);
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
