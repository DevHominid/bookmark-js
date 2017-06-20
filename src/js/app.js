// Listen for form submit
document.getElementById('form-a').addEventListener('submit', saveBookmark);

// Save bookmark
function saveBookmark(e) {
  console.log('It Works!');

  // Get form values
  const siteName = document.getElementById('siteName').value;
  console.log(siteName);
  const siteUrl = document.getElementById('siteUrl').value;
  console.log(siteUrl);

  const bookmark = {
    name: siteName,
    url: siteUrl
  }

  console.log(bookmark);

  // LocalStorage test
  localStorage.setItem('test', 'Hello World');

  // Prevent form from submitting
  e.preventDefault();
}
