'use client'

import React, { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend
} from 'recharts'
import { Student } from '@/types/student'

interface ChartsProps {
  students: Student[]
}

export default function Charts({ students }: ChartsProps) {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(
    students.length > 0 ? students[0] : null
  )

  // Prepare data for comprehension vs score bar chart (updated for new format)
  const skillScoreData = students.map(student => ({
    name: student.name,
    comprehension: student.comprehension || 0,
    assessmentScore: student.assessment_score || 0
  })).sort((a, b) => b.comprehension - a.comprehension).slice(0, 10) // Show top 10

  // Prepare data for attention vs performance scatter plot
  const attentionPerformanceData = students.map(student => ({
    attention: student.attention || 0,
    performance: student.assessment_score || 0,
    name: student.name
  }))

  // Prepare data for individual student radar chart (new format)
  const radarData = selectedStudent ? [
    {
      subject: 'Comprehension',
      score: selectedStudent.comprehension || 0,
      fullMark: 100
    },
    {
      subject: 'Focus',
      score: selectedStudent.focus || 0,
      fullMark: 100
    },
    {
      subject: 'Retention',
      score: selectedStudent.retention || 0,
      fullMark: 100
    },
    {
      subject: 'Attention',
      score: selectedStudent.attention || 0,
      fullMark: 100
    },
    {
      subject: 'Assessment',
      score: selectedStudent.assessment_score || 0,
      fullMark: 100
    }
  ] : []

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
          <p className="font-medium">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value.toFixed(1)}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const ScatterTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p style={{ color: payload[0].color }}>
            Attention: {data.attention.toFixed(1)}
          </p>
          <p style={{ color: payload[0].color }}>
            Performance: {data.performance.toFixed(1)}
          </p>
        </div>
      )
    }
    return null
  }

  if (students.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Interactive Charts</h2>
        <div className="text-center py-12 text-gray-500">
          Upload student data to view interactive charts
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Comprehension vs Assessment Score Bar Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Comprehension vs Assessment Score</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={skillScoreData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0}
                fontSize={12}
              />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="comprehension" fill="#3B82F6" name="Comprehension" />
              <Bar dataKey="assessmentScore" fill="#10B981" name="Assessment Score" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Attention vs Performance Scatter Plot */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Attention vs Performance Correlation</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart data={attentionPerformanceData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number" 
                dataKey="attention" 
                name="Attention" 
                domain={[0, 100]}
                label={{ value: 'Attention Level', position: 'insideBottom', offset: -10 }}
              />
              <YAxis 
                type="number" 
                dataKey="performance" 
                name="Performance"
                domain={[0, 100]}
                label={{ value: 'Average Performance', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<ScatterTooltip />} />
              <Scatter dataKey="performance" fill="#8B5CF6" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Individual Student Radar Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Individual Student Profile</h3>
          <select
            value={selectedStudent?.name || ''}
            onChange={(e) => {
              const student = students.find(s => s.name === e.target.value)
              setSelectedStudent(student || null)
            }}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {students.map((student) => (
              <option key={student.name} value={student.name}>
                {student.name}
              </option>
            ))}
          </select>
        </div>
        
        {selectedStudent && (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]} 
                  tick={false}
                />
                <Radar
                  name={selectedStudent.name}
                  dataKey="score"
                  stroke="#F59E0B"
                  fill="#F59E0B"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Tooltip 
                  formatter={(value: any, name: any) => [
                    name === 'Attention' ? (value / 10).toFixed(1) : value.toFixed(1),
                    name
                  ]}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  )
}
