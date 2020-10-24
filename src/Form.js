import React, { useState } from 'react'
import './App.css'
import styled from 'styled-components'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
`
const Button = styled.input`
    width: 8em;
    height: 4em;
    // background-color: blue;
`
const Label = styled.label`
    margin: 1em;
`
const Select = styled.select`
    width: 5em;
`
const Dropdown = styled.select`
  width: 10em;
  height: 3em;
`
const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  width: 80%;
  margin-left: 2em;
`
const Center = styled.div`
  // display: flex;
  // flex-direction: row;
  width: 100%
  // justify-content: center;
`
const SelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 60%;
  margin-left: 20%;
`
const Text = styled.p`
  width: 10em;
`
const CheckBoxWrapper = styled.div`
  margin-bottom: 1em;
`
const Form = ({ getResult }) => {
  const [bonus, setBonus] = useState(0)
  const [ac, setAc] = useState(0)
  const [minions, setMinions] = useState(0)
  const [dmgDie, setDmgDie] = useState('8')
  const [dmgBonus, setDmgBonus] = useState(0)
  const [critRange, setCritRange] = useState('1')
  const [critMultiplier, setCritMultiplier] = useState('3')
  const [twentyAlwaysHits, setTwentyAlwaysHits] = useState(false)
  const [targetConcealment, setTargetConcealment] = useState('1')

  return (
    <div className='Form'>
      <form onSubmit={e => {
        e.preventDefault()
        getResult(bonus, ac, minions, dmgDie, dmgBonus, critRange, critMultiplier, twentyAlwaysHits, targetConcealment)
      }}
      >
        <Wrapper>
          <Label onChange={e => setBonus(e.target.value)}>
            Attack Bonus: <input type='number' name='bonus' />
          </Label>
          <Center>
            <SelectWrapper>
              <Text>Base Damage:</Text>
              <Select
                value={dmgDie}
                onChange={e => setDmgDie(e.target.value)}
              >
                <option value='4'>d4</option>
                <option value='6'>d6</option>
                <option value='8'>d8</option>
                <option value='10'>d10</option>
                <option value='12'>d12</option>
              </Select>
            </SelectWrapper>
          </Center>
          <Center>
            <SelectWrapper>
              <Text>Threat Range:</Text>
              <Select
                value={critRange}
                onChange={e => setCritRange(e.target.value)}
              >
                <option value='1'>20</option>
                <option value='2'>19-20</option>
                <option value='3'>18-20</option>
              </Select>
            </SelectWrapper>
          </Center>
          <Center>
            <SelectWrapper>
              <Text>Crit Multiplier:</Text>
              <Select
                value={critMultiplier}
                onChange={e => setCritMultiplier(e.target.value)}
              >
                <option value='2'>x2</option>
                <option value='3'>x3</option>
                <option value='4'>x4</option>
              </Select>
            </SelectWrapper>
          </Center>
          <Label onChange={e => setDmgBonus(e.target.value)}>
            Damage Bonus: <input type='number' name='dmgBonus' />
          </Label>
          <Label onChange={e => setAc(e.target.value)}>
            Target AC: <input type='number' name='ac' />
          </Label>
          <Center>
            <DropdownWrapper>
              <Text>Target concealment:</Text>
              <Dropdown
                value={targetConcealment}
                onChange={e => setTargetConcealment(e.target.value)}
              >
                <option value='1'>None</option>
                <option value='2'>Concealment</option>
                <option value='3'>Total Concealment</option>
              </Dropdown>
            </DropdownWrapper>
          </Center>
          <Label onChange={e => setMinions(e.target.value)}>
            Number of Minions: <input type='number' name='minions' />
          </Label>
          <CheckBoxWrapper>
            <label>20s Always Hit:</label>
            <input
              type='checkbox' value={twentyAlwaysHits} onChange={e =>
                setTwentyAlwaysHits(!twentyAlwaysHits)}
            />
          </CheckBoxWrapper>
          <Center>
            <Button type='submit' value='Roll' />
          </Center>

        </Wrapper>
      </form>

    </div>
  )
}

export default Form
