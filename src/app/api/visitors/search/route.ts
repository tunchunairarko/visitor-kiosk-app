import { NextRequest, NextResponse } from 'next/server'
import { database } from '../../../../lib/database'
import { Visitor } from '../../../../lib/types'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const ticket = searchParams.get('ticket')

    if (!ticket) {
      return NextResponse.json(
        { error: 'Ticket number is required' },
        { status: 400 }
      )
    }

    const visitor: Visitor | null = await database.findVisitorByTicket(ticket)

    if (!visitor) {
      return NextResponse.json(
        { error: 'Visitor not found' },
        { status: 404 }
      )
    }

    if (visitor.status === 'checked_out') {
      return NextResponse.json(
        { error: 'Visitor has already checked out' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      visitor: visitor
    })
  } catch (error) {
    console.error('Error searching for visitor:', error)
    return NextResponse.json(
      { error: 'Failed to search for visitor' },
      { status: 500 }
    )
  }
}
