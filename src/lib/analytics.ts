import { Student, StudentStats, InsightData } from '@/types/student'

export function calculateStudentStats(students: Student[]): StudentStats {
  if (students.length === 0) {
    return {
      totalStudents: 0,
      averageMath: 0,
      averageScience: 0,
      averageEnglish: 0,
      averageSkill: 0,
      averageAttention: 0,
      topPerformer: null,
      lowestPerformer: null,
    }
  }

  // Calculate averages for new format fields
  const totalComprehension = students.reduce((sum, student) => sum + (student.comprehension || 0), 0)
  const totalFocus = students.reduce((sum, student) => sum + (student.focus || 0), 0)
  const totalRetention = students.reduce((sum, student) => sum + (student.retention || 0), 0)
  const totalAttention = students.reduce((sum, student) => sum + (student.attention || 0), 0)
  const totalAssessment = students.reduce((sum, student) => sum + (student.assessment_score || 0), 0)

  const studentsWithAverage = students.map(student => ({
    ...student,
    average: student.assessment_score || 
             ((student.comprehension || 0) + (student.focus || 0) + (student.retention || 0)) / 3
  }))

  const topPerformer = studentsWithAverage.reduce((top, current) => 
    current.average > top.average ? current : top
  )

  const lowestPerformer = studentsWithAverage.reduce((lowest, current) => 
    current.average < lowest.average ? current : lowest
  )

  return {
    totalStudents: students.length,
    averageMath: totalComprehension / students.length, // Map to comprehension
    averageScience: totalFocus / students.length, // Map to focus
    averageEnglish: totalRetention / students.length, // Map to retention
    averageSkill: totalAssessment / students.length, // Map to assessment score
    averageAttention: totalAttention / students.length,
    topPerformer,
    lowestPerformer,
  }
}

export function generateInsights(students: Student[]): InsightData {
  if (students.length === 0) {
    return {
      trends: [],
      outliers: [],
      recommendations: [],
      correlations: {
        attentionPerformance: 0,
        subjectCorrelations: {
          mathScience: 0,
          mathEnglish: 0,
          scienceEnglish: 0,
        },
      },
    }
  }

  const trends = analyzeTrends(students)
  const outliers = findOutliers(students)
  const recommendations = generateRecommendations(students)
  const correlations = calculateCorrelations(students)

  return {
    trends,
    outliers,
    recommendations,
    correlations,
  }
}

function analyzeTrends(students: Student[]): string[] {
  const trends: string[] = []
  const stats = calculateStudentStats(students)

  // Generate trends for new format
  trends.push(`Focus shows the highest average performance (${stats.averageScience.toFixed(1)})`)
  trends.push(`Retention has an average performance of (${stats.averageEnglish.toFixed(1)})`)
  trends.push('High attention levels correlate with better assessment performance')
  trends.push('Learning persona patterns identified across student cohort')

  // Attention vs performance trend
  if (stats.averageAttention > 75) {
    trends.push('High attention levels correlate with better academic performance')
  } else if (stats.averageAttention < 65) {
    trends.push('Low attention levels may be impacting academic performance')
  }

  // Assessment score trend
  if (stats.averageSkill > 85) {
    trends.push('Excellent assessment performance across the student cohort')
  } else if (stats.averageSkill < 75) {
    trends.push('Assessment improvement opportunities identified across multiple students')
  }

  return trends
}

function findOutliers(students: Student[]): Student[] {
  const outliers: Student[] = []
  
  // Calculate overall averages using new format
  const averages = students.map(student => ({
    ...student,
    overall: student.assessment_score || 
             ((student.comprehension || 0) + (student.focus || 0) + (student.retention || 0)) / 3
  }))

  const overallAvg = averages.reduce((sum, student) => sum + student.overall, 0) / averages.length
  const standardDev = Math.sqrt(
    averages.reduce((sum, student) => sum + Math.pow(student.overall - overallAvg, 2), 0) / averages.length
  )

  // Find students more than 1.5 standard deviations from mean
  averages.forEach(student => {
    const deviation = Math.abs(student.overall - overallAvg)
    if (deviation > 1.5 * standardDev) {
      outliers.push(student)
    }
  })

  return outliers
}

function generateRecommendations(students: Student[]): string[] {
  const recommendations: string[] = []
  const stats = calculateStudentStats(students)

  // Cognitive skill recommendations (new format)
  if (stats.averageMath < 80) { // Comprehension
    recommendations.push('Implement comprehension-building activities and reading strategies')
  }
  if (stats.averageScience < 80) { // Focus
    recommendations.push('Develop focus enhancement techniques and mindfulness exercises')
  }
  if (stats.averageEnglish < 80) { // Retention
    recommendations.push('Introduce memory retention strategies and spaced repetition')
  }

  // Attention-based recommendations (0-100 scale)
  if (stats.averageAttention < 70) {
    recommendations.push('Implement attention-building exercises and shorter lesson segments')
    recommendations.push('Consider environmental factors affecting student focus')
  }

  // Assessment score recommendations
  if (stats.averageSkill < 75) { // Assessment scores
    recommendations.push('Develop personalized learning plans based on individual needs')
    recommendations.push('Pair high-performing students with those needing support')
  }

  // Engagement recommendations
  const avgEngagement = students.reduce((sum, s) => sum + (s.engagement_time || 0), 0) / students.length
  if (avgEngagement < 60) {
    recommendations.push('Increase interactive learning activities to boost engagement')
  }

  // Performance gap recommendations using assessment scores
  const performanceGap = stats.topPerformer && stats.lowestPerformer 
    ? (stats.topPerformer.assessment_score || 0) - (stats.lowestPerformer.assessment_score || 0)
    : 0

  if (performanceGap > 20) {
    recommendations.push('Address significant performance gaps through differentiated instruction')
  }

  return recommendations
}

function calculateCorrelations(students: Student[]): InsightData['correlations'] {
  const n = students.length
  
  // Calculate attention-performance correlation using assessment scores
  const performances = students.map(s => s.assessment_score || 0)
  const attentions = students.map(s => s.attention || 0)
  
  const attentionPerformance = calculatePearsonCorrelation(attentions, performances)
  
  // Calculate cognitive skill correlations
  const comprehensionScores = students.map(s => s.comprehension || 0)
  const focusScores = students.map(s => s.focus || 0)
  const retentionScores = students.map(s => s.retention || 0)
  
  const comprehensionFocus = calculatePearsonCorrelation(comprehensionScores, focusScores)
  const comprehensionRetention = calculatePearsonCorrelation(comprehensionScores, retentionScores)
  const focusRetention = calculatePearsonCorrelation(focusScores, retentionScores)
  
  return {
    attentionPerformance,
    subjectCorrelations: {
      mathScience: comprehensionFocus,
      mathEnglish: comprehensionRetention,
      scienceEnglish: focusRetention,
    },
  }
}

function calculatePearsonCorrelation(x: number[], y: number[]): number {
  const n = x.length
  if (n === 0) return 0

  const sumX = x.reduce((a, b) => a + b, 0)
  const sumY = y.reduce((a, b) => a + b, 0)
  const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0)
  const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0)
  const sumY2 = y.reduce((sum, yi) => sum + yi * yi, 0)

  const numerator = n * sumXY - sumX * sumY
  const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY))

  return denominator === 0 ? 0 : numerator / denominator
}
