const Player = {
  Name: "New Player",
  Id:null,
  DoubleToken:1, //DoubleToken
  SimpelToken:1,
  AncienToken:1,
  NullToken:1,
  ChaosToken:1,
	Purse: ["DoubleToken", "SimpleToken", "AncienToken", "NullToken", "ChaosToken"],
  displayName: function () {
    console.log(this.type);
  },
  addDoubleToken: function () {
    DoubleToken++;
  }
};



class Purse {
  name = "New Player";
	playmat = document.querySelector("#playmat");
	purseContent = ["DoubleToken", "DoubleToken", "SimpleToken", "SimpleToken", "SimpleToken", "AncienToken", "NullToken", "NullToken", "NullToken", "ChaosToken"];
	playmatContent= [];
	currentToken = null;
	
	constructor(element) {
    // bind causes a fixed `this` context to be assigned to `onclick2`
    this.onclick = this.onclick.bind(this);
    element.addEventListener("click", this.onclick, false);
  }
	
  onclick(event) {
    console.log(this.playmat, event.target.dataset.name);
    switch (event.target.dataset.name) {
      case "draw":
				if(this.purseContent.length > 0){
					this.purseContent = this.purseContent.sort((a, b) => 0.5 - Math.random());
					this.currentToken = this.purseContent.pop();
					this.playmatContent.push(this.currentToken);
					this.playmat.insertAdjacentHTML(
						"beforeend",
						this.currentToken+"<br>",
					);
					console.log(this.purseContent, this.playmatContent);
				}
        break;
      case "reset":
				this.purseContent = this.playmatContent.concat(this.purseContent);
				this.playmatContent = [];
				this.playmat.replaceChildren();
        break;
    }
  }

}


window.addEventListener("load", (event) => {
  console.log("La page est complètement chargée");
	const purse = new Purse(document.getElementById("player1"));
});
