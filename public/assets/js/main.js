if (document.querySelector('#index')) {
  // Add event listeners to time slot list items
  document
    .querySelectorAll('.time-slots .list-group-item')
    .forEach(listItem => {
      listItem.addEventListener('click', e => {
        e.target.classList.toggle('selected');
      });
    });

  // Airport Search Autocomplete
  const handleArraySelect = e => {
    const airportInput = document.querySelector('#airportName');
    const airportList = document.querySelector('#suggestions');

    airportInput.value = e.currentTarget.querySelector(
      '.airport-info'
    ).innerText;
    airportList.innerHTML = '';
  };
  const displayMatches = AirportArray => {
    document.getElementById('suggestions').innerHTML = '';
    AirportArray.forEach(airport => {
      const li = document.createElement('li');
      li.classList.add('list-group-item', 'list-group-item-light');
      li.innerHTML = `<span class="airport-info">${airport.airportName}, ${airport.city}</span>`;
      li.onclick = event => handleArraySelect(event);
      document.getElementById('suggestions').appendChild(li);
    });
  };

  document.getElementById('airportName').addEventListener('keyup', async e => {
    const query = e.target.value;

    if (query.length >= 3) {
      try {
        const res = await fetch(`/airports?search=${query}`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json'
          }
        });

        if (res.ok) {
          const jsonRes = await res.json();
          displayMatches(jsonRes);
        }
      } catch (error) {
        console.log(error);
      }
    }
  });
  // Get trip info
  const getTripInfo = () => {
    const airportName = document.getElementById('airportName').value;
    const tripDate = document.getElementById('date').value;
    let timeSlot = [];
    document.querySelectorAll('.selected').forEach(selectedTime => {
      timeSlot.push(selectedTime.dataset.timeSlot);
    });
    timeSlot = timeSlot.toString();
    const data = { airportName, tripDate, timeSlot };
    return data;
  };
  // Add event listener to search form submit button
  document
    .querySelector('.search-button button')
    .addEventListener('click', async e => {
      e.preventDefault();

      const data = getTripInfo();

      console.log(data);

      try {
        const response = await fetch('/users/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          const resJson = await response.json();

          console.log(resJson);

          let html = '<div class="row">';

          resJson.data.forEach(user => {
            html += `
            
            <div class="col-5">
                <h1  class="card-title">${user.firstName} ${user.lastName}</h1>
                <div class="card-body">
                    <p class="card-text">${user.tagline}</p class="card-text"> </p>
                    <p class="card-text">${user.bio} </p>
                    <p class="card-text">${user.birthDate}</p>
                    <p class="card-text">${user.relationshipStatus}</p>
                </div>
            </div>
            
            `;
          });
          html += '</div>';
          console.log(html);

          document.getElementById('index').innerHTML = html;
        }
      } catch (error) {
        if (error) {
          console.log(error);
          throw error;
        }
      }
    });
}

if (document.querySelector('#signup')) {
  document
    .querySelector('.signup-button button')
    .addEventListener('click', async e => {
      e.preventDefault();

      const firstName = document.getElementById('firstName').value;
      const lastName = document.getElementById('lastName').value;
      const email = document.getElementById('email').value;
      const birthDate = document.getElementById('birthdate').value;
      const gender = document.querySelector('input[name="gender"]:checked')
        .value;
      const relationshipStatus = document.querySelector(
        'input[name="relationship"]:checked'
      ).value;
      const height = document.getElementById('height').value;
      const hairColor = document.getElementById('hairColor').value;
      const bio = document.getElementById('bio').value;
      const imageUrl = document.getElementById('imageUrl').value;

      const newUser = {
        firstName,
        lastName,
        email,
        birthDate,
        gender,
        relationshipStatus,
        height,
        hairColor,
        bio,
        imageUrl
      };

      try {
        const response = await fetch('/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newUser),
          redirect: 'follow'
        });

        if (response.ok) {
          const resJson = await response.json();
          console.log(resJson);
          window.location.href = '/';
        }
      } catch (error) {
        if (error) {
          console.log(error);
          throw error;
        }
      }
    });
}

if (document.querySelector('#add-trip')) {
  // Airport Search Autocomplete
  const handleArraySelect = e => {
    const airportInput = document.querySelector('#airportName');
    const airportList = document.querySelector('#suggestions');

    airportInput.value = e.currentTarget.querySelector(
      '.airport-info'
    ).innerText;
    airportList.innerHTML = '';
  };
  const displayMatches = AirportArray => {
    document.getElementById('suggestions').innerHTML = '';
    AirportArray.forEach(airport => {
      const li = document.createElement('li');
      li.classList.add('list-group-item', 'list-group-item-light');
      li.innerHTML = `<span class="airport-info">${airport.airportName}, ${airport.city}</span>`;
      li.onclick = event => handleArraySelect(event);
      document.getElementById('suggestions').appendChild(li);
    });
  };

  // Add event listeners to time slot list items
  document
    .querySelectorAll('.time-slots .list-group-item')
    .forEach(listItem => {
      listItem.addEventListener('click', e => {
        e.target.classList.toggle('selected');
      });
    });

  // Get trip info
  const getTripInfo = () => {
    const airportName = document.getElementById('airportName').value;
    const tripDate = document.getElementById('date').value;
    let timeSlot = [];
    document.querySelectorAll('.selected').forEach(selectedTime => {
      timeSlot.push(selectedTime.dataset.timeSlot);
    });
    timeSlot = timeSlot.toString();
    const data = { airportName, tripDate, timeSlot };
    return data;
  };

  // Get user info
  // TODO: Remove after authentication is implemented
  const getUserInfo = () => {
    const userId = document.getElementById('userId').value;
    return userId;
  };

  document.getElementById('airportName').addEventListener('keyup', async e => {
    const query = e.target.value;

    if (query.length >= 3) {
      try {
        const res = await fetch(`/airports?search=${query}`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json'
          }
        });

        if (res.ok) {
          const jsonRes = await res.json();
          displayMatches(jsonRes);
        }
      } catch (error) {
        console.log(error);
      }
    }
  });
  // Add event listener to search form submit button
  document
    .querySelector('.addtrip-button button')
    .addEventListener('click', async e => {
      e.preventDefault();

      const tripInfo = getTripInfo();
      const userId = getUserInfo();

      const data = {
        ...tripInfo,
        userId
      };

      console.log(data);

      try {
        const response = await fetch('/trips', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          const resJson = await response.json();

          console.log(resJson);

          window.location.href = '/';
        }
      } catch (error) {
        if (error) {
          console.log(error);
          throw error;
        }
      }
    });
}
