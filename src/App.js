import React, {Component, Suspense} from 'react';
import Geo from './geo';
import Weather from './weather';
import Nextfour from './nextfour';
import Fav from './fav';
import './App.css';
//import 'weather-icons/css/weather-icons.css';
import Movingshaps from './movingshaps'

import alien from './img/alien.svg';
import skc from './img/skc.svg';
import sct from './img/sct.svg';
import tsra from './img/tsra.svg';
import rain from './img/rain.svg';
import wind from './img/wind.svg';
import snow from './img/snow.svg';
import moon from './img/moon.svg';
import logohead from './img/logo-head.png';


/* import alien from './img/alien.svg';
import alien from './img/alien.svg';
'skc', 'sct', 'snow', 'rain', 'tsra', 'wind' */

//lazy loading
/* const Wea=React.lazy(()=>import('./weather'));
const Loading=()=><p>loading...</p> */
//const Wea=React.lazy(()=>import('./weather'));
class App extends Component {
  state={
    weather:[],
    geos:[],
    geo:[],
    geoname:null,
    fav:[],
    inputvalue:null,
    loading:false,
    display:'none',
  }
  componentDidUpdate(){
   // if()

    if(this.state.inputvalue!==null&&this.inputwhat.value!==''){
      const dropdown=[]
      console.log(this.state.inputvalue)
      
      
        fetch(`https://api.geocod.io/v1.4/geocode?q=${this.state.inputvalue}&api_key=25de1572225915e7eee55d929d76e4e65e61e62`)
      .then(res=>res.json())
      .then(result=>//console.log(result.results)
      { 
        result.results.map((xx,index)=>
        dropdown.push([xx.formatted_address, xx.location]))
        this.setState((prev, props)=>{
          if(JSON.stringify(dropdown)!==JSON.stringify(prev.geos)){
            console.log(dropdown)
            return ({
              geos: dropdown
            })
          }
        })
      }
      )
      //error set here
      .catch((error)=>{
        console.log('request failed', error)
        console.log(this.state.inputvalue)
        console.log(this.inputwhat.value)

      })
      //}
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
          console.log(result)
          result.properties.periods.map((xx,index)=>
          {
            data.push([xx.temperature, xx.name, xx.shortForecast, xx.detailedForecast, xx.icon])
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

  componentDidMount(){
    document.addEventListener("keyup", this.onKeyUp)
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.onKeyUp)
  }

  onKeyUp=(e)=>{
    if(e.keyCode===13){
      this.getInput()
    }
  }

  defualtLose=()=>{
    setTimeout(()=>{
      this.setState({
        display:'none'
      }) 
    },300)
 
  }

  defualtGeos=()=>{
    this.setState({
      geos: [["New York, NY 10004", {lat: 40.68863, lng: -74.018244}],
      ["New York, NY 10170", {lat: 40.752621, lng: -73.97548}]],
      display:'block'
    }) 
  }

  inputMoniter=()=>{
    console.log(this.inputwhat.value.length)
      this.timer=setTimeout(()=>{
         if(this.inputwhat.value.length!==0){
         if(JSON.stringify(this.inputwhat.value)!==JSON.stringify(this.state.inputvalue)){
          console.log(this.state.inputvalue, this.inputwhat.value)
          this.setState({
            inputvalue: this.inputwhat.value
          }) 
         }
        }

        if(this.inputwhat.value===''){
           console.log('111')
          this.setState({
            geos: [["New York, NY 10004", {lat: 40.68863, lng: -74.018244}],
            ["New York, NY 10170", {lat: 40.752621, lng: -73.97548}]]
          }) 
         }
         
      },500);
  }
  
  getInput=()=>{
    
    console.log(this.inputwhat.value.length)
    this.setState({inputvalue:this.inputwhat.value})
    this.setState({loading:true})
   
  }
  geoback=(val,lname)=>{
    console.log(val, lname)
    let geob=[]
    //坐标对象转数组
    Object.keys(val).map((xx,index)=>
       geob.push(val[xx])
    )
    console.log(geob)
    this.setState({geo:geob})
    this.setState({geoname:lname})

  }
  favWeather=(val, lname)=>{
    console.log(val)
    this.setState({geo:val, geoname:lname})

  }

  addFav=()=>{
    if(this.state.geo.length!==0){
      if(localStorage.getItem('fav')){
        let localst=JSON.parse(localStorage.getItem('fav'))

        if(localStorage.getItem('fav').includes(JSON.stringify(this.state.geo))===false){
          localst.push([this.state.geo,this.state.geoname])
          localStorage.setItem('fav', JSON.stringify(localst))
          this.setState({fav:localst})
        }

        
      }else{
        let thisgeo=[[this.state.geo,this.state.geoname]]
        localStorage.setItem('fav', JSON.stringify(thisgeo))
        this.setState({fav:[[this.state.geo,this.state.geoname]]})
       
      }
    }
  }
  chooseImg=(data)=>{
    //let icon=null
    let iconimg=alien
    console.log(data.indexOf('sct'))
    //let icon=['skc', 'sct', 'snow', 'rain', 'tsra', 'wind']
    let icon={'skc':skc, 'sct':sct, 'snow':snow, 'rain':rain, 'tsra':tsra, 'wind':wind, 'night':moon}

    Object.keys(icon).map((xx,index)=>{
      if(data.indexOf(xx)!==-1){
        console.log(xx)
        return iconimg=icon[xx]
      }
    })
    return iconimg
    
  } 
  render(){
    let img=null
    let geoss=null
    let weatherare='none'
    if(this.state.loading===true){
      geoss=<div className='geo'>loading...</div>
    }
    if(this.state.geos.length!==0){
      console.log(this.state.geos)
      
      let geodata=this.state.geos.map((xx,index)=>{
        
        return <li onClick={this.geoback.bind(this, xx[1], xx[0])}>
          {xx[0]}
        </li>
      });
    
    geoss=<div style={{display:this.state.display}} className='geoinput'>
      <ul>
      {geodata}
      </ul>
      {/* <i className="wi wi-day-lightning"></i> */}
      </div>
    }

    //let weather=<p>there's no weather info now.</p>
    let weather=null
    let nextwea=null
    

    if(this.state.weather.length!==0){
      weatherare='grid'
      console.log(this.state.weather)
      console.log(this.state.geoname)

      const testd=this.state.weather[0]
      const nextfour=this.state.weather.filter((xx,index)=>
        index>0&&index<7
      )
      console.log(nextfour)
      const imgicon=JSON.stringify(this.state.weather[0][4])
      console.log(imgicon)
      img=this.chooseImg(imgicon)
      //const imgshow=JSON.parse(img)
      console.log(typeof img)
        weather=<Weather
        //geoclick={this.state.geo} 
        loc={this.state.geoname}
        temp={testd[0]}
        time={testd[1]}
        detail={testd[2]}
        />
        nextwea=nextfour.map((xx,index)=>{
          const imgicon=JSON.stringify(xx[4])
          console.log(imgicon)
          const nextimg=this.chooseImg(imgicon)
          
          return <div className='nextFour'>
            <img src={nextimg} />
          <Nextfour
          temp={xx[0]}
        time={xx[1]}
        detail={xx[2]}
        //img={nextimg}
          />
        </div>
        })
      console.log(testd[1])
      console.log(typeof this.state.weather[0])


    }

    let fav=<p style={{margin:'0.5rem'}}><img style={{width:'1rem', margin: '0 0.5rem'}} src={alien} />
      <span style={{top:'-3px', position:'relative', margin:'0'}}>
       there's no fav locations now.
      </span>
      </p>
    if(localStorage.getItem('fav')){
      let localst=JSON.parse(localStorage.getItem('fav'));
      console.log(localst)
      fav=localst.map((xx,index)=>{
        return <Fav 
        key={index}
        lname={xx[1]}
        favback={this.favWeather.bind(this, xx[0], xx[1])}
      />
      })
    }
  return (
    <>
    <Movingshaps
      sWidth='500px'
      sSrc={skc}
      sSpeed='25s'
      sLeft='-150px'
      /* sLi='wi wi-day-sunny' */
    />
    <div className="main">
      <div className="header">
        <img className="logo" src={logohead}/>
        NearBy
      </div>
      <div className="left">
      </div>
      <div className="mid">
      <div className='homeTitle'>
        <h1>
        Find your NearBy
        </h1>
        <p>
        Weather, Coronavirus Status, and so on
        </p>
      </div>
      <div className='inputarea'>
          <p>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/></svg>
            <span>city</span>
            </p>
          <input type='text' placeholder='zip, location...' 
          ref={e=>this.inputwhat=e}
          onChange={this.inputMoniter}
          onFocus={this.defualtGeos}
          onBlur={this.defualtLose}/>
          
          {geoss}
      </div>
     
      <div className='weatherArea' style={{display:weatherare}}>
          
          <img className='nowWeatherImg' src={img} />
          <div className='nowWeather'>   
            {weather} 
          </div>
          <div className='nextArea'>
            {nextwea}
          </div>
      </div>
      
      {/* add favorite button */}
      <button onClick={this.addFav} className='favbtn'/* style={{margin:'20px 0'}} */>Add Fav Location</button>
      <div className='fav'>
      {fav}
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
