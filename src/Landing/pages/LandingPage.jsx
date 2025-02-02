


import { Navbar, Features, Hero, Stats, Footer, Cta, Sliders } from "../Components"
import { ScrollLinked } from "./ScrollLinked"


export const LandingPage = () => {
  return (
    <ScrollLinked>

      <div className="min-h-screen">
        <Navbar />
        <Hero />

        <Features />
        <Cta />

        <Sliders />

        <Footer />
      </div>
    </ScrollLinked>
  )
}
