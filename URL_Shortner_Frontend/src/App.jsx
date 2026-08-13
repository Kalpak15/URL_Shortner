import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import UrlShortener from './components/UrlShortener'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 class="text-3xl font-bold">
        Hello world!
      </h1>
      <UrlShortener />
    </>
  )
}

export default App
