// listen for form submit
document.getElementById('form-a').addEventListener('submit', saveBookmark);

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

  // Prevent form from submitting
  e.preventDefault();
}
