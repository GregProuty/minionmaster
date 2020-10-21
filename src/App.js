import React, { useState } from 'react'
import './App.css'
import Form from './Form'
import styled from 'styled-components'

const Body = styled.div`
  display: flex;
  margin-top: 2em;
  justify-content: center;
`
const roll = (bonus, ac, times, dmgDie, dmgBonus) => {
  let totalDmg = 0
  let hits = 0
  const dmgRolls = []
  for (let i = 0; i < times; i++) {
    const roll = Math.ceil(Math.random() * 20)
    const d20 = roll + Number(bonus)
    if (roll === 20 && Math.ceil(Math.random() * 20) === 20) {
      const dmgRoll = Math.ceil(Math.random() * Number(dmgDie)) + Number(dmgBonus)
      dmgRolls.push('crit' + (dmgRoll * 2))
      totalDmg += dmgRoll * 2
      hits++
      console.log(dmgRoll)
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

  const getResult = (bonus, ac, times, dmgDie, dmgBonus) => {
    setResult(roll(bonus, ac, times, dmgDie, dmgBonus))
  }
  return (
    <div className='App'>
      <h1>Minion Master</h1>
      <Body>
        <Form getResult={getResult} />
      </Body>
      {result
        ? <div>
          <h3>{result[0]}</h3>
          <h3>{result[1]}</h3>
          <h3>{result[2]}</h3>
          </div>
        : null}
    </div>
  )
}

export default App
