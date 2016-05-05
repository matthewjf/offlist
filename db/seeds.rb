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

3.times do |i|
  Tag.create(name: 'tag' + i.to_s)
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
    created_at: Faker::Time.backward(1000),
    tag_list: ['tag0']
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

statuses = ['Accepted', 'Declined', 'Pending']
statuses.each do |status|
  Product.all.each do |product|
    Offer.create(
      amount: rand(1000) + 1,
      user_id: rand(10),
      product_id: product.id,
      created_at: Faker::Time.backward(1000),
      status: status
    )
  end
end
