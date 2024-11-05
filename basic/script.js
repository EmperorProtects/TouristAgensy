
document.getElementById('form').addEventListener('submit', async function(event) {
  event.preventDefault();

  const audio = new Audio('./img/audio_file.mp3');
  audio.play();

  clearErrors();

  const email = document.getElementById('inputEmail').value.trim();
  const name = document.getElementById('inputName').value.trim();
  const isChecked = document.getElementById('Check').checked;

  const isValid = validateForm(email, name, isChecked);

  if (isValid) {
    await submitForm({ name, email });
  }
});

function clearErrors() {
  document.getElementById('emailError').textContent = '';
  document.getElementById('nameError').textContent = '';
  document.getElementById('checkError').textContent = '';
  document.getElementById('inputEmail').classList.remove('is-invalid');
  document.getElementById('inputName').classList.remove('is-invalid');
  document.getElementById('Check').classList.remove('is-invalid');
}

function validateForm(email, name, isChecked) {
  let isValid = true;
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,6}$/;

  if (email === '') {
    showError('emailError', 'Email is required.', 'inputEmail');
    isValid = false;
  } else if (!emailPattern.test(email)) {
    showError('emailError', 'Please enter a valid email.', 'inputEmail');
    isValid = false;
  }

  if (name === '') {
    showError('nameError', 'Name is required.', 'inputName');
    isValid = false;
  }

  if (!isChecked) {
    showError('checkError', 'You must check this box.', 'Check');
    isValid = false;
  }

  return isValid;
}

function showError(errorId, message, inputId) {
  document.getElementById(errorId).textContent = message;
  document.getElementById(inputId).classList.add('is-invalid');
}

async function submitForm(formData) {
  try {
    const response = await fetch('http://localhost:3000/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    let JsonRes = await response.json();
    if (response.ok) {
      alert(JsonRes.message);
      displayThankYouMessage();
    }
    // else {
    //   const errorResponse = await response.json();
    //   displayErrorMessage(errorResponse.message);
    // }
  } catch (error) {
    displayErrorMessage('An error occurred while submitting the form.');
  }
}

function displayThankYouMessage() {
  document.getElementById('footer').innerHTML = `
            <div class="thank-you">Thank you for submitting the form!</div>
        `;
}

function displayErrorMessage(message) {
  document.getElementById('footer').innerHTML = `
            <div class="error">${message}</div>
        `;
}
///////////////////

const menuItems = document.querySelectorAll('#item');
let currentIndex = 0;

menuItems[currentIndex].focus();

console.log(menuItems)
menuItems.forEach((item, index) => {
  item.addEventListener('keydown', (event) => {
    if (event.key === 'j') {
      event.preventDefault();
      console.log("sdas")
      currentIndex = (index + 1) % menuItems.length;
      menuItems[currentIndex].focus();
    } else if (event.key === 'k') {
      console.log("sdas")
      event.preventDefault();
      currentIndex = (index - 1 + menuItems.length) % menuItems.length;
      menuItems[currentIndex].focus();
    }
  });
});

//////////////////
document.querySelectorAll('.item__header').forEach(item => {
  item.addEventListener('click', () => {
    const content = item.nextElementSibling;

    if (content.style.display === 'block') {
      content.style.display = 'none';
    } else {
      content.style.display = 'block';
    }
  });
});

////////////////
contactButton = document.getElementById('contact-button');
contactButton.addEventListener('click', () => {
  const popupForm = document.getElementById('form');
  if (popupForm.style.display === 'block') {
    popupForm.style.display = 'none';
  } else {
    popupForm.style.display = 'block';
  }

}
);

document.getElementById('contact-button').onclick = function() {
  document.getElementById('form').style.display = 'block';
}


document.getElementById('subscriptionForm').onsubmit = function(event) {
  document.getElementById('form').style.display = 'none';
  this.reset();
}


//////////////////////////////////
const button = document.getElementById('changeColor');

button.addEventListener('click', () => {
  if (document.body.style.backgroundColor === 'white') {
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'wheat';
    // document.getElementsById(' navbar').classList.remove('bg-body-tertiary')
  } else {
    document.body.style.backgroundColor = 'white';
    document.body.style.color = 'gray'

    // document.getElementsById(' navbar').classList.remove('bg-body-tertiary')
  }
});

////////////////////////

function updateDateTime() {
  const now = new Date();

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
  };
  const formattedDateTime = now.toLocaleString('en-US', options);

  document.getElementById('dateTimeBlock').textContent = formattedDateTime;
}

function getGreeting() {
  const now = new Date();
  const hours = now.getHours();

  switch (true) {
    case (hours < 12):
      return "Good Morning!";
    case (hours < 18):
      return "Good Afternoon!";
    default:
      return "Good Evening!";
  }

}

document.getElementById('greet').textContent = getGreeting();

/////////////////////////////////////

const randomFacts = [
  "Honey never spoils: Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still edible.",
  "Octopuses have three hearts: Two pump blood to the gills, while one pumps it to the rest of the body.",
  "Bananas are berries, but strawberries aren't: In botanical terms, a berry is a fruit produced from the ovary of a single flower with seeds embedded in the flesh.",
  "The Eiffel Tower can be 15 cm taller in the summer: Due to thermal expansion, the iron expands in the heat.",
  "A group of flamingos is called a 'flamboyance': This colorful term reflects their vibrant feathers and social behavior.",
  "Wombat poop is cube-shaped: This unique shape prevents the poop from rolling away and marks their territory.",
  "The shortest war in history: The Anglo-Zanzibar War lasted only 38 minutes on August 27, 1896.",
  "You can hear a blue whale’s heartbeat from over 2 miles away: Their hearts can weigh as much as a small car and beat only a few times per minute.",
  "Cats have fewer toes on their back paws: While they typically have five toes on their front paws, they usually have only four on their back paws.",
  "The inventor of the Pringles can is buried in one: Fredric Baur, the inventor of the Pringles can, requested that some of his ashes be buried in one after he passed away."
];

document.getElementById('fetch-button').addEventListener('click', fetchNewContent);

function fetchNewContent() {
  // Select a random fact from the array
  const randomIndex = Math.floor(Math.random() * randomFacts.length);
  const randomFact = randomFacts[randomIndex];

  // Display the random fact in the content area
  document.querySelector('#content').textContent = randomFact;
}
//////////////////////////////////
document.getElementById('clear-button').addEventListener('click', resetForm);
function resetForm() {
  // Clear all input fields
  document.querySelectorAll('.form-control').forEach(input => {
    input.value = '';
  });
}
updateDateTime();

setInterval(updateDateTime, 1000);
