import { Solution } from "./assignment.js";
import Store from "./store.js";

const solution = new Solution();
const inventory = [...Store.inventory];

(function() {

    testMethod("addAllItemsToCart", testAddAllItemsToCart);
    testMethod("emptyCart", testEmptyCart);
    testMethod("addItemToCart", testAddItemToCart);
    testMethod("removeItemFromCart", testRemoveItemFromCart);
    testMethod("searchProducts 1", testSearchProducts1);
    testMethod("searchProducts 2", testSearchProducts2);
    testMethod("searchProducts 3", testSearchProducts3);
    testMethod("searchProducts 4", testSearchProducts4);
    testMethod("searchProducts 5", testSearchProducts5);

})();

function testAddAllItemsToCart() {

    resetStore();

    solution.addAllItemsToCart();

    assert(!Store.inventory.length, 'Inventory is not empty.');
    assert(Store.cart.length === inventory.length, 'Cart does not contain enough items.');
    assert(JSON.stringify(Store.cart) === JSON.stringify(inventory), 'Items in the cart are not the same as the items in the store.');

}

function testEmptyCart() {

    resetStore();

    Store.cart = [ ...inventory ];
    Store.inventory = [];

    solution.emptyCart();

    assert(!Store.cart.length, 'Cart is not empty.');
    assert(Store.inventory.length === inventory.length, 'Inventory is not empty.');
    assert(JSON.stringify(Store.inventory) === JSON.stringify(inventory), 'Items in the inventory are not the same.');

}

function testAddItemToCart() {

    resetStore();

    solution.addItemToCart('Smartphone');

    assert(!(Store.inventory.filter(item => item.name === 'Smartphone').length), 'Item was not removed from the stores inventory.');
    assert(Store.cart.filter(item => item.name === 'Smartphone').length === 1, 'Item was not added to the cart.');

}

function testRemoveItemFromCart() {

    resetStore();

    Store.cart = [ 
        {
            name: "Smartphone",
            price: 699.99,
            freeShipping: true,
            category: "Electronics"
        },
        {
            name: "RGB Keyboard",
            price: 39.99,
            freeShipping: true,
            category: "Electronics"
        }
    ];
    Store.inventory = Store.inventory.filter(item => item.name !== 'Smartphone');

    solution.removeItemFromCart('Smartphone');

    assert(!(Store.cart.filter(item => item.name === 'Smartphone').length), 'Item was not removed from the cart.');
    assert(Store.inventory.length === inventory.length, 'Store inventory does not have the correct amount of items.');
    assert(Store.inventory.filter(item => item.name === 'Smartphone').length === 1, 'Item was not replaced in the store inventory.');
    

}

function testSearchProducts1() {

    resetStore();

    const query = {
        searchTerm: 'T-sh'
    };

    const results = solution.searchProducts(query);

    assert(results.length === 1, 'Search did not return the correct amount of results.');
    assert(results[0] === 'T-shirt', 'Search did not return the correct items.');

}

function testSearchProducts2() {

    resetStore();

    const query = {
        freeShipping: true
    };

    const results = solution.searchProducts(query);

    assert(results.length === 5, 'Search did not return the correct amount of results.');
    assert(JSON.stringify(results) === JSON.stringify([
        'Jeans',
        'Dress',
        'Handbag',
        'Smartphone',
        'Laptop'
    ]), 'Search did not return the correct items.');

}

function testSearchProducts3() {

    resetStore();

    const query = {
        categories: [ 'Electronics', 'Accessories' ]
    };

    const results = solution.searchProducts(query);

    assert(results.length === 6, 'Search did not return the correct amount of results.');
    assert(JSON.stringify(results) === JSON.stringify([
        'Watch',
        'Handbag',
        'Headphones',
        'Smartphone',
        'Laptop',
        'Camera'
    ]), 'Search did not return the correct items.');
}

function testSearchProducts4() {

    resetStore();

    const query = {
        priceRange: [ 0, 50 ]
    };

    const results = solution.searchProducts(query);

    assert(results.length === 3, 'Search did not return the correct amount of results.');
    assert(JSON.stringify(results) === JSON.stringify([
        'T-shirt',
        'Jeans',
        'Dress'
    ]), 'Search did not return the correct items.');

}

function testSearchProducts5() {

    resetStore();

    const query = {
        priceRange: [ 0, 80 ],
        categories: [ 'Electronics' ]
    };

    const results = solution.searchProducts(query);

    assert(results.length === 1, 'Search did not return the correct amount of results.');
    assert(results[0] === 'Headphones', 'Search did not return the correct items.');

}

function resetStore() {
    Store.inventory = [ ...inventory ];
    Store.cart = [];
}

function testMethod(testName, methodToTest) {
    try {
        methodToTest();
        console.log(`\x1b[32m\u2713 Test ${testName} .............. Passed\x1b[0m`);
    } catch (error) {
        console.log(`\x1b[31m\u2718 Test ${testName} .............. Failed: ${error.message}\x1b[0m`);
    }
}

function assert(condition, failureMessage) {
    if (!condition) {
        throw new Error(failureMessage);
    }
}