import { Student, LearningPersona } from '@/types/student'

const API_BASE_URL = 'https://student-backend-2919.onrender.com'
const API_KEY = 'demo-key' // As per backend documentation
const AUTH_CREDENTIALS = {
  username: 'admin',
  password: 'admin'
}

export class APIError extends Error {
  constructor(message: string, public status?: number) {
    super(message)
    this.name = 'APIError'
  }
}

// Token management
let authToken: string | null = null
let tokenExpiry: number = 0

async function getAuthToken(): Promise<string> {
  // Return cached token if still valid
  if (authToken && Date.now() < tokenExpiry) {
    return authToken
  }

  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(AUTH_CREDENTIALS),
    })

    if (!response.ok) {
      throw new APIError(`Authentication failed: ${response.statusText}`, response.status)
    }

    const data = await response.json()
    authToken = data.access_token
    // Set expiry to 50 minutes from now (tokens usually expire in 1 hour)
    tokenExpiry = Date.now() + (50 * 60 * 1000)
    
    return authToken!
  } catch (error) {
    throw new APIError('Failed to authenticate with backend API')
  }
}

export async function fetchStudents(): Promise<Student[]> {
  try {
    const response = await fetch('/api/students')
    
    if (!response.ok) {
      throw new APIError(`Failed to fetch students: ${response.statusText}`, response.status)
    }

    return await response.json()
  } catch (error) {
    if (error instanceof APIError) {
      throw error
    }
    throw new APIError('Network error while fetching students')
  }
}

export async function uploadStudents(students: Student[]): Promise<any> {
  try {
    const response = await fetch('/api/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(students),
    })

    if (!response.ok) {
      throw new APIError(`Failed to upload students: ${response.statusText}`, response.status)
    }

    return await response.json()
  } catch (error) {
    if (error instanceof APIError) {
      throw error
    }
    throw new APIError('Network error while uploading students')
  }
}

export async function analyzePerformance(students: Student[]): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ students }),
    })

    if (!response.ok) {
      throw new APIError(`Failed to analyze performance: ${response.statusText}`, response.status)
    }

    return await response.json()
  } catch (error) {
    if (error instanceof APIError) {
      throw error
    }
    throw new APIError('Network error while analyzing performance')
  }
}

export async function generateReport(students: Student[], format: 'pdf' | 'excel' = 'pdf'): Promise<Blob> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ students, format }),
    })

    if (!response.ok) {
      throw new APIError(`Failed to generate report: ${response.statusText}`, response.status)
    }

    return await response.blob()
  } catch (error) {
    if (error instanceof APIError) {
      throw error
    }
    throw new APIError('Network error while generating report')
  }
}

export async function clusterStudents(students: Student[]): Promise<Student[]> {
  try {
    // Get authentication token
    const token = await getAuthToken()
    
    // Prepare students data for the prediction API
    const studentsForPrediction = students.map(student => ({
      comprehension: student.comprehension || 0,
      attention: student.attention || 0,
      focus: student.focus || 0,
      retention: student.retention || 0,
      engagement_time: student.engagement_time || 0
    }))

    // Call the batch prediction endpoint
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'X-API-Key': API_KEY,
      },
      body: JSON.stringify({
        students: studentsForPrediction
      }),
    })

    if (!response.ok) {
      throw new APIError(`Failed to predict student scores: ${response.statusText}`, response.status)
    }

    const predictionData = await response.json()
    
    // Map the response to include personas
    return students.map((student, index) => {
      const prediction = predictionData.predictions?.[index]
      // Use existing assessment score if available, otherwise use prediction or calculate
      const assessmentScore = student.assessment_score !== undefined 
        ? student.assessment_score
        : prediction 
          ? Math.round(parseFloat(prediction.predicted_score))
          : calculateAssessmentScore(student)
      const persona = determinePersona(assessmentScore, student)
      
      return {
        ...student,
        assessment_score: assessmentScore,
        persona: persona
      }
    })
  } catch (error) {
    console.warn('Backend prediction API failed, using fallback clustering:', error)
    // Fallback to local clustering if API fails
    return students.map(student => {
      // Use existing assessment score if available, otherwise calculate
      const assessmentScore = student.assessment_score !== undefined 
        ? student.assessment_score
        : calculateAssessmentScore(student)
      const persona = determinePersona(assessmentScore, student)
      
      return {
        ...student,
        assessment_score: assessmentScore,
        persona: persona
      }
    })
  }
}

function calculateAssessmentScore(student: Student): number {
  // Return existing assessment score if available (already an integer)
  if (student.assessment_score !== undefined) {
    return student.assessment_score
  }
  
  // Calculate predicted assessment score based on available data
  let score = 0
  let weightSum = 0
  
  // Use new format fields if available (floating-point values)
  if (student.comprehension !== undefined) {
    score += student.comprehension * 0.4
    weightSum += 0.4
  }
  
  if (student.focus !== undefined) {
    score += student.focus * 0.2
    weightSum += 0.2
  }
  
  if (student.retention !== undefined) {
    score += student.retention * 0.2
    weightSum += 0.2
  }
  
  if (student.attention !== undefined) {
    // Attention is 0-100 in the new format, use directly
    score += student.attention * 0.2
    weightSum += 0.2
  }
  
  // Fallback to legacy format
  if (weightSum === 0 && student.math !== undefined && student.science !== undefined && student.english !== undefined) {
    const academicAverage = (student.math + student.science + student.english) / 3
    score += academicAverage * 0.5
    weightSum += 0.5
    
    if (student.skill !== undefined) {
      score += student.skill * 0.3
      weightSum += 0.3
    }
    
    if (student.attention !== undefined) {
      // Legacy format: attention might be 0-10, scale to 0-100
      const attentionScore = student.attention > 10 ? student.attention : student.attention * 10
      score += attentionScore * 0.2
      weightSum += 0.2
    }
  }
  
  // Return as integer (rounded)
  return weightSum > 0 ? Math.round(score / weightSum * 100) : 0
}

function determinePersona(assessmentScore: number, student: Student): LearningPersona {
  // Calculate variance based on available data
  let variance = 0
  
  // Use new format fields if available
  if (student.comprehension !== undefined && student.focus !== undefined && student.retention !== undefined) {
    const scores = [student.comprehension, student.focus, student.retention]
    const average = scores.reduce((sum, score) => sum + score, 0) / scores.length
    variance = Math.sqrt(scores.reduce((sum, score) => sum + Math.pow(score - average, 2), 0) / scores.length)
  } 
  // Fallback to legacy format
  else if (student.math !== undefined && student.science !== undefined && student.english !== undefined) {
    const academicAverage = (student.math + student.science + student.english) / 3
    variance = Math.sqrt(
      (Math.pow(student.math - academicAverage, 2) + 
       Math.pow(student.science - academicAverage, 2) + 
       Math.pow(student.english - academicAverage, 2)) / 3
    )
  }

  const attention = student.attention || 0
  const engagementTime = student.engagement_time || 0

  // Determine persona based on assessment score, attention, and variance
  if (assessmentScore >= 85 && attention >= 7.5) {
    return {
      type: 'High Achiever',
      description: 'Consistently excellent performance across all subjects with high attention levels',
      color: 'bg-green-100 text-green-800 border-green-200',
      recommendations: [
        'Provide advanced challenges and enrichment activities',
        'Consider leadership roles in group projects',
        'Explore accelerated learning opportunities'
      ]
    }
  } else if (assessmentScore >= 70 && variance <= 10) {
    return {
      type: 'Steady Learner',
      description: 'Consistent performance with steady progress across subjects',
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      recommendations: [
        'Maintain current learning pace with gradual challenges',
        'Focus on skill development in specific areas',
        'Encourage peer collaboration'
      ]
    }
  } else if (variance > 15 || (attention < 6 && assessmentScore > 60) || (engagementTime > 0 && engagementTime < 50)) {
    return {
      type: 'Inconsistent Performer',
      description: 'Shows potential but performance varies significantly across subjects',
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      recommendations: [
        'Identify and address attention-related challenges',
        'Provide consistent study routines and structure',
        'Focus on strengths while supporting weaker areas'
      ]
    }
  } else {
    return {
      type: 'Needs Support',
      description: 'Requires additional support and intervention to improve performance',
      color: 'bg-red-100 text-red-800 border-red-200',
      recommendations: [
        'Implement individualized learning plans',
        'Provide additional tutoring and support',
        'Focus on building foundational skills'
      ]
    }
  }
}
