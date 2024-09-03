

const templateRepository=require('../repositories/templates.repository')

exports.getAll = (req, res, next) => {
    templateRepository.getAll(req.query.page,req.query.limit,req.query.sortby).then((datas) => {
        res.json(datas)
    })
    
}

exports.getOne = (req, res, next) => {
    
     templateRepository.getOne(req.params.id)
    .then((data)=>{
        
        if(data)
        {
            if(data.image)
                data.image= process.env.CUR_HOST + data.image
            res.json(data.toJSON())
        }
            
        else 
            res.status(404).send({message:'not found'})

    })
   
   
}

exports.new = (req, res, next) => {
    
    templateRepository.new(req.body)
    .then((datas) => {

        res.status(201).json(datas)
    })
    .catch((err)=>{
        res.status(400).send(err.errors)
    })
}

exports.update = (req, res, next) => {
    templateRepository.update(req.params.id,req.body)
    .then((data)=>res.json({updated:data[0]}))
    .catch((err)=>{
        res.status(400).send(err.errors)
    })
}

exports.delete = (req, res, next)=> {
    templateRepository.delete(req.params.id)
        .then((data)=>res.json({deleted:data}))
    
}

