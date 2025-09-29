// const button = document.querySelector("button");
// button.addEventListener("click", () => {
//   const namePlayer1 = document.querySelector("#namePlayer1").value;
//   const namePlayer2 = document.querySelector("#namePlayer2").value;

//   if (!namePlayer1 || !namePlayer2) {
//     alert("Please enter both players name")
//   }

//   localStorage.setItem("namePlayer1", namePlayer1)
//   localStorage.setItem("namePlayer2", namePlayer2)

//   location.href = "./tictactoe.html";
//   return;
// });


const button = document.querySelector("button");

button.addEventListener("click", (e) => {
  e.preventDefault();

  const namePlayer1 = document.querySelector("#namePlayer1").value.trim();
  const namePlayer2 = document.querySelector("#namePlayer2").value.trim();

  if (!namePlayer1 || !namePlayer2) {
    alert("Please enter both players' names");
    return;
  }

  localStorage.setItem("namePlayer1", namePlayer1);
  localStorage.setItem("namePlayer2", namePlayer2);

  location.href = "./tictactoe.html";
});