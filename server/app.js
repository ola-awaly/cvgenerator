const express = require("express")
const cors = require('cors')
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080
const dbc = require("./models/dbc");
 dbc.connect()
 const db=dbc.get()
 
 db.sequelize.sync({ /*force: true,*/logging:true})
     .then(()=>{

        console.log("dans db connect");

        app.use(cors())
        app.use(express.json({limit: '50mb'}))
        app.use(express.urlencoded({extended : true, limit: '50mb'}))
        app.use('/images', express.static(path.join(__dirname, 'images')));
        app.use('/pdfs', express.static(path.join(__dirname, 'pdfs')));
       
        const {checkLogged} = require("./middlewares/authentication")
        app.use("/users", require("./routers/users.router"))
        app.use("/cvs",checkLogged, require("./routers/cvs.router"))
        app.use("/templates",checkLogged, require("./routers/templates.router"))
        app.use("/sections",checkLogged, require("./routers/sections.router"))
        app.use("/langues",checkLogged, require("./routers/langues.router"))
        app.use("/liens",checkLogged, require("./routers/liens.router"))
        app.use("/experiences",checkLogged, require("./routers/experiences.router"))
        app.use("/formations",checkLogged, require("./routers/formations.router"))
      
       // const {checkLogged} = require("./middlewares/others")
       
        app.all("*", (req, res, next) => {
            console.log("attention route non trouvée")
            res.status(404).json({message:"Route not found"})
            res.end()
        })
})
    



app.listen(PORT, console.log(`Serveur sur port ${PORT}`))

