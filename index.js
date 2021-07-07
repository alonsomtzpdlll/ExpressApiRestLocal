const express = require('express')
const app = express()

app.use(express.json())

let values = [
  {
  id:1,
  Saludo:"Hola",
  Adios:"Adios"
  },
  {
    id:2,
    Saludo:"Hey",
    Adios:"Bye"
  }
]

app.get('/', (request,response)=>{
  response.json(values)
})

app.post('/',(request,response)=>{
  const value = request.body

  //Obtenemos el numero de elementos con id para generar el nuevo
  const ids = values.map(value => value.id)
  const maxid = Math.max(...ids)

  const newValue = {
    id: maxid+1,
    Saludo:value.Saludo,
    Adios:value.Adios
  }

//Spread Operator toma los valores del arreglo y le agrega el nuevo
  values=[...values,newValue]
  response.json(newValue)

})

app.get('/:id',(request,response)=>{
  const id  = Number(request.params.id)
  //Filtra los valores del arreglo
  const value = values.find(value => value.id === id)
  if(value){
  response.json(value)
  }else{
	response.status(404).end()
  }
})

app.delete('/:id',(request,response)=>{
  const id  = Number(request.params.id)
  values = values.filter(value => value.id !== id)
	response.status(204).end()
})


const PORT = 3000
app.listen(PORT,()=>{
console.log('Server is Running')
})
