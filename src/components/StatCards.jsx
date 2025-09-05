import React, { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Users, ShoppingCart, DollarSign } from 'lucide-react'

const StatCards = () => {
  const [animatedValues, setAnimatedValues] = useState({
    revenue: 0,
    sales: 0,
    customers: 0,
    conversion: 0
  })

  const finalValues = {
    revenue: 45896,
    sales: 1247,
    customers: 8456,
    conversion: 12.5
  }

  useEffect(() => {
    const animateValue = (start, end, duration, key) => {
      const startTime = Date.now()
      const animate = () => {
        const now = Date.now()
        const progress = Math.min((now - startTime) / duration, 1)
        const currentValue = start + (end - start) * progress
        
        setAnimatedValues(prev => ({
          ...prev,
          [key]: Math.floor(currentValue * 10) / 10
        }))
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }

    setTimeout(() => {
      animateValue(0, finalValues.revenue, 2000, 'revenue')
      animateValue(0, finalValues.sales, 1800, 'sales')
      animateValue(0, finalValues.customers, 2200, 'customers')
      animateValue(0, finalValues.conversion, 1600, 'conversion')
    }, 500)
  }, [])

  const stats = [
    {
      title: 'Total Revenue',
      value: `$${animatedValues.revenue.toLocaleString()}`,
      change: '+12.5%',
      isPositive: true,
      icon: DollarSign,
      color: 'from-green-400 to-green-600'
    },
    {
      title: 'Sales',
      value: animatedValues.sales.toLocaleString(),
      change: '+8.2%',
      isPositive: true,
      icon: ShoppingCart,
      color: 'from-blue-400 to-blue-600'
    },
    {
      title: 'Customers',
      value: animatedValues.customers.toLocaleString(),
      change: '+15.3%',
      isPositive: true,
      icon: Users,
      color: 'from-purple-400 to-purple-600'
    },
    {
      title: 'Conversion Rate',
      value: `${animatedValues.conversion}%`,
      change: '-2.1%',
      isPositive: false,
      icon: TrendingUp,
      color: 'from-orange-400 to-orange-600'
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div key={index} className="card p-4 lg:p-6 hover:bg-opacity-20 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center text-sm ${stat.isPositive ? 'text-green-300' : 'text-red-300'}`}>
                {stat.isPositive ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                {stat.change}
              </div>
            </div>
            <div>
              <h3 className="text-white text-opacity-70 text-sm mb-1">{stat.title}</h3>
              <p className="text-white text-2xl lg:text-3xl font-bold">{stat.value}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default StatCards