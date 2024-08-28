import './App.css';

import {
  useState, useRef
} from 'react'
import Shop from './Shop.js';


export default function App() {
  let render = useRef(false)
  let boost = useRef(false)
  let [n, newN] = useState(Number(localStorage.getItem('n')) + 1) //Bananas per click 
  let [state, newState] = useState(localStorage.getItem('bananas') ? Number(localStorage.getItem('bananas')) + n : 0)
  let [costUpgradeN, newCost] = useState(localStorage.getItem('costN') ? Number(localStorage.getItem('costN')) * 2 : 100)
  let [costUpgradePassive, newCostUpgradePassive] = useState(localStorage.getItem('costPassive') ? Number(localStorage.getItem('costPassive'))*2 : 500)
  let [passive, newPassive] = useState(localStorage.getItem('passive') ? Number(localStorage.getItem('passive'))+1 : 0)
  let width = 20
  let never = 3

  let bananOnclick = () => {
    if (boost.current) {
      newState(state + n*2)
    }
    else {
      newState(state + n)
    }
    localStorage.setItem('bananas', state)
    let rand = Math.random()
    let banana = document.getElementById('bananaImg')
    let clickBananaInterval = setInterval(() => {
      if (width > 20.3 | never < 3) {
        if (never === 0) {
          clearInterval(clickBananaInterval)
          return
        }
        width -= 0.02
        never -= 1
      } else {
        width += 0.02
      }

      banana.style.top = width - 8 + 'vw'
      banana.style.height = width - 10.55 + 'vw'
      banana.style.width = width + 'vw'
      banana.style.left = width + 20 + 'vw'

    }, 10)
    let PlusMinus = function (pmrand) {
      if (pmrand > 0.5) {
        return ''
      } else {
        return '-'
      }
    }
    let rotateDegs = PlusMinus(Math.random()) + rand * 30
    banana.style.transform = 'rotate(' + rotateDegs + 'deg)'
    let rotateBack = setInterval(() => {
      if (rotateDegs >= 0) {
        rotateDegs--
      }
      if (rotateDegs < 0) {
        rotateDegs++
      }
      banana.style.transform = 'rotate(' + rotateDegs + 'deg)'
      if (Math.ceil(rotateDegs) === 0 | Math.floor(rotateDegs) === 0) {
        banana.style.transform = 'rotate(0deg)'
        clearInterval(rotateBack)

      }
    }, 10)

  }

  let upgradeN = () => {
    if (state >= costUpgradeN) {
      newN(n + 1)
      let q = state - costUpgradeN

      newState(q)
      q = costUpgradeN * 2
      newCost(q)
      localStorage.setItem('bananas', state)
      localStorage.setItem('n', n)
      localStorage.setItem('costN', costUpgradeN)
    }
  }

  let upgradePassive = () => {
    if (state >= costUpgradePassive) {
      newPassive(passive + 1)
      let q = state - costUpgradePassive
      
      newState(q)
      q = costUpgradePassive * 2
      newCostUpgradePassive(q)
      localStorage.setItem('bananas', state)
      localStorage.setItem('passive', passive)
      localStorage.setItem('costPassive', costUpgradePassive)
    }
  }
  if (!render.current & passive > 0) {
    render.current = 1;
    let passiveInt = setInterval(() => {
      newState((arg) => {
        localStorage.setItem('bananas', state)
        return arg+n*passive
      })
      
    }, 10000)
  }
  let boostOn = () => {
    boost.current = true
    setTimeout(() => {
      boost.current = false
    }, 600000)
  }
  return ( 
    <>
    <img alt='' onClick = {bananOnclick} src = "./banana.png" id = 'bananaImg' className = "bananaImg" />
    <Shop />
    <b className = 'counter' > 
      <img alt='' src = './121-1024.webp' /> 
      Bananas: {state}
    </b >
    <div className = 'shopTab' id = 'shopTab' >

      <div id = 'udgradeN' className = 'upgrade' >
        <h3> MORE BANANAS!!! </h3> 
        <div>
          <button onClick = {upgradeN}> 
            {costUpgradeN} 
          </button> 
          <p> +1 banana per click </p> 
        </div> 
      </div>

      <div id = 'udgradePassive' className = 'upgrade' >
        <h3> Do u want a monkey ? </h3> 
        <div>
          <button onClick = {upgradePassive}> 
            {costUpgradePassive} 
          </button> 
          <p> autoclick every 10 s. </p> 
        </div> 
      </div>

      <div id = 'buyBoost' className = 'upgrade' >
        <h3>Are you have four hands?!?</h3> 
        <div>
          <button onClick = {boostOn}> 
            {Math.ceil(state*0.1)} 
          </button> 
          <p> x2 boost for 5 minutes </p> 
        </div> 
      </div>
    </div> 

    </>

  );
}