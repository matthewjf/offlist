# OffList

[OffList live][heroku]

[heroku]: http://www.off-list.com

OffList is a full-stack web application inspired by Evernote.  It utilizes Ruby on Rails on the backend, a PostgreSQL database, and React.js with a Flux architectural framework on the frontend.  

## Features & Implementation

### Single-Page App

OffList is truly a single-page; all content is delivered on one static page.  The root page listens to a `SessionStore` and renders content based on a call to `SessionStore.currentUser()`.  Sensitive information is kept out of the frontend of the app by making an API call to `SessionsController#get_user`.

```ruby
class Api::SessionsController < ApplicationController
    def get_user
      if current_user
        render :current_user
      else
        render json: errors.full_messages
      end
    end
 end
  ```

### Note Rendering and Editing

  On the database side, the notes are stored in one table in the database, which contains columns for `id`, `user_id`, `content`, and `updated_at`.  Upon login, an API call is made to the database which joins the user table and the note table on `user_id` and filters by the current user's `id`.  These notes are held in the `NoteStore` until the user's session is destroyed.  

  Notes are rendered in two different components: the `CondensedNote` components, which show the title and first few words of the note content, and the `ExpandedNote` components, which are editable and show all note text.  The `NoteIndex` renders all of the `CondensedNote`s as subcomponents, as well as one `ExpandedNote` component, which renders based on `NoteStore.selectedNote()`. The UI of the `NoteIndex` is taken directly from Evernote for a professional, clean look:  

![image of notebook index](https://github.com/appacademy/sample-project-proposal/blob/master/docs/noteIndex.png)

Note editing is implemented using the Quill.js library, allowing for a Word-processor-like user experience.

### Notebooks

Implementing Notebooks started with a notebook table in the database.  The `Notebook` table contains two columns: `title` and `id`.  Additionally, a `notebook_id` column was added to the `Note` table.  

The React component structure for notebooks mirrored that of notes: the `NotebookIndex` component renders a list of `CondensedNotebook`s as subcomponents, along with one `ExpandedNotebook`, kept track of by `NotebookStore.selectedNotebook()`.  

`NotebookIndex` render method:

```javascript
render: function () {
  return ({this.state.notebooks.map(function (notebook) {
    return <CondensedNotebook notebook={notebook} />
  }
  <ExpandedNotebook notebook={this.state.selectedNotebook} />)
}
```

### Search

Search is written as a single SQL query using ActiveRercord query methods. It accepts an options hash with sensible defaults. The search will match an arbitrary number of keywords. Search results are ranked by the number of matching keywords.

`Listing` score method:

```ruby
def self.score(opts={})
  defaults = { "query" => '', "bounds" => nil, "active" => true}
  opts = (opts ? defaults.merge(opts) : defaults)

  filtered_result = Product.where(active: opts["active"])
                           .in_bounds(opts["bounds"])

  if opts["query"].empty?
    return filtered_result.select(:id)
                          .order('count_id desc')
                          .group(:id)
                          .count(:id)
  end


  keywords = opts["query"].split(' ')
  result = filtered_result.search_by_keyword(keywords.shift)

  until keywords.empty?
    result = result.union_all(filtered_result.search_by_keyword(keywords.shift))
  end

  result.select("products.id")
        .order('count_products_id desc')
        .group("products.id")
        .count("products.id")
end
```

### Location

Listing location was implemented with the Google Maps API. The goal was to create a 2-way sync between the data on the page and what appears on the map.

In the listing edit form, users can either enter an address in the address field or select a location on the map. Entering data in one will update the other.

On the listing search, users can either select an address or position on the map to run a search.

## Future Directions for the Project

In addition to the features already implemented, I plan to continue work on this project.  The next steps for OffList are outlined below.
