import React from 'react'
import { Target, Award, Users, TrendingUp } from 'lucide-react'

const PerformanceMetrics = () => {
  const metrics = [
    {
      title: 'Goal Achievement',
      value: '85%',
      icon: Target,
      progress: 85,
      color: 'bg-green-500'
    },
    {
      title: 'Customer Satisfaction',
      value: '92%',
      icon: Award,
      progress: 92,
      color: 'bg-blue-500'
    },
    {
      title: 'Team Performance',
      value: '78%',
      icon: Users,
      progress: 78,
      color: 'bg-purple-500'
    },
    {
      title: 'Growth Rate',
      value: '67%',
      icon: TrendingUp,
      progress: 67,
      color: 'bg-orange-500'
    }
  ]

  return (
    <div className="card p-4 lg:p-6">
      <h3 className="text-white text-xl lg:text-2xl font-bold mb-6">Performance Metrics</h3>
      <div className="space-y-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${metric.color}`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white text-sm font-medium">{metric.title}</span>
                </div>
                <span className="text-white font-bold">{metric.value}</span>
              </div>
              <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${metric.color} transition-all duration-1000 ease-out`}
                  style={{ width: `${metric.progress}%` }}
                ></div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PerformanceMetrics