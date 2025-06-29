'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, User, Mail, Phone, Building2, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { Employee } from '@/lib/employees'

export const CheckinModule = () => {
  const [formData, setFormData] = useState({
    visitorName: '',
    visitorEmail: '',
    visitorPhone: '',
    visitorCompany: '',
    visitingEmployee: '',
    visitingEmployeeName: '',
    visitingEmployeeEmail: '',
    purpose: ''
  })
  const [employees, setEmployees] = useState<Employee[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [ticketNumber, setTicketNumber] = useState<string | null>(null)
  const [searchEmployee, setSearchEmployee] = useState('')
  const [showEmployeeList, setShowEmployeeList] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/employees')
      if (!response.ok) {
        throw new Error('Failed to fetch employees')
      }
      const data = await response.json()
      setEmployees(data || [])
    } catch (error) {
      console.error('Error fetching employees:', error)
      setError('Failed to load employees. Please refresh the page.')
    } finally {
      setIsLoading(false)
    }
  }

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchEmployee.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchEmployee.toLowerCase())
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleEmployeeSelect = (employee: Employee) => {
    setFormData(prev => ({
      ...prev,
      visitingEmployee: employee.id,
      visitingEmployeeName: employee.name,
      visitingEmployeeEmail: employee.email
    }))
    setSearchEmployee(employee.name)
    setShowEmployeeList(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.visitorName || !formData.visitingEmployee || !formData.purpose) {
      alert('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/visitors/check-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()
      if (response.ok) {
        setTicketNumber(result.ticketNumber)
      } else {
        alert('Error creating visitor record: ' + result.error)
      }
    } catch (error) {
      alert('Error submitting form: ' + error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (ticketNumber) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-8">
        <Card className="w-full max-w-md bg-white shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-green-600">
              Check-In Complete!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="bg-green-100 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
              <span className="text-4xl">✓</span>
            </div>
            <div>
              <p className="text-lg text-gray-600 mb-2">Your ticket number is:</p>
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-6">
                <span className="text-6xl font-mono font-bold text-gray-800">
                  {ticketNumber}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Please keep this number for check-out
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Purpose:</strong> {formData.purpose}</p>
                <p><strong>Visiting:</strong> {formData.visitingEmployeeName}</p>
              </div>
              <p className="text-sm text-gray-600">
                An email notification has been sent to your host.
              </p>
              <Link href="/">
                <Button className="w-full">Return to Main Menu</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto min-w-0">
        {/* Header */}
        <div className="flex items-center mb-6 sm:mb-8">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 ml-4 truncate">Visitor Check-In</h1>
        </div>

        {/* Error Message */}
        {error && (
          <Card className="bg-red-50 border-red-200 mb-6">
            <CardContent className="pt-6">
              <p className="text-red-800">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Form */}
        <Card className="bg-white shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">Welcome! Please fill in your details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Visitor Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline mr-2 h-4 w-4" />
                  Full Name *
                </label>
                <Input
                  type="text"
                  name="visitorName"
                  value={formData.visitorName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                  className="text-base sm:text-lg py-2 sm:py-3 w-full"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="inline mr-2 h-4 w-4" />
                  Email Address
                </label>
                <Input
                  type="email"
                  name="visitorEmail"
                  value={formData.visitorEmail}
                  onChange={handleInputChange}
                  placeholder="your.email@company.com"
                  className="text-base sm:text-lg py-2 sm:py-3 w-full"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="inline mr-2 h-4 w-4" />
                  Phone Number
                </label>
                <Input
                  type="tel"
                  name="visitorPhone"
                  value={formData.visitorPhone}
                  onChange={handleInputChange}
                  placeholder="(0) 123 123 4567"
                  className="text-base sm:text-lg py-2 sm:py-3 w-full"
                />
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Building2 className="inline mr-2 h-4 w-4" />
                  Company
                </label>
                <Input
                  type="text"
                  name="visitorCompany"
                  value={formData.visitorCompany}
                  onChange={handleInputChange}
                  placeholder="Your company name"
                  className="text-base sm:text-lg py-2 sm:py-3 w-full"
                />
              </div>

              {/* Visiting Employee */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Who are you visiting? *
                </label>
                {isLoading ? (
                  <div className="text-lg py-3 px-3 border rounded-md bg-gray-50">
                    Loading employees...
                  </div>
                ) : (
                  <>
                    <Input
                      type="text"
                      value={searchEmployee}
                      onChange={(e) => {
                        setSearchEmployee(e.target.value)
                        setShowEmployeeList(true)
                      }}
                      onFocus={() => setShowEmployeeList(true)}
                      placeholder={employees.length > 0 ? "Search by name or department" : "No employees available"}
                      className="text-base sm:text-lg py-2 sm:py-3 w-full"
                      required
                      disabled={employees.length === 0}
                    />
                    {showEmployeeList && searchEmployee && employees.length > 0 && (
                      <div className="absolute z-10 w-full bg-white border rounded-md shadow-lg mt-1 max-h-48 overflow-y-auto">
                        {filteredEmployees.length > 0 ? (
                          filteredEmployees.map(employee => (
                            <div
                              key={employee.id}
                              onClick={() => handleEmployeeSelect(employee)}
                              className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                            >
                              <div className="font-medium">{employee.name}</div>
                              <div className="text-sm text-gray-600">{employee.department}</div>
                              {employee.title && (
                                <div className="text-xs text-gray-500">{employee.title}</div>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="p-3 text-gray-500">No employees found</div>
                        )}
                      </div>
                    )}
                    {employees.length === 0 && !isLoading && (
                      <p className="text-sm text-red-600 mt-1">No employees available. Please contact support.</p>
                    )}
                  </>
                )}
              </div>

              {/* Purpose */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MessageSquare className="inline mr-2 h-4 w-4" />
                  Purpose of Visit *
                </label>
                <Select
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleInputChange}
                  placeholder="Select the purpose of your visit"
                  required
                  className="text-base sm:text-lg py-2 sm:py-3 w-full"
                >
                  <option value="Meeting">Meeting</option>
                  <option value="Interview">Interview</option>
                  <option value="Delivery">Delivery</option>
                  <option value="Consultation">Consultation</option>
                  <option value="Training">Training</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Sales Presentation">Sales Presentation</option>
                  <option value="Client Visit">Client Visit</option>
                  <option value="Inspection">Inspection</option>
                  <option value="Conference">Conference</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Pickup">Pickup</option>
                  <option value="Support">Support</option>
                  <option value="Documentation">Documentation</option>
                  <option value="Contractor Work">Contractor Work</option>
                  <option value="Vendor Meeting">Vendor Meeting</option>
                  <option value="Other">Other</option>
                </Select>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting || employees.length === 0 || !formData.visitingEmployee || !formData.purpose}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 sm:py-4 text-base sm:text-lg disabled:bg-gray-400"
              >
                {isSubmitting ? 'Processing...' : 'Complete Check-In'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
