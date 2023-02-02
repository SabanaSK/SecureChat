
//-----------------Variables for channels-----------------
const createChannelsButton = document.querySelector('#create-button');
const radio = document.querySelectorAll('input[type="radio"]');
const label = document.querySelectorAll('label');
const channels = document.querySelector('.channels');
const channelRight = document.querySelector('.right h2');
const channelsForm = document.querySelector('.channels-form');

//-----------------Variables for messages-----------------
const messageInput = document.querySelector("#message-input");
const messageList = document.querySelector(".message-list");
const sendButton = document.querySelector("#send-button");
//-----------------Variables for regiter-----------------
const registerBtn = document.querySelector('#registerBtn');
const registerUsername = document.querySelector('#registerUsername');
const registerPassword = document.querySelector('#registerPassword');
const confirmPassword = document.querySelector('#confirmPassword');
const registerForm = document.querySelector('.register-form');

//-----------------Variables for login-----------------
const loginBtn = document.querySelector('#loginBtn');
const logoutBtn = document.querySelector('#logoutBtn');
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const profile = document.querySelector('.profile');
const loginForm = document.querySelector('.login-form');
const showRegisterBtn = document.querySelector('#show-register');
const showLoginBtn = document.querySelector('#show-login');
/* const passwordToggle = document.querySelector('.password-toggle'); */
const welcomeMessage = document.querySelector('#welcomeMessage');

//-----------------Variables for API-----------------
const API_CHANNELS_ENDPOINT = "/api/channels";
const API_MESSAGES_ENDPOINT = "/api/messages";
const API_USERS_LOGIN_ENDPOINT = "/api/users/login";
const API_USERS_REGISTER_ENDPOINT = "/api/users/register";
const API_USERS_AUTOLOGIN_ENDPOINT = "/api/users/autologin";

let clickRadio = 1;
let selectedDiv = null;
let IsAuthorised = false;
let privacy;

loginForm.style.display = 'none';
registerForm.style.display = 'none';
profile.style.display = 'none';

showRegisterBtn.addEventListener('click', () => {
  loginForm.style.display = 'none';
  registerForm.style.display = 'block';
});

showLoginBtn.addEventListener('click', () => {
  loginForm.style.display = 'block';
  registerForm.style.display = 'none';
});

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


//When a channels is clicking must be inside 
//Display message data from database

/* THIS CODE IS COMING FROM GET CHANNELS CAN USE SAME JUST EDIT
fetch(const API_MESSAGES_ENDPOINT)
  .then((response) => {
    return response.json();
  })
  .then((data) => {

    let output = "";
    data.messages.forEach((item) => {
      output = `${item.channelName} ${item.privacy}`;
      let elements = document.createElement("div");
      elements.innerHTML = output;

      document.querySelector(".channels").appendChild(elements)
    });

  }) */


//AutoLogin
fetch(API_USERS_AUTOLOGIN_ENDPOINT, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'token': localStorage.getItem('token')
  }
}).then((response) => {
  return response.json();
}).then((data) => {
  if (data.status === "success") {
    console.log('the login is successful')

    console.log('the login is successful', data);
    let username = data.username;
    welcomeMessage.textContent = `Welcome ${username}`;

    loginForm.style.display = 'none';
    registerForm.style.display = 'none';
    profile.style.display = 'block';
  } /* else {
  SHOW ERROR MESSAGE
    } */
});


/*  sendErrorResponse(res, 'Invalid token'); */


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

/* 
//Create a new channel function is for only authoriza user
if (!IsAuthorised) {
  channelsForm.style.display = 'none';
} else {
  channelsForm.style.display = 'block';
} */

function toggleChannelsForm(isAuthorized) {
  channelsForm.style.display = isAuthorized ? 'block' : 'none';
}

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
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ channelName, privacy })
    })
    const data = await response.json();
    if (data.success) {
      appendDiv(`${channelName} ${privacy}`);
    } else {
      appendDiv(data.error);
    }
  } catch (error) {
    console.error(error);
    appendDiv("Error creating channel");
  }
}

createChannelsButton.addEventListener("click", function () {
  const privateInput = document.querySelector("#radio-private");
  const publicInput = document.querySelector("#radio-public");
  const createChannelsInput = document.querySelector("#create-channels").value;

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

//make the channels div clickable
channels.addEventListener('click', function (event) {
  if (event.target.tagName === 'DIV' && !event.target.classList.contains('channels') && !event.target.classList.contains('channels-form')) {
    if (event.target === selectedDiv) {
      selectedDiv.style.backgroundColor = '';
      selectedDiv = null;
      channelRight.innerText = '';
    } else {
      if (selectedDiv) {
        selectedDiv.style.backgroundColor = '';
      }
      selectedDiv = event.target;
      event.target.style.backgroundColor = 'purple';
      channelRight.innerText = event.target.innerText;
    }
  }

});

// -----------------Messages-----------------


//check if user is logged in
//if user is logged in, and pick a channel, show the messages with uersname and time
//if user is not logged in, show only the messages and time


messageInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter" && messageInput.value) {
    addMessage();
  }
});

sendButton.addEventListener("click", function () {
  if (messageInput.value) {
    addMessage();
  }
});

function addMessage() {
  const messageDiv = document.createElement("div");
  messageDiv.innerText = messageInput.value;
  messageDiv.classList.add("message");
  messageDiv.classList.add("framed");
  messageList.appendChild(messageDiv);
  messageInput.value = "";
}


// -----------------Login-----------------

loginBtn.addEventListener('click', () => {

  const requestData = {
    username: username.value,
    password: password.value,
  };

  fetch(API_USERS_LOGIN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestData),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {

        IsAuthorised = true;
        toggleChannelsForm(IsAuthorised);

        console.log('the login is successful')
        welcomeMessage.textContent = `Welcome ${username.value}`;


        profile.style.display = 'block';


        loginForm.style.display = 'none';


        registerForm.style.display = 'none';

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

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
  IsAuthorised = false;
  // Hide profile section
  profile.style.display = 'none';

  //Hide register form
  registerForm.style.display = 'none';

  // Show login form
  loginForm.style.display = 'block';
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

// -----------------Register-----------------

registerBtn.addEventListener('click', () => {
  if (registerPassword.value !== confirmPassword.value) {
    console.error("Passwords don't match");
    return;
  }

  // Make API call to register a new user
  const requestData = {
    username: registerUsername.value,
    password: registerPassword.value,
  };
  fetch(API_USERS_REGISTER_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestData),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        console.log("User registered successfully");

        //Hide login form
        loginForm.style.display = 'none';

        //Show register form
        registerForm.style.display = 'block';

        //Hide profile section
        profile.style.display = 'none';


      }
      /* else {
    SHOW ERROR MESSAGE
      } */
    })
    .catch((error) => {
      console.error('Error while registering:', error);
    });
});
