import React from 'react'
import { Bell, CheckCircle, AlertCircle, Users, ShoppingCart } from 'lucide-react'

const ActivityPanel = () => {
  const activities = [
    {
      id: 1,
      type: 'sale',
      title: 'New Sale',
      description: 'Order #1247 completed',
      time: '2 min ago',
      icon: ShoppingCart,
      color: 'bg-green-500'
    },
    {
      id: 2,
      type: 'user',
      title: 'New Customer',
      description: 'John Doe registered',
      time: '5 min ago',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      id: 3,
      type: 'alert',
      title: 'Low Stock Alert',
      description: 'Product #456 running low',
      time: '10 min ago',
      icon: AlertCircle,
      color: 'bg-orange-500'
    },
    {
      id: 4,
      type: 'completed',
      title: 'Goal Achieved',
      description: 'Monthly target reached',
      time: '1 hour ago',
      icon: CheckCircle,
      color: 'bg-purple-500'
    },
    {
      id: 5,
      type: 'sale',
      title: 'Large Order',
      description: 'Order #1246 - $2,500',
      time: '2 hours ago',
      icon: ShoppingCart,
      color: 'bg-green-500'
    }
  ]

  const notifications = [
    {
      id: 1,
      title: 'System Update',
      description: 'New features available',
      time: '1 hour ago',
      unread: true
    },
    {
      id: 2,
      title: 'Weekly Report',
      description: 'Sales report ready',
      time: '3 hours ago',
      unread: true
    },
    {
      id: 3,
      title: 'Team Meeting',
      description: 'Reminder for 3 PM meeting',
      time: '5 hours ago',
      unread: false
    }
  ]

  return (
    <div className="w-full lg:w-80 space-y-4 lg:space-y-6">
      {/* Activity Feed */}
      <div className="card p-4 lg:p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white text-lg lg:text-xl font-bold">Recent Activity</h3>
          <button className="text-white text-opacity-70 hover:text-opacity-100 text-sm">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon
            return (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${activity.color} flex-shrink-0`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white text-sm font-medium">{activity.title}</h4>
                  <p className="text-white text-opacity-70 text-xs">{activity.description}</p>
                  <span className="text-white text-opacity-50 text-xs">{activity.time}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Notifications */}
      <div className="card p-4 lg:p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white text-lg lg:text-xl font-bold">Notifications</h3>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-white" />
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">2</span>
          </div>
        </div>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div key={notification.id} className={`p-3 rounded-lg transition-all cursor-pointer ${
              notification.unread ? 'bg-white bg-opacity-10' : 'bg-white bg-opacity-5'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className={`text-sm font-medium ${
                    notification.unread ? 'text-white' : 'text-white text-opacity-70'
                  }`}>
                    {notification.title}
                  </h4>
                  <p className="text-white text-opacity-60 text-xs mt-1">
                    {notification.description}
                  </p>
                  <span className="text-white text-opacity-40 text-xs">
                    {notification.time}
                  </span>
                </div>
                {notification.unread && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ActivityPanel