'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, LogOut, Search } from 'lucide-react'
import Link from 'next/link'
import { Visitor } from '@/lib/types'

export const CheckoutModule = () => {
  const [ticketNumber, setTicketNumber] = useState('')
  const [visitor, setVisitor] = useState<Visitor | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [checkOutComplete, setCheckOutComplete] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async () => {
    if (!ticketNumber.trim()) {
      setError('Please enter a ticket number')
      return
    }

    setIsSearching(true)
    setError('')
    
    try {
      const response = await fetch(`/api/visitors/search?ticket=${ticketNumber}`)
      const data = await response.json()

      if (response.ok) {
        if (data.visitor) {
          setVisitor(data.visitor)
        } else {
          setError('Visitor not found or already checked out')
          setVisitor(null)
        }
      } else {
        setError(data.error || 'Error searching for visitor')
        setVisitor(null)
      }
    } catch (error) {
      console.error('Search error:', error)
      setError('Error searching for visitor. Please try again.')
      setVisitor(null)
    } finally {
      setIsSearching(false)
    }
  }

  const handleCheckOut = async () => {
    if (!visitor) return

    setIsCheckingOut(true)
    
    try {
      const response = await fetch('/api/visitors/check-out', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ticketNumber: visitor.ticket_number })
      })

      if (response.ok) {
        setCheckOutComplete(true)
      } else {
        const data = await response.json()
        setError(data.error || 'Error checking out visitor')
      }
    } catch (error) {
      console.error('Check out error:', error)
      setError('Error checking out visitor. Please try again.')
    } finally {
      setIsCheckingOut(false)
    }
  }

  const formatTime = (timestamp: string) => {
    try {
      return new Date(timestamp).toLocaleString()
    } catch (error) {
      console.error('Time formatting error:', error)
      return 'Invalid date'
    }
  }

  const handleTicketNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4) // Only allow digits, max 4
    setTicketNumber(value)
    setError('')
    setVisitor(null)
  }

  if (checkOutComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 flex items-center justify-center p-8">
        <Card className="w-full max-w-md bg-white shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-blue-600">
              Check-Out Complete!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="bg-blue-100 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
              <LogOut className="h-12 w-12 text-blue-600" />
            </div>
            <div>
              <p className="text-lg text-gray-600 mb-2">Thank you for your visit!</p>
              <p className="text-sm text-gray-500">
                {visitor?.visitor_name || 'Visitor'} has been successfully checked out.
              </p>
            </div>
            <Link href="/">
              <Button className="w-full">Return to Main Menu</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto min-w-0">
        {/* Header */}
        <div className="flex items-center mb-6 sm:mb-8">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 ml-4 truncate">Visitor Check-Out</h1>
        </div>

        {/* Search Form */}
        <Card className="bg-white shadow-xl mb-6">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">Enter Your Ticket Number</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Input
                  type="text"
                  value={ticketNumber}
                  onChange={handleTicketNumberChange}
                  placeholder="Enter your 4-digit ticket number (e.g., 0001)"
                  className="text-xl sm:text-2xl py-3 sm:py-4 text-center font-mono w-full"
                  maxLength={4}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch()
                    }
                  }}
                />
              </div>
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}
              <Button
                onClick={handleSearch}
                disabled={isSearching || !ticketNumber.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-lg disabled:bg-gray-400"
              >
                <Search className="mr-2 h-5 w-5" />
                {isSearching ? 'Searching...' : 'Find Visitor'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Visitor Details */}
        {visitor && (
          <Card className="bg-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-green-600">Visitor Found</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <p className="text-lg font-semibold">{visitor.visitor_name || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Ticket Number</label>
                    <p className="text-lg font-mono font-semibold">{visitor.ticket_number || 'N/A'}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Visiting</label>
                    <p className="text-lg">{visitor.visiting_employee_name || 'N/A'}</p>
                    {visitor.visiting_employee_email && (
                      <p className="text-sm text-gray-600">{visitor.visiting_employee_email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Check-in Time</label>
                    <p className="text-lg">{formatTime(visitor.check_in_time)}</p>
                  </div>
                </div>

                {visitor.visitor_company && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company</label>
                    <p className="text-lg">{visitor.visitor_company}</p>
                  </div>
                )}

                {visitor.visitor_email && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="text-lg">{visitor.visitor_email}</p>
                  </div>
                )}

                {visitor.purpose && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Purpose</label>
                    <p className="text-lg">{visitor.purpose}</p>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <Button
                    onClick={handleCheckOut}
                    disabled={isCheckingOut}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 text-lg disabled:bg-gray-400"
                  >
                    <LogOut className="mr-2 h-5 w-5" />
                    {isCheckingOut ? 'Checking Out...' : 'Complete Check-Out'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
