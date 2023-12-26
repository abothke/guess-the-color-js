// Konfetti Animation von https://www.cssscript.com/confetti-falling-animation/
function feiernMitKonfetti() {
  confetti({
    particleCount: 200,
    spread: 130,
    origin: { y: 0.5 },
  });
}

// Joker Counter für die Anzahl der verbleibenden Joker. Maximal 2 Joker pro Spiel.
let jokerCounter = 2;
let randomR = 0;
let randomG = 0;
let randomB = 0;

// Funktion zum generieren einer zufälligen RGB Farbe
const randomRgb = () => {
  randomR = Math.floor(Math.random() * 255) + 1;
  randomG = Math.floor(Math.random() * 255) + 1;
  randomB = Math.floor(Math.random() * 255) + 1;
  let randomRGB = `${randomR},${randomG},${randomB}`;
  return randomRGB;
};

// For-Schleife zum generieren der Farben für die Container und zum setzen der Hintergrundfarbe der Container mit der generierten Farbe.
for (let i = 1; i <= 5; i++) {
  document.querySelector(`#color${i}`).style.background = `rgb(${randomRgb()})`;
}

// Generieren einer zufälligen Zahl zwischen 1 und 5 und speichern in einer Variable für die Selektion des Containers für die richtige Antwort.
let randomContainerNo = Math.floor(Math.random() * 5) + 1;

// Speichern der Hintergrundfarbe des Containers für die richtige Antwort in einer Variable.
let randomContainerRGB = document.querySelector(`#color${randomContainerNo}`)
  .style.background;

// Selektion des h1 Elements und setzen des Textes mit der Hintergrundfarbe des Containers für die richtige Antwort.
let heading = document.querySelector("h1");
let r = randomContainerRGB.replace("rgb(", "").replace(")", "");
r = r.split(", ");
let spanOne = document.querySelector("span:nth-of-type(1)");
let spanTwo = document.querySelector("span:nth-of-type(2)");
let spanThree = document.querySelector("span:nth-of-type(3)");

// updateSpan Funktion um die RGB Werte im p Element zu aktualisieren.
const updateSpan = () => {
  spanOne.innerHTML = `${r[0]} `;
  spanTwo.innerHTML = `${r[1]} `;
  spanThree.innerHTML = r[2];
};

updateSpan();

// extrahieren der ersten 3 Ziffern, wenn nur 2 Ziffern vorhanden sind, wird eine 0 vorangestellt. Wenn nur eine Ziffer vorhanden ist, wird noch eine 0 vorangestellt. die Variabel r ist immer 3 Zeichen lang, da Zahlen unter 100 mit einem Leerzeichen aufgefüllt werden. Zahlen unter 10 werden mit 2 Leerzeichen aufgefüllt.

heading.innerHTML = `Guess the Color 👉🏻 RGB ${randomContainerRGB}`;

// Variablen für die Anzahl der richtigen und falschen Antworten.
// Selektion des h2 Elements und setzen des Textes mit der Anzahl der richtigen und falschen Antworten.

let right = 0;
let wrong = 0;

let score = document.querySelector("h2");
score.innerHTML = `Richtig: ${right} | Falsch: ${wrong}`;

// Eventlistener für die Container mit den Farben und Aufruf der Funktion rightOrWrong mit der Nummer des Containers als Parameter für die Überprüfung der Antwort. For-Schleife für die Zuweisung der Eventlistener zu den Containern.

for (let i = 1; i <= 5; i++) {
  document
    .querySelector(`#color${i}`)
    .addEventListener("click", () => rightOrWrong(i));
}

// Funktion zum zurücksetzen der Farben und des Textes im h1 Element.
// For-Schleife zum generieren der Farben für die Container und zum setzen der Hintergrundfarbe der Container mit der generierten Farbe.
// Generieren einer zufälligen Zahl zwischen 1 und 5 und speichern in einer Variable für die Selektion des Containers für die richtige Antwort.
// Speichern der Hintergrundfarbe des Containers für die richtige Antwort in einer Variable.
// Selektion des h1 Elements und setzen des Textes mit der Hintergrundfarbe des Containers für die richtige Antwort.
// Rückgabe der Nummer des Containers für die richtige Antwort.
const resetColors = () => {
  for (let i = 1; i <= 5; i++) {
    document.querySelector(
      `#color${i}`
    ).style.background = `rgb(${randomRgb()})`;
  }
  randomContainerNo = Math.floor(Math.random() * 5) + 1;
  randomContainerRGB = document.querySelector(`#color${randomContainerNo}`)
    .style.background;
  heading = document.querySelector("h1");
  heading.innerHTML = `Guess the Color 👉🏻 ${randomContainerRGB}`;
  // Reset des Joker Counters auf 2. Ausgabe der Anzahl der verbleibenden Joker.
  jokerCounter = 2;
  document.querySelector("#jokerOutput").textContent = `Du hast noch 2 Joker`;
  r = randomContainerRGB.replace("rgb(", "").replace(")", "");
  r = r.split(", ");
  updateSpan();
  return randomContainerNo;
};

// Eventlistener für den Button zum zurücksetzen der Farben und des Textes im h1 Element.
document.querySelector("#reset").addEventListener("click", resetColors);

// Funktion zum Überprüfen der Antwort und hinzufügen eines Punktes bei richtiger Antwort bzw. hinzufügen eines Punktes bei falscher Antwort.
const rightOrWrong = (guess) => {
  console.log(randomContainerNo);
  if (guess == randomContainerNo) {
    ++right;
    document.getElementById("output").textContent =
      "Richtig! Du bist ein Genie!";
    feiernMitKonfetti();
  } else {
    ++wrong;
    document.getElementById("output").textContent =
      "Falsch! Versuche es noch einmal!";
  }
  document.querySelector(
    "h2"
  ).innerHTML = `Richtig: ${right} | Falsch: ${wrong}`;
  resetColors();
};

// Joker Funktion um eine falsche Antworten zu entfernen. Maximal 2 Joker pro Spiel.
// for-Schleife um die Nummern der falschen Antworten in ein Array zu speichern.
let wrongAnswers = [];
for (let i = 1; i <= 5; i++) {
  if (i != randomContainerNo) {
    wrongAnswers.push(i);
  }
}
// Funktion zum entfernen einer falschen Antwort.
const joker = () => {
  // Überprüfung ob noch Joker übrig sind. Wenn nicht, wird die Funktion beendet und eine Meldung ausgegeben: Keine Joker mehr übrig!
  if (jokerCounter == 0) {
    document.querySelector(
      "#jokerOutput"
    ).textContent = `Keine Joker mehr übrig!`;
    return;
  }

  // Generieren einer zufälligen Zahl zwischen 0 und der Länge des Arrays mit den falschen Antworten um eine zufällige falsche Antwort zu erhalten.
  let indexWronganswer = Math.floor(Math.random() * wrongAnswers.length);
  // Speichern der Nummer der falschen Antwort in einer Variable.
  let randomWrongAnswer = wrongAnswers[indexWronganswer];
  // Setzen der Hintergrundfarbe der falschen Antwort auf weiß.
  wrongAnswers.splice(indexWronganswer, 1);
  document.querySelector(`#color${randomWrongAnswer}`).style.background =
    "white";
  // Reduzieren der Anzahl der Joker um 1.
  jokerCounter--;
  // Ausgabe der Anzahl der verbleibenden Joker.
  document.querySelector(
    "#jokerOutput"
  ).textContent = `Joker aktiviert! Du hast noch ${jokerCounter} Joker übrig!`;
  // Rückgabe des Arrays mit den falschen Antworten für
  return wrongAnswers;
};

document.querySelector("#joker").addEventListener("click", joker);