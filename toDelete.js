const Order = require("./Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    FOOD:   Symbol("food"),
    LITTER:   Symbol("litter"),
    EXTRAS:  Symbol("extras")
});

module.exports = class LockDownEssentials extends Order{
    constructor(sNumber, sUrl){
        super(sNumber, sUrl);
        this.stateCur = OrderState.WELCOMING;
        this.sSpecies = "";
        this.sFood = "";
        this.sLitter = "";
        this.sExtras = "";
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.FOOD;
                aReturn.push("Welcome to Richard's Pet Store.");
                aReturn.push(`For a list of what we sell tap:`);
                aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
                if(sInput.toLowerCase() == "meow"){
                  this.sSpecies = "cat";
                }else if(sInput.toLowerCase() == "woof") {
                  this.sSpecies = "dog";
                } else {
                  this.stateCur = OrderState.WELCOMING;
                  aReturn.push("Please type MEOW if you have a cat or WOOF if you have a dog.");
                  break;
                }
                aReturn.push("Would you like CANNED or DRY food or NO?");
                break;
            case OrderState.FOOD:
                if(this.sSpecies == "cat"){
                  this.stateCur = OrderState.LITTER;
                  aReturn.push("Would you like kitty litter?");
                }else{
                  this.stateCur = OrderState.EXTRAS;
                  aReturn.push("Would you like a TREAT or TOY for your dog?");
                }
                if(sInput.toLowerCase()!= "no"){
                  this.sFood = sInput;
                }
                break;
            case OrderState.LITTER:
                this.stateCur = OrderState.EXTRAS
                if(sInput.toLowerCase()!= "no"){
                  this.sLitter = "organic kitty litter";
                }
                aReturn.push("Would you like a TREAT or TOY for your kitty?");
                break;
            case OrderState.EXTRAS:
                if(sInput.toLowerCase() != "no"){
                    this.sExtras = sInput;
                }
                aReturn.push("Thank-you for your order of");
                this.nTotal = 0;
                if(this.sSpecies == "cat" && this.sFood.toLowerCase() == "canned"){
                  aReturn.push("canned cat food");
                  this.nTotal += 5.99;
                }else if(this.sSpecies == "cat" && this.sFood.toLowerCase == "dry"){
                  aReturn.push("dry cat food");
                  this.nTotal += 2.99
                }else if(this.sSpecies == "dog" && this.sFood.toLowerCase() == "canned"){
                  aReturn.push("canned dog food");
                  this.nTotal += 5.99;
                }else if(this.sSpecies == "dog" && this.sFood.toLowerCase == "dry"){
                  aReturn.push("dry dog food");
                  this.nTotal += 5.99
                }
                if(this.sLitter){
                  aReturn.push(this.sLitter);
                  this.nTotal += 2.99;
                }
                if(this.sExtras){
                  aReturn.push(this.sExtras);
                  this.nTotal += 2.99;
                }
                aReturn.push(`Your total comes to ${this.nTotal}`);
                aReturn.push(`We will text you from 519-222-2222 when your order is ready or if we have questions.`)
                this.isDone(true);
                break;
        }
        return aReturn;
    }}