import { Routes, Route } from 'react-router-dom';
 import './App.css';
 import Navbar from './components/navbar';
  import Home from './pages/home';
   import Favorites from './pages/favorites';
   import Details from './pages/details';
    import AddRecipe from './pages/add-recipe';
    import Login from './pages/login';
    import RecipeGenerator from './pages/RecipeGenerator';
import Footer from './components/footer';
function App() {
  return (
    <>
      <div className='min-h-screen p-6 bg-white text-gray-600 text-lg'>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/favorites' element={<Favorites/>} />
          <Route path='/recipe-item/:id' element={<Details/>} />
          <Route path='/add-recipe' element={<AddRecipe />} />
          <Route path='/Recipe-Generator' element={<RecipeGenerator />} />
          <Route path='/login' element={<Login />} />
          
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
