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
  describe('POST', () => {
    describe('valid search data', () => {
      it('should return 200 status code', async () => {
        const airport = 'Pearson International Airport';
        const tripDate = '2020-01-21?';
        const timeSlot = [];

        const response = await request(app)
          .post('/users')
          .send({ airport, tripDate, timeSlot });

        assert.equal(response.status, 200);
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
