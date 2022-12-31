import { useState, useEffect } from 'react'
import './App.css'

interface Input {
  content: string,
  type: number,
  date: string
}

interface types {
  [key: number]: string
}

const types: types = {
  0: 'Complaint',
  1: 'Suggestion',
  2: 'Blurt out',
  3: 'Incident'
}

function App() {

  const [inputs, setInputs] = useState<Input[]>([])

  const onSubmit = (event: any) => {
    event.preventDefault()
    const newInputList: Array<Input> = [{
      content: event.target[0].value,
      type: event.target[1].value,
      date: new Date().toLocaleString('en-GB')
    }, ...inputs]
    localStorage.setItem('inputs', JSON.stringify(newInputList))
    setInputs(newInputList)
    event.target.reset()
  }

  useEffect(() => {
    const inputs = localStorage.getItem('inputs')
    if (inputs) {
      setInputs(JSON.parse(inputs))
    }
  }, [])

  return (
    <div className="App">
      <header>
        <h1>Blurt Out</h1>
      </header>
      <main>
        <section className='form'>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <textarea name="content" id="content" rows={5} minLength={150} required></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="type">Type</label>
              <select name="type" id="type" required>
                <option value=""></option>
                {[0, 1, 2, 3].map(type => <option value={type}>{types[type]}</option>)}
              </select>
            </div>
            <button type="submit">Submit</button>
          </form>
        </section>
        <section className='inputs'>
          <h2></h2>
          {inputs.map((input, index) => (
            <div key={index} className="input">
              <b>{input.date}</b>
              <span className="tag">{types[input.type]}</span>
              <p>{input.content}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}

export default App
