import express from "express"
import cors from "cors"
import { client } from "@repo/db/client";
import { aiRouter } from "./router/aiRouter";
import { imageRouter } from "./router/imageRouter";
const app = express();


app.use(express.json())
app.use(cors())

app.use("/ai/response",aiRouter)
app.use("/image",imageRouter)

app.post("/user/create",async (req,res)=>{
    try{
        const username = req.body.username
        const profilePicture = req.body.profilePicture

        const response = await client.user.create({
            data:{
                username,
                profilePicture
            }
        })

        res.json({
            response
        })
    }
    catch(error:any){
        res.status(500).json({
            msg:`Error Creating user: ${error.message}`
        })
    }
})

const PORT = process.env.PORT || 3002
app.listen(PORT,()=>{
    console.log(`Server running at PORT:${PORT}`);
})