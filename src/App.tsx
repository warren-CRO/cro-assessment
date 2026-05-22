import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Quiz from './pages/Quiz'
import Results from './pages/Results'
import PELanding from './pages/PELanding'
import PEAssessment from './pages/PEAssessment'
import PEResults from './pages/PEResults'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/results/:encoded" element={<Results />} />
      <Route path="/pe" element={<PELanding />} />
      <Route path="/pe/assess" element={<PEAssessment />} />
      <Route path="/pe/results/:encoded" element={<PEResults />} />
    </Routes>
  )
}
