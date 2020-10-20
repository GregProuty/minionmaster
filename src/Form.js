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
    width: 5em;
`
const Label = styled.label`
    margin: 1em;
`
const Select = styled.select`
    width: 5em;
`
const Center = styled.div`
    width: 100%
`
const Form = ({ getResult }) => {
  const [bonus, setBonus] = useState(0)
  const [ac, setAc] = useState(0)
  const [minions, setMinions] = useState(0)
  const [dmgDie, setDmgDie] = useState('8')
  const [dmgBonus, setDmgBonus] = useState(0)

  return (
    <div className='Form'>
      <form onSubmit={e => {
        e.preventDefault()
        getResult(bonus, ac, minions, dmgDie, dmgBonus)
      }}
      >
        <Wrapper>
          <Label onChange={e => setBonus(e.target.value)}>
                        Attack Bonus: <input type='number' name='bonus' />
          </Label>
          <Center>
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
          </Center>

          <Label onChange={e => setDmgBonus(e.target.value)}>
                        Damage bonus: <input type='number' name='dmgBonus' />
          </Label>
          <Label onChange={e => setAc(e.target.value)}>
                        Target AC: <input type='number' name='ac' />
          </Label>
          <Label onChange={e => setMinions(e.target.value)}>
                        Number of Minions: <input type='number' name='minions' />
          </Label>
          <Center>

            <Button type='submit' value='Submit' />
          </Center>

        </Wrapper>
      </form>

    </div>
  )
}

export default Form
