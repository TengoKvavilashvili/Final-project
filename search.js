function handleSearch() {
  const searchInput = document.getElementById('search-input');
  const searchQuery = searchInput.value.trim();

  if (searchQuery !== '') {
    const apiUrl = `https://dummyjson.com/products/search?q=${encodeURIComponent(searchQuery)}`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {

        console.log(data);
        renderProducts(data);
      })
      .catch((error) => console.error('Error while fetching search results:', error));
  } else {

    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then(renderProducts)
      .catch((error) => console.error('Error while fetching product data:', error));
  }
}


const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', handleSearch);

fetch('https://dummyjson.com/products')
  .then((res) => res.json())
  .then(renderProducts)
  .catch((error) => console.error('Error while fetching product data:', error));