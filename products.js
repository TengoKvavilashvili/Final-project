// Fetch product data from the API
fetch('https://dummyjson.com/products')
   .then((res) => res.json())
   .then(renderProducts)
   .catch((error) => console.error('Error while fetching product data:', error));

// Function to render product data on the web page
function renderProducts(response) {
   const productContainer = document.getElementById('product-container');
   if (productContainer) {
      // Clear the container
      productContainer.innerHTML = '';

      if (response && Array.isArray(response.products)) {
         const products = response.products;

         // Sort products by price in ascending order
         products.sort((a, b) => a.price - b.price);

         // Create and append HTML elements for each product
         products.forEach((product) => {
            const productElement = document.createElement('div');
            productElement.className = 'product';

            const imageElement = document.createElement('img');
            imageElement.src = product.thumbnail;
            imageElement.alt = product.title;
            imageElement.className = 'product-image';

            const detailsElement = document.createElement('div');
            detailsElement.className = 'product-details';

            const titleElement = document.createElement('div');
            titleElement.className = 'product-title';
            titleElement.textContent = product.title;

            const descriptionElement = document.createElement('div');
            descriptionElement.className = 'product-description';
            descriptionElement.textContent = product.description;

            const priceElement = document.createElement('div');
            priceElement.className = 'product-price';
            priceElement.textContent = 'Price: $' + product.price;

            const discountElement = document.createElement('div');
            discountElement.className = 'product-discount';
            discountElement.textContent = 'Discount: ' + product.discountPercentage + '%';

            const ratingElement = document.createElement('div');
            ratingElement.className = 'product-rating';
            ratingElement.textContent = 'Rating: ' + product.rating;

            const stockElement = document.createElement('div');
            stockElement.className = 'product-stock';
            stockElement.textContent = 'Stock: ' + product.stock;

            const brandElement = document.createElement('div');
            brandElement.className = 'product-brand';
            brandElement.textContent = 'Brand: ' + product.brand;

            const categoryElement = document.createElement('div');
            categoryElement.className = 'product-category';
            categoryElement.textContent = 'Category: ' + product.category;

            detailsElement.appendChild(titleElement);
            detailsElement.appendChild(descriptionElement);
            detailsElement.appendChild(priceElement);
            detailsElement.appendChild(discountElement);
            detailsElement.appendChild(ratingElement);
            detailsElement.appendChild(stockElement);
            detailsElement.appendChild(brandElement);
            detailsElement.appendChild(categoryElement);

            productElement.appendChild(imageElement);
            productElement.appendChild(detailsElement);

            productContainer.appendChild(productElement);
         });

         // Fetch thumbnails with a delay between requests
         fetchProductThumbnails(products, 0);
      } else {
         console.error('The fetched data does not contain a valid products array:', response);
      }
   }
}

// Function to fetch product thumbnails with a delay between requests
function fetchProductThumbnails(products, index) {
   if (index < products.length) {
      const product = products[index];
      const thumbnailUrl = product.thumbnail;

      // Fetch the thumbnail
      fetch(thumbnailUrl)
         .then((response) => {
            if (response.ok) {
               // Process the thumbnail response here
               // ...

               // Continue fetching the next thumbnail with a delay of 1 second (1000 milliseconds)
               setTimeout(() => {
                  fetchProductThumbnails(products, index + 1);
               }, 1000);
            } else {
               console.error('Failed to fetch thumbnail:', thumbnailUrl);
               // Continue fetching the next thumbnail immediately without delay
               fetchProductThumbnails(products, index + 1);
            }
         })
         .catch((error) => {
            console.error('Error while fetching thumbnail:', thumbnailUrl);
            // Continue fetching the next thumbnail immediately without delay
            fetchProductThumbnails(products, index + 1);
         });
   }
}