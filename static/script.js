/* const privateInput = document.querySelector('#private');
const publicInput = document.querySelector('#public');
const createChannelsButton = document.querySelector('#create-button');

//label for the radio buttons should be clickable
//radio buttons should be able to select just one option
//showing message for all errors that happen

createChannelsButton.addEventListener("click", function () {
  console.log("create button clicked");
  const createChannelsInput = document.getElementById("create-channels").value;
  let privacy;

  //What happend of the user doesn't select any option?
  //div created too late. Must be in channels list
  if (privateInput.checked) {
    privacy = "Private";
  } else if (publicInput.checked) {
    privacy = "Public";
  }
  const newDiv = document.createElement("div");
  newDiv.innerText = `${createChannelsInput} ${privacy}`;
  document.body.appendChild(newDiv);
});
 */