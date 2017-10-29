/*
Given the name of a animal, get the URL to the corresponding image.
*/
function animalNameToURL(animalName) {
  switch (animalName) {
    case "Frog":
      return browser.extension.getURL("animals/frog.jpg");
    case "Snake":
      return browser.extension.getURL("animals/snake.jpg");
    case "Turtle":
      return browser.extension.getURL("animals/turtle.jpg");
  }
}

/*
Listen for clicks in the popup.

If the click is on one of the animals:
  Inject the "animalify.js" content script in the active tab.

  Then get the active tab and send "animalify.js" a message
  containing the URL to the chosen animal's image.

If it's on a button which contains class "clear":
  Reload the page.
  Close the popup. This is needed, as the content script malfunctions after page reloads.
*/

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("animal")) {
    var chosenAnimal = e.target.textContent;
    var chosenAnimalURL = animalNameToURL(chosenAnimal);

    browser.tabs.executeScript(null, { 
      file: "/content_scripts/animalify.js" 
    });

    var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
    gettingActiveTab.then((tabs) => {
      browser.tabs.sendMessage(tabs[0].id, {animalURL: chosenAnimalURL});
    });
  }
  else if (e.target.classList.contains("clear")) {
    browser.tabs.reload();
    window.close();
  }
});