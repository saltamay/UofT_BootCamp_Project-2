// Add event listeners to time slot list items
document.querySelectorAll('.time-slots .list-group-item').forEach(listItem => {
  listItem.addEventListener('click', e => {
    e.target.classList.toggle('selected');
  });
});

// Add event listener to search form submit button
document
  .querySelector('.search-button button')
  .addEventListener('click', async e => {
    e.preventDefault();

    const airport = document.getElementById('airport').value;
    const date = document.getElementById('date').value;
    const time = [];
    document.querySelectorAll('.selected').forEach(selectedTime => {
      time.push(selectedTime.dataset.timeSlot);
    });

    const data = { airport, date, time };

    try {
      const response = await fetch('/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const resJson = await response.json();

        console.log(resJson);
      }
    } catch (error) {
      if (error) {
        console.log(error);
        throw error;
      }
    }
  });

// Airport Search Autocomplete
const handleArraySelect = e => {
  const airportInput = document.querySelector('#airport');
  const airportList = document.querySelector('#suggestions');

  airportInput.value = e.currentTarget.querySelector('.airport-info').innerText;
  airportList.innerHTML = '';
};
const displayMatches = airportsArray => {
  document.getElementById('suggestions').innerHTML = '';
  airportsArray.forEach(airport => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'list-group-item-light');
    li.innerHTML = `<span class="airport-info">${airport.name}, ${airport.city}</span>`;
    li.onclick = event => handleArraySelect(event);
    document.getElementById('suggestions').appendChild(li);
  });
};

document.getElementById('airport').addEventListener('keyup', async e => {
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
