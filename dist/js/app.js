'use strict';

// Listen for form submit
document.getElementById('form-a').addEventListener('submit', saveBookmark);

// Save bookmark
function saveBookmark(e) {
  //console.log('It Works!');

  // Get form values
  var siteName = document.getElementById('siteName').value;
  //console.log(siteName);
  var siteUrl = document.getElementById('siteUrl').value;
  //console.log(siteUrl);

  // Validate form
  if (!validateForm(siteName, siteUrl)) {
    return false;
  }

  // Check for duplicates
  if (!checkDuplicate(siteUrl)) {
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteUrl
  };

  //console.log(bookmark);

  /*
    // LocalStorage test
    localStorage.setItem('test', 'Hello World');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
  */

  // Test if bookmark is null
  if (localStorage.getItem('bookmarks') === null) {
    // Init array
    var bookmarks = [];
    // Add to array
    bookmarks.push(bookmark);
    // Set to LocalStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    // Get bookmarks from LocalStorage
    var _bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Add bookmark to array
    _bookmarks.push(bookmark);
    // Re-set back to LocalStorage
    localStorage.setItem('bookmarks', JSON.stringify(_bookmarks));
  }

  // Clear form
  document.getElementById('form-a').reset();

  // Re-fetch bookmarks
  fetchBookmarks();

  // Prevent form from submitting
  e.preventDefault();
}

// Delete bookmark
function deleteBookmark(url) {
  // Get bookmarks from LocalStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Loop through bookmarks
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      // Remove from array
      bookmarks.splice(i, 1);
    }
  }
  // Re-set back to LocalStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // Re-fetch bookmarks
  fetchBookmarks();
}

// Fetch bookmarks
function fetchBookmarks() {
  // Get bookmarks from LocalStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  // Get output ID
  var bookmarksResults = document.getElementById('results');

  // Build outputStyle
  bookmarksResults.innerHTML = '';

  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="well">' + '<h3>' + name + ' <a class="btn btn-default" target="_blank" href="' + url + '">Visit</a>' + ' <a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger" href="#">Delete</a>' + '</h3>' + '</div>';
  }
}

function validateForm(siteName, siteUrl) {

  // Form validation (empty values)
  if (!siteName || !siteUrl) {
    alert('Please fill in the form');
    return false;
  }

  // Form validation (url)
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert('Please use a valid URL');
    return false;
  }
  return true;
}

// Control for duplicates
function checkDuplicate(siteUrl) {

  // Get bookmarks from LocalStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  // Check for duplicates
  for (var i = 0; i < bookmarks.length; i++) {
    var bookmarkCheck = function bookmarkCheck() {
      if (confirm('This bookmark already exists! Is that okay?') === true) {
        return true;
      } else {
        return false;
      }
    };

    var url = bookmarks[i].url;

    if (url === siteUrl) {
      if (!bookmarkCheck()) {
        return false;
      }
    }
  }
  return true;
}