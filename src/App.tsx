import { useCallback, useState } from 'react'
import { About } from './components/About'
import { Cursor } from './components/Cursor'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Intro } from './components/Intro'
import { Nav } from './components/Nav'
import { Products } from './components/Products'

function App() {
  const [introDone, setIntroDone] = useState(false)

  const handleIntroComplete = useCallback(() => {
    setIntroDone(true)
  }, [])

  return (
    <>
      <Cursor />
      <a className="skip" href="#top">跳到正文</a>
      {/* Unmount once finished: the faded overlay would otherwise still sit
          above the page at z-index 9999 and swallow every click. */}
      {!introDone && <Intro onComplete={handleIntroComplete} />}
      <Nav visible={introDone} />

      <main id="top" tabIndex={-1}>
        <Hero assembled={introDone} />
        <Products />
        <About />
      </main>

      <Footer />
    </>
  )
}

export default App
