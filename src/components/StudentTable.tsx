'use client'

import React, { useState, useMemo } from 'react'
import { Search, ChevronUp, ChevronDown, ArrowUpDown } from 'lucide-react'
import { Student } from '@/types/student'
import { formatNumber } from '@/lib/utils'

interface StudentTableProps {
  students: Student[]
}

type SortField = keyof Student | 'average' | 'persona' | 'overall_performance'
type SortDirection = 'asc' | 'desc'

export default function StudentTable({ students }: StudentTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  // Add calculated fields to each student for sorting and display
  const studentsWithAverage = useMemo(() => {
    return students.map(student => {
      let average = 0
      let overall_performance = 0
      
      // Calculate average based on available data
      if (student.math !== undefined && student.science !== undefined && student.english !== undefined) {
        average = (student.math + student.science + student.english) / 3
      } else if (student.comprehension !== undefined && student.focus !== undefined && student.retention !== undefined) {
        average = (student.comprehension + student.focus + student.retention) / 3
      } else if (student.assessment_score !== undefined) {
        average = student.assessment_score
      }
      
      // Calculate overall performance score
      if (student.comprehension !== undefined) {
        overall_performance = (
          (student.comprehension || 0) * 0.3 +
          (student.focus || 0) * 0.2 +
          (student.retention || 0) * 0.2 +
          (student.attention || 0) * 0.2 +
          Math.min(((student.engagement_time || 0) / 120) * 100, 100) * 0.1
        )
      } else {
        overall_performance = average
      }
      
      return {
        ...student,
        average,
        overall_performance
      }
    })
  }, [students])

  // Filter students based on search term (search by name or student_id)
  const filteredStudents = useMemo(() => {
    return studentsWithAverage.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.student_id && student.student_id.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  }, [studentsWithAverage, searchTerm])

  // Sort students
  const sortedStudents = useMemo(() => {
    return [...filteredStudents].sort((a, b) => {
      let aValue: any = a[sortField]
      let bValue: any = b[sortField]
      
      // Handle persona sorting
      if (sortField === 'persona') {
        aValue = a.persona?.type || ''
        bValue = b.persona?.type || ''
      }
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' 
          ? aValue - bValue
          : bValue - aValue
      }
      
      return 0
    })
  }, [filteredStudents, sortField, sortDirection])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4 text-gray-400" />
    }
    return sortDirection === 'asc' 
      ? <ChevronUp className="h-4 w-4 text-blue-600" />
      : <ChevronDown className="h-4 w-4 text-blue-600" />
  }

  const getScoreColor = (score: number, isAttention: boolean = false) => {
    const threshold = isAttention ? 7 : 80
    const lowThreshold = isAttention ? 5 : 60
    
    if (score >= threshold) return 'text-green-600 bg-green-50'
    if (score >= lowThreshold) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  if (students.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Student Performance Table</h2>
        <div className="text-center py-12 text-gray-500">
          Upload student data to view the performance table
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Student Performance Table</h2>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name or student ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('student_id')}
              >
                <div className="flex items-center space-x-1">
                  <span>Student ID</span>
                  {getSortIcon('student_id')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center space-x-1">
                  <span>Name</span>
                  {getSortIcon('name')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('class')}
              >
                <div className="flex items-center space-x-1">
                  <span>Class</span>
                  {getSortIcon('class')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('comprehension')}
              >
                <div className="flex items-center space-x-1">
                  <span>Comprehension</span>
                  {getSortIcon('comprehension')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('focus')}
              >
                <div className="flex items-center space-x-1">
                  <span>Focus</span>
                  {getSortIcon('focus')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('retention')}
              >
                <div className="flex items-center space-x-1">
                  <span>Retention</span>
                  {getSortIcon('retention')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('attention')}
              >
                <div className="flex items-center space-x-1">
                  <span>Attention</span>
                  {getSortIcon('attention')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('assessment_score')}
              >
                <div className="flex items-center space-x-1">
                  <span>Assessment Score</span>
                  {getSortIcon('assessment_score')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('engagement_time')}
              >
                <div className="flex items-center space-x-1">
                  <span>Engagement Time</span>
                  {getSortIcon('engagement_time')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('persona')}
              >
                <div className="flex items-center space-x-1">
                  <span>Learning Persona</span>
                  {getSortIcon('persona')}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedStudents.map((student, index) => (
              <tr key={student.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                  {student.student_id || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {student.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {student.class || 'N/A'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {student.comprehension !== undefined ? (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(student.comprehension)}`}>
                      {formatNumber(student.comprehension)}
                    </span>
                  ) : (
                    <span className="text-gray-400 text-xs">N/A</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {student.focus !== undefined ? (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(student.focus)}`}>
                      {formatNumber(student.focus)}
                    </span>
                  ) : (
                    <span className="text-gray-400 text-xs">N/A</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {student.retention !== undefined ? (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(student.retention)}`}>
                      {formatNumber(student.retention)}
                    </span>
                  ) : (
                    <span className="text-gray-400 text-xs">N/A</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {student.attention !== undefined ? (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(student.attention)}`}>
                      {formatNumber(student.attention, 0)}
                    </span>
                  ) : (
                    <span className="text-gray-400 text-xs">N/A</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {student.assessment_score !== undefined ? (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(student.assessment_score)}`}>
                      {formatNumber(student.assessment_score, 1)}
                    </span>
                  ) : (
                    <span className="text-gray-400 text-xs">N/A</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {student.engagement_time !== undefined ? (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {student.engagement_time} min
                    </span>
                  ) : (
                    <span className="text-gray-400 text-xs">N/A</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {student.persona ? (
                    <div className="flex flex-col">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${student.persona.color}`}>
                        {student.persona.type}
                      </span>
                      <span className="text-xs text-gray-500 mt-1 max-w-xs truncate" title={student.persona.description}>
                        {student.persona.description}
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-400 text-xs">N/A</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sortedStudents.length === 0 && searchTerm && (
        <div className="text-center py-8 text-gray-500">
          No students found matching "{searchTerm}"
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600">
        Showing {sortedStudents.length} of {students.length} students
      </div>
    </div>
  )
}
