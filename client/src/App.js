// import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import LoginUser from './pages/userPages/LoginUser'
import SignUpPage from './pages/userPages/SignUpPage';

function App() {
  return (


    <div className="App">
     <Router>
      <Routes>
        <Route path='/login' element={<LoginUser/>}></Route>
        <Route path='/signup' element={<SignUpPage/>}></Route>

      </Routes>

     </Router>
    </div>
  );
}

export default App;
