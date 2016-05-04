if @products
  json.array! @products do |product|
    json.merge! product.as_json
    json.score @scores[product.id]
  end
else
   json.null!
 end
