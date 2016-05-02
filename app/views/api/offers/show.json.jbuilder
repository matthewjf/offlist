json.merge! @offer.as_json
json.extract! @offer.product, :title, :price
