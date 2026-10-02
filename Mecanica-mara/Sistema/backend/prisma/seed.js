const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();
async function main(){
  const senha = await bcrypt.hash('123456', 10);
  await prisma.usuario.upsert({where:{email:'admin@autofix.com'},update:{},create:{nome:'Administrador',email:'admin@autofix.com',senha}});
  const clientes = [
    {nome:'Maria Silva',cpf:'11111111111',telefone:'81999990001',email:'maria@email.com',endereco:'Rua A, 100'},
    {nome:'João Santos',cpf:'22222222222',telefone:'81999990002',email:'joao@email.com',endereco:'Rua B, 200'},
    {nome:'Ana Oliveira',cpf:'33333333333',telefone:'81999990003',email:'ana@email.com',endereco:'Rua C, 300'}
  ];
  for(const c of clientes) await prisma.cliente.create({data:c});
  const cs = await prisma.cliente.findMany({orderBy:{id:'asc'}});
  const vs = [
    {placa:'ABC1D23',marca:'Fiat',modelo:'Argo',ano:2021,clienteId:cs[0].id},
    {placa:'DEF4E56',marca:'Chevrolet',modelo:'Onix',ano:2020,clienteId:cs[1].id},
    {placa:'GHI7F89',marca:'Volkswagen',modelo:'Polo',ano:2022,clienteId:cs[2].id}
  ];
  for(const v of vs) await prisma.veiculo.create({data:v});
  const ve = await prisma.veiculo.findMany({orderBy:{id:'asc'}});
  await prisma.ordemServico.createMany({data:[
    {descricao:'Troca de óleo',valor:180,status:'Concluída',veiculoId:ve[0].id},
    {descricao:'Revisão dos freios',valor:350,status:'Em andamento',veiculoId:ve[1].id},
    {descricao:'Alinhamento e balanceamento',valor:220,status:'Aberta',veiculoId:ve[2].id}
  ]});
}
main().finally(()=>prisma.$disconnect());
