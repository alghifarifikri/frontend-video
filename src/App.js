import React from 'react'
import  { 
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Home from './pages/Home'
import Video from './pages/Video'

class App extends React.Component{
  render(){
    return(
      <Router>
        <Route exact path ={'/'} component={Home}/>
        <Route exact path ={'/video'} component={Video}/>
      </Router>
    )
  }
}

export default App