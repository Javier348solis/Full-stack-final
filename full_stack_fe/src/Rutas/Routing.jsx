import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import FormRegistro from '../pages/FormRegistro';
import FormLogin from '../pages/Formlogin';
import Ofertas from '../pages/Ofertas';
import PerfuMujer from '../pages/Perfumujer';
import PerfuHombres from '../pages/Perfuhombres';


const Routing=()=>{
    return(
        <Router>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/registro' element={<FormRegistro/>}/>
                <Route path='/login' element={<FormLogin/>}/>
                <Route path='/ofertas' element={<Ofertas/>}/>
                <Route path='/mujeres' element={<PerfuMujer/>}/>
                <Route path='/hombres' element={<PerfuHombres/>}/>
            </Routes>
        </Router>
    )
}

export default Routing