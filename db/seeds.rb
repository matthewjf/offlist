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

10.times do |i|
  lat = 37.7 + (rand()/10)
  lng = -122.4 - (rand()/10)
  img_urls = []
  (rand(3) + 2).times do |i|
    img_urls.push('https://unsplash.it/800/450?image=' + rand(300).to_s)
  end

  Product.create(
    title: Faker::Hipster.word.capitalize,
    description: Faker::Hipster.paragraphs(3, true).join("\n\n"),
    img_urls: img_urls,
    lat: lat,
    lng: lng,
    price: rand(1000) + 1,
    user_id: rand(10)
  )
end
