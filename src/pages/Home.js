import React from 'react';
import axios from 'axios'
import List from '../components/List';
import Navbar from '../components/NavBar';

const API_URL = "http://localhost:4040"

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          email: '',
          password: '',
          isLogin: '0',
          movies: [],
          youtube_data: []
        }
        
    }

    async componentDidMount(){
        this.movieList()
    }
    
    async movieList(){
        try{
            const response = await axios({
                method: 'get',
                url: API_URL+'/video'
              });
              await this.setState({
                  movies: response.data.result.movies
              })
        }catch(error){
            console.error(error);
            
        }
    }

    _onReady(event) {
        event.target.pauseVideo();
      }

      render (){
        const opts = {
            height: '320',
            width: '480',
            playerVars: { 
            autoplay: 0
            }
        };
        
        return (
            <div>
                <Navbar islogin={this.state.isLogin} />
       <div className="jumbotron">
           <div className="container">
            <marquee>
                <h1>
                    <text>Share Your Video Here</text>
                </h1>
            </marquee>
        </div>
      </div>
            <div className="container mb-10">
               {
                    this.state.movies.map((v) => {
                        return(
                            <div class="container" style={{borderRadius: "50px"}}>
                            <List 
                                link={v.link}
                                opt={opts}
                                ready={this._onReady}
                                title={v.title}
                                email={v.email}
                                id={v.id}
                                like={v.like}
                                dislike={v.dislike}
                                description={v.description}
                            />
               </div> 
                        )
                    }
                )}
            </div>
          
            </div>
            
        );
  }
  
}

export default Home;