const packAndSort=(page,limit,sortby,cond={})=>{

    const offset=(page-1)*limit
    limit=parseInt(limit)
    const [sort,sens]=sortby.split('-')
  
    
    cond.offset=offset
    cond.limit=limit
    cond.order=[
        [sort, sens]
    ]
    return cond
}

module.exports=packAndSort