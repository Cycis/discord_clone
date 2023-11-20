import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";

interface MainLayoutProps {
   children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
   return (
      <div className="h-full">
         <div className="hidden md:flex h-full w-[72px] z-30 fixed flex-col inset-y-0">
            <NavigationSidebar />
         </div>
         <main className="md:pl-[72px] h-screen">
            {children}
         </main>
      </div>

   )
}


export default MainLayout;