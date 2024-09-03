

const sectionRepository=require('../repositories/sections.repository')

exports.getAll = (req, res, next) => {
    sectionRepository.getAll(req.params.id,req.query.page,req.query.limit,req.query.sortby,req.query.type,req.query.position).then((datas) => {
        res.json(datas)
    })
    
}

exports.getOne = (req, res, next) => {
    
     sectionRepository.getOne(req.params.id)
    .then((data)=>{
        
        if(data)
            res.json(data.toJSON())
        else 
            res.status(404).send({message:'not found'})

    })
   
   
}

exports.new = (req, res, next) => {
    
    sectionRepository.new(req.body)
    .then((datas) => {

        res.status(201).json(datas)
    })
    .catch((err)=>{
        res.status(400).send(err.errors)
    })
}

exports.update = (req, res, next) => {
    sectionRepository.update(req.params.id,req.body)
    .then((data)=>res.json({updated:data[0]}))
    .catch((err)=>{
        res.status(400).send(err.errors)
    })
}

exports.delete = (req, res, next)=> {
    sectionRepository.delete(req.params.id)
        .then((data)=>res.json({deleted:data}))
    
}

