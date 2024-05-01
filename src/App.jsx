import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './components/Home'
import Summary from './components/Summary'

const App = ()=>{
return(
  <BrowserRouter>
  <Routes>
  <Route exact path="/" element={<Home/>}/>
  <Route exact path="/summary/:start/:inprogress/:end"  element={<Summary/>}/>
  </Routes>
  </BrowserRouter>
)
}

export default App