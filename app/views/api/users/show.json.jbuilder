json.extract! @user, :username
json.products do
  if @products
    json.array! @products do |product|
      json.merge! product.as_json
    end
  else
     json.null!
   end
end
json.offers do
  json.made_offers do
    if @offers
      json.array! @offers do |offer|
        json.merge! offer.as_json
      end
    else
       json.null!
     end
  end
  json.received_offers do
    if @received_offers
      json.array! @received_offers do |offer|
        json.merge! offer.as_json
      end
    else
       json.null!
     end
  end
end
