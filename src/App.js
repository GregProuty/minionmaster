import React, { useState } from 'react'
import './App.css'
import Form from './Form'
import styled from 'styled-components'
import logo from './logo.png'

const Body = styled.div`
  display: flex;
  margin-top: 2em;
  justify-content: center;
`
const Img = styled.img`
  width: 6em;
`
const critRangeMap = {
  1: [20],
  2: [19, 20],
  3: [18, 19, 20]
}

const roll = (bonus, ac, times, dmgDie, dmgBonus, critRange, critMultiplier) => {
  let totalDmg = 0
  let hits = 0
  const dmgRolls = []
  for (let i = 0; i < times; i++) {
    const roll = Math.ceil(Math.random() * 20)
    const d20 = roll + Number(bonus)

    // If Crit:
    if (roll === 20 && critRangeMap[Number(critRange)].includes(Math.ceil(Math.random() * 20))) {
      const dmgRoll = Math.ceil(Math.random() * Number(dmgDie)) + Number(dmgBonus)
      dmgRolls.push('crit' + (dmgRoll * Number(critMultiplier)))
      totalDmg += dmgRoll * 2
      hits++
    } else if (d20 >= ac) {
      const dmgRoll = Math.ceil(Math.random() * Number(dmgDie)) + Number(dmgBonus)
      dmgRolls.push(dmgRoll)
      totalDmg += dmgRoll
      hits++
      console.log(dmgRoll)
    }
  }
  return [`Total Damage: ${totalDmg}`, `Hits: ${hits}`, `DamageRolls: ${dmgRolls.join(' ')}`]
}
const App = () => {
  const [result, setResult] = useState('')

  const getResult = (bonus, ac, times, dmgDie, dmgBonus, critRange, critMultiplier) => {
    setResult(roll(bonus, ac, times, dmgDie, dmgBonus, critRange, critMultiplier))
  }
  return (
    <div className='App'>
      <h1>Minion Master</h1>
      <Img src={logo} />
      <Body>
        <Form getResult={getResult} />
      </Body>
      {result &&
        <div>
          <h3>{result[0]}</h3>
          <h3>{result[1]}</h3>
          <h3>{result[2]}</h3>
        </div>}
    </div>
  )
}

export default App
