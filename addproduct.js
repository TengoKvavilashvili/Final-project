const getProductCard = (product) => {
   const card = document.createElement('div');
   card.classList.add('product');

   const image = document.createElement('img');
   image.src = product.images[0];
   image.classList.add('product-image');
   card.appendChild(image);

   const title = document.createElement('h3');
   title.textContent = product.title;
   title.classList.add('product-title');
   card.appendChild(title);

   const description = document.createElement('p');
   description.textContent = product.description;
   description.classList.add('product-description');
   card.appendChild(description);

   const price = document.createElement('p');
   price.textContent = `Price: $${product.price.toFixed(2)}`;
   price.classList.add('product-price');
   card.appendChild(price);

   const discount = document.createElement('p');
   discount.textContent = `Discount (%): ${product.discount}`;
   discount.classList.add('product-discount');
   card.appendChild(discount);

   const rating = document.createElement('p');
   rating.textContent = `Rating: ${product.rating}`;
   rating.classList.add('product-rating');
   card.appendChild(rating);

   const stock = document.createElement('p');
   stock.textContent = `Stock: ${product.stock}`;
   stock.classList.add('product-stock');
   card.appendChild(stock);

   const brand = document.createElement('p');
   brand.textContent = `Brand: ${product.brand}`;
   brand.classList.add('product-brand');
   card.appendChild(brand);

   const category = document.createElement('p');
   category.textContent = `Category: ${product.category}`;
   category.classList.add('product-category');
   card.appendChild(category);

   const editButton = document.createElement('button');
   editButton.textContent = 'Edit';
   editButton.classList.add('product-edit-button');
   card.appendChild(editButton);

   const deleteButton = document.createElement('button');
   deleteButton.textContent = 'Delete';
   deleteButton.classList.add('product-delete-button');
   card.appendChild(deleteButton);

   editButton.addEventListener('click', () => {

      editProduct(product.id);
   });


   deleteButton.addEventListener('click', () => {

      deleteProduct(product.id);
      card.remove();
   });

   return card;
};




const editProduct = (productId) => {
   console.log(`Edit button clicked for product with ID ${productId}`);

};

const deleteProduct = (productId) => {
   console.log(`Delete button clicked for product with ID ${productId}`);

};


let products = [];

const createProduct = () => {
   const title = document.getElementById('title').value;
   const description = document.getElementById('description').value;
   const price = parseFloat(document.getElementById('price').value);
   const discount = parseFloat(document.getElementById('discount').value);
   const rating = parseFloat(document.getElementById('rating').value);
   const stock = parseInt(document.getElementById('stock').value);
   const brand = document.getElementById('brand').value;
   const category = document.getElementById('category').value;
   const images = document.getElementById('images').value.split(',');

   const product = {
      title,
      description,
      price,
      discount,
      rating,
      stock,
      brand,
      category,
      images,
      id: products.length + 1
   };

   products.push(product);

   const newProductCard = getProductCard(product);
   const productContainer = document.getElementById('product-container');
   productContainer.insertBefore(newProductCard, productContainer.firstChild);
};



const renderProduct = (product) => {
   const productList = document.getElementById('productList');

   const productCard = document.createElement('li');
   productCard.classList.add('product');

   const titleElement = document.createElement('h3');
   titleElement.textContent = product.title;
   titleElement.classList.add('product-title');

   const descriptionElement = document.createElement('p');
   descriptionElement.textContent = product.description;
   descriptionElement.classList.add('product-description');

   const priceElement = document.createElement('p');
   priceElement.textContent = `Price: $${product.price.toFixed(2)}`;
   priceElement.classList.add('product-price');

   const discountElement = document.createElement('p');
   discountElement.textContent = `Discount: ${product.discountPercentage}%`;
   discountElement.classList.add('product-discount');

   const ratingElement = document.createElement('p');
   ratingElement.textContent = `Rating: ${product.rating.toFixed(1)}`;
   ratingElement.classList.add('product-rating');

   const stockElement = document.createElement('p');
   stockElement.textContent = `Stock: ${product.stock}`;
   stockElement.classList.add('product-stock');

   const brandElement = document.createElement('p');
   brandElement.textContent = `Brand: ${product.brand}`;
   brandElement.classList.add('product-brand');

   const categoryElement = document.createElement('p');
   categoryElement.textContent = `Category: ${product.category}`;
   categoryElement.classList.add('product-category');

   const imageContainer = document.createElement('div');
   imageContainer.classList.add('product-image');

   for (const imageUrl of product.images) {
      const imageElement = document.createElement('img');
      imageElement.src = imageUrl;
      imageContainer.appendChild(imageElement);
   }

   productCard.appendChild(titleElement);
   productCard.appendChild(descriptionElement);
   productCard.appendChild(priceElement);
   productCard.appendChild(discountElement);
   productCard.appendChild(ratingElement);
   productCard.appendChild(stockElement);
   productCard.appendChild(brandElement);
   productCard.appendChild(categoryElement);
   productCard.appendChild(imageContainer);

   productList.appendChild(productCard);
};

const addProductForm = document.getElementById('add-product-form');
addProductForm.addEventListener('submit', function (event) {
   event.preventDefault();
   createProduct();
   clearForm();
});

const clearForm = () => {
   addProductForm.reset();
};