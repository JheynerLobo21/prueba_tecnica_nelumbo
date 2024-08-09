import { Filters } from "./Filters/Filters"
import { Offerts } from "./Offerts"
import { ListProducts } from "./Products/ListProducts"
import '/src/css/main-page.css'

export const MainProducts = () => {
  return (
    <>
    <main className="main-category">
        <aside className="group-filters">
         <Filters/>
        </aside>
        <aside className="group-products">
         <ListProducts/>
        </aside>
    </main>
    <Offerts/>
    </>
  )
}
