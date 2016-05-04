# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160504170941) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "offers", force: :cascade do |t|
    t.integer  "user_id",                        null: false
    t.integer  "product_id",                     null: false
    t.integer  "amount",                         null: false
    t.text     "comment"
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.string   "status",     default: "Pending"
  end

  add_index "offers", ["product_id"], name: "index_offers_on_product_id", using: :btree
  add_index "offers", ["user_id"], name: "index_offers_on_user_id", using: :btree

  create_table "products", force: :cascade do |t|
    t.string   "title",                      null: false
    t.text     "description",                null: false
    t.boolean  "active",      default: true
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.json     "img_urls"
    t.float    "lat",                        null: false
    t.float    "lng",                        null: false
    t.integer  "price",                      null: false
    t.integer  "user_id"
  end

  add_index "products", ["user_id"], name: "index_products_on_user_id", using: :btree

  create_table "taggings", force: :cascade do |t|
    t.integer  "tag_id"
    t.integer  "product_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "taggings", ["product_id"], name: "index_taggings_on_product_id", using: :btree
  add_index "taggings", ["tag_id"], name: "index_taggings_on_tag_id", using: :btree

  create_table "tags", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

  add_foreign_key "offers", "products"
  add_foreign_key "offers", "users"
  add_foreign_key "products", "users"
  add_foreign_key "taggings", "products"
  add_foreign_key "taggings", "tags"
end
