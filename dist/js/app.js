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

  var bookmark = {
    name: siteName,
    url: siteUrl
  };

  console.log(bookmark);

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

  // Prevent form from submitting
  e.preventDefault();
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

    bookmarksResults.innerHTML += '<div class="well">' + '<h3>' + name + ' <a class="btn btn-default" target="_blank" href="' + url + '">Visit</a>' + ' <a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger" target="_blank" href="' + url + '">Delete</a>' + '</h3>' + '</div>';
  }
}