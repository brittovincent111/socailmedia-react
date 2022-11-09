// import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import LoginUser from './pages/userPages/LoginUser'
import SignUpPage from './pages/userPages/SignUpPage';
import FeedPage from './pages/userPages/FeedPage';
import AdminLoginPage from './pages/adminPages/AdminLoginPage';



import Structure from './pages/adminPages/Structure';
import UserManagment from './components/admin/UserManagment';
import PostManagment from './components/admin/PostManagment';


function App() {
  return (


    <div className="App">
     <Router>
      <Routes>
        <Route path='/login' element={<LoginUser/>}></Route>
        <Route path='/signup' element={<SignUpPage/>}></Route>
        <Route path='/' element={<FeedPage/>}></Route>

      </Routes>
      <Routes>
        <Route path='/admin/login' element={<AdminLoginPage/>}></Route>
        <Route path='/admin' element={<Structure/>}>
        <Route path='/admin/usermanagment' element={<UserManagment/>}></Route>
        <Route path='/admin/postmanagment' element={<PostManagment/>}></Route>
        </Route>
      </Routes>

     </Router>
    </div>
  );
}

export default App;
