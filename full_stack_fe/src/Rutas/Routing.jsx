import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import FormRegistro from '../pages/FormRegistro';
import FormLogin from '../pages/Formlogin';


const Routing=()=>{
    return(
        <Router>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/registro' element={<FormRegistro/>}/>
                <Route path='/login' element={<FormLogin/>}/>
            </Routes>
        </Router>
    )
}

export default Routing