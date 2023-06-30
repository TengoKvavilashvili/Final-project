fetch('https://dummyjson.com/products')
   .then((res) => res.json())
   .then(renderProducts)
   .catch((error) => console.error('Error while fetching product data:', error));


function fetchProductThumbnails(products, index) {
   if (index < products.length) {
      const product = products[index];
      const thumbnailUrl = product.thumbnail;

      fetch(thumbnailUrl)
         .then((response) => {
            if (response.ok) {

               setTimeout(() => {
                  fetchProductThumbnails(products, index + 1);
               }, 1000);
            } else {
               console.error('Failed to fetch thumbnail:', thumbnailUrl);

               fetchProductThumbnails(products, index + 1);
            }
         })
         .catch((error) => {
            console.error('Error while fetching thumbnail:', thumbnailUrl);

            fetchProductThumbnails(products, index + 1);
         });
   }
}

function renderProducts(response) {
   const productContainer = document.getElementById('product-container');
   if (productContainer) {
      productContainer.innerHTML = '';

      if (response && Array.isArray(response.products)) {
         const products = response.products;


         products.sort((a, b) => a.price - b.price);


         products.forEach((product, index) => {
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

            const editButton = document.createElement('button');
            editButton.className = 'product-edit-button';
            editButton.textContent = 'Edit';

            const deleteButton = document.createElement('button');
            deleteButton.className = 'product-delete-button';
            deleteButton.textContent = 'Delete';


            editButton.addEventListener('click', () => {
               handleEditProduct(product, index, products);
            });

            deleteButton.addEventListener('click', () => {
               handleDeleteProduct(index, products);
            });

            detailsElement.appendChild(titleElement);
            detailsElement.appendChild(descriptionElement);
            detailsElement.appendChild(priceElement);
            detailsElement.appendChild(discountElement);
            detailsElement.appendChild(ratingElement);
            detailsElement.appendChild(stockElement);
            detailsElement.appendChild(brandElement);
            detailsElement.appendChild(categoryElement);
            detailsElement.appendChild(editButton);
            detailsElement.appendChild(deleteButton);

            productElement.appendChild(imageElement);
            productElement.appendChild(detailsElement);

            productContainer.appendChild(productElement);
         });

         fetchProductThumbnails(products, 0);
      } else {
         console.error('The fetched data does not contain a valid products array:', response);
      }
   }
}

function handleDeleteProduct(index, products) {

   products.splice(index, 1);


   renderProducts({
      products
   });
}

function handleEditProduct(product, index, products) {

   const descriptionField = document.getElementById('product-description-field');
   const priceField = document.getElementById('product-price-field');
   const discountField = document.getElementById('product-discount-field');
   const ratingField = document.getElementById('product-rating-field');
   const stockField = document.getElementById('product-stock-field');
   const brandField = document.getElementById('product-brand-field');
   const categoryField = document.getElementById('product-category-field');
   const thumbnailField = document.getElementById('product-thumbnail-field');


   descriptionField.value = product.description;
   priceField.value = product.price;
   discountField.value = product.discountPercentage;
   ratingField.value = product.rating;
   stockField.value = product.stock;
   brandField.value = product.brand;
   categoryField.value = product.category;
   thumbnailField.value = product.thumbnail;


   const submitButton = document.getElementById('submit-button');
   submitButton.addEventListener('click', () => {

      const newDescription = descriptionField.value;
      const newPrice = parseFloat(priceField.value);
      const newDiscount = parseFloat(discountField.value);
      const newRating = parseFloat(ratingField.value);
      const newStock = parseInt(stockField.value);
      const newBrand = brandField.value;
      const newCategory = categoryField.value;
      const newThumbnail = thumbnailField.value;

      product.description = newDescription;
      product.price = newPrice;
      product.discountPercentage = newDiscount;
      product.rating = newRating;
      product.stock = newStock;
      product.brand = newBrand;
      product.category = newCategory;
      product.thumbnail = newThumbnail;


      renderProducts({
         products
      });


      descriptionField.value = '';
      priceField.value = '';
      discountField.value = '';
      ratingField.value = '';
      stockField.value = '';
      brandField.value = '';
      categoryField.value = '';
      thumbnailField.value = '';
   });

   const clearButton = document.getElementById('clear-button');
   clearButton.addEventListener('click', () => {

      descriptionField.value = '';
      priceField.value = '';
      discountField.value = '';
      ratingField.value = '';
      stockField.value = '';
      brandField.value = '';
      categoryField.value = '';
      thumbnailField.value = '';
   });
}