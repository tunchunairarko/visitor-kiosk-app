import { NextResponse } from 'next/server'
import { EMPLOYEES } from '../../../lib/employees'

export async function GET() {
  try {
    return NextResponse.json(EMPLOYEES)
  } catch (error) {
    console.error('Error fetching employees:', error)
    return NextResponse.json(
      { error: 'Failed to fetch employees' },
      { status: 500 }
    )
  }
}
