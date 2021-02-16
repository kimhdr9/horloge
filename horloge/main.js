var speaking='FR-fr';
//  classe de Digitclock
class DigitClock{
    constructor(element) {
        this.element=element;
        console.log(this.element);
        this.marche;
    }

    start(){
        this.update('ru-RU');
        this.marche=setInterval(()=>{
            this.update('ru-RU');
        },500);
    }
    startlang(lang){
        this.update(lang);
        this.marche=setInterval(()=>{
            this.update(lang);
        },500);
    }
    stop(){
        clearInterval(this.marche);
    }


    update(lang){
        const parts = this.getTimeParts(lang,'long');
        const month = parts.month;
        const day = parts.day;
        const jour = parts.jour;
        const minuteFormatted = parts.min.toString().padStart(2,"0");
        const secFormatted = parts.sec.toString().padStart(2,"0");
        const timeFormatted = `${parts.hour}:${minuteFormatted}:${secFormatted}`;
        const ampm = parts.isAm ? "AM" : "PM";

        this.element.querySelector(".clock-day").textContent = day + ' ';
        this.element.querySelector(".clock-jour").textContent = jour + ' ';
        this.element.querySelector(".clock-month").textContent = month + ' ';
        this.element.querySelector(".clock-time").textContent = timeFormatted;
        this.element.querySelector(".clock-ampm").textContent = ampm;
    }

    getTimeParts(lang,option){
        const now = new Date();
        var optionsJ = {weekday:option};
        var optionsM = {month:option};
        var day, month, jour;

        day= new Intl.DateTimeFormat(lang,optionsJ).format(now);
        month= new Intl.DateTimeFormat(lang,optionsM).format(now);
        jour = now.getUTCDate();
        return {
            month ,
            day ,
            jour,
            hour : now.getHours() % 12 || 12,
            min  : now.getMinutes(),
            sec  : now.getSeconds(),
            isAm : now.getHours() < 12 
        };
    }
}
//  choix de la langue d'affichage
const maLangue = document.querySelector(".langue");

const clockElement =document.querySelector("#clock");
// console.log(clockElement);
const clockObject= new DigitClock(clockElement);
// console.log(clockObject.getTimeParts());
clockObject.startlang(speaking);

// console.log(choix.monchoix());

maLangue.addEventListener('change',(event) =>{
    speaking= event.target.value;
    // arrêt
    clockObject.stop();
    // marche
    clockObject.startlang(speaking);
    
    console.log(speaking);
});
