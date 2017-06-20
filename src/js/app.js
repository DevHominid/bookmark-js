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

  // Prevent form from submitting
  e.preventDefault();
}

// Fetch bookmarks
function fetchBookmarks() {
  // Get bookmarks from LocalStorage
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  console.log(bookmarks);
}
