# Phase 3: Notebooks and Tags (2 days)

## Rails
### Models
* Offer
* Tag
* Tagging

### Controllers
* Api::OffersController (create, destroy, index, show, update)

### Views
* offers/index.json.jbuilder
* offers/show.json.jbuilder
* tags/show.json.jbuilder

## Flux
### Views (React Components)
* OffersIndex
  - OFferIndexItem
* OfferForm
* SearchIndex

### Stores
* Offer

### Actions
* ApiActions.receiveAllOffers -> triggered by ApiUtil
* ApiActions.receiveSingleOffers
* ApiActions.deleteOffer
* NotebookActions.fetchAllOffers -> triggers ApiUtil
* NotebookActions.fetchSingleOffers
* NotebookActions.createOffer
* NotebookActions.editOffer
* NotebookActions.destroyOffer

### ApiUtil
* ApiUtil.fetchAllOffer
* ApiUtil.fetchSingleOffer
* ApiUtil.createOffer
* ApiUtil.editOffer
* ApiUtil.destroyOffer

## Gems/Libraries
