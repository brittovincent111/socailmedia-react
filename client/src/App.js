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
import UserReportDetailView from './components/admin/DetailsUserReport';
import { socket, SocketContext } from './UpdationContext/Socket';
import ForgetPasswordPage from './pages/userPages/ForgetPasswordPage';
import Error from './components/user/Error';
import ErrorPage from './components/ErrorPage';



function App() {
  return (


    <div className="App">
      <Router>
        <SocketContext.Provider value={socket} >
          <Provider store={store}>
            <Updation>
              <Routes>
                <Route path='/login' element={<LoginUser />}></Route>
                <Route path='/signup' element={<SignUpPage />}></Route>
                <Route path='/forgotPassword/:email/:otp' element={<ForgetPasswordPage />}></Route>
                <Route path='/' element={<FeedPage />}></Route>
                <Route path='/profile/:username' element={<ProfilePage />}></Route>
                <Route path='/message' element={<MessagePage />}></Route>
                <Route path='/savedPosts' element={<SavedPostPage />}></Route>
                <Route path='/group/:groupid' element={<GroupPage />}></Route>
                <Route path='/view/groups' element={<ViewGroupPage />}></Route>
                <Route path='/errorPage' element={<Error />}></Route>

                
              
          <Route path='/admin/login' element={<AdminLoginPage />}></Route>
          <Route path='/admin' element={<Structure />}>
            <Route path='/admin/dashboard' element={<AdminDashboard />}></Route>
            <Route path='/admin/usermanagment/:userId' element={<UserReportDetailView />}></Route>
            <Route path='/admin/usermanagment' element={<UserManagment />}></Route>
            <Route path='/admin/report/postmanagment' element={<ReportedPosts />}></Route>
            <Route path='/admin/viewreport/postmanagment/:postId' element={<ReportDetailView />}></Route>
            <Route path='/admin/group/report/postmanagment' element={<GroupPostReport />}></Route>
            <Route path='/admin/group/viewreport/postmanagment/:postId' element={<GroupPostDetail />}></Route>
          </Route>
           
           <Route path='*' element={<ErrorPage/>} />


        </Routes>
        </Updation>
          </Provider>
        </SocketContext.Provider>

      </Router>
    </div>
  );
}

export default App;
