const createChannelsButton = document.querySelector('#create-button');
const radio = document.querySelectorAll('input[type="radio"]');
const label = document.querySelectorAll('label');
const API_CHANNELS_ENDPOINT = "/api/channels";
let clickRadio = 0;


//-----------------Channels, radio and create button-----------------
//radio button
for (let input of radio) {
  input.addEventListener("click", function () {
    // Check if the radio button is being unchecked
    if (input.checked && clickRadio % 2 === 0) {
      input.checked = false;
      clickRadio++;
    }
    // Check if the radio button is being checked
    else if (input.checked && clickRadio % 2 !== 0) {
      clickRadio++;
    }
    // Check if the radio button is being unchecked
    else if (!input.checked) {
      clickRadio--;
    }
  });
}

//Make the database display on the page
fetch(API_CHANNELS_ENDPOINT)
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


//Create a new channel
function appendDiv(text) {
  const newDiv = document.createElement("div");
  newDiv.innerText = text;
  let elements = document.querySelectorAll("main div");
  let element = elements[0].children[0];
  element.appendChild(newDiv);
}

function validateInput(inputValue) {
  if (!inputValue) {
    appendDiv("Please enter a channel name");
    return false;
  }
  return true;
}

async function createChannel(channelName, privacy) {
  try {
    const response = await fetch(API_CHANNELS_ENDPOINT, {
      method: "GET"
    })
    appendDiv(`${channelName} ${privacy}`);
  } catch (error) {
    console.error(error);
  }
}

createChannelsButton.addEventListener("click", function () {
  const privateInput = document.querySelector("#radio-private");
  const publicInput = document.querySelector("#radio-public");
  const createChannelsInput = document.querySelector("#create-channels").value;
  let privacy;

  if (privateInput.checked && publicInput.checked) {
    appendDiv("Please select only one option");
    return;
  } else if (!privateInput.checked && !publicInput.checked) {
    appendDiv("Please select one option");
    return;
  }
  else {
    if (privateInput.checked) {
      privacy = "Private";
    } else if (publicInput.checked) {
      privacy = "Public";
    }

    if (validateInput(createChannelsInput)) {
      createChannel(createChannelsInput, privacy);
    }
  }
});

// -----------------Login-----------------
const loginBtn = document.querySelector('#loginBtn');
const logoutBtn = document.querySelector('#logoutBtn');
const username = document.querySelector('#username');
const password = document.querySelector('#password');
/* const passwordToggle = document.querySelector('.password-toggle'); */
const welcomeMessage = document.querySelector('#welcomeMessage');
const API_USERS_ENDPOINT = "/api/users";

document.querySelector('.profile').style.display = 'none';


loginBtn.addEventListener('click', () => {
  // Make API call to check if the username and password are valid
  const requestData = {
    username: username.value,
    password: password.value,
  };
  fetch(API_USERS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestData),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        // Update welcome message with username
        console.log('the login is successful')
        welcomeMessage.textContent = `Welcome ${username.value}`;

        // Show profile section
        document.querySelector('.profile').style.display = 'block';

        // Hide login form
        document.querySelector('.login-form').style.display = 'none';
      } /* else {
    SHOW ERROR MESSAGE
      } */
    })
    .catch((error) => {
      console.error('Error while logging in:', error);
    });
});

logoutBtn.addEventListener('click', () => {
  // Perform logout action, e.g. clear local storage or make an API call to logout

  // Hide profile section
  document.querySelector('.profile').style.display = 'none';

  // Show login form
  document.querySelector('.login-form').style.display = 'block';
});

/* passwordToggle.addEventListener('click', () => {
  if (password.type === 'password') {
    password.type = 'text';
    passwordToggle.classList.remove('fa-eye');
    passwordToggle.classList.add('fa-eye-slash');
  } else {
    password.type = 'password';
    passwordToggle.classList.remove('fa-eye-slash');
    passwordToggle.classList.add('fa-eye');
  }
}); */
