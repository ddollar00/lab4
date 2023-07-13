import Store from "./store.js";

export class Solution {

    addAllItemsToCart() {
        Store.cart = [...Store.cart, ...Store.inventory];
        Store.inventory = [];
    }

    emptyCart() {
        Store.inventory = [...Store.inventory, ...Store.cart];
        Store.cart = [];
    }

    addItemToCart(itemName) {
        const itemIndex = Store.inventory.findIndex(item => item.name === itemName);
        if (itemIndex !== -1) {
            const item = Store.inventory.splice(itemIndex, 1)[0];
            Store.cart.push(item);
        }
    }

    removeItemFromCart(itemName) {
        const itemIndex = Store.cart.findIndex(item => item.name === itemName);
        if (itemIndex !== -1) {
            const item = Store.cart.splice(itemIndex, 1)[0];
            Store.inventory.push(item);
        }
    }
    searchProducts(searchQuery) {
        return Store.catalog.filter(product => {
            // Check searchTerm
            if (searchQuery.searchTerm && !product.name.includes(searchQuery.searchTerm)) {
                return false;
            }

            // Check priceRange
            if (searchQuery.priceRange && (product.price < searchQuery.priceRange[0] || product.price > searchQuery.priceRange[1])) {
                return false;
            }

            // Check freeShipping
            if (searchQuery.freeShipping && !product.freeShipping) {
                return false;
            }

            // Check categories
            if (searchQuery.categories && !searchQuery.categories.some(category => product.category === category)) {
                return false;
            }

            return true;
        }).map(product => product.name);
    }



    display() {
        // Display the inventory and cart names side by side
        console.log("Inventory\t\tCart");
        console.log("--------------------------------");
        const maxLength = Math.max(Store.inventory.length, Store.cart.length);
        for (let i = 0; i < maxLength; i++) {
            const inventoryItem = Store.inventory[i];
            const cartItem = Store.cart[i] || {};

            console.log(`${inventoryItem.name || ""}\t\t${cartItem.name || ""}`);
        }

        console.log("--------------------------------");
    }

}