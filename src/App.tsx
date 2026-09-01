import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Quiz from './pages/Quiz'
import Results from './pages/Results'
import PELanding from './pages/PELanding'
import PEAssessment from './pages/PEAssessment'
import PEResults from './pages/PEResults'
import ReadinessLanding from './pages/ReadinessLanding'
import ReadinessAssess from './pages/ReadinessAssess'
import ReadinessResults from './pages/ReadinessResults'
import ReadinessWhitepaper from './pages/ReadinessWhitepaper'
import Offerings from './pages/Offerings'
import ReadinessJD from './pages/ReadinessJD'

function isReadinessHost() {
  return window.location.hostname.startsWith('cro-readiness')
}

function ReadinessRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ReadinessLanding />} />
      <Route path="/assess" element={<ReadinessAssess />} />
      <Route path="/results/:encoded" element={<ReadinessResults />} />
      <Route path="/whitepaper" element={<ReadinessWhitepaper />} />
      <Route path="/jd/:encoded" element={<ReadinessJD />} />
      <Route path="/offerings" element={<Offerings />} />
      <Route path="/readiness" element={<ReadinessLanding />} />
      <Route path="/readiness/assess" element={<ReadinessAssess />} />
      <Route path="/readiness/results/:encoded" element={<ReadinessResults />} />
      <Route path="/readiness/whitepaper" element={<ReadinessWhitepaper />} />
      <Route path="/readiness/jd/:encoded" element={<ReadinessJD />} />
      <Route path="/readiness/offerings" element={<Offerings />} />
    </Routes>
  )
}

export default function App() {
  if (isReadinessHost()) return <ReadinessRoutes />

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/diagnostic" element={<Landing />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/results/:encoded" element={<Results />} />
      <Route path="/pe" element={<PELanding />} />
      <Route path="/pe/assess" element={<PEAssessment />} />
      <Route path="/pe/results/:encoded" element={<PEResults />} />
      <Route path="/readiness" element={<ReadinessLanding />} />
      <Route path="/readiness/assess" element={<ReadinessAssess />} />
      <Route path="/readiness/results/:encoded" element={<ReadinessResults />} />
      <Route path="/readiness/whitepaper" element={<ReadinessWhitepaper />} />
      <Route path="/readiness/jd/:encoded" element={<ReadinessJD />} />
      <Route path="/readiness/offerings" element={<Offerings />} />
    </Routes>
  )
}
