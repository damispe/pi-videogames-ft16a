import Videogames from './videogames';

//input búsqueda por nombre
//listado de juegos de a 15 con nombre, imagen y género
//boton/opciones para filtrar por género y por juego de API o agregado en la DB
//boton/opcion para ordenar asc o desc alfabeticamente o por rating
//paginado para traer de a 15 
export default function Home(){
    return (
        <div>
            <Videogames/>
        </div>
    );
}