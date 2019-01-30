'use strict';

const app = require('../../app');  
const Browser = require('zombie');
const PORT = process.env.NODE_ENV === 'production' ? 3000 : 3001; 
const LANGUAGES = require('../../views/data/languages');

Browser.localhost('example.com', PORT);
      
describe('client', () => {
      
  let browser, document;       
  beforeEach((done) => {       
    browser = new Browser({ waitDuration: '30s', loadCss: false });

    // document
    browser.on('loading', (doc) => {
      document = doc;
      document.addEventListener("DOMContentLoaded", (event) => {
        browser.click('.chooser-button', (err) => {
          done();
        });
      });
    });

    browser.visit('/', (err) => {
      if (err) done.fail(err);
      browser.assert.success();
    });
  });

  describe('UI', () => {
    it('structures the modal', () => {
      browser.assert.element('nav.chooser');

      browser.assert.element('.language-list');

      browser.assert.text('.language-list h1', 'Select a New Input System Language');
      browser.assert.element('.language-list input[type=text]');
      browser.assert.element('.language-list section.language-table');
      browser.assert.elements('.language-list header span', 4);
      browser.assert.text('.language-list header span:nth-child(1)', 'Name');
      browser.assert.text('.language-list header span:nth-child(2)', 'Code');
      browser.assert.text('.language-list header span:nth-child(3)', 'Country');
      browser.assert.text('.language-list header span:nth-child(4)', 'Other Names');
      browser.assert.element('.language-list section.language-table');
      browser.assert.elements('.language-list section.language-table div', LANGUAGES.length);
    });

    it('shows a list of languages', () => {
      LANGUAGES.forEach((lang, i) => {
        browser.assert.text(`section.language-table div.lang:nth-of-type(${i + 1}) .lang-name`, lang.name);
        browser.assert.text(`section.language-table div.lang:nth-of-type(${i + 1}) .lang-code`, lang.code);
        browser.assert.text(`section.language-table div.lang:nth-of-type(${i + 1}) .lang-country`, lang.country);
        browser.assert.text(`section.language-table div.lang:nth-of-type(${i + 1}) .lang-other`, lang.otherNames);
      });
    });

//    it('displays the current language', (done) => {
//      browser.click('.language-list li', (err) => {
//        if (err) done.fail(err);
//        browser.assert.text('h1.current-language', 'English');
//        done();
//      });
//    });
//

    it('closes the list when chooser button is clicked', (done) => {
      browser.assert.element('.language-list');
      browser.click('.chooser-button', (err) => {
        browser.assert.elements('.language-list', 0);
        done();
      });
    });

    describe('language search', () => {

      it('gives focus to search input', () => {
        browser.assert.hasFocus('input[name=search]')
      });

      it('only shows matching language codes', (done) => {
        browser.fill('search', 'lo');
        browser.fire('input[name=search]', 'change', () => {
          let input = browser.querySelector('input[name=search]')

          browser.assert.elements('.language-list section.language-table div', 1);
          done();
        });
      });

      it('only shows matching countries', (done) => {
        browser.fill('search', 'China');
        browser.fire('input[name=search]', 'change', () => {
          let input = browser.querySelector('input[name=search]')

          browser.assert.elements('.language-list section.language-table div', 4);
          done();
        });
      });

      it('is case-insensitive in its searches', (done) => {
        browser.fill('search', 'THAILAND');
        browser.fire('input[name=search]', 'change', () => {
          let input = browser.querySelector('input[name=search]')

          browser.assert.elements('.language-list section.language-table div', 3);
          done();
        });
      });
    });
  });
});
