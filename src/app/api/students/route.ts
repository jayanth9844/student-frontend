import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://student-backend-2919.onrender.com'

export async function GET() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/students`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching students from backend:', error)
    return NextResponse.json(
      { error: 'Failed to fetch students from backend' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const students = await request.json()

    const response = await fetch(`${BACKEND_URL}/api/students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(students),
    })

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error sending students to backend:', error)
    return NextResponse.json(
      { error: 'Failed to send students to backend' },
      { status: 500 }
    )
  }
}
