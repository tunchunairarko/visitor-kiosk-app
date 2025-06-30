import { NextResponse } from 'next/server'
import { database } from '../../../../lib/database'
import { Visitor } from '../../../../lib/types'

export async function GET() {
  try {
    const todayVisitors: Visitor[] = await database.getTodayVisitors()
    
    // Calculate stats
    const stats = {
      todayVisitors: todayVisitors.length,
      activeVisitors: todayVisitors.filter((v: Visitor) => v.status === 'checked_in').length,
      checkedOutToday: todayVisitors.filter((v: Visitor) => v.status === 'checked_out').length,
      totalVisitors: await getTotalVisitorCount()
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}

async function getTotalVisitorCount(): Promise<number> {
  try {
    const visitors: Visitor[] = await database.getVisitors(10000, 0) // Get all visitors
    return visitors.length
  } catch (error) {
    console.error('Error getting total visitor count:', error)
    return 0
  }
}
