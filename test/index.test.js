const { assert, expect } = require('chai');
const request = require('supertest');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;

const app = require('../server.js');

/**
 * Server Tests
 */

const parseTextFromHTML = (htmlAsString, selector) => {
  const selectedElement = new JSDOM(
    htmlAsString
  ).window.document.querySelectorAll(selector);
  if (selectedElement == null) {
    throw new Error(
      `No element with selector ${selector} found in HTML string`
    );
  } else {
    return selectedElement;
  }
};

describe('the homepage page', () => {
  describe('GET request', () => {
    it('returns a 200 status', async () => {
      const response = await request(app).get('/');
      assert.equal(response.status, 200);
    });

    it('the .form-title element contains the form section titles', async () => {
      const formTitleLocationAndDate = 'PICK A LOCATION AND DATE';
      const formTitleTimeSlot = 'PICK A TIME SLOT';
      const response = await request(app)
        .get('/')
        .send();
      assert.include(
        parseTextFromHTML(response.text, '.form-title')[0].textContent,
        formTitleLocationAndDate
      );
      assert.include(
        parseTextFromHTML(response.text, '.form-title')[1].textContent,
        formTitleTimeSlot
      );
    });
  });
});

describe('/users', () => {
  describe('GET', () => {
    describe('Get all users', () => {
      it('should return 200 status code, along with users array', async () => {
        const response = await request(app).get('/users');

        assert.equal(response.status, 200);
        assert.equal(JSON.parse(response.text).success, true);
        expect(JSON.parse(response.text).users).to.be.an('array');
      });
    });
  });
});

describe('/users/:id', () => {
  describe('GET', () => {
    describe('Get a single user info', () => {
      it('should return 200 status code, along with user object', async () => {
        const response = await request(app).get('/users/1');

        assert.equal(response.status, 200);
        assert.equal(JSON.parse(response.text).success, true);
        assert.equal(JSON.parse(response.text).user.length, 1);
        expect(JSON.parse(response.text).user).to.be.an('array');
      });
    });
  });
});

// describe('/users', () => {
//   describe('POST', () => {
//     describe('Create a user', () => {
//       it('should return 200 status code, along with user object created', async () => {
//         const user = {
//           firstName: 'Leana',
//           lastName: 'Chalker',
//           birthdate: '1990-06-15T04:00:00.000Z',
//           gender: 'Female',
//           email: 'johndoe@gmail.com',
//           relationshipStatus: 'Married',
//           height: 170,
//           hairColour: 'Green',
//           tagline: 'Test Tag Line',
//           bio: 'Meet me at airport',
//           imageUrl: 'Test Link'
//         };

//         const response = await request(app)
//           .post('/users')
//           .type('form')
//           .send(user);

//         assert.equal(response.status, 200);
//         assert.equal(JSON.parse(response.text).success, true);
//         expect(JSON.parse(response.text).user).to.be.an('object');
//       });
//     });
//   });
// });

// describe('/users/:id', () => {
//   describe('DELETE', () => {
//     describe('Delete a single user', () => {
//       it('should return 200 status code, along with deleted: true', async () => {
//         const response = await request(app).delete('/users/10');

//         assert.equal(response.status, 200);
//         assert.equal(JSON.parse(response.text).deleted, true);
//       });
//     });
//   });
// });

describe('/users', () => {
  describe('POST', () => {
    describe('valid search data', () => {
      it('should return 200 status code', async () => {
        const airport = 'YYZ';
        const date = '2020-01-21?';
        const time = [0, 1];

        const response = await request(app)
          .post('/users')
          .type('form')
          .send({ airport, date, time });

        assert.equal(response.status, 200);
        assert.equal(JSON.parse(response.text).success, true);
      });
    });
  });
});

describe('/users/:id', () => {
  describe('PUT', () => {
    describe('Update user information', () => {
      it('should return 200 status code', async () => {
        const updatedInfo = {
          email: 'johndoe@outlook.com'
        };
        const response = await request(app)
          .put('/users/1')
          .send(updatedInfo);

        assert.equal(response.status, 200);
        assert.equal(JSON.parse(response.text).updated, true);
      });
    });
  });
});

describe('Airport name autocomplete', () => {
  describe('/airports?query=<input-query>', () => {
    it('should return a list of airports matching by names', async () => {
      const query = 'pear';
      const response = await request(app).get(`/airports?search=${query}`);

      expect(JSON.parse(response.text)).to.be.an('array');
      assert.equal(JSON.parse(response.text).length, 2);
      JSON.parse(response.text).forEach(airport => {
        assert.include(airport.name.toLowerCase(), query);
      });
    });

    it('should include airports name and city', async () => {
      const query = 'pearson';
      const response = await request(app).get(`/airports?search=${query}`);

      assert.equal(
        JSON.parse(response.text)[0].name,
        'Lester B. Pearson International Airport'
      );
      assert.equal(JSON.parse(response.text)[0].city, 'Toronto');
    });
  });
});

describe('/trips/:userID', () => {
  describe('GET', () => {
    describe('Get all trips of a user', () => {
      it('should return 200 status code', async () => {
        const response = await request(app).get('/trips/1');

        assert.equal(response.status, 200);
        assert.equal(JSON.parse(response.text).success, true);
        expect(JSON.parse(response.text).trips).to.be.an('array');
      });
    });
  });
});

describe('/trips/:id', () => {
  describe('PUT', () => {
    describe('Update a trip information', () => {
      it('should return 200 status code', async () => {
        const newTripInfo = {
          airport: 'Pearson International Airport'
        };
        const response = await request(app)
          .put('/trips/1')
          .send(newTripInfo);

        assert.equal(response.status, 200);
        assert.equal(JSON.parse(response.text).updated, true);
      });
    });
  });
});

// describe('/trips', () => {
//   describe('POST', () => {
//     describe('Successful trip creation', () => {
//       it('should return 200 status code', async () => {
//         const trip = {
//           userID: 3,
//           airport: 'London Gatwick Airport',
//           date: '2020-02-14'
//         };

//         const response = await request(app)
//           .post('/trips')
//           .type('form')
//           .send(trip);

//         assert.equal(response.status, 200);
//         assert.equal(JSON.parse(response.text).success, true);
//         expect(JSON.parse(response.text).trip).to.be.an('object');
//       });
//     });
//   });
// });
