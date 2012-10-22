enchant();

Grid = Class.create({
    initialize: function(gridWidth, gridHeight) {        
        var w = gridWidth;
        this.width = function() {
            return w;
        }
        
        var h = gridHeight;
        this.height = function() {
            return h;
        }
        
        var cells = [];
        var combo = 0;
        
        // Fill with random cells
        var values = [1, 2, 3, 4, 5];
        var length = values.length;
        
        for (var i = 0; i < w; i++) {
            cells.push([]);
            for (var j = 0; j < h; j++) {            
                var idx = Math.floor(Math.random() * length);
                var cell = values[idx];
                
                values[idx] = values[length - 1];
                values[length - 1] = cell;
                length--;
                
                if (length <= 0) {
                    length = values.length;
                }
                
                cells[i].push(cell);
            }
        }
        
        this.checkSurrounding = function(x, y, value) {
            function inRange(num, min, max) {
                return (num >= min && num < max);
            }
            
            if (combo > 0) {
                cells[x][y] = 0;
            }
            
            // Top
            if (inRange(y - 1, 0, this.height()) &&
                cells[x][y - 1] == value) {
                combo++;
                this.checkSurrounding(x, y - 1, value);
            }
            
            // Bottom
            if (inRange(y + 1, 0, this.height()) &&
                cells[x][y + 1] == value) {
                combo++;
                this.checkSurrounding(x, y + 1, value);
            }
            
            // Left
            if (inRange(x - 1, 0, this.width()) &&
                cells[x - 1][y] == value) {
                combo++;
                this.checkSurrounding(x - 1, y, value);
            }
            
            // Right
            if (inRange(x + 1, 0, this.width()) &&
                cells[x + 1][y] == value) {
                combo++;
                this.checkSurrounding(x + 1, y, value);
            }
        };
        
        this.checkCell = function(x, y) {
            var cell = cells[x][y];
            
            if (cell == 0) {
                return false;
            }
            
            combo = 0;
            cells[x][y] = 0;
            this.checkSurrounding(x, y, cell);
            
            if (combo <= 0) {
                cells[x][y] = cell;
                return false;
            }
            
            return true;
        };
        
        this.collapseCells = function() {
            for (var i = 0; i < this.width(); i++) {
                for (var j = this.height(); j > 0; j--) {
                    if (cells[i][j] != 0) {
                        continue;
                    }
                    
                    var low = j;
                    
                    for (var high = j; high >= 0; high--) {
                        if (cells[i][high] != 0) {
                            cells[i][low] = cells[i][high];
                            cells[i][high] = 0;
                            low--;
                        }
                    }
                }
            }
        };
        
        this.getCell = function(x, y) {
            if (x < this.width() && y < this.height()) {
                return cells[x][y];
            }
            
            return -1;
        };
    }
});
