import { NextResponse } from 'next/server'
import { database } from '../../../../../lib/database'

export async function GET() {
  try {
    const todayVisitors = await database.getTodayVisitors()
    return NextResponse.json(todayVisitors)
  } catch (error) {
    console.error('Error fetching today visitors:', error)
    return NextResponse.json(
      { error: 'Failed to fetch today visitors' },
      { status: 500 }
    )
  }
}
