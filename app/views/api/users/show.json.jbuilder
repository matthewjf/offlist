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
