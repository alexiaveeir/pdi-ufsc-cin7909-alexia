let express = require('express'),
path = require('path'),
mongoose = require('mongoose'),
cors = require('cors'),
bodyParser = require('body-parser'),
mongoDb = require('./database/db');

mongoose.Promise = global.Promise;

mongoose.connect(mongoDb.db,{
    useNewUrlParser:true,

    useUnifiedTopology:true

}).then(()=>{
    console.log('Conexão OK com o banco de dados!')
},
error =>{
    console.log('Erro no banco de dados: ' + error)
}
)

const contactRoute = require('./routes/contact.route');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cors());

app.use(express.static(path.join(__dirname,'dist/crud-contact')));

app.use('/api',contactRoute);

const port = process.env.PORT || 8000;

app.listen(port,()=>{
    console.log('escutando a porta ' + port)
})

//Config. handlers 404

app.use((req,res,next)=>{
    next(createError(404));
});

// Config. erro de rota raiz invalidendpoint

app.get('/',(req,rest) =>{
    res.send('invalidendpoint');
});

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, '/dist/crud-contact/index.html'));
});

//General error handler

app.use(function(err,req,res,next){
    console.error(err.message);
    if(!err.statusCode) err.statusCode = 500 ;
    res.status(err.statusCode).send(err.message);
});