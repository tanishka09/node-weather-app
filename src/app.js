const path= require('path')
const express= require('express')
const hbs= require('hbs')

const app= express()
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')


const publicDirectoryPath=path.join(__dirname,'../public')
const viewpath=path.join(__dirname,'../templates/views')
const partialpath=path.join(__dirname,'../templates/partial')

//for heroku we use port
const port=process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('views',viewpath)
hbs.registerPartials(partialpath)


app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather',
        name:  'tyy'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title:'About',
        name:'tyy'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title:'Help',
        msg:'if you want help',
        name:'tyy'
    
    })
})

app.get('/product' , (req,res) => {
{if(!req.query.search)
    return res.send({
        error:'you must provide a search term'
    })
}
console.log(req.query.search)
res.send({
    products:[]
    
})
})


app.get('/weather', (req,res) => {
if(!req.query.address){
    return res.send({
        error:'you must provide address'
    })
}



//     geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
//         if (error) {
//             return res.send({ error })
//         }

//         forecast(latitude, longitude, (error) => {
//             if (error) {
//                 return res.send({ error })
//             }

//             res.send({
              
            
//                 location,
//                 address: req.query.address
            

//             })
//         })
//     })
// })


geocode(req.query.address, (error,{ latitude,longitude,location} = {}) => {
  if(error){
      return res.send({ error })
  }
  forecast(latitude,longitude ,(error,forecastData) => {
     if( error ){
         return ({ error })
     }
     res.send({
         forecast: forecastData,
         location,
         address:req.query.address

     })
  })
})
})
app.listen(port,() => {
    console.log(port +'p listen kr rha hai')
})

