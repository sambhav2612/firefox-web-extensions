/*
animalify():
* removes every node in the document.body,
* then inserts the chosen animal
* then removes itself as a listener
*/
function animalify(request, sender, sendResponse) {
  removeEverything();
  insertAnimal(request.animalURL);
  browser.runtime.onMessage.removeListener(animalify);
}

/*
Remove every node under document.body
*/
function removeEverything() {
  while (document.body.firstChild) {
    document.body.firstChild.remove();
  }
}

/*
Given a URL to a animal image, create and style an IMG node pointing to
that image, then insert the node into the document.
*/
function insertAnimal(animalURL) {
  var animalImage = document.createElement("img");
  animalImage.setAttribute("src", animalURL);
  animalImage.setAttribute("style", "width: 100vw");
  animalImage.setAttribute("style", "height: 100vh");
  document.body.appendChild(animalImage);
}

/*
Assign animalify() as a listener for messages from the extension.
*/
browser.runtime.onMessage.addListener(animalify);