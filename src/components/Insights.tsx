'use client'

import React from 'react'
import { AlertTriangle } from 'lucide-react'
import { InsightData } from '@/types/student'

interface InsightsProps {
  insights: InsightData
}

export default function Insights({ insights }: InsightsProps) {
  // Only show outliers section if there are any outliers
  if (insights.outliers.length === 0) {
    return null // Don't render anything if no outliers
  }

  return (
    <div className="space-y-6">
      {/* Outliers - Only section we keep */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <AlertTriangle className="h-6 w-6 text-orange-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Students Requiring Attention</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.outliers.map((student, index) => (
            <div key={index} className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h4 className="font-medium text-orange-800">{student.name}</h4>
              <p className="text-sm text-orange-700 mt-1">
                Assessment Score: {student.assessment_score?.toFixed(1) || 'N/A'}
              </p>
              <p className="text-xs text-orange-600 mt-2">
                Performance significantly differs from class average
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
