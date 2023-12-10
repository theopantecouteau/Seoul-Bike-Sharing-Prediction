import './App.css';
import Form from './Form';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="app">
        <h1>Seoul Bike Demands prediction</h1>
        <Form />
        <ToastContainer />
    </div>
  );
}

export default App;
