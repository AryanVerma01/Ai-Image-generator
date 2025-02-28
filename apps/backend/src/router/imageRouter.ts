import { Router } from "express";
export const imageRouter:Router = Router();
import { imageModel } from "@repo/common/types";
import { fal } from "@fal-ai/client"
import { client } from "@repo/db/client";

fal.config({
    credentials:"e290532d-d68a-4c34-8090-8a108bcce22c:bd1b80777dc42cf5a1a3faa6d1ae9ca2"
})

imageRouter.post("/generate",async (req,res)=>{
    try{
        const userId =  "0aa4be3f-dc07-4fe6-b17e-c2594a4904a2"
        const parseBody = imageModel.safeParse(req.body);

        if(parseBody.error){
            res.json({
                error:`Error Retrieving input : ${parseBody.error}`
            })
            return
        }

        const prompt = parseBody.data.prompt;

        const result = await fal.subscribe("fal-ai/flux/dev", {
            input: {
            prompt: prompt
            },
        });

        const imageUrl = result.data.images[0]!.url
        const requestId = result.requestId.toString()

        const response = await client.image.create({
            data:{
                prompt:prompt,
                imageUrl:imageUrl,
                userId:userId,
                requestId:requestId
            }
        })

        res.status(200).json({
            response
        })
    }
    catch(error:any){
        res.status(500).json({
            error:`Error in creating images: ${error.message}`
        })
    }
})

imageRouter.get("/bulk",async (req,res)=>{
    try{
        const userId = "0aa4be3f-dc07-4fe6-b17e-c2594a4904a2"

        const images = await client.image.findMany({
            where:{
                userId:userId
            }
        })
    
        res.status(200).json({
            images
        })    
    }
    catch(error:any){
        res.status(500).json({
            error:`Error in retreving images: ${error.message}`
        })
    }
})