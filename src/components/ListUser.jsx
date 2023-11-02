import axios from 'axios'
import React, { Component } from 'react'

export default class ListUser extends Component {

    state = {
        utilisateurs: [],
        posts: [],
        activeId: 0
    }
  render() {
    return (
      <div>
            {this.state.utilisateurs.length===0 ? <h1>Pas d'utilisateurs</h1> : 
                <div className='users'>
                    {
                        this.state.utilisateurs.map(user => 
                            <div className='user'>
                                <h1>Nom : {user.name}</h1>
                                <p>Email : {user.email}</p>
                                <p>Ville : {user.address.city} - Rue : {user.address.city}</p>
                                <button onClick={() => this.setState({activeId: user.id})}>Details user</button>

                                {
                                    this.state.activeId == user.id && <div>
                                        {this.state.posts.map(p => 
                                            <div>
                                                <h5>{p.title}</h5>
                                                <p>{p.body}</p>
                                            </div>
                                        )}
                                    </div>
                                }
                            </div>
                            )
                    }
                </div>
            }
      </div>
    )
  }

  componentDidMount(){
    const getUsers = async () => {
        const res = await axios.get('https://jsonplaceholder.typicode.com/users')
        return res.data;
    }

    getUsers().then(users => this.setState({utilisateurs: users}))
  }

  componentDidUpdate(prevprops, prevstate){
    if(prevstate.activeId !== this.state.activeId){
        const getPosts = async () => {
            const res = await axios.get('https://jsonplaceholder.typicode.com/posts?userId='+this.state.activeId)
            return res.data;
        }
    
        getPosts().then(posts => this.setState({posts}))
    }
  }
}
