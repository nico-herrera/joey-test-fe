import React, {useState} from 'react'
import axios from 'axios'

function App() {
  const [input, setInput] = useState({
    name: "",
    value: 0,
  })
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(false)
  
  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      console.log(input)
      let res = await axios.post("http://localhost:5000/api/test", {
        name: input.name,
        value: Number(input.value)
      })
      setIsLoading(false)
      setData(res.data)
    } catch (err) {
      console.log(err)
  }
  }
  const changeHandler = (e) => {
    setInput({...input, [e.target.name]: e.target.value})
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" placeholder="Name" value={input.name} onChange={changeHandler} />
        <label htmlFor="value">Value</label>
        <input id="value" name="value" type="number" placeholder="value" value={input.value} onChange={changeHandler} />
        <button>Submit</button>
      </form>

      <div>Name total = {data}</div>
    </div>
  );
}

export default App;
