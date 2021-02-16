var boutonSave = document.querySelector('#save');
var boutonStart = document.querySelector('#start');
var boutonStop = document.querySelector('#stop');
var boutonReset = document.querySelector('#reset');
var nombre = document.querySelector("#number");
var timer = document.querySelector("#timer");
var mmss = document.querySelector("#MMSS");
var compte = document.querySelector("#compte");
var valeur_initiale;
// var SounddeFin = new Audio("./sound.wav");

class FormatTemps{
    // constructeur
    //  MMSS chaine de sortie au format MM:SS
    constructor(element){
        this.element=element;
        this.MMSS='';
    }
    // val en secondes
    secondes(val){
        let alarme='';
        let min, sec;

        min = Math.floor(val/60.);
        sec = Math.floor(val - 60*min);
        alarme = min.toString().padStart(2,"0")+':'+sec.toString().padStart(2,"0");
        // alarme.concat(alarme,':');
        // alarme.concat(alarme,sec.toString().padStart(2,"0"));
        console.log(sec);
        console.log(alarme);
        this.element.querySelector("#MMSS").textContent=alarme;
    }
}

class CompteARebours{
    constructor(element){
        this.element=element;
        //attache de la fonction
        this.marche ;
        this.sound = new Audio("./sound.wav");
        this.temps = new FormatTemps(element);
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
        this.temps.secondes(this.courante);
    }

}
// format du temps MM:SS


const down = new CompteARebours(compte);
//const temps = new FormatTemps(compte);

boutonSave.addEventListener("click", function() {
  let x =  60*parseFloat(nombre.value);
  valeur_initiale =x;
  timer.innerHTML = x.toString() ;
  //temps.secondes(x);

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