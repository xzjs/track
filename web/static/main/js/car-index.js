var main = {
    
    init: function(){
        truck.init();
        barrier.init();
        manInterv.init();
        carCong.init();
    },
    bind: function(){
        this.bindControlConfig();
    },
    bindControlConfig: function(){

    }
}

$(document).ready(function(){
    main.init();
});