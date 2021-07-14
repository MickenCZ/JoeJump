if (window.localStorage.highScore == undefined) {
  window.localStorage.setItem("highScore", 0)
} 
document.getElementById("highScore").innerHTML = "Highscore: " + localStorage.highScore
//Sets the score if empty and displays it on the screen

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//Basically imports the speech recognition API
const recognition = new window.SpeechRecognition(); //Creates an instance that I can customize
recognition.interimResults = true; //returns the text even in mid sentence, false would wait until you stop speaking
recognition.lang = 'en-US'; //changes language, default is local, for me Czech

recognition.addEventListener('result', (e) => {
  const textArray = Array.from(e.results[0][0].transcript)
  let text = textArray.join("");
  //The promise has a weird shape but this basically transforms it into a string
  console.log(text)

  if (text.includes('Joe') || text.includes('jo') || text.includes('show') || text.includes('Jo') || text.includes('yo') || text.includes('John')) {
    jump();
  }
   //this arrow function gets executed when you speak. This just sets it up.
})


recognition.addEventListener('end', () => {
  recognition.start()
}) //this keeps it running. Doesn't start it to begin with, just starts it when it ends.





//Dino game part! The voice recognition is setup and but the game isn't there yet.
const dino = document.getElementById("dino")
const cactus = document.getElementById("cactus")
const closeModal = document.getElementById("close-button")
const overlay = document.getElementById("overlay")
const modal = document.getElementById("modal")

function jump() {
  if (dino.classList != "jump") {
  dino.classList.add("jump");
  setTimeout(() => {
    dino.classList.remove("jump");
  }, 1000)
}//jump is a class with a jump animation. SetTimeout so you can't jump more than once at once
}


function startGame() {
  document.getElementById("highScore").innerHTML = "Highscore: " + localStorage.highScore
  /* when the button is clicked, starts the game by inserting the only infinite animation into css stylesheets (at the end of them). The animation makes the cactus go left*/
  cactus.classList.add("anim") //starts the animation of the cactus
  let score = 0
  


  let isAlive = setInterval(() => {//dinotop is y axis position of dino, cactusleft is x axis position of cactus. This is the main logic. Each iteration some score is added and is displayed.
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"))
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"))
    score++
    document.getElementById("score").innerHTML = "Score: " + score.toString()
    


    /*colission detection, the dino is between 40 an 90, it's 50 px wide. 130 means that colission is avoided when the dino is up in the skies.*/
    if (cactusLeft > 40 && cactusLeft < 90 && dinoTop >= 130) {
      const joeMama = new Audio('./assets/Joe Mama.mp3')
      joeMama.play()
      cactus.classList.remove("anim")
      //stops the animation

      //This makes the popup window work.
      modal.classList.add('active')
      overlay.classList.add('active')


      clearInterval(isAlive) //This stops counting the score and puts it in high score local storage if its high enough.
      if (score > localStorage.highScore) {
        localStorage.setItem("highScore", score)
        document.getElementById("highScore").innerHTML = "Highscore: " + localStorage.highScore
      }


      closeModal.addEventListener("click", () => {//this is the X in the popup
        modal.classList.remove('active')
        overlay.classList.remove('active')
        })
      overlay.addEventListener("click", () => {
        modal.classList.remove('active')
        overlay.classList.remove('active')
      })
    }
  }, 10);
}


recognition.start(); 
//this launches the voice recognition after everything is setup

