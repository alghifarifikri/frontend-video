import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const API_URL = "http://localhost:4040"

export default class Navbar extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      email: '',
      password: '',
      isLogin: '0',
    }
  }

  componentDidMount() {

    let login = localStorage.getItem('Login'); 
        if(login == '1'){
            this.setState({
                isLogin: '1'
            });
        }else{
            this.setState({
                isLogin: '0'
            });
        }
  }

  handleChange = (event) => {
    const target = event.target;
    const value =  target.value;
    const name = target.name;

    this.setState({
    [name]: value
    });
  }

  logOut = async () => {
    try{
        let email = localStorage.getItem('email');
        let id = localStorage.getItem('id');
        const response = await axios({
            method: 'delete',
            url: API_URL+'/user',
            data: {
              email: email,
              id: id
            }
          });
          localStorage.setItem("Login", '0');
          this.setState({
            isLogin: '0'
          }) 
    }catch(error){

    }
  }

  loginRegister = async () => {
    if(this.state.email.length === 0){
        alert("Please Input Email");
        return;
    }
    else if(this.state.password.length === 0){
        alert("Please Input Password");
        return;
    }
    try{
      const response = await axios({
        method: 'put',
        url: API_URL+'/user',
        data: {
          email: this.state.email,
          password: this.state.password
        }
      });
      let data = response.data.result.data[0]
      const {
          id,
          email,
          status
      } = data;
      localStorage.setItem("id", id);
      localStorage.setItem("email", email);
      localStorage.setItem("Login", '1');
      this.setState({
        isLogin: '1'
      })
      }catch(error) {
        this.setState({
          isLogin: '0'
        })
        alert("the user was login");
      }
  }

  
  render() {
    const user = localStorage.getItem('email');
    return (
      <Fragment>
                    { 
                (this.state.isLogin == '1') ?
                    <nav className="fixed-top navbar navbar-light bg-light ">
                    <div className="container">
                    <Link to ={'/'} className="navbar-brand">
                    <img src="https://www.pinclipart.com/picdir/middle/328-3280268_home-red-home-icon-png-clipart.png" width="30" height="30" className="d-inline-block align-top mr-2"/>
                    Funny Movies
                    </Link>
                    <div className="form-inline">
                    <h4 className="mr-2 mb-2">Welcome {user}</h4>
                    <Link to={'/video'}>
                            <button 
                                type="button" 
                                className="btn btn-outline-danger mr-2 my-sm-0 btn-animate"
                            >
                                    Share a Movie
                            </button>
                        </Link>
                        <button 
                            type="button" 
                            className="btn btn-danger my-2 my-sm-0 btn-animate"
                            onClick={() => this.logOut()}
                        >
                            Logout
                        </button>
                    </div>
                        </div>
                    </nav>
                    :
                  
                    <nav className=" fixed-top navbar navbar-light bg-light">
        <div className="container">
        <Link to ={'/'} className="navbar-brand">
        <img src="https://www.pinclipart.com/picdir/middle/328-3280268_home-red-home-icon-png-clipart.png" width="30" height="30" className="d-inline-block align-top mr-2"/>
        Funny Movies
      </Link>
            <div class="form-inline">
            <input className="input mr-sm-2"  type="text" 
                    placeholder="Enter Your Email" 
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange} />
            <input className="inputd mr-sm-2"  type="password" 
                    placeholder="Enter Your Password" 
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    />
            <button className="btn btn-danger my-2 my-sm-0 btn-animate" type="submit"   onClick={() => this.loginRegister()}>Login / Register</button>
            </div>
        </div>
        </nav>       
            }
      </Fragment>
    )
  }
}
