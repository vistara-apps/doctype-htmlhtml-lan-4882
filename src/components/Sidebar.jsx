import React from 'react'
import { 
  BarChart3, 
  Users, 
  ShoppingCart, 
  TrendingUp, 
  Settings, 
  Bell,
  Home,
  PieChart
} from 'lucide-react'

const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'sales', icon: TrendingUp, label: 'Sales' },
    { id: 'customers', icon: Users, label: 'Customers' },
    { id: 'products', icon: ShoppingCart, label: 'Products' },
    { id: 'reports', icon: PieChart, label: 'Reports' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ]

  return (
    <div className="w-full lg:w-20 flex lg:flex-col gap-2">
      <div className="card p-4 lg:p-6">
        <div className="flex lg:flex-col gap-3">
          <div className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-white bg-opacity-20 rounded-xl mb-0 lg:mb-6">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.id}
                  className={`sidebar-item ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => setActiveSection(item.id)}
                  title={item.label}
                >
                  <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar