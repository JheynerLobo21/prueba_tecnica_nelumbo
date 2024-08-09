import { Filters } from "./Filters/Filters"
import { Offerts } from "./Offerts"
import { ListProducts } from "./Products/ListProducts"
import { Products } from "./Products/Products"
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
    <section className="more-sold">
     <h2>Nuestro Productos Más Vendidos</h2>
     <Products/>
    </section>
    
    </>
  )
}
