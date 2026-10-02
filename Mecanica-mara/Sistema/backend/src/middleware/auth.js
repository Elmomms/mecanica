const jwt = require('jsonwebtoken');
module.exports = function auth(req,res,next){
  const header=req.headers.authorization;
  if(!header || !header.startsWith('Bearer ')) return res.status(401).json({erro:'Token não informado.'});
  try { req.usuario=jwt.verify(header.split(' ')[1],process.env.JWT_SECRET); next(); }
  catch(e){ return res.status(401).json({erro:'Token inválido ou expirado.'}); }
};
