enchant();

sprites = [];

window.onload = function() {
    game = new Game(320, 320);
    game.fps = 30;
    
    var grid = new Grid(6, 15);
    
    game.preload("icon0.png");
    
    game.onload = function() {
        for (var i = 0; i < grid.width(); i++) {
            sprites[i] = [];
            for (var j = 0; j < grid.height(); j++) {
                var sprite = new Sprite(16, 16);
                sprite.x = i * 16;
                sprite.y = j * 16;
                
                sprite.c = i;
                sprite.r = j;
                
                sprite.image = game.assets["icon0.png"];
                sprite.frame = grid.getCell(i, j) + 1;
                sprites[i].push(sprite);
                
                sprite.addEventListener("touchend", function() {
                    if (grid.checkCell(this.c, this.r)) {
                        grid.collapseCells();
                        for (var i = 0; i < grid.width(); i++) {
                            for (var j = 0; j < grid.height(); j++) {
                                if (grid.getCell(i, j) == 0) {
                                    sprites[i][j].frame = 9;
                                } else {
                                    sprites[i][j].frame = grid.getCell(i, j) + 1;
                                }
                            }
                        }
                    }
                });
                game.rootScene.addChild(sprite);
            }
        }
    }
    
    game.start();
}


