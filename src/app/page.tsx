'use client'

import React, { useState, useEffect } from 'react'
import CSVUpload from '@/components/CSVUpload'
import OverviewStats from '@/components/OverviewStats'
import Charts from '@/components/Charts'
import PersonaCharts from '@/components/PersonaCharts'
import StudentTable from '@/components/StudentTable'
import Insights from '@/components/Insights'
import { Student, StudentStats, InsightData } from '@/types/student'
import { calculateStudentStats, generateInsights } from '@/lib/analytics'
import { clusterStudents } from '@/lib/api'

export default function Dashboard() {
  const [students, setStudents] = useState<Student[]>([])
  const [stats, setStats] = useState<StudentStats>({
    totalStudents: 0,
    averageMath: 0,
    averageScience: 0,
    averageEnglish: 0,
    averageSkill: 0,
    averageAttention: 0,
    topPerformer: null,
    lowestPerformer: null,
  })
  const [insights, setInsights] = useState<InsightData>({
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
  })

  // Load sample data on component mount
  useEffect(() => {
    loadSampleData()
  }, [])

  const loadSampleData = async () => {
    try {
      // Small embedded sample dataset for immediate display
      const sampleStudents: Student[] = [
        {
          student_id: 'S0001',
          name: 'Mason Adams',
          class: 2,
          comprehension: 73.86,
          attention: 80.15,
          focus: 87.15,
          retention: 73.09,
          assessment_score: 77.43,
          engagement_time: 99
        },
        {
          student_id: 'S0002',
          name: 'Thomas Hood',
          class: 1,
          comprehension: 73.92,
          attention: 82.01,
          focus: 73.97,
          retention: 73.95,
          assessment_score: 77.17,
          engagement_time: 58
        },
        {
          student_id: 'S0003',
          name: 'Matthew Diaz',
          class: 5,
          comprehension: 48.25,
          attention: 44.65,
          focus: 55.26,
          retention: 45.49,
          assessment_score: 41.49,
          engagement_time: 64
        },
        {
          student_id: 'S0004',
          name: 'Laura Carpenter',
          class: 4,
          comprehension: 68.28,
          attention: 56.34,
          focus: 63.39,
          retention: 68.63,
          assessment_score: 58.39,
          engagement_time: 63
        },
        {
          student_id: 'S0005',
          name: 'Justin Mccoy',
          class: 4,
          comprehension: 61.66,
          attention: 59.18,
          focus: 78.81,
          retention: 63.89,
          assessment_score: 60.48,
          engagement_time: 77
        },
        {
          student_id: 'S0006',
          name: 'Andrew Noble',
          class: 7,
          comprehension: 85.92,
          attention: 73.33,
          focus: 86.13,
          retention: 52.66,
          assessment_score: 80.28,
          engagement_time: 80
        },
        {
          student_id: 'S0007',
          name: 'Kristen Moore',
          class: 9,
          comprehension: 90.31,
          attention: 69.06,
          focus: 73.01,
          retention: 70.32,
          assessment_score: 70.83,
          engagement_time: 82
        },
        {
          student_id: 'S0008',
          name: 'Stacy Casey',
          class: 10,
          comprehension: 83.85,
          attention: 70.24,
          focus: 88.74,
          retention: 66.3,
          assessment_score: 81.1,
          engagement_time: 101
        }
      ]

      handleDataUpload(sampleStudents)
    } catch (error) {
      console.error('Failed to load sample data:', error)
    }
  }

  const handleDataUpload = async (uploadedStudents: Student[]) => {
    try {
      // Cluster students and get personas
      const clusteredStudents = await clusterStudents(uploadedStudents)
      setStudents(clusteredStudents)
      
      // Calculate statistics
      const calculatedStats = calculateStudentStats(clusteredStudents)
      setStats(calculatedStats)
      
      // Generate insights
      const generatedInsights = generateInsights(clusteredStudents)
      setInsights(generatedInsights)
    } catch (error) {
      console.error('Error processing student data:', error)
      // Fallback to original data without clustering
      setStudents(uploadedStudents)
      const calculatedStats = calculateStudentStats(uploadedStudents)
      setStats(calculatedStats)
      const generatedInsights = generateInsights(uploadedStudents)
      setInsights(generatedInsights)
    }
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Student Performance Dashboard</h1>
        <p className="text-blue-100 text-lg">
          Analyze and visualize student performance data with interactive charts and actionable insights
        </p>
        <div className="mt-4 flex items-center space-x-4 text-sm text-blue-100">
          <span>📊 Interactive Charts</span>
          <span>📈 Performance Analytics</span>
          <span>💡 AI-Powered Insights</span>
          <span>📋 Detailed Reports</span>
        </div>
      </div>

      {/* CSV Upload Section */}
      <CSVUpload onDataUpload={handleDataUpload} />

      {students.length > 0 && (
        <>
          {/* Overview Statistics */}
          <OverviewStats stats={stats} />

          {/* Interactive Charts */}
          <Charts students={students} />

          {/* Learning Persona Analysis */}
          <PersonaCharts students={students} />

          {/* Student Performance Table */}
          <StudentTable students={students} />

          {/* Data Insights */}
          <Insights insights={insights} />
        </>
      )}

    </div>
  )
}
