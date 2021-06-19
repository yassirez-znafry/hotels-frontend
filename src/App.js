import logo from './logo.svg';
import './App.css';
import { Container } from 'react-bootstrap';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import Footer from './components/Footer';
import Header from './components/Header';
import LoginScreen from './screens/loginScreen';
import RegisterScreen from './screens/RegisterScreen';
import RoomScreen from './screens/RoomScreen';


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

      </Container>
    </main>
    <Footer />
    </Router>
  );
}

export default App;
