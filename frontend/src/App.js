import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/Login';
import Layout from './pages/Layout';
import SignUp from './components/authentication/signup_page';
import Entries from './components/component/display_entries';
import JournalEntry from './components/component/journal_entry';
import AdminLayout from './pages/Admin_Layout';
import Home from './components/component/home';
import DisplayUsers from './components/component/display_users';
import AddAdminPage from './components/component/add_admin';
import AddUserPage from './components/component/add_user';
import TodaysEntries from './components/component/todays_entries';
import FavoriteEntries from './components/component/favorites';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/admin/panel' excact element={<AdminLayout />} >
            <Route index excact element={<DisplayUsers />} />
            <Route path='/admin/panel/addadmin' excact element={<AddAdminPage />} />
            <Route path='/admin/panel/adduser' excact element={<AddUserPage />} />
          </Route>
          <Route path='/layout' excact element={<Layout />} >
            <Route index element={<Home />}></Route>
            <Route path='/layout/entries' excact element={<Entries />} />
            <Route path='/layout/todays' excact element={<TodaysEntries />} />
            <Route path='/layout/favorites' excact element={<FavoriteEntries />} />
            <Route path='/layout/journal-entry' excact element={<JournalEntry />} />
            <Route path='/layout/signup' excact element={<SignUp />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <Layout/> */}
    </div>
  );
}

export default App;
