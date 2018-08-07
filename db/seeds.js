use cocktailsdb

db.dropDatabase();

db.cocktails.insert({
  name: "Mojito",
  flavour: "Refreshing"
})

db.cocktails.insert({
  name: "Bramble",
  flavour: "Fruity"
})

db.cocktails.insert({
  name: "Amaretto Sour",
  flavour: "Sweet"
})

db.cocktail.insert({
  name: "Manhattan",
  flavour: "Bitter"

})

db.cocktails.find();
