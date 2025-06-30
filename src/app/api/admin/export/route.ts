import { NextResponse } from 'next/server'
import { database } from '../../../../lib/database'
import { Visitor } from '../../../../lib/types'
import * as XLSX from 'xlsx'

export async function GET() {
  try {
    const visitors: Visitor[] = await database.getVisitors(1000, 0) // Get recent visitors
    
    // Prepare data for Excel
    const excelData = visitors.map((visitor: Visitor) => ({
      'Ticket Number': visitor.ticket_number,
      'Visitor Name': visitor.visitor_name,
      'Email': visitor.visitor_email || '',
      'Company': visitor.visitor_company || '',
      'Employee': visitor.visiting_employee_name || '',
      'Check-in Time': visitor.check_in_time,
      'Check-out Time': visitor.check_out_time || '',
      'Status': visitor.status
    }))

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(excelData)
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Visitors')

    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' })

    // Return file as response
    return new NextResponse(excelBuffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename=visitor-data-${new Date().toISOString().split('T')[0]}.xlsx`
      }
    })
  } catch (error) {
    console.error('Error exporting data:', error)
    return NextResponse.json(
      { error: 'Failed to export data' },
      { status: 500 }
    )
  }
}
