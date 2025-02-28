import { TerminalSquare } from "lucide-react";
import { Button } from "./button";
import { ShimmerButton } from "../magicui/shimmer-button";

export default function Navbar(){
    return <div className="flex h-14 bg-gray-950  justify-between border-b-1">
        <div className="flex m-4 pt-1">
            <div><TerminalSquare/></div>
            <div className="text-lg">PixelMuse</div>
        </div>
        <div className="m-2">
            <a href="#" className="mx-4"><Button variant={"secondary"}>Image Generator</Button></a>
            <a href="#"><Button variant={"secondary"}> ChatGPT/Gemini</Button></a>
        </div>
        <div className="m-2">
            <Button variant={"destructive"}>Logout</Button>
        </div>
    </div>
}