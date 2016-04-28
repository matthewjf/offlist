img_urls = [
  'https://img0.etsystatic.com/013/0/5520134/il_fullxfull.408786760_kloq.jpg',
  'https://img1.etsystatic.com/124/0/11706858/il_570xN.1000402847_kwa6.jpg',
  'https://img0.etsystatic.com/110/0/6247823/il_570xN.903244178_5qmm.jpg',
  'https://img1.etsystatic.com/106/0/11091638/il_570xN.1004454011_r0wf.jpg',
  'https://img0.etsystatic.com/047/0/8091019/il_570xN.691121860_9xff.jpg',
  'https://img0.etsystatic.com/000/0/5625450/il_570xN.303801478.jpg',
  'https://img1.etsystatic.com/067/0/10483196/il_570xN.780885165_qpp9.jpg',
  'https://img0.etsystatic.com/102/0/12721843/il_570xN.941275922_n0os.jpg',
  'https://img0.etsystatic.com/069/0/7814711/il_570xN.826616672_lafi.jpg',
  'https://img1.etsystatic.com/041/0/8749411/il_570xN.645288353_g9sx.jpg'
]

User.create(
  username: 'guest',
  password: 'password'
)

10.times do |i|
  lat = 37.7 + (rand()/10)
  lng = -122.4 - (rand()/10)

  Product.create(
    title: Faker::Hipster.word,
    description: Faker::Hipster.paragraph,
    img_urls: ['https://unsplash.it/500/500/?random'],
    lat: lat,
    lng: lng    
  )
end
