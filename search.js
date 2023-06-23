// Function to handle search and fetch search results
function handleSearch() {
   const searchInput = document.getElementById('search-input');
   const searchQuery = searchInput.value.trim();
 
   if (searchQuery !== '') {
     const apiUrl = `https://dummyjson.com/products/search?q=${encodeURIComponent(searchQuery)}`;
 
     // Fetch search results
     fetch(apiUrl)
       .then((res) => res.json())
       .then((data) => {
         // Process the search results here
         console.log(data);
         renderProducts(data);
       })
       .catch((error) => console.error('Error while fetching search results:', error));
   } else {
     // If search query is empty, fetch all products
     fetch('https://dummyjson.com/products')
       .then((res) => res.json())
       .then(renderProducts)
       .catch((error) => console.error('Error while fetching product data:', error));
   }
 }
 
 // Attach event listener to the search button
 const searchButton = document.getElementById('search-button');
 searchButton.addEventListener('click', handleSearch);
 
 // Fetch all products initially
 fetch('https://dummyjson.com/products')
   .then((res) => res.json())
   .then(renderProducts)
   .catch((error) => console.error('Error while fetching product data:', error));

   