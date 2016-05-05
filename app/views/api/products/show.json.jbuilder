json.merge! @product.as_json
json.seller do
  if @product.user
    json.username @product.user.username
    json.id @product.user.id
  else
     json.null!
   end
end
json.tag_list @tags
