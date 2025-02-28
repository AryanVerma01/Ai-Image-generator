import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
import { TerminalSquare } from "lucide-react"
import { title } from "process"
  
const items = [
    {
      title: "ChatGPT",
      url: "#",
    },
    {
      title: "Gemini",
      url: "#",
    },
    {
      title: "Grok 3",
      url: "#",
    },
  ]

const item2 = [
    {
        title:"Fal AI",
        url:"#"
    }
]


  export function AppSidebar() {
    return (
      <Sidebar>
        <SidebarHeader className="bg-gray-950 text-white">
            <div className="flex justify-center items-center">
                <div className="mr-1.5"><TerminalSquare /></div>
                <div className="text-2xl font-semibold">PixelMuse</div>
            </div>
        </SidebarHeader>
        <SidebarContent className="bg-gray-950 text-white">
          <SidebarGroup>
          <SidebarGroupLabel className="text-white text-lg m-2">AI</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu className="pl-4">
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                        <a href={item.url}>
                        <span>{item.title}</span>
                        </a>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
                </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
          <SidebarGroupLabel className="text-white text-lg m-2">Image Generator</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu className="pl-4">
                {item2.map((item2) => (
                    <SidebarMenuItem key={item2.title}>
                    <SidebarMenuButton asChild>
                        <a href={item2.url}>
                        <span>{item2.title}</span>
                        </a>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
                </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="bg-gray-950 text-white"/>
      </Sidebar>
    )
  }
  