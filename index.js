const express = require("express")
const cors = require("cors")
const {Resend} = require("resend")

const app = express()

const resend = new Resend('re_123456789')

app.use(cors())
app.use(express.json())

app.post('/send-email', async (req, res)=>{
    const {fullname, email, message} = req.body

    try{

        const {data, error} = await resend.emails.send({
            from: `Acme <${email}>`,
            to: ['alaminkhanstd@gmail.com'],
            subject: 'Admin contact from portfolio',
            html: `<p>${message}</p>`,
        })

        if(error){
            return res.status(500).json({error: error.message})
        }

        res.status(200).json({data})

    }catch(err){
        res.status(500).json({error: err.message})
    }
})

const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log('Server running on the port 5000');
})