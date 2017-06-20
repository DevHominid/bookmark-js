'use strict';

// listen for form submit
document.getElementById('form-a').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
  console.log('It Works!');

  // Get form values
  var siteName = document.getElementById('siteName').value;
  console.log(siteName);
  var siteUrl = document.getElementById('siteUrl').value;
  console.log(siteUrl);

  var bookmark = {
    name: siteName,
    url: siteUrl
  };

  console.log(bookmark);

  // Prevent form from submitting
  e.preventDefault();
}