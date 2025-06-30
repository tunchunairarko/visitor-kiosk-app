import { NextRequest, NextResponse } from 'next/server'
import { database } from '../../../../lib/database'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { ticketNumber } = body

    if (!ticketNumber) {
      return NextResponse.json(
        { error: 'Ticket number is required' },
        { status: 400 }
      )
    }

    await database.checkOutVisitor(ticketNumber)

    return NextResponse.json({
      success: true,
      message: 'Visitor checked out successfully'
    })
  } catch (error) {
    console.error('Error checking out visitor:', error)
    return NextResponse.json(
      { error: 'Failed to check out visitor' },
      { status: 500 }
    )
  }
}
