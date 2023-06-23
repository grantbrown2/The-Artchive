import {Routes, Route} from 'react-router-dom'
import Main from './views/Main';
import LoginReg from './components/LoginReg';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LoginReg/>} />
        <Route path='/home' element={<Main/>} />
      </Routes>
    </div>
  );
}

export default App;
