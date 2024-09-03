

const lienRepository=require('../repositories/liens.repository')

exports.getAll = (req, res, next) => {
    lienRepository.getAll(req.params.id,req.query.page,req.query.limit,req.query.sortby).then((datas) => {
        res.json(datas)
    })
    
}

exports.getOne = (req, res, next) => {
    
     lienRepository.getOne(req.params.id)
    .then((data)=>{
        
        if(data)
            res.json(data.toJSON())
        else 
            res.status(404).send({message:'not found'})

    })
   
   
}

exports.new = (req, res, next) => {
    console.log("dans lien controller new");
    lienRepository.new(req.body)
    .then((datas) => {

        res.status(201).json(datas)
    })
    .catch((err)=>{
        res.status(400).send(err.errors)
    })
}

exports.update = (req, res, next) => {
    lienRepository.update(req.params.id,req.body)
    .then((data)=>res.json({updated:data[0]}))
    .catch((err)=>{
        res.status(400).send(err.errors)
    })
}

exports.delete = (req, res, next)=> {
    lienRepository.delete(req.params.id)
        .then((data)=>res.json({deleted:data}))
    
}

