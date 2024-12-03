import jwt from 'jsonwebtoken'

const jwtMiddleware=(req,res,next) => {
    console.log("inside middleware");
    const token=req.headers['authorization']?.split(' ')[1];
    console.log(token);

    if(token){
        try{
        const jwtResponse=jwt.verify(token,process.env.JWT_SECRET)
        
        req.userId=jwtResponse.id;
        next();
    }catch(error){
        res.status(401).json('Unauthorized user please log in')
    }
        
    }else{
        res.status(404).json("Authorization failed token  missing")
    }
    
    
}

export default jwtMiddleware