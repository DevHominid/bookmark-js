// Listen for form submit
document.getElementById('form-a').addEventListener('submit', saveBookmark);

// Save bookmark
function saveBookmark(e) {
  //console.log('It Works!');

  // Get form values
  const siteName = document.getElementById('siteName').value;
  //console.log(siteName);
  const siteUrl = document.getElementById('siteUrl').value;
  //console.log(siteUrl);

  if (!validateForm(siteName, siteUrl)) {
    return false;
  }

  const bookmark = {
    name: siteName,
    url: siteUrl
  }

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
    let bookmarks = [];
    // Add to array
    bookmarks.push(bookmark);
    // Set to LocalStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  else {
    // Get bookmarks from LocalStorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Add bookmark to array
    bookmarks.push(bookmark);
    // Re-set back to LocalStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // Re-fetch bookmarks
  fetchBookmarks();

  // Prevent form from submitting
  e.preventDefault();
}

// Delete bookmark
function deleteBookmark(url) {
  // Get bookmarks from LocalStorage
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
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
  const bookmarksResults = document.getElementById('results');

  // Build outputStyle
  bookmarksResults.innerHTML = '';

  for (var i = 0; i < bookmarks.length; i++) {
    const name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="well">'+
                                  '<h3>'+name+
                                  ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>' +
                                  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>' +
                                  '</h3>'+
                                  '</div>';
  }
}

function validateForm(siteName, siteUrl) {
  // Form validation (empty values)
  if (!siteName || !siteUrl) {
    alert('Please fill in the form');
    return false;
  }

  // Form validation (url)
  const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  const regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert('Please use a valid URL');
    return false;
  }
  return true;
}
