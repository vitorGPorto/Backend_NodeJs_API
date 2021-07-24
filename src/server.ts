import express from 'express'
import {v4 as uuid}from 'uuid'
import cors from 'cors'
const app = express()
app.use(express.json())
app.use(cors())

//http://localhost:3333/users



interface User {
    id: string
    name: string
    email: string

}

const users: User [] = []

app.get('/users',(request, response)=>{

    //return response.json(['usuario 1', 'usuario 2'])
    
    return response.json(users)
})

app.post('/users', (request, response)=>{

//  return response.json({message: 'Criando usu'})
const {name, email} = request.body

const user = {id:uuid(), name, email}

users.push(user)

return response.json(user)

})

app.put('/users/:id', (request, response)=>{
    //return response.json({message: 'Atualizando users'})
    
    //receber os dados do usuário
    const { id } = request.params
    const {name, email} = request.body

    //localizar o usuário na base de dados 
    const userIndex = users.findIndex((user)=>user.id === id)

    //se o usuário não existir, retonar um erro 
    if(userIndex<0){
        return response.status(404).json({error:'User not found'})
    }

    const user = {id, name, email}
    //atualiza o usuário na base de dados 
    users[userIndex] = user

    //retorna os dados do usuário atualizado

    return response.json(user)
    })

app.delete('/users/:id', (request, response)=>{
    //return response.json({message: 'Deletando users'})
    
    //receber id do usuário
    const {id} = request.params

    //localizar o suário na base de dados
    const userIndex = users.findIndex((user)=>user.id === id)

    //se o usuário não existir, retornar um erro 
    if(userIndex<0){
        return response.status(404).json({error:'User not found'})
    }
    //excluir usuário da base de dados 
     users.splice(userIndex, 1)

    //retorna status de  sucesso
    return response.status(204).send()

    })

 app.listen('3333', ()=>{
    console.log('teste backend')

 })