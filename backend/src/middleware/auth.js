import jwt from 'jsonwebtoken'

export function auth(req,res, next){

  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]


  if(!token) return res.sendStatus(401)

    jwt.verify(token, process.env.JWTTOKEN, (err, user) => {
      if(err) return res.sendStatus(401)
        req.user = user
      next()
    })
}