var boutonSave = document.querySelector('#save');
var boutonStart = document.querySelector('#start');
var boutonStop = document.querySelector('#stop');
var boutonReset = document.querySelector('#reset');
var nombre = document.querySelector("#number");
var timer = document.querySelector("#timer");
var compte = document.querySelector("#compte");
var valeur_initiale;
// var SounddeFin = new Audio("./sound.wav");

class CompteARebours{
    constructor(element){
        this.element=element;
        //attache de la fonction
        this.marche ;
        this.sound = new Audio("./sound.wav");
    }
    start(){
        this.marche=setInterval(()=>{
            this.decompte(0.5);
        },500);
    }

    stop(){
        clearInterval(this.marche);
    }

    reset(Texte_depart){
        this.stop();
        this.element.querySelector("#timer").textContent=Texte_depart;
    }

    // diminue la valeur courante de val
    // la valeur minimale est de 0
    decompte(val_in){
        let val = parseFloat(val_in);
        this.courante=parseFloat(this.element.querySelector("#timer").textContent);
        if (this.courante > val ){
            this.courante -= val;
        }
        else
        {
            this.courante=0;
            this.sound.play();
            // arrêt du processus
            this.stop();
        }
        this.element.querySelector("#timer").textContent=this.courante;
    }

}

const down = new CompteARebours(compte);

boutonSave.addEventListener("click", function() {
  let x =  60*parseFloat(nombre.value);
  valeur_initiale =x;
  timer.innerHTML = x.toString() ;

});

boutonStart.addEventListener("click", function() {
    down.start();
  });


boutonStop.addEventListener("click", function() {
    down.stop();
});

boutonReset.addEventListener("click", function() {
    down.reset(valeur_initiale.toString()) ;
});