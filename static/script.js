const createChannelsButton = document.querySelector('#create-button');
const radio = document.querySelectorAll('input[type="radio"]');
const label = document.querySelectorAll('label');

radio.forEach(function (radioButton) {
  radioButton.addEventListener("click", function () {
    console.log("radio button clicked");
    if (radioButton.checked) {
      radioButton.checked = !radioButton.checked;
    }
  });
});





//label for the radio buttons should be clickable
//radio buttons should be able to select just one option
//showing message for all errors that happen

fetch("/api/channels")
  .then((response) => {
    return response.json();
  })
  .then((data) => {

    let output = "";
    data.channels.forEach((item) => {
      output = `${item.channelName} ${item.privacy}`;
      let elements = document.createElement("div");
      elements.innerHTML = output;

      document.querySelector(".channels").appendChild(elements)
    });

  })
/*  .catch((error) => {
   console.log("Error:", error);
 }); */



createChannelsButton.addEventListener("click", async function () {
  console.log("create button clicked");
  let createChannelsInput = document.querySelector("#create-channels").value;
  let privacy;

  if (privateInput.checked) {
    privacy = "Private";
  } else if (publicInput.checked) {
    privacy = "Public";
  }

  const response = await fetch("/api/channels", {
    method: "GET"
  })

  const newDiv = document.createElement("div");
  newDiv.innerText = `${createChannelsInput} ${privacy}`;
  let elements = document.querySelectorAll("main div");
  let element = elements[0].children[0];
  element.appendChild(newDiv);
});
