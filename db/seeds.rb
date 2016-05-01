User.create(
  username: 'demo',
  password: 'password'
)

10.times do |i|
  User.create(
    username: Faker::Internet.user_name,
    password: 'password'
  )
end

def create_product(user)
  lat = 37.7 + (rand()/10)
  lng = -122.4 - (rand()/10)
  img_urls = []
  (rand(3) + 2).times do
    img_urls.push('https://unsplash.it/800/450?image=' + rand(300).to_s)
  end

  Product.create(
    title: Faker::Hipster.word.capitalize,
    description: Faker::Hipster.paragraphs(3, false).join("\n\n"),
    img_urls: img_urls,
    lat: lat,
    lng: lng,
    price: rand(1000) + 1,
    user_id: user.id,
    created_at: Faker::Time.backward(1000)
  )
end

5.times do
  create_product(User.first)
end


User.all.each do |user|
  rand(3).times do
    create_product(user)
  end
end

User.all.each do |user|
  Product.all.each do |product|
    Offer.create(
      amount: rand(99) + 1,
      user_id: user.id,
      product_id: product.id,
      created_at: Faker::Time.backward(1000)
    )
  end
end
