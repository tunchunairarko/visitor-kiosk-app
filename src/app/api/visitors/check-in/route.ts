import { NextRequest, NextResponse } from 'next/server'
import { database } from '../../../../lib/database'
import { CreateVisitorRequest } from '../../../../lib/types'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      visitorName, 
      visitorEmail, 
      visitorPhone, 
      visitorCompany, 
      visitingEmployee, 
      visitingEmployeeName,
      visitingEmployeeEmail,
      purpose 
    } = body

    if (!visitorName || !visitingEmployee || !visitingEmployeeName || !visitingEmployeeEmail) {
      return NextResponse.json(
        { error: 'Visitor name, visiting employee details are required' },
        { status: 400 }
      )
    }

    const visitorData: CreateVisitorRequest = {
      visitorName,
      visitorEmail,
      visitorPhone,
      visitorCompany,
      visitingEmployee,
      visitingEmployeeName,
      visitingEmployeeEmail,
      purpose
    }

    const result = await database.createVisitor(visitorData)

    // Send email notification (placeholder - you'll need to implement actual email sending)
    try {
      // await sendEmailNotification(result, employeeData)
      console.log('Email notification would be sent here')
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      ticketNumber: result.ticketNumber,
      id: result.id
    })
  } catch (error) {
    console.error('Error creating visitor:', error)
    return NextResponse.json(
      { error: 'Failed to create visitor record' },
      { status: 500 }
    )
  }
}
