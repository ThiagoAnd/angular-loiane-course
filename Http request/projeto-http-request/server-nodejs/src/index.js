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
//o codigo nodejs vai rodar 8000
//mesmo sendo localhost , por em portas diferentes significa ser um dominio diferente
//por questões de segurança do javascript , não é possivel dominios diferentes se comunicarem
//isso é uma questão de segurança, pois senaõ poderiamos pegar consumir a api de qualquer site.
//a nossa api precisa deixar explicito que vc vai aceitar requisições de dominios diferentes


//aqui vamos ter o CORS habilitado
const corsOptions = {
  origin: '*',
  optionSucessStatus: 200
};

//segundo middleware é o cors, o primeiro é o body parser
app.use(cors(corsOptions))

//A pasta que vamos salvar será ./uploads
const multiplartMiddleWare = multipart({uploadDir: './uploads'})

//o endpoint que vamos usar sera o /upload
app.post('/upload',multiplartMiddleWare,(req,resp)=>{
  const files = req.files;
  console.log(files)

  //manda um json novamente para o angular
  req.json({message: files});
})

//funcao que vai capturar qualquer erro mp servidor
app.use((err,req,resp,next) => res.json({error : err.message}))

app.listen(8000,()=>{
  console.log('servidor iniciado na porta 8000')
})
