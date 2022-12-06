// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginUser from './pages/userPages/LoginUser'
import SignUpPage from './pages/userPages/SignUpPage';
import FeedPage from './pages/userPages/FeedPage';
import AdminLoginPage from './pages/adminPages/AdminLoginPage';



import Structure from './pages/adminPages/Structure';
import UserManagment from './components/admin/UserManagment';
import PostManagment from './components/admin/PostManagment';
import AdminDashboard from './components/admin/AdminDashboard';
import { Provider } from 'react-redux';
import store from './redux/store'
import ProfilePage from './pages/userPages/ProfilePage';
import MessagePage from './pages/userPages/MessagePage';
import SavedPostPage from './pages/userPages/SavedPostPage';
import ReportedPosts from './components/admin/ReportedPosts';
import ReportDetailView from './components/admin/ReportDetailView';
import GroupPage from './pages/userPages/GroupPage';
import GroupPostReport from './components/admin/GroupPostReport';
import GroupPostDetail from './components/admin/GroupPostDetail';
import ViewGroupPage from './pages/userPages/ViewGroupPage';
import Updation from './UpdationContext/UpdationContext';



function App() {
  return (


    <div className="App">
      <Router>
          <Provider store={store}>
        <Updation>
            <Routes>
              <Route path='/login' element={<LoginUser />}></Route>
              <Route path='/signup' element={<SignUpPage />}></Route>
              <Route path='/' element={<FeedPage />}></Route>
              <Route path='/profile/:username' element={<ProfilePage />}></Route>
              <Route path='/message' element={<MessagePage />}></Route>
              <Route path='/savedPosts' element={<SavedPostPage />}></Route>
              <Route path='/group/:groupid' element={<GroupPage />}></Route>
              <Route path='/view/groups' element={<ViewGroupPage />}></Route>
            </Routes>
        </Updation>
          </Provider>

        <Routes>
          <Route path='/admin/login' element={<AdminLoginPage />}></Route>
          <Route path='/admin' element={<Structure />}>
            <Route path='/admin/dashboard' element={<AdminDashboard />}></Route>
            <Route path='/admin/usermanagment' element={<UserManagment />}></Route>
            <Route path='/admin/report/postmanagment' element={<ReportedPosts />}></Route>
            <Route path='/admin/viewreport/postmanagment/:postId' element={<ReportDetailView />}></Route>
            <Route path='/admin/group/report/postmanagment' element={<GroupPostReport />}></Route>
            <Route path='/admin/group/viewreport/postmanagment/:postId' element={<GroupPostDetail />}></Route>


          </Route>
        </Routes>

      </Router>
    </div>
  );
}

export default App;
