const crypto=require('crypto');
function chave(){return crypto.createHash('sha256').update(process.env.CPF_SECRET).digest();}
function criptografar(texto){const iv=crypto.randomBytes(16);const cipher=crypto.createCipheriv('aes-256-cbc',chave(),iv);let enc=cipher.update(texto,'utf8','hex');enc+=cipher.final('hex');return iv.toString('hex')+':'+enc;}
function descriptografar(texto){const [ivHex,enc]=texto.split(':');const decipher=crypto.createDecipheriv('aes-256-cbc',chave(),Buffer.from(ivHex,'hex'));let dec=decipher.update(enc,'hex','utf8');dec+=decipher.final('utf8');return dec;}
module.exports={criptografar,descriptografar};
