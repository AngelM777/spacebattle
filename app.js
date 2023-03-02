// Angel & Steve Space Battle JS
//Feb 2023

const prompt = require("prompt-sync")();
const { log, redBright, green, cyan, yellow, magenta } = require("console-log-colors");
// random selection
const randomSelect = (min, max) => Math.floor(Math.random() * (max - min) + min);
const randomAccuracy = () => Math.random() * (.8 - .6) + .6;
// Actions
const actions = {
  1: "attack",
  2: "retreat"
};
// USS Schwarzenegger
const ussShip = {
  hull: 20,
  firepower: 5,
  accuracy: .7
};
// total aliens
const totalAliens = randomSelect(6, 10);
//Aliens
const aliens = [];
// Add aliens to the aliens array
for (let i = 0; i < totalAliens; i++) {
  aliens.push({
    hull: randomSelect(3, 6),
    firepower: randomSelect(2, 4),
    accuracy: randomAccuracy()
  });
}
// Narrator => Set's the stage for each scene/event
// Player ship: decide to attack/retreat & provide
// Alien ships
// Game logic
// Player attacks first every time
// Generate random number and compare player/alien accuracy to determine a hit
// if hit deduct player/alien firepower from player/alien hull
// Check hull greater than 0 game continues
// Hull zero for enemy provide choice to attack next enemy or retreat
// Hull zero for player game over
// Narrator
const name = prompt(magenta("What's your name Captain? "));
log(yellow("type '3' to exit game"));
log("Earth has been attacked by a horde of aliens! You are the captain of the USS Schwarzenegger, on a mission to destroy every last alien ship.");
log(`Captain ${name} I count ${totalAliens} enemy ships. The lead ship is approaching.`);

// Battle
for (let i = 0; i < aliens.length; i++) {
  let currentAlien = aliens[i]
  log(green(`A scan of Alien Ship Number ${i + 1} shows....`));
  log(green(`Their hull strength is ${currentAlien.hull}...`));
  log(green(`Their firepower strength is ${currentAlien.firepower}...`));
  log(green(`Their targeting accuracy is ${currentAlien.accuracy}...`));
  while (currentAlien.hull > 0) {
    // Get 1 or 2 from the user
    const action = prompt(magenta("What do you want to do; [1]attack or [2]retreat? "));
    //check if user selected 1 or 2
    while (action != "1" && action != "2" && action != "3") {
      log("You must enter 1 or 2.")
    }
    if (action == "3") return;
    log(`You chose to ${actions[action]}!`);
    if (actions[action] == "attack") {
      // We attack
      if (Math.random() <= ussShip.accuracy) {
        // We hit
        log(cyan("Direct hit on the alien vessel!"));
        // Alien hull points deducted
        currentAlien.hull -= ussShip.firepower
        // Checking if Alien survived
        if (currentAlien.hull > 0) {
          // Alien attacks
          log(yellow("The alien is trying to target our ship!"));
          if (Math.random() <= currentAlien.accuracy) {
            log(redBright("We took a direct hit on our vessel!"));
            ussShip.hull -= currentAlien.firepower
            log(`Our hull strength is now ${ussShip.hull}.`)
            if (ussShip.hull <= 0) {
              log(redBright("You've taken too much damage."))
              log(redBright("Game over."))
              return
            }
          } else {
            log(cyan("The alien missed!"));
          }
          // Alien didn't survive
        } else {
          log(cyan("Enemy ship destroyed!"));
          if (i == aliens.length - 1) {
            log(cyan("We've destroyed all the alien ships!!"));
            log(cyan("You Win! Game Over!"));
            return
          } else {
            log(yellow("Another enemy ship is approaching!"));
          }
        }
      } else {
        // We missed
        log(redBright("Captain, we missed!"));
        // Alien attacks
        log(yellow("The alien is trying to target our ship!"))
        if (Math.random() <= currentAlien.accuracy) {
          // They hit us!
          log(redBright("We took a direct hit on our vessel!"));
          ussShip.hull -= currentAlien.firepower
          log(`Our hull strength is now ${ussShip.hull}.`);
          // We get destroyed
          if (ussShip.hull <= 0) {
            log(redBright("You've taken too much damage."));
            log(redBright("Game over."));
            // End the loop
            return
          }
        } else {
          // They missed!
          log(cyan("The alien missed!"));
        }
      }
      // check if ship survives our attack, if it does it attacks
    } else {
      // retreat
      log(redBright("Earth dies because of your cowardice!"));
      log(redBright("Your crew mutinies. You jettison from ship into deep space to die frozen and alone."));
      log(redBright("Game over."));
      // End the loop
      return;
    }
  }
  
}

