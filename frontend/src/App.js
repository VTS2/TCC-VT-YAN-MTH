import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/users/Register";
import Login from "./pages/users/Login";
import Profile from "./pages/users/Profile";
import NavBar from "./components/NavBar";
import { UserProvider } from './context/UserContext'
import Container from './components/Container'
import AddPet from './pages/pets/AddPets'
import PetDetails from './pages/pets/PetDetails'
import MyAdoptions from "./pages/pets/MyAdoptions";
import MyPets from "./pages/pets/MyPets";
import Catalogo from "./pages/Catalogo";
import Footer from "./components/footer";


function App() {
  return (
    <div className="App">
      <Router>
        <UserProvider>
          <NavBar />
          <Container>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/catalogo" element={<Catalogo />} />
              <Route exact path="/bersa" element={<bersa />} />
              <Route exact path="/login" element={<login />} />
              <Route exact path="/user/profile" element={<Profile />} />
              <Route exact path="/pet/create" element={<AddPet />} />
              <Route exact path="/pet/:id" element={<PetDetails />} />
              <Route exact path="/pet/myadoptions" element={<MyAdoptions />} />
              <Route exact path="/pet/mypets" element={<MyPets />} />
            </Routes>
          </Container>
          <Footer />
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
