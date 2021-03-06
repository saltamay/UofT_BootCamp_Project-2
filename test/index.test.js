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
        expect(JSON.parse(response.text).data).to.be.an('array');
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
        // assert.equal(JSON.parse(response.text).success, true);
        // assert.equal(JSON.parse(response.text).data.length, 1);
        // expect(JSON.parse(response.text).user).to.be.an('object');
      });
    });
  });
});

describe('/users', () => {
  describe('POST', () => {
    describe('Create a user', () => {
      it('should return 200 status code, along with user object created', async () => {
        const user = {
          firstName: 'Leana',
          lastName: 'Chalker',
          birthdate: '1990-06-15T04:00:00.000Z',
          gender: 'Female',
          email: 'johndoe@gmail.com',
          relationshipStatus: 'Married',
          height: 170,
          hairColour: 'Green',
          tagline: 'Test Tag Line',
          bio: 'Meet me at airport',
          imageUrl: 'Test Link'
        };

        const response = await request(app)
          .post('/users')
          .send(user);

        assert.equal(response.status, 201);
        assert.equal(JSON.parse(response.text).success, true);
        expect(JSON.parse(response.text).data).to.be.an('object');
      });
    });
  });
});

describe('/users/:id', () => {
  describe('DELETE', () => {
    describe('Delete a single user', () => {
      it('should return 200 status code, along with success: true', async () => {
        const response = await request(app).delete('/users/9');

        assert.equal(response.status, 200);
        assert.equal(JSON.parse(response.text).success, true);
      });
    });
  });
});

describe('/users', () => {
  describe('GET', () => {
    describe('valid search data', () => {
      it('should return 200 status code', async () => {
        const airport = 'Pearson International Airport';
        const tripDate = '2020-01-21?';
        const timeSlot = [];

        const response = await request(app)
          .get('/users')
          .send({ airport, tripDate, timeSlot });

        assert.equal(response.status, 200);
        expect(JSON.parse(response.text).data).to.be.an('array');
        assert.equal(JSON.parse(response.text).success, true);
      });
    });
  });
});

describe('Airport airportName autocomplete', () => {
  describe('/airports?query=<input-query>', () => {
    it('should return a list of Airport matching by airportNames', async () => {
      const query = 'pear';
      const response = await request(app).get(`/airports?search=${query}`);

      expect(JSON.parse(response.text)).to.be.an('array');
      assert.equal(JSON.parse(response.text).length, 2);
      JSON.parse(response.text).forEach(airport => {
        assert.include(airport.airportName.toLowerCase(), query);
      });
    });

    it('should include Airport airportName and city', async () => {
      const query = 'pearson';
      const response = await request(app).get(`/airports?search=${query}`);

      assert.equal(
        JSON.parse(response.text)[0].airportName,
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
        assert.equal(JSON.parse(response.text).success, true);
      });
    });
  });
});

describe('/trips', () => {
  describe('POST', () => {
    describe('Successful trip creation', () => {
      it('should return 200 status code', async () => {
        const trip = {
          userId: 3,
          airportName: 'London Gatwick Airport',
          tripDate: '2020-02-14',
          timeSlot: ''
        };

        const response = await request(app)
          .post('/trips')
          .send(trip);

        assert.equal(response.status, 200);
        assert.equal(JSON.parse(response.text).success, true);
        expect(JSON.parse(response.text).data).to.be.an('object');
      });
    });
  });
});

describe('/trips/:id', () => {
  describe('DELETE', () => {
    describe('Delete a trip', () => {
      it('should return 200 status code, along with deleted: true', async () => {
        const response = await request(app).delete('/trips/5');

        assert.equal(response.status, 200);
        assert.equal(JSON.parse(response.text).success, true);
      });
    });
  });
});
