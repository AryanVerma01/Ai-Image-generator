import {z} from "zod"

export const responseModel = z.object({
    prompt:z.string()
})

export const imageModel = z.object({
    prompt:z.string()
})