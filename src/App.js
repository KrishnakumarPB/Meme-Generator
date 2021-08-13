import React from "react";
import "./style.css";
import {Component} from "react"
let x=""
class App extends Component{
  constructor(){
    super()
    this.state={
      imageurl:"",
      toptext:"",
      bottomtext:"",
      allmemes:[]
    }
    this.handleChange=this.handleChange.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
  }
  componentDidMount(){
    fetch("https://api.imgflip.com/get_memes")
    .then(response=>response.json())
    .then(response=>{
      const {memes}=response.data
      this.setState({allmemes : memes})
    })
    
  }
handleChange(event){
  x=document.querySelector(".placeholder");
  
  const {name,value}=event.target
  this.setState({
    [name]:value
  })
  }
  handleSubmit(event){
    x=document.querySelector(".placeholder").classList.add("hidden");
    event.preventDefault()
    const randomnum=Math.floor(Math.random()*this.state.allmemes.length)
    const randomimg=this.state.allmemes[randomnum].url
    this.setState({imageurl:randomimg})
    
  }
  render(){
    return(
      <div className="body">
        <div className="header">
          <h1>Meme Generator</h1>
        </div>
        <div className="container">
          
          <div className="btn-container">
            <button className="btn-primary" onClick={this.handleSubmit}>New Image</button>
          </div>
           <div className="form-continer">
              <form className="form" onSubmit={this.handleSubmit}>
                <input name="toptext" type="text" value={this.state.toptext}
                onChange={this.handleChange} placeholder="TOP TEXT"/>
                <br/>
                <br/>
                <input name="bottomtext" type="text" value={this.state.bottomtext}
                onChange={this.handleChange} placeholder="BOTTOM TEXT"/>
                <br/>
                <br/>
              </form>
            </div>
          <div className="image-container">
          <p className="placeholder">Click on New Image and See the Magic</p>
          <img src={this.state.imageurl}/>
            <div className="top-text">
              <p>{this.state.toptext}</p>
            </div>
            <div className="bottom-text">
              <p>{this.state.bottomtext}</p>
            </div>
  
          </div>
        </div>
      </div>
    )
  }

}
export default App
