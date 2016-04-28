# Splashy

[Splashy][https://splashy-app.herokuapp.com/]

## Minimum Viable Product

Splashy is a web application inspired by Etsy that will be built using Ruby on Rails and React.js.  It's a site for people selling locally made products, locally.  By the end of Week 9, this app will, at a minimum, satisfy the following criteria:

- [x] New account creation, login, and guest/demo login
- [ ] Smooth, bug-free navigation
- [ ] Adequate seed data to demonstrate the site's features
- [ ] The minimally necessary features for an Etsy-inspired site: product browsing and search, product creation and saving
- [x] Hosting on Heroku
- [ ] CSS styling that is satisfactorily visually appealing
- [ ] A production README, replacing this README

## Product Goals and Priorities

Splashy will allow users to do the following:

<!-- This is a Markdown checklist. Use it to keep track of your
progress. Put an x between the brackets for a checkmark: [x] -->

- [x] Create an account (MVP)
- [ ] Log in / Log out, including as a Guest/Demo User (MVP)
- [ ] Browse and search for products (MVP)
- [ ] Create, read, edit, and delete products (MVP)

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Cycles][flux-cycles]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: ./docs/views.md
[components]: ./docs/components.md
[flux-cycles]: ./docs/flux-cycles.md
[api-endpoints]: ./docs/api-endpoints.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup and User Authentication (0.5 days)

**Objective:** Functioning rails project with Authentication

- [x] create new project
- [x] create `User` model
- [x] authentication
- [x] user signup/signin pages
- [x] blank landing page after signin

### Phase 2: Product Model, API, and basic APIUtil (1.5 days)

**Objective:** Products can be created, read, edited and destroyed through
the API.

- [x] create `Product` model
- [x] seed the database with a small amount of test data
- [x] CRUD API for products (`ProductsController`)
- [ ] jBuilder views for products
- [x] setup Webpack & Flux scaffold
- [x] setup `APIUtil` to interact with the API
- [x] test out API interaction in the console.

### Phase 3: Flux Architecture and Router (1 day)

**Objective:** Products can be created, read, edited and destroyed with the
user interface.

- [x] setup the flux loop with skeleton files
- [x] setup React Router
- implement each product component, building out the flux loop as needed.
  - [x] `ProductIndex`
  - [x] `ProductIndexItem`
  - [ ] `ProductForm`
  - [ ] `ProductDetail`
- [ ] save Products to the DB when the form loses focus or is left idle
  after editing.

### Phase 4: Start Styling (1 day)

**Objective:** Existing pages (including singup/signin) will look good.

- [x] create a basic style guide
- [x] position elements on the page
- [x] add basic colors & styles

### Phase 5: Location (1 day)

**Objective:** Products will be sold offline by location (similar to craigslist)

- [ ] Update product model
- build out API, Flux loop, and components for:
  - [ ] Map
  - [ ] Map markers
  - [ ] View products by location
  - [ ] Filter search results by map location
  - [ ] Default map location on new search includes all results
- Use CSS to style new views

### Phase 6: Search (1 day)

**Objective:** Products are searchable

- [ ] create `Tag` model and join table
- build out API, Flux loop, and components for:
  - [ ] fetching tags for product
  - [ ] adding tags to product
  - [ ] creating tags while adding to products
  - [ ] searching products by tag
- [ ] Style new elements

### Phase 7: Offers (1.5 days)

**objective:** Buying occurs through offers.

- [ ] create offer model
- build out API, Flux loop, and components for:
  - [ ] fetching offers
  - [ ] creating offers
  - [ ] offer notifications

### Phase 8: Styling Cleanup and Seeding (1 day)

**objective:** Make the site feel more cohesive and awesome.

- [ ] Get feedback on my UI from others
- [ ] Refactor HTML classes & CSS rules
- [ ] Add modals, transitions, and other styling flourishes
- [ ] Add splash page

### Bonus Features (TBD)
- [ ] Filtering results
- [ ] Pagination / infinite scroll for products index
- [ ] Offer conversation so users may negotiate/sort out exchange details
- [ ] Seller reviews

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
