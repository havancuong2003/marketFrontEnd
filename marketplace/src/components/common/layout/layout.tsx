import { Footer } from "../footer"
import { Header } from "../header"

export const Layout = ({ children }: { children: React.ReactNode }) => {
    return(
        <div>
            <Header/>
            {children}
            <Footer/>
        </div>
    )
}