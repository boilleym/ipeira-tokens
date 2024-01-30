

var PurseContent = ["Vie", "Vie", "Vie", "Vie", "Vie", "Vie", "Vie", "Voie", "Voie", "Voie", "Ancien", "Ombre", "Ombre", "Ombre", "Ombre", "Ombre", "Ombre", "Ombre", "Corruption"];
var tokenTypes = ["Vie", "Voie", "Ancien", "Ombre", "Corruption"];




class Purse {
	
	constructor(element) {
		this.purseZone = document.querySelector("#purse");
		this.lifeCounter = 0;
		this.wayCounter = 0;
		this.ancientCounter = 0;
		this.shadowCounter = 0;
		this.corruptionCounter = 0;
		//init token counters
		tokenTypes.forEach((token) => {
			this.updateTokenCounter(token);
		});
    // bind causes a fixed `this` context to be assigned to `onclick2`
    this.onclick = this.onclick.bind(this);
    element.addEventListener("click", this.onclick, false);
  }
	
	onclick(event) {
    console.log(event.target.dataset.name);
		let tokenTarget = event.target.dataset.target;
    switch (event.target.dataset.name) {
			case "add":
				PurseContent.push(tokenTarget);
				this.updateTokenCounter(tokenTarget);
        break;
			case "remove":
				if(PurseContent.filter(x => x==tokenTarget).length > 0){
					console.log(PurseContent);
					PurseContent.splice(PurseContent.lastIndexOf(tokenTarget), 1);
					console.log(PurseContent);
					this.updateTokenCounter(tokenTarget);
				}
        break;
		}
	}
	
	updateTokenCounter(token){
		let tokenCount = PurseContent.filter(x => x==token).length;
		document.querySelector("[data-name='"+token+"']").replaceChildren(tokenCount);
	}
}






class Playmat {

	constructor(element) {
		this.playmatZone = document.querySelector("#playmat");
		this.playmatContent = [];
		this.howManyTokenDrawn = 1;
    // bind causes a fixed `this` context to be assigned to `onclick2`
    this.onclick = this.onclick.bind(this);
    element.addEventListener("click", this.onclick, false);
  }
	
  onclick(event) {
    console.log(event.target.dataset.name);
		
    switch (event.target.dataset.name) {
      case "draw":
				if(PurseContent.length > 0){
					this.drawTokens();
				}
        break;
      case "reset":
				PurseContent = this.playmatContent.concat(PurseContent);
				this.playmatContent = [];
				this.playmatZone.replaceChildren();
        break;
			case "drawMore":
				this.addTokenDrawn();
        break;
			case "drawLess":
				if(this.howManyTokenDrawn > 1){
					this.removeTokenDrawn();
				}
        break;
    }
  }
	
	drawTokens() {
		let maxDraw = Math.min(PurseContent.length, this.howManyTokenDrawn);//stop drawing if purse is empty
		for (var i=1; i<=maxDraw; i++) {
			let currentToken = null;
			PurseContent = PurseContent.sort((a, b) => 0.5 - Math.random());
			this.currentToken = PurseContent.pop();
			this.playmatContent.push(this.currentToken);
			this.playmatZone.insertAdjacentHTML(
				"beforeend",
				this.currentToken+"<br>",
			);
			console.log(PurseContent, this.playmatContent);
		}
	}
	
	addTokenDrawn() {
		this.howManyTokenDrawn = ++this.howManyTokenDrawn;
		document.querySelector("#drawCounter").replaceChildren(this.howManyTokenDrawn);
		console.log(this.howManyTokenDrawn);
	}
	
	removeTokenDrawn() {
		this.howManyTokenDrawn = --this.howManyTokenDrawn;
		document.querySelector("#drawCounter").replaceChildren(this.howManyTokenDrawn);
		console.log(this.howManyTokenDrawn);
	}

}





window.addEventListener("load", (event) => {
  console.log("La page est complètement chargée");
	const playmat = new Playmat(document.getElementById("playzone"));
	const purseManager = new Purse(document.getElementById("purse"));
});
