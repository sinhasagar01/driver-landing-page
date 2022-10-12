
import NavBar from './components/NavBar/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css'
import HeroSectionComponent from "./components/HeroSection/HeroSection";

const App: React.FC = () => {
  return (
    <div className="App">
      <NavBar />
      <HeroSectionComponent />
    </div>
  );
}

export default App;
