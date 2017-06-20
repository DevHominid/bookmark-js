'use strict';

// Listen for form submit
document.getElementById('form-a').addEventListener('submit', saveBookmark);

// Save bookmark
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

  // LocalStorage test
  localStorage.setItem('test', 'Hello World');
  console.log(localStorage.getItem('test'));
  localStorage.removeItem('test');
  console.log(localStorage.getItem('test'));

  // Prevent form from submitting
  e.preventDefault();
}