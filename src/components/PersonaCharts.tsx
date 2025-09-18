'use client'

import React from 'react'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts'
import { Student } from '@/types/student'

interface PersonaChartsProps {
  students: Student[]
}

export default function PersonaCharts({ students }: PersonaChartsProps) {
  // Calculate persona distribution
  const personaDistribution = students.reduce((acc, student) => {
    if (student.persona) {
      const personaType = student.persona.type
      acc[personaType] = (acc[personaType] || 0) + 1
    }
    return acc
  }, {} as Record<string, number>)

  const pieData = Object.entries(personaDistribution).map(([type, count]) => ({
    name: type,
    value: count,
    percentage: ((count / students.length) * 100).toFixed(1)
  }))

  // Calculate average assessment scores by persona
  const personaScores = students.reduce((acc, student) => {
    if (student.persona && student.assessment_score) {
      const personaType = student.persona.type
      if (!acc[personaType]) {
        acc[personaType] = { total: 0, count: 0 }
      }
      acc[personaType].total += student.assessment_score
      acc[personaType].count += 1
    }
    return acc
  }, {} as Record<string, { total: number; count: number }>)

  const barData = Object.entries(personaScores).map(([type, data]) => ({
    persona: type,
    averageScore: Math.round(data.total / data.count),
    count: data.count
  }))

  const COLORS = {
    'High Achiever': '#10B981',
    'Steady Learner': '#3B82F6', 
    'Inconsistent Performer': '#F59E0B',
    'Needs Support': '#EF4444'
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p>Students: {data.value}</p>
          <p>Percentage: {data.percentage}%</p>
        </div>
      )
    }
    return null
  }

  const BarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
          <p className="font-medium">{data.persona}</p>
          <p>Average Score: {data.averageScore}</p>
          <p>Students: {data.count}</p>
        </div>
      )
    }
    return null
  }

  if (students.length === 0 || pieData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Learning Persona Analysis</h2>
        <div className="text-center py-12 text-gray-500">
          Upload student data to view persona distribution
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Persona Distribution Pie Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Persona Distribution</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name}: ${percentage}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Average Assessment Scores by Persona */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Average Assessment Scores by Persona</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="persona" 
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0}
                fontSize={12}
              />
              <YAxis 
                domain={[0, 100]}
                label={{ value: 'Average Assessment Score', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<BarTooltip />} />
              <Bar dataKey="averageScore" name="Average Score">
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.persona as keyof typeof COLORS]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Persona Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(personaDistribution).map(([personaType, count]) => {
          const percentage = ((count / students.length) * 100).toFixed(1)
          const avgScore = personaScores[personaType] 
            ? Math.round(personaScores[personaType].total / personaScores[personaType].count)
            : 0
          
          return (
            <div key={personaType} className="bg-white rounded-lg shadow-md p-4 border-l-4" 
                 style={{ borderLeftColor: COLORS[personaType as keyof typeof COLORS] }}>
              <h4 className="font-medium text-gray-900 mb-2">{personaType}</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p>Students: {count} ({percentage}%)</p>
                <p>Avg Assessment: {avgScore}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
