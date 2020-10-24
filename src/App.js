import React, { useState } from 'react'
import './App.css'
import Form from './Form'
import styled from 'styled-components'
import logo from './logo.png'

const Body = styled.div`
  display: flex;
  margin-top: 0.5em;
  justify-content: center;
`
const Img = styled.img`
  width: 6em;
`
const Flex = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
`
const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
`
const CenterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
const Text = styled.h3`
  margin-right: 0.5em;
`
const DmgRoll = styled.p`
  margin-right: 0.25em;
`
const Crit = styled.p`
  margin-right: 0.25em;
  color: red;
  font-weight: bold;
  font-size: 110%;
`
const BoxWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`
const Box = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
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
    const dmgRoll = Math.ceil(Math.random() * Number(dmgDie)) + Number(dmgBonus)

    // If Crit:
    if (critRangeMap[Number(critRange)].includes(roll) && critRangeMap[Number(critRange)].includes(Math.ceil(Math.random() * 20))) {
      dmgRolls.push('crit' + (dmgRoll * Number(critMultiplier)))
      totalDmg += (dmgRoll * Number(critMultiplier))
      hits++
    } else if (d20 >= ac || roll === 20) {
      dmgRolls.push(String(dmgRoll))
      totalDmg += Number(dmgRoll)
      hits++
    }
  }
  return [totalDmg, hits, dmgRolls]
}
const App = () => {
  const [totalDmg, setTotalDmg] = useState('')
  const [hits, setHits] = useState('')
  const [dmgRolls, setDmgRolls] = useState([])

  const getResult = (bonus, ac, times, dmgDie, dmgBonus, critRange, critMultiplier) => {
    const result = roll(bonus, ac, times, dmgDie, dmgBonus, critRange, critMultiplier)

    setTotalDmg(result[0])
    setHits(result[1])
    setDmgRolls(result[2])
  }
  return (
    <div className='App'>
      <h1>Minion Master</h1>
      <Img src={logo} />
      <Body>
        <Form getResult={getResult} />
      </Body>
      <CenterWrapper>
        {totalDmg &&
          <Center>
            <Flex>
              <Text>Total Damage:</Text>
              <p>{totalDmg}</p>
            </Flex>
            <Flex>
              <Text>Hits:</Text>
              <p>{hits}</p>
            </Flex>
            <Text>Damage Rolls:</Text>
            <BoxWrapper>
              <Box>
                {dmgRolls.map((roll, key) => {
                  if (roll.includes('crit')) {
                    roll = roll.split('crit')[1]
                    return <Crit>{roll}</Crit>
                  }
                  return <DmgRoll key={key}>{roll}</DmgRoll>
                })}
              </Box>
            </BoxWrapper>
          </Center>}
      </CenterWrapper>
    </div>
  )
}

export default App
