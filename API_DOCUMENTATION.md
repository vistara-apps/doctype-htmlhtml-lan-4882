# API Documentation
## EduConnect Sales Dashboard

**Project ID**: fad7faaf-6416-4139-819a-cdb3db8ff8de  
**Version**: 1.0  
**Last Updated**: September 2025

---

## 1. Overview

This document outlines the expected API endpoints and data structures for the EduConnect Sales Dashboard. The current implementation uses mock data, but this specification defines the contract for future backend integration.

### 1.1 Base URL
- **Development**: `http://localhost:3001/api`
- **Production**: `https://api.educonnect.com/api`

### 1.2 Authentication
All API requests require authentication via JWT tokens:
```
Authorization: Bearer <jwt_token>
```

### 1.3 Response Format
All responses follow a consistent JSON structure:
```json
{
  "success": true,
  "data": {},
  "message": "Success",
  "timestamp": "2025-09-05T20:17:08Z"
}
```

---

## 2. Dashboard Overview

### 2.1 Get Dashboard Overview
**Endpoint**: `GET /dashboard/overview`  
**Description**: Retrieves main dashboard data including KPIs and summary metrics

#### Request
```http
GET /api/dashboard/overview
Authorization: Bearer <jwt_token>
```

#### Response
```json
{
  "success": true,
  "data": {
    "metrics": {
      "totalRevenue": {
        "value": 45896,
        "change": 12.5,
        "changeType": "increase",
        "period": "monthly"
      },
      "totalSales": {
        "value": 1247,
        "change": 8.2,
        "changeType": "increase",
        "period": "monthly"
      },
      "totalCustomers": {
        "value": 8456,
        "change": 15.3,
        "changeType": "increase",
        "period": "monthly"
      },
      "conversionRate": {
        "value": 12.5,
        "change": -2.1,
        "changeType": "decrease",
        "period": "monthly"
      }
    },
    "lastUpdated": "2025-09-05T20:17:08Z"
  }
}
```

#### Error Response
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired token"
  },
  "timestamp": "2025-09-05T20:17:08Z"
}
```

---

## 3. Sales Data

### 3.1 Get Sales Metrics
**Endpoint**: `GET /sales/metrics`  
**Description**: Retrieves detailed sales performance data

#### Request Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| period | string | No | Time period: 'daily', 'weekly', 'monthly' (default: 'monthly') |
| startDate | string | No | Start date in ISO format |
| endDate | string | No | End date in ISO format |

#### Request
```http
GET /api/sales/metrics?period=monthly&startDate=2025-01-01&endDate=2025-12-31
Authorization: Bearer <jwt_token>
```

#### Response
```json
{
  "success": true,
  "data": {
    "chartData": {
      "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      "datasets": [{
        "label": "Sales",
        "data": [12000, 19000, 15000, 25000, 22000, 30000, 28000, 35000, 32000, 42000, 38000, 45000],
        "period": "monthly"
      }]
    },
    "summary": {
      "totalSales": 363000,
      "averageMonthlySales": 30250,
      "highestMonth": {
        "month": "Dec",
        "value": 45000
      },
      "lowestMonth": {
        "month": "Jan",
        "value": 12000
      }
    }
  }
}
```

### 3.2 Get Sales Trends
**Endpoint**: `GET /sales/trends`  
**Description**: Retrieves sales trend analysis and forecasting data

#### Request
```http
GET /api/sales/trends
Authorization: Bearer <jwt_token>
```

#### Response
```json
{
  "success": true,
  "data": {
    "trends": {
      "growth": {
        "rate": 12.5,
        "direction": "upward",
        "confidence": 0.85
      },
      "seasonality": {
        "pattern": "Q4_peak",
        "strength": 0.72
      },
      "forecast": {
        "nextMonth": 47500,
        "nextQuarter": 135000,
        "confidence": 0.78
      }
    }
  }
}
```

---

## 4. Performance Metrics

### 4.1 Get Performance Metrics
**Endpoint**: `GET /performance/metrics`  
**Description**: Retrieves performance indicators and goal tracking

#### Request
```http
GET /api/performance/metrics
Authorization: Bearer <jwt_token>
```

#### Response
```json
{
  "success": true,
  "data": {
    "metrics": [
      {
        "id": "goal_achievement",
        "title": "Goal Achievement",
        "value": 85,
        "target": 100,
        "progress": 85,
        "color": "green",
        "icon": "target",
        "trend": {
          "direction": "up",
          "change": 5.2
        }
      },
      {
        "id": "customer_satisfaction",
        "title": "Customer Satisfaction",
        "value": 92,
        "target": 95,
        "progress": 92,
        "color": "blue",
        "icon": "award",
        "trend": {
          "direction": "up",
          "change": 2.1
        }
      },
      {
        "id": "team_performance",
        "title": "Team Performance",
        "value": 78,
        "target": 85,
        "progress": 78,
        "color": "purple",
        "icon": "users",
        "trend": {
          "direction": "down",
          "change": -1.5
        }
      },
      {
        "id": "growth_rate",
        "title": "Growth Rate",
        "value": 67,
        "target": 75,
        "progress": 67,
        "color": "orange",
        "icon": "trending-up",
        "trend": {
          "direction": "up",
          "change": 8.3
        }
      }
    ]
  }
}
```

### 4.2 Update Performance Target
**Endpoint**: `PUT /performance/metrics/{metricId}/target`  
**Description**: Updates target value for a specific performance metric

#### Request
```http
PUT /api/performance/metrics/goal_achievement/target
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "target": 90,
  "reason": "Adjusted based on Q3 performance"
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "metricId": "goal_achievement",
    "oldTarget": 100,
    "newTarget": 90,
    "updatedAt": "2025-09-05T20:17:08Z"
  }
}
```

---

## 5. Activity Feed

### 5.1 Get Recent Activities
**Endpoint**: `GET /activities/recent`  
**Description**: Retrieves recent system activities and events

#### Request Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| limit | integer | No | Number of activities to return (default: 20, max: 100) |
| type | string | No | Filter by activity type: 'sale', 'customer', 'alert', 'system' |
| since | string | No | Return activities since this timestamp (ISO format) |

#### Request
```http
GET /api/activities/recent?limit=10&type=sale
Authorization: Bearer <jwt_token>
```

#### Response
```json
{
  "success": true,
  "data": {
    "activities": [
      {
        "id": "act_001",
        "type": "sale",
        "title": "New Sale",
        "description": "Order #1247 completed",
        "timestamp": "2025-09-05T20:15:08Z",
        "icon": "shopping-cart",
        "color": "green",
        "metadata": {
          "orderId": "1247",
          "amount": 2500,
          "customerId": "cust_456",
          "customerName": "John Doe"
        }
      },
      {
        "id": "act_002",
        "type": "customer",
        "title": "New Customer",
        "description": "John Doe registered",
        "timestamp": "2025-09-05T20:12:08Z",
        "icon": "users",
        "color": "blue",
        "metadata": {
          "customerId": "cust_456",
          "customerName": "John Doe",
          "email": "john.doe@example.com"
        }
      }
    ],
    "pagination": {
      "total": 150,
      "page": 1,
      "limit": 10,
      "hasMore": true
    }
  }
}
```

### 5.2 Mark Activities as Read
**Endpoint**: `POST /activities/mark-read`  
**Description**: Marks specified activities as read

#### Request
```http
POST /api/activities/mark-read
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "activityIds": ["act_001", "act_002", "act_003"]
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "markedCount": 3,
    "activityIds": ["act_001", "act_002", "act_003"]
  }
}
```

---

## 6. Notifications

### 6.1 Get Notifications
**Endpoint**: `GET /notifications`  
**Description**: Retrieves user notifications

#### Request Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| unreadOnly | boolean | No | Return only unread notifications (default: false) |
| limit | integer | No | Number of notifications to return (default: 20) |

#### Request
```http
GET /api/notifications?unreadOnly=true&limit=5
Authorization: Bearer <jwt_token>
```

#### Response
```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "id": "notif_001",
        "title": "System Update",
        "description": "New features available in the dashboard",
        "type": "system",
        "priority": "medium",
        "unread": true,
        "timestamp": "2025-09-05T19:17:08Z",
        "actionUrl": "/updates",
        "metadata": {
          "version": "1.2.0",
          "features": ["Dark mode", "Export functionality"]
        }
      },
      {
        "id": "notif_002",
        "title": "Weekly Report",
        "description": "Your weekly sales report is ready",
        "type": "report",
        "priority": "low",
        "unread": true,
        "timestamp": "2025-09-05T17:17:08Z",
        "actionUrl": "/reports/weekly",
        "metadata": {
          "reportId": "rpt_week_36",
          "period": "2025-W36"
        }
      }
    ],
    "unreadCount": 2,
    "totalCount": 15
  }
}
```

### 6.2 Mark Notifications as Read
**Endpoint**: `POST /notifications/mark-read`  
**Description**: Marks notifications as read

#### Request
```http
POST /api/notifications/mark-read
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "notificationIds": ["notif_001", "notif_002"]
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "markedCount": 2,
    "remainingUnread": 0
  }
}
```

### 6.3 Create Notification
**Endpoint**: `POST /notifications`  
**Description**: Creates a new notification (admin only)

#### Request
```http
POST /api/notifications
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Maintenance Notice",
  "description": "Scheduled maintenance on Sunday 2AM-4AM EST",
  "type": "maintenance",
  "priority": "high",
  "targetUsers": ["all"],
  "actionUrl": "/maintenance",
  "scheduledFor": "2025-09-06T06:00:00Z"
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "notificationId": "notif_003",
    "status": "scheduled",
    "targetCount": 1250
  }
}
```

---

## 7. Customer Data

### 7.1 Get Customer Statistics
**Endpoint**: `GET /customers/stats`  
**Description**: Retrieves customer-related statistics

#### Request
```http
GET /api/customers/stats
Authorization: Bearer <jwt_token>
```

#### Response
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalCustomers": 8456,
      "newCustomers": {
        "thisMonth": 234,
        "lastMonth": 198,
        "change": 18.2
      },
      "activeCustomers": {
        "thisMonth": 6789,
        "percentage": 80.3
      },
      "churnRate": {
        "thisMonth": 2.1,
        "lastMonth": 2.8,
        "change": -0.7
      }
    },
    "segments": [
      {
        "name": "Enterprise",
        "count": 156,
        "percentage": 1.8,
        "revenue": 1250000
      },
      {
        "name": "SMB",
        "count": 2340,
        "percentage": 27.7,
        "revenue": 890000
      },
      {
        "name": "Individual",
        "count": 5960,
        "percentage": 70.5,
        "revenue": 450000
      }
    ]
  }
}
```

### 7.2 Get Recent Customers
**Endpoint**: `GET /customers/recent`  
**Description**: Retrieves recently registered customers

#### Request
```http
GET /api/customers/recent?limit=10
Authorization: Bearer <jwt_token>
```

#### Response
```json
{
  "success": true,
  "data": {
    "customers": [
      {
        "id": "cust_456",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "company": "Acme Corp",
        "segment": "SMB",
        "registeredAt": "2025-09-05T20:12:08Z",
        "firstPurchase": null,
        "totalSpent": 0
      }
    ]
  }
}
```

---

## 8. Reports

### 8.1 Generate Report
**Endpoint**: `POST /reports/generate`  
**Description**: Generates a custom report

#### Request
```http
POST /api/reports/generate
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "type": "sales_summary",
  "period": {
    "start": "2025-01-01",
    "end": "2025-12-31"
  },
  "format": "pdf",
  "includeCharts": true,
  "email": "user@example.com"
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "reportId": "rpt_001",
    "status": "generating",
    "estimatedCompletion": "2025-09-05T20:20:08Z",
    "downloadUrl": null
  }
}
```

### 8.2 Get Report Status
**Endpoint**: `GET /reports/{reportId}/status`  
**Description**: Checks the status of a generated report

#### Request
```http
GET /api/reports/rpt_001/status
Authorization: Bearer <jwt_token>
```

#### Response
```json
{
  "success": true,
  "data": {
    "reportId": "rpt_001",
    "status": "completed",
    "downloadUrl": "https://api.educonnect.com/reports/rpt_001/download",
    "expiresAt": "2025-09-12T20:17:08Z",
    "fileSize": 2048576
  }
}
```

---

## 9. User Management

### 9.1 Get User Profile
**Endpoint**: `GET /user/profile`  
**Description**: Retrieves current user profile information

#### Request
```http
GET /api/user/profile
Authorization: Bearer <jwt_token>
```

#### Response
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "name": "Sarah Johnson",
      "email": "sarah.johnson@educonnect.com",
      "role": "sales_manager",
      "permissions": ["dashboard_view", "reports_generate", "team_manage"],
      "preferences": {
        "theme": "light",
        "notifications": {
          "email": true,
          "push": false,
          "frequency": "daily"
        },
        "dashboard": {
          "defaultView": "overview",
          "refreshInterval": 30
        }
      },
      "lastLogin": "2025-09-05T20:17:08Z"
    }
  }
}
```

### 9.2 Update User Preferences
**Endpoint**: `PUT /user/preferences`  
**Description**: Updates user preferences

#### Request
```http
PUT /api/user/preferences
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "theme": "dark",
  "notifications": {
    "email": true,
    "push": true,
    "frequency": "realtime"
  },
  "dashboard": {
    "defaultView": "analytics",
    "refreshInterval": 15
  }
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "updated": true,
    "preferences": {
      "theme": "dark",
      "notifications": {
        "email": true,
        "push": true,
        "frequency": "realtime"
      },
      "dashboard": {
        "defaultView": "analytics",
        "refreshInterval": 15
      }
    }
  }
}
```

---

## 10. Error Codes

### 10.1 HTTP Status Codes
| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 422 | Validation Error |
| 429 | Rate Limit Exceeded |
| 500 | Internal Server Error |

### 10.2 Application Error Codes
| Code | Description |
|------|-------------|
| AUTH_001 | Invalid credentials |
| AUTH_002 | Token expired |
| AUTH_003 | Insufficient permissions |
| DATA_001 | Invalid date range |
| DATA_002 | Data not found |
| RATE_001 | API rate limit exceeded |
| VALID_001 | Required field missing |
| VALID_002 | Invalid field format |

### 10.3 Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "AUTH_002",
    "message": "Token has expired",
    "details": {
      "expiredAt": "2025-09-05T19:17:08Z",
      "field": "authorization"
    }
  },
  "timestamp": "2025-09-05T20:17:08Z"
}
```

---

## 11. Rate Limiting

### 11.1 Rate Limits
| Endpoint Category | Requests per Minute | Requests per Hour |
|-------------------|---------------------|-------------------|
| Dashboard | 60 | 1000 |
| Sales Data | 30 | 500 |
| Reports | 10 | 100 |
| User Management | 20 | 200 |

### 11.2 Rate Limit Headers
```http
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1693939028
```

---

## 12. Webhooks

### 12.1 Webhook Events
| Event | Description |
|-------|-------------|
| `sale.created` | New sale recorded |
| `customer.registered` | New customer registration |
| `goal.achieved` | Performance goal reached |
| `alert.triggered` | System alert triggered |

### 12.2 Webhook Payload
```json
{
  "event": "sale.created",
  "timestamp": "2025-09-05T20:17:08Z",
  "data": {
    "saleId": "sale_789",
    "amount": 2500,
    "customerId": "cust_456",
    "orderId": "order_1247"
  },
  "signature": "sha256=abc123..."
}
```

---

## 13. SDK Examples

### 13.1 JavaScript SDK
```javascript
import { EduConnectAPI } from '@educonnect/api-sdk'

const api = new EduConnectAPI({
  baseURL: 'https://api.educonnect.com/api',
  token: 'your-jwt-token'
})

// Get dashboard overview
const overview = await api.dashboard.getOverview()

// Get sales metrics
const salesData = await api.sales.getMetrics({
  period: 'monthly',
  startDate: '2025-01-01',
  endDate: '2025-12-31'
})

// Get recent activities
const activities = await api.activities.getRecent({
  limit: 10,
  type: 'sale'
})
```

### 13.2 Python SDK
```python
from educonnect_api import EduConnectAPI

api = EduConnectAPI(
    base_url='https://api.educonnect.com/api',
    token='your-jwt-token'
)

# Get dashboard overview
overview = api.dashboard.get_overview()

# Get performance metrics
metrics = api.performance.get_metrics()

# Create notification
notification = api.notifications.create({
    'title': 'Test Notification',
    'description': 'This is a test',
    'type': 'system',
    'priority': 'low'
})
```

---

**Document Version**: 1.0  
**Last Updated**: September 2025  
**Next Review**: October 2025
