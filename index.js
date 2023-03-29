const submitButton = document.getElementById("submitButton");
const emptyDiv = document.getElementById("testDiv");

function testFunction() {
  fetch("http://localhost:3000/")
    .then((res) => res.text())
    .then((html) => (emptyDiv.innerHTML = html));
}

//submitButton.addEventListener("click", testFunction);
