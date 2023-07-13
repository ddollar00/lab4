
const Store = {

    catalog: [
        {
            name: "T-shirt",
            price: 19.99,
            freeShipping: false,
            category: "Clothing"
          },
          {
            name: "Jeans",
            price: 49.99,
            freeShipping: true,
            category: "Clothing"
          },
          {
            name: "Sneakers",
            price: 79.99,
            freeShipping: false,
            category: "Shoes"
          },
          {
            name: "Dress",
            price: 39.99,
            freeShipping: true,
            category: "Clothing"
          },
          {
            name: "Watch",
            price: 129.99,
            freeShipping: false,
            category: "Accessories"
          },
          {
            name: "Handbag",
            price: 89.99,
            freeShipping: true,
            category: "Accessories"
          },
          {
            name: "Headphones",
            price: 59.99,
            freeShipping: false,
            category: "Electronics"
          },
          {
            name: "Smartphone",
            price: 699.99,
            freeShipping: true,
            category: "Electronics"
          },
          {
            name: "Laptop",
            price: 999.99,
            freeShipping: true,
            category: "Electronics"
          },
          {
            name: "Camera",
            price: 449.99,
            freeShipping: false,
            category: "Electronics"
          }
    ],
    
    inventory: [],
    cart: []

};

Store.inventory = [...Store.catalog];

export default Store;