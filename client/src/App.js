import {Routes, Route} from 'react-router-dom'
import Main from './views/Main';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' />
        <Route path='/home' element={<Main/>} />
      </Routes>
    </div>
  );
}

export default App;
