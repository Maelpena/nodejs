//constructeur + getter + value score donc getter score et value Nbshot

class Player{
    constructor(name){
        this.name = name
        this.nb_shoot = 1
        this.score = 0
        this.target = null
    }

    get_nb_shoot(){
        return this.nb_shoot
    }

    set_nb_shoot(nb_shoot){
        this.nb_shoot = nb_shoot
    }
    
    get_name() {
        return this.name
    }
    
    get _target() {
        return this.target
    }
    set_target(target){
        this.target = target
    }
    
}

module.exports = Player