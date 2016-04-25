# Phase 2: Flux Architecture and Note CRUD (2 days)

## Rails
### Models

### Controllers

### Views

## Flux
### Views (React Components)
* ProductsIndex
  - ProductsIndexItem
* ProductForm

### Stores
* Product

### Actions
* ApiActions.receiveAllProducts -> triggered by ApiUtil
* ApiActions.receiveSingleProduct
* ApiActions.deleteProduct
* ProductActions.fetchAllProducts -> triggers ApiUtil
* ProductActions.fetchSingleProduct
* ProductActions.createProduct
* ProductActions.editProduct
* ProductActions.destroyProduct

### ApiUtil
* ApiUtil.fetchAllProducts
* ApiUtil.fetchSingleProduct
* ApiUtil.createProduct
* ApiUtil.editProduct
* ApiUtil.destroyProduct

## Gems/Libraries
* Flux Dispatcher (npm)
* Material-Sass
