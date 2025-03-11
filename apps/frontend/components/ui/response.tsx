"use client"
import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {Tabs, Tab} from "@heroui/tabs";

export default function GetResponse() {
  const [responses, setResponses] = useState([])
  const [inputVal,setinputVal] = useState("");
  const [isSelected,setisSelcted] = useState("")

  async function PreviousResponses(){
        const res = await axios.get("http://localhost:3002/ai/response/bulk");
        setResponses(res.data.resArr)
    };
  
  async function sendRequest(){
    if( isSelected === "Chatgpt"){
      const res = await axios.post("http://localhost:3002/ai/response/chagpt",{
        prompt:inputVal
      })
      console.log(res)
    }
    else if( isSelected === "Gemini"){
      const res = await axios.post("http://localhost:3002/ai/response/gemini",{
        prompt:inputVal
      })
      console.log(res)
    }
    else{
      console.log("Select AI Model")
    }
  }

  return(
  <div className="flex flex-col">
      <div className="h-165 overflow-x-auto">
        <div>
        <div>
          {responses.map((res)=> <div className="bg-white text-black font-semibold m-6 p-4 rounded-xl"><p >{res}</p></div>)}
        </div>
        </div>
      </div>
      <div className="flex justify-center items-center h-15 border-t-1">
        <div className="m-2">
          <input
            type="text"
            placeholder={`${isSelected}`}
            className="bg-gray-800 w-160 h-10 rounded-md text-center"
            onChange={(e)=>{setinputVal(e.target.value)}}
            ></input>
        </div>
        <div className="m-2">
          <Button
            variant={"secondary"}
            onClick={() => sendRequest()}>
            Submit
          </Button>
          <Button
            variant={"secondary"}
            className="m-2"
            onClick={PreviousResponses}
          >
            Refresh
          </Button>
        </div>
        <div>
          <button onClick={()=>{setisSelcted("Chatgpt")}} className={`bg-blue-500 m-1 px-2 py-1 rounded`}>Chatgpt</button>
          <button onClick={()=>{setisSelcted("Gemini")}} className={`bg-blue-500 m-1 px-2 py-1 rounded`}>Gemini</button>
        </div>
      </div>
    </div>
  );
}
