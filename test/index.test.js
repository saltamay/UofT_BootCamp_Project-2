const { assert } = require('chai');
const request = require('supertest');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;

const app = require('../server.js');

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

describe('the homepage', () => {
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
