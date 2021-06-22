import logo from './logo.svg';
import './App.css';
import { Container } from 'react-bootstrap';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import Footer from './components/Footer';
import Header from './components/Header';
import LoginScreen from './screens/loginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import RoomScreen from './screens/RoomScreen';
import ReservationScreen from './screens/ReservationScreen';
import ClaimScreen from './screens/ClaimScreen';
import DashboardScreen from './screens/DashboardScreen';
import DashboardUserScreen from './screens/DashboardUserScreen';
import DashboardPaymentScreen from './screens/DashboardPaymentScreen';
import SeeClaimScreen from './screens/SeeClaimScreen';
import DashboardModifyRoomScreen from './screens/DashboardModifyRoomScreen';
import DashboardAddRoomScreen from './screens/DashboardAddRoomScreen';



function App() {
  return (
    <Router>
    <Header />
    <main className='py-3'>
     
      <Container>
          
          <Route path='/' component={HomeScreen} exact />
          <Route path='/login' component={LoginScreen} exact />
          <Route path='/register' component={RegisterScreen} exact />
          <Route path='/room/:id' component={RoomScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/reservation/:id' component={ReservationScreen} />
          <Route path='/claim' component={ClaimScreen} />
          <Route path='/dashboard_claim/:id' component={SeeClaimScreen} />
          <Route path='/dashboard_user/:id' component={DashboardUserScreen} />
          <Route path='/dashboard' component={DashboardScreen} />
          <Route path='/dashboard_payment/:user_id/:rent_id' component={DashboardPaymentScreen} />
          <Route path='/dashboard_modify_room/:room_id' component={DashboardModifyRoomScreen} />
          <Route path='/dashboard_add_room' component={DashboardAddRoomScreen} />
          

      </Container>
    </main>
    <Footer />
    </Router>
  );
}

export default App;
