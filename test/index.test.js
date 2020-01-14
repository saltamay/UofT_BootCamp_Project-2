const { assert } = require('chai');
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
        const airport = 'YYZ';
        const date = '2020-01-21?';
        const time = [0, 1];

        const response = await request(app)
          .post('/users')
          .type('form')
          .send({ airport, date, time });

        assert.equal(response.status, 200);
      });
    });
  });
});
