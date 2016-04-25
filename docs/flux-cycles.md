# Flux Cycles

Flux loops are organized by data type. Under each data type, there may
be sub-categories, and each action is listed with the sequence of events
that result from its invocation, ending with the API or store. Finally,
store listeners are listed at the end.

You should be able to use this document trace an **action** starting
with where it was invoked, through the **API**/**store** involved, and
finally to the **components** that update as a result. This is important
because once you start implementing your flux loops, that's precisely
what you'll need to do.


## Product Cycles

### Products API Request Actions

* `fetchProducts`
  0. invoked from `ProductsIndex` `didMount`/`willReceiveProps`
  0. `GET /api/products` is called.
  0. `receiveProducts` is set as the callback.

* `createProduct`
  0. invoked from new note button `onClick`
  0. `POST /api/products` is called.
  0. `receiveSingleProduct` is set as the callback.

* `fetchSingleProduct`
  0. invoked from `ProductDetail` `didMount`/`willReceiveProps`
  0. `GET /api/notes/:id` is called.
  0. `receiveSingleProduct` is set as the callback.

* `updateProduct`
  0. invoked from `productForm` `onSubmit`
  0. `POST /api/products` is called.
  0. `receiveSingleProduct` is set as the callback.

* `destroyProduct`
  0. invoked from delete note button `onClick`
  0. `DELETE /api/products/:id` is called.
  0. `removeProduct` is set as the callback.

### Products API Response Actions

* `receiveAll`
  0. invoked from an API callback.
  0. `Product` store updates `_products` and emits change.

* `receiveSingleProduct`
  0. invoked from an API callback.
  0. `Product` store updates `_products[id]` and emits change.

* `removeProduct`
  0. invoked from an API callback.
  0. `Product` store removes `_products[id]` and emits change.

### Store Listeners

* `ProductsIndex` component listens to `Product` store.
* `ProductDetail` component listens to `Product` store.


## Offer Cycles

### Offer API Request Actions

* `fetchAllOffers`
  0. invoked from `OfferIndex` `didMount`/`willReceiveProps`
  0. `GET /api/offers` is called.
  0. `receiveAllOffers` is set as the callback.

* `createOffer`
  0. invoked from new offer button `onClick`
  0. `POST /api/offers` is called.
  0. `receiveSingleOffer` is set as the callback.

* `fetchSingleOffer`
  0. invoked from `OfferDetail` `didMount`/`willReceiveProps`
  0. `GET /api/offers/:id` is called.
  0. `receiveSingleOffer` is set as the callback.

* `updateOffer`
  0. invoked from `OfferForm` `onSubmit`
  0. `POST /api/offers` is called.
  0. `receiveSingleOffer` is set as the callback.

* `destroyOffer`
  0. invoked from delete notebook button `onClick`
  0. `DELETE /api/offers/:id` is called.
  0. `removeOffer` is set as the callback.

### Offers API Response Actions

* `receiveAllOffers`
  0. invoked from an API callback.
  0. `Offer` store updates `_offers` and emits change.

* `receiveSingleOffer`
  0. invoked from an API callback.
  0. `Offer` store updates `_offers[id]` and emits change.

* `removeOffer`
  0. invoked from an API callback.
  0. `Offer` store removes `_offers[id]` and emits change.

### Store Listeners

* `OffersIndex` component listens to `Offer` store.


## SearchSuggestion Cycles

* `fetchSearchSuggestions`
  0. invoked from `ProductSearchBar` `onChange` when there is text
  0. `GET /api/products` is called with `text` param.
  0. `receiveSearchSuggestions` is set as the callback.

* `receiveSearchSuggestions`
  0. invoked from an API callback.
  0. `SearchSuggestion` store updates `_suggestions` and emits change.

* `removeSearchSuggestions`
  0. invoked from `ProductSearchBar` `onChange` when empty
  0. `SearchSuggestion` store resets `_suggestions` and emits change.

### Store Listeners

* `SearchBarSuggestions` component listens to `SearchSuggestion` store.
