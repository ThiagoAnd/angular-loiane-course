const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');

//instanciar a aplicação que vai chamar o express
const app = express()
//para rodar o servidor digite npm run start

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//disseram que o bodyParser sera descontinuado la no comentario do video da loiane, então use io que ta em cima
//app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({extended : true}))
//o nosso codigo angular esta rodando na 4200
//o codigo nodejs que criamos vai rodar 8000 (só entrar na pasta node-server e digitar npm start)
//mesmo sendo localhost , por estar em portas diferentes significa ser um dominio diferente
//por questões de segurança do javascript , não é possivel dominios diferentes se comunicarem
//isso é uma questão de segurança, pois senaõ poderiamos pegar consumir a api de qualquer site.
//a nossa api precisa deixar explicito que vc vai aceitar requisições de dominios diferentes
//E para deixar isso explicito, nos precisamos ativar o CORS, apenas para testes localhost, eu nao sei como se comporta externamente
//por exemplo, blz, e como elas vão se comunicar externamente?

//Aqui eu desabilitei agora o CORS pois nos vamos utilizar o proxy no angular
//Se não tivesse o proxy do angular habilitado, e esse cors ainda tivesse comentado
//quando tentassemos fazer o upload, ia dar um erro no console do chrome dizendo que a requisição foi barrada pela politica do CORS
//Access to XMLHttpRequest at 'http://localhost:8000/upload' from origin 'http://localhost:4200' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
// //aqui vamos ter o CORS habilitado
// //esse asterisco mostra que qualquer um pode acessar a nossa API
// const corsOptions = {
//   origin: '*',
//   optionSucessStatus: 200
// };

// //segundo middleware é o cors, o primeiro é o body parser
// app.use(cors(corsOptions))

//A pasta que vamos salvar será ./uploads
const multiplartMiddleWare = multipart({uploadDir: './uploads'})

//o endpoint que vamos usar sera o /upload
app.post('/upload',multiplartMiddleWare,(req,resp)=>{
  const files = req.files;
  console.log(files)



  //manda um json novamente para o angular
  req.json({message: files});
})

 //Novo endpoint para fazer download de excel
 app.get('/downloadExcel',(req,res)=>{
  res.download('./uploads/thiago.xlsx')
})

 //Novo endpoint para fazer download de pdf
 //Para chamar direto seria localhost:8000/downloadPdf
 app.get('/downloadPdf',(req,res)=>{
   console.log("teste download pdf")
  res.download('./uploads/thiago.pdf')
})

//funcao que vai capturar qualquer erro mp servidor
app.use((err,req,res,next) => res.json({error : err.message}))


//Mostra todas as rotas criadas quando vc executa o servidor
app._router.stack.forEach(function(r){
  if (r.route && r.route.path){
    console.log(r.route.path)
  }
})

app.listen(8000,()=>{
  console.log('servidor iniciado na porta 8000')
})
