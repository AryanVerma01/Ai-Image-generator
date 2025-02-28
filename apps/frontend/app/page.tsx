import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="h-165 overflow-x-auto">
          
      </div>
      <div className="flex justify-center items-center h-15 border-t-1">
          <div className="m-2"><input type="text" placeholder="Enter prompt" className="bg-gray-800 w-160 h-10 rounded-md text-center"></input></div>
          <div className="m-2"><Button variant={"secondary"}>Submit</Button></div>
      </div> 
    </div>
  );
}
