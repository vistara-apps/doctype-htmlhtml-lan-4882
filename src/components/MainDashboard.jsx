import React from 'react'
import StatCards from './StatCards'
import SalesChart from './SalesChart'
import PerformanceMetrics from './PerformanceMetrics'

const MainDashboard = () => {
  return (
    <div className="flex-1 space-y-4 lg:space-y-6">
      <div className="card p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Sales Dashboard</h1>
            <p className="text-white text-opacity-70">Welcome back! Here's what's happening with your sales today.</p>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <button className="px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-all">
              Export
            </button>
            <button className="px-4 py-2 bg-white text-purple-700 rounded-lg hover:bg-opacity-90 transition-all">
              View Report
            </button>
          </div>
        </div>
        
        <StatCards />
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
        <div className="xl:col-span-2">
          <SalesChart />
        </div>
        <div className="xl:col-span-1">
          <PerformanceMetrics />
        </div>
      </div>
    </div>
  )
}

export default MainDashboard