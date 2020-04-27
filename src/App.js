import React, {Component} from 'react';
import Geo from './geo';
import Weather from './weather'
import './App.css';

class App extends Component {
  state={
    weather:[],
    geos:[],
    geo:[],
    fav:null,
    inputvalue:null,
  }
  componentDidUpdate(){
    if(this.state.inputvalue!==null){
      const dropdown=[]
      console.log(this.state.inputvalue)
      //let sendgeo=this.state.inputvalue
      //const geos=
      fetch(`https://api.geocod.io/v1.4/geocode?q=${this.state.inputvalue}&api_key=25de1572225915e7eee55d929d76e4e65e61e62`)
      .then(res=>res.json())
      .then(result=>//console.log(result.results)
      { /* dropdown=result.results.map((xx,index)=>
        {return <div>
          {xx.formatted_address}
        </div>
        }
        ) */
        console.log(result)
        result.results.map((xx,index)=>
        dropdown.push([xx.formatted_address, xx.location]))
        this.setState((prev, props)=>{
          if(JSON.stringify(dropdown)!==JSON.stringify(prev.geos)){
            return ({
              geos: dropdown
            })
          }
        })
      }
      )
      .catch((error)=>{
        console.log('request failed', error)
        alert('please input correct location info.')
      })
    } 
    if(this.state.geo.length){
      let data=[]
      fetch(`https://api.weather.gov/points/${this.state.geo[0]},${this.state.geo[1]}`)
      .then(res=>res.json())
      .then(result=>
        //console.log(result.properties.forecast)
        //data=result.properties.forecast
        fetch(result.properties.forecast)
        .then(res=>res.json())
        .then(result=>{
          //console.log(result.properties.periods)
          result.properties.periods.map((xx,index)=>
          {
            data.push([xx.temperature, xx.name, xx.shortForecast])
          }
          )
          this.setState((prev,prop)=>{
            if(JSON.stringify(data)!==JSON.stringify(prev.weather)){
              return ({weather:data})
            }
          })
           // {weather:data})
        }
        )
        .catch((error)=>
          {console.log(error)
            alert(`weather can't find. ${error}`)
          }
        )
      )
        .catch((error)=>
          {console.log(error)
            alert(`geo can't find. ${error}`)
          }
        )
        //console.log(data)
    }

  }
  
  getInput=()=>{
    //m1
    //console.log(this.refs.input.value)
    //m2
    console.log(this.inputwhat.value.length)
    this.setState({inputvalue:this.inputwhat.value})
    /* if(this.inputwhat.value.length!==0){
     this.setState({inputvalue:this.inputwhat.value})
    }
    else{
      alert('please input info.')
    } */
  }
  geoback=(val)=>{
    let geo=[]
    Object.keys(val).map((xx,index)=>
       geo.push(val[xx])
    )
    console.log(geo)
    this.setState({geo:geo})

  }
  getValue=()=>{

  }
  render(){
    let geoss=<p>no geos info now!</p>;
    
    if(this.state.geos.length!==0){
      console.log(this.state.geos)
      geoss=this.state.geos.map((xx,index)=>{
        return <Geo geoinfo={xx[0]}
        key={index}
        click={this.geoback.bind(this, xx[1])}>
        </Geo>
      }
      );
    }

    let weather=<p>there's no weather info now.</p>

    if(this.state.weather.length!==0){
      const testd=this.state.weather[0]
      /* weather=testd.map((xx, index)=>{
        return <Weather
        temp={xx[0]}
        time={xx[1]}
        detail={xx[2]}
        >
        </Weather>
      }) */

      weather=<Weather
        temp={testd[0]}
        time={testd[1]}
        detail={testd[2]}
        />
      console.log(testd[0])
      console.log(typeof this.state.weather[0])
    }

    /* let geos=<p>no geos infor</p>
    if(this.state.geos!==null){
      geos=this.state.geos.map((xx,index)=>{
      <p>{xx}</p>
      })
    } */
  return (
    <>
    <div className="main">
      <div className="header">
        weather app
      </div>
      <div className="left">
      </div>
      <div className="mid">
        {/* <form>
        <input placeholder='zip, location...' onChange={this.getInput.bind(this)}></input>
        <input placeholder='submit' value={this.getValue()}></input>
        </form> */}
        {/* <form bindSubmit={this.getInput.bind(this)}>
          <input type="digit" name="amount" placeholder="请输入金额" />
          <button formType="submit" >提交</button>
      </form> */}
      {/* method1
      <input type='text' defaultValue='zip, location...' ref="input" />
      <button type='submit' onClick={this.getInput}>submit</button> */}
      <div className='inputarea'>
          <input type='text' placeholder='zip, location...' 
          ref={e=>this.inputwhat=e}/>
          <button onClick={this.getInput}>submit</button>
      </div>
      <div className='geo'>
      {geoss}
      </div>
      <div className='weather'>
      {weather}
      </div>
      </div>
      <div className="right">
      </div>
      <div className="footer"></div>
    </div>
    </>
  );
}
}

export default App;
