import { Router } from "express";
export const aiRouter:Router = Router()
import { client } from "@repo/db/client"
import {responseModel } from "@repo/common/types"
import OpenAI from "openai";
const openai = new OpenAI({ apiKey:"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"});
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("AIzaSyB-kUzPps1DZ314w_MH60Q1sRFv0U7_1LM")
const aiclient = new OpenAI({
    apiKey: "xai-SLbxuNiYoZeE10kjrMyAg14l4FAK6UXfibYsB1kFLhUnFlf2nWg9qhdh0F5T4kwTvppP5ikQ2PyxxsO0",
    baseURL: "https://api.x.ai/v1",
  });


aiRouter.post("/chatgpt",async (req,res)=>{
    try{
        // Input is validated via zod
        const parsedBody = responseModel.safeParse(req.body)    
        const userId =  "0aa4be3f-dc07-4fe6-b17e-c2594a4904a2"
        
        if(parsedBody.error){
        res.status(500).json({
            msg:"Error retriveing inputs"
        })
            return
        }

        const prompt = parsedBody.data.prompt;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                {
                    role: "user",
                    content:prompt,
                },
            ],
            store: true,
        });

        // store response & prompt in db
        const response = await client.response.create({
            data:{
                prompt:prompt,
                //@ts-ignore
                response:completion.choices[0]?.message.content,
                userId:userId
            }
        })

        res.status(200).json({
            response
        })
    }
    catch(error:any){
        res.status(500).json({
            msg:`Error in getting response from ChatGPT : ${error.message}`
        })
    }
})

aiRouter.post("/gemini",async (req,res)=>{
    try{

        const userId =  "0aa4be3f-dc07-4fe6-b17e-c2594a4904a2"
        const parseBody = responseModel.safeParse(req.body)

        if(parseBody.error){
            res.status(500).json({
                msg:"Error retrieving Inputs"
            })
            return
        }
    
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
        const prompt = parseBody.data.prompt
    
        const result = await model.generateContent(prompt);

        const response = await client.response.create({
            data:{
                prompt:prompt,
                //@ts-ignore
                response:result.response.candidates[0]?.content.parts[0]?.text,
                userId:userId
            }
        })

        res.status(200).json({
            response
        })
        
    }
    catch(error:any){
        res.status(500).json({
            error:`Error in getting response from Gemini: ${error.message}`
        })
    }
})
 

aiRouter.post("/grok",async(req,res)=>{
    try{
        const parseBody = responseModel.safeParse(req.body);
        const userId =  "0aa4be3f-dc07-4fe6-b17e-c2594a4904a2"

        if(parseBody.error){
            res.status(500).json({
                msg:"Error retriveing Inputs"
            })
            return
        }
    
        const prompt = parseBody.data.prompt
    
        const completion = await aiclient.chat.completions.create({
            model: "grok-2-latest",
            messages: [
                {
                    role: "system",
                    content: "You are Grok, a chatbot inspired by the Hitchhiker's Guide to the Galaxy."
                },
                {
                    role: "user",
                    content: prompt
                },
            ],
        });

        const response = await client.response.create({
            data:{
                prompt:prompt,
                //@ts-ignore
                response:completion.choices[0]?.message.content,
                userId:userId
            }
        })
        
        res.status(200).json({
            response
        })
    }
    catch(error:any){
        res.status(500).json({
            msg:`Error in getting response from Grok: ${error.message}`
        })
    }
})

aiRouter.get("/bulk",async (req,res)=>{
    try{
        const userId = req.body.userId
    
        const responses = await client.response.findMany({
            where:{
                userId:userId
            }
        })

        const resArr = [];
        
        for(let i=0;i<responses.length;i++){
            resArr[i] = responses[i]?.response
        }

        res.status(200).json({
            resArr
        })
    }
    catch(error:any){
        res.status(500).json({
            error:`Error in reterivin user's responses from DB: ${error.messages}`
        })
    }
})