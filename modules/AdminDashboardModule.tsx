'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { 
  Users, 
  UserCheck, 
  UserX, 
  Calendar, 
  Download, 
  LogOut, 
  Activity,
  TrendingUp,
  Clock
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Visitor } from '../lib/types'

interface DashboardStats {
  todayVisitors: number
  activeVisitors: number
  totalVisitors: number
  checkedOutToday: number
}

export const AdminDashboardModule = () => {
  const [stats, setStats] = useState<DashboardStats>({
    todayVisitors: 0,
    activeVisitors: 0,
    totalVisitors: 0,
    checkedOutToday: 0
  })
  const [todayVisitors, setTodayVisitors] = useState<Visitor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const checkAuth = useCallback(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin')
    }
  }, [router])

  const fetchDashboardData = useCallback(async () => {
    try {
      setError(null)
      const [statsResponse, visitorsResponse] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/visitors/today')
      ])

      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData)
      } else {
        throw new Error('Failed to fetch stats')
      }

      if (visitorsResponse.ok) {
        const visitorsData = await visitorsResponse.json()
        setTodayVisitors(Array.isArray(visitorsData) ? visitorsData : [])
      } else {
        throw new Error('Failed to fetch visitors')
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      setError('Failed to load dashboard data. Please refresh the page.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const checkAuthAndFetch = () => {
      checkAuth()
      fetchDashboardData()
    }
    
    checkAuthAndFetch()
    
    // Refresh data every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000)
    return () => clearInterval(interval)
  }, [checkAuth, fetchDashboardData])

  

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    router.push('/admin')
  }

  const handleCheckOutVisitor = async (ticketNumber: string) => {
    try {
      const response = await fetch('/api/visitors/check-out', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ticketNumber })
      })

      if (response.ok) {
        fetchDashboardData() // Refresh data
      } else {
        alert('Failed to check out visitor')
      }
    } catch (error) {
      console.error('Error checking out visitor:', error)
      alert('Error checking out visitor')
    }
  }

  const exportData = async () => {
    try {
      const response = await fetch('/api/admin/export')
      if (!response.ok) {
        throw new Error('Failed to export data')
      }
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `visitor-data-${new Date().toISOString().split('T')[0]}.xlsx`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error exporting data:', error)
      alert('Error exporting data')
    }
  }

  const formatTime = (timestamp: string) => {
    try {
      return new Date(timestamp).toLocaleTimeString()
    } catch (error) {
      console.error('Error formatting time:', error)
      return 'Invalid time'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Activity className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-lg text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
          <Button onClick={fetchDashboardData}>Retry</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Button onClick={exportData} variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
              <Button onClick={handleLogout} variant="outline">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today&apos;s Visitors</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todayVisitors}</div>
              <p className="text-xs text-muted-foreground">
                Total check-ins today
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Currently In</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeVisitors}</div>
              <p className="text-xs text-muted-foreground">
                Visitors still in building
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Checked Out</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.checkedOutToday}</div>
              <p className="text-xs text-muted-foreground">
                Completed visits today
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalVisitors}</div>
              <p className="text-xs text-muted-foreground">
                All time visitors
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Today's Visitors Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Today&apos;s Visitors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Ticket</th>
                    <th className="text-left py-3 px-4">Visitor</th>
                    <th className="text-left py-3 px-4">Company</th>
                    <th className="text-left py-3 px-4">Visiting</th>
                    <th className="text-left py-3 px-4">Check-in</th>
                    <th className="text-left py-3 px-4">Check-out</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {todayVisitors.map((visitor) => (
                    <tr key={visitor.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-mono">{visitor.ticket_number}</td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{visitor.visitor_name}</div>
                          {visitor.visitor_email && (
                            <div className="text-sm text-gray-500">{visitor.visitor_email}</div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">{visitor.visitor_company || '-'}</td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{visitor.visiting_employee_name || '-'}</div>
                          {visitor.visiting_employee_email && (
                            <div className="text-sm text-gray-500">{visitor.visiting_employee_email}</div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-gray-400" />
                          {formatTime(visitor.check_in_time)}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {visitor.check_out_time ? (
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-gray-400" />
                            {formatTime(visitor.check_out_time)}
                          </div>
                        ) : '-'}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          visitor.status === 'checked_in' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {visitor.status === 'checked_in' ? 'In Building' : 'Checked Out'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {visitor.status === 'checked_in' && (
                          <Button
                            onClick={() => handleCheckOutVisitor(visitor.ticket_number)}
                            size="sm"
                            variant="outline"
                          >
                            <UserX className="h-4 w-4 mr-1" />
                            Check Out
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {todayVisitors.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No visitors today
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
