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
