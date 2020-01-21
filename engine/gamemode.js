abstract class Gamemode {
    

    
    constructor(path) {
        if (this.constructor === Gamemode) {
          throw new TypeError('Abstract class "Gamemode" cannot be instantiated directly');
        }
        this.properties = {};
        if (!fs.existsSync(path)) {
          throw new Error(`File ${path} not found`);
        }
        this.parse(path);
      }
}

module.exports = Gamemode