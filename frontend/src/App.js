import './App.css';
import {Routes,Route} from 'react-router-dom'
import SignUp from './Signup';
import SignIn from './Signin';
import Home from './Home';
function App() {
  return (
  <Routes>
    <Route path='/' element={<SignUp/>}/>
    <Route path='/signin' element={<SignIn/>}/>
    <Route path="/home" element={<Home/>}/>
  </Routes>
  );
}

export default App;
