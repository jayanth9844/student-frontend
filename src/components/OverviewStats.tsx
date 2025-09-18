'use client'

import React from 'react'
import { Users, TrendingUp, Award, Eye } from 'lucide-react'
import { StudentStats } from '@/types/student'
import { formatNumber } from '@/lib/utils'

interface OverviewStatsProps {
  stats: StudentStats
}

export default function OverviewStats({ stats }: OverviewStatsProps) {
  const statCards = [
    {
      title: 'Total Students',
      value: stats.totalStudents.toString(),
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Average Comprehension',
      value: formatNumber(stats.averageMath, 1),
      icon: TrendingUp,
      color: 'bg-green-500',
    },
    {
      title: 'Average Focus',
      value: formatNumber(stats.averageScience, 1),
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
    {
      title: 'Average Retention',
      value: formatNumber(stats.averageEnglish, 1),
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
    {
      title: 'Average Assessment Score',
      value: formatNumber(stats.averageSkill, 1),
      icon: Award,
      color: 'bg-indigo-500',
    },
    {
      title: 'Average Attention',
      value: formatNumber(stats.averageAttention, 0),
      icon: Eye,
      color: 'bg-pink-500',
    },
  ]

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Overview Statistics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center">
              <div className={`${stat.color} rounded-lg p-3 mr-4`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {stats.topPerformer && stats.lowestPerformer && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-green-800 mb-2">Top Performer</h3>
            <p className="text-green-700 font-semibold">{stats.topPerformer.name}</p>
            <div className="mt-2 text-sm text-green-600">
              <p>Comprehension: {formatNumber(stats.topPerformer.comprehension || 0)}</p>
              <p>Focus: {formatNumber(stats.topPerformer.focus || 0)}</p>
              <p>Retention: {formatNumber(stats.topPerformer.retention || 0)}</p>
              <p>Assessment Score: {formatNumber(stats.topPerformer.assessment_score || 0)}</p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-yellow-800 mb-2">Needs Support</h3>
            <p className="text-yellow-700 font-semibold">{stats.lowestPerformer.name}</p>
            <div className="mt-2 text-sm text-yellow-600">
              <p>Comprehension: {formatNumber(stats.lowestPerformer.comprehension || 0)}</p>
              <p>Focus: {formatNumber(stats.lowestPerformer.focus || 0)}</p>
              <p>Retention: {formatNumber(stats.lowestPerformer.retention || 0)}</p>
              <p>Assessment Score: {formatNumber(stats.lowestPerformer.assessment_score || 0)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
