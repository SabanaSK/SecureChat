const privateInput = document.querySelector('#private');
const publicInput = document.querySelector('#public');
const createChannelsButton = document.querySelector('#create-button');

//label for the radio buttons should be clickable
//radio buttons should be able to select just one option
//showing message for all errors that happen


fetch("/api/channels")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // display the data on the front end
    let output = "";
    data.channels.forEach((item) => {
      output = `<p>${item.channelName} ${item.privacy}</p>`;
      let elements = document.createElement("div");
      elements.innerHTML = output;

      document.getElementById("data").appendChild(elements)
    });

  })
  .catch((error) => {
    console.log("Error:", error);
  });



createChannelsButton.addEventListener("click", async function () {
  console.log("create button clicked");
  let createChannelsInput = document.getElementById("create-channels").value;
  let privacy;

  //What happend of the user doesn't select any option?
  //div created too late. Must be in channels list
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
