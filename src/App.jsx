import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import MainDashboard from './components/MainDashboard'
import ActivityPanel from './components/ActivityPanel'

function App() {
  const [activeSection, setActiveSection] = useState('dashboard')

  return (
    <div className="min-h-screen bg-gradient-dashboard p-4 md:p-6">
      <div className="flex flex-col lg:flex-row gap-4 md:gap-6 max-w-7xl mx-auto">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <MainDashboard />
        <ActivityPanel />
      </div>
    </div>
  )
}

export default App