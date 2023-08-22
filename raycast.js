const TILE_SIZE = 32;
const MAP_NUM_ROWS = 11;
const MAP_NUM_CLOS = 15;

const WINDOW_WIDTH = MAP_NUM_CLOS * TILE_SIZE;
const WINDOWS_HEIGHT = MAP_NUM_ROWS * TILE_SIZE;

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
}

var grid = new Map();

function setup() {
    createCanvas(WINDOW_WIDTH, WINDOWS_HEIGHT);
}

function update() {
    // update game obj before next frame
} 

function draw() {
    update();
    grid.render();
    // render
}
