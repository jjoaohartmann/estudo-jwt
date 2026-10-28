import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser'

const PORT = 3000;
const JWT_SECRET = 'sfkjwoikfwkfkwenfoijwifmnw39iur09iuihfoiw'

const app = express()
app.use(express.json())
app.use(cors({
    Credential: true
}))

app.use(cookieParser())

function autencarUsuario(req, res, next){
    const token = req.cookies.token;

    if(token){
        return res.status(401).json({menssagem: "acesso negado"})
    }
    try{
        const usuario = jwt.verify(token, JWT_SECRET)
        req.usuario = usuario
        next();
    }catch(erro){
        return res.status(403).json({mensagem: "token invalido ou expirado"})
    }
}

app.post("/register", async(req, res)=>{
    const {email, senha, cpf} = req.body;
})

app.post("/login", async(req, res)=>{
    const token = jwt.sing(
        {id:client.id},
        JWT_SECRET,
        {expiresIn: "1h"},
    );

    res.cookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 3600000
    })

    res.status(200).json({mensagem: "login realizado com sucesso"})
})

app.get("/registros", autencarUsuario, async(req, res)=>{
    res.json({mensagem: "meus registros"})
})

app.listen(PORT, ()=> {
    console.log("API rodando")
})