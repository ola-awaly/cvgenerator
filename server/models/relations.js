const dbc = require("./dbc")
const db=dbc.get() 

 //un user peut avoir 1 à plusieurs cvs, un cv appartient à 1 et un seul user
 db.User.hasMany(db.CV)
 db.CV.belongsTo(db.User)
 
 // un CV a 1 et 1 seul template, un template peut avoir plz CV
 db.CV.belongsTo(db.Template)
 db.Template.hasMany(db.CV)

 // un CV a plz sections, une section appatient à un et un seul CV
 db.CV.hasMany(db.Section)
 db.Section.belongsTo(db.CV)

 // une section de type "langue" peut avoir plusieurs langues, une langue appartient à une section de catégory "langue"
 db.Section.hasMany(db.Langue)
 db.Langue.belongsTo(db.Section)


 // une section de type "liens" peut avoir plusieurs liens, un lien appartient à une seule section de type "lien"
 db.Section.hasMany(db.Lien)
 db.Lien.belongsTo(db.Section)

 
 // une section de type "experience" peut avoir plusieurs experiences, une experience appartient à une seule section de type "experience"
 db.Section.hasMany(db.Experience)
 db.Experience.belongsTo(db.Section)


 // une section de type "formations" peut avoir plusieurs formations, une formation appartient à une seule section de type "formation"
 db.Section.hasMany(db.Formation)
 db.Formation.belongsTo(db.Section)

 

 