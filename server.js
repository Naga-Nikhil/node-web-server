const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

const port = process.env.PORT || 3000;

var app=express();
app.set('view engine','hbs');
hbs.registerPartials(__dirname+'/views/partials')

app.use(express.static(__dirname+ '/public'));

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
})

app.use((req,res,next)=>{
  var now=new Date().toString();
  log=`${now} :${req.method} ${req.url}`;
  console.log(log);
  fs.appendFileSync('server.log',log+'\n');
  next();
})

// app.use((req,res,next)=>{
//   res.render('maintenance.hbs');
// })

app.get('/',(req,res)=>{
  //console.log(req);
  //res.send('Hello Express!');
  // res.send({
  //   name:"Nikhil",
  //   likes:['a',1]
  // })
  res.render('home.hbs',{
    pageTitle:"Home Page",
    msg:"Welcome to Our Page."
  });

});


app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About Page',
  });
});
app.get('/bad',(req,res)=>{
  res.send({
    errorMessage:'Unable to handle request'
  })
});

app.listen(port,()=>{
  console.log(`Server is up on port ${port} `);
});
