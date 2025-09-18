'use client'

import React, { useState, useRef } from 'react'
import Papa from 'papaparse'
import { Upload, Download, FileText, AlertCircle } from 'lucide-react'
import { Student } from '@/types/student'

interface CSVUploadProps {
  onDataUpload: (students: Student[]) => void
}

export default function CSVUpload({ onDataUpload }: CSVUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setError(null)
    setUploadedFileName(file.name)

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const students = validateAndTransformData(results.data)
          onDataUpload(students)
          setIsUploading(false)
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to parse CSV file')
          setIsUploading(false)
          setUploadedFileName(null)
        }
      },
      error: (error) => {
        setError(`CSV parsing error: ${error.message}`)
        setIsUploading(false)
        setUploadedFileName(null)
      }
    })
  }

  const validateAndTransformData = (data: any[]): Student[] => {
    if (!data || data.length === 0) {
      throw new Error('CSV file is empty')
    }

    const firstRow = data[0]
    
    // Check for new format (preferred) or legacy format
    const hasNewFormat = 'comprehension' in firstRow && 'focus' in firstRow && 'retention' in firstRow
    const hasLegacyFormat = 'math' in firstRow && 'science' in firstRow && 'english' in firstRow
    
    if (!hasNewFormat && !hasLegacyFormat) {
      throw new Error('CSV must contain either (comprehension, focus, retention, attention) or (math, science, english, skill, attention) columns')
    }

    // Required fields based on format
    const requiredFields = hasNewFormat 
      ? ['name', 'comprehension', 'focus', 'retention', 'attention']
      : ['name', 'math', 'science', 'english', 'skill', 'attention']
    
    const missingFields = requiredFields.filter(field => !(field in firstRow))
    if (missingFields.length > 0) {
      throw new Error(`Missing required columns: ${missingFields.join(', ')}`)
    }

    return data.map((row, index) => {
      const student: any = {}
      
      // Validate and transform name
      student.name = String(row.name || '').trim()
      if (!student.name) {
        throw new Error(`Row ${index + 1}: Name is required`)
      }

      // Handle optional student_id
      if (row.student_id) {
        student.student_id = String(row.student_id).trim()
      }

      // Handle optional class
      if (row.class !== undefined && row.class !== '') {
        const classValue = parseInt(row.class)
        if (!isNaN(classValue)) {
          student.class = classValue
        }
      }

      if (hasNewFormat) {
        // New format: floating-point values for comprehension, focus, retention, attention
        const floatFields = ['comprehension', 'focus', 'retention', 'attention']
        floatFields.forEach(field => {
          const value = parseFloat(row[field])
          if (isNaN(value)) {
            throw new Error(`Row ${index + 1}: ${field} must be a valid number`)
          }
          // All fields in new format are 0-100 scale (including attention)
          if (value < 0 || value > 100) {
            throw new Error(`Row ${index + 1}: ${field} must be between 0 and 100`)
          }
          student[field] = value
        })

        // Handle assessment_score as float
        if (row.assessment_score !== undefined && row.assessment_score !== '') {
          const assessmentScore = parseFloat(row.assessment_score)
          if (!isNaN(assessmentScore)) {
            if (assessmentScore < 0 || assessmentScore > 100) {
              throw new Error(`Row ${index + 1}: assessment_score must be between 0 and 100`)
            }
            student.assessment_score = Math.round(assessmentScore * 100) / 100 // Round to 2 decimal places
          }
        }

        if (row.engagement_time !== undefined && row.engagement_time !== '') {
          const engagementTime = parseInt(row.engagement_time)
          if (!isNaN(engagementTime)) {
            if (engagementTime < 0) {
              throw new Error(`Row ${index + 1}: engagement_time must be a positive integer`)
            }
            student.engagement_time = engagementTime
          }
        }
      } else {
        // Legacy format: math, science, english, skill, attention
        const numericFields = ['math', 'science', 'english', 'skill', 'attention']
        numericFields.forEach(field => {
          const value = parseFloat(row[field])
          if (isNaN(value)) {
            throw new Error(`Row ${index + 1}: ${field} must be a valid number`)
          }
          if (field === 'attention') {
            if (value < 0 || value > 10) {
              throw new Error(`Row ${index + 1}: attention must be between 0 and 10`)
            }
          } else {
            if (value < 0 || value > 100) {
              throw new Error(`Row ${index + 1}: ${field} must be between 0 and 100`)
            }
          }
          student[field] = value
        })
      }

      return student as Student
    })
  }

  const downloadSampleCSV = () => {
    const link = document.createElement('a')
    link.href = '/sample_students.csv'
    link.download = 'sample_students.csv'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Upload Student Data</h2>
        <button
          onClick={downloadSampleCSV}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Download className="h-4 w-4 mr-2" />
          Download Sample
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-2 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">CSV files only</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {isUploading && (
          <div className="flex items-center justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-sm text-gray-600">Processing CSV file...</span>
          </div>
        )}

        {uploadedFileName && !error && (
          <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-md">
            <FileText className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-sm text-green-800">
              Successfully uploaded: {uploadedFileName}
            </span>
          </div>
        )}

        {error && (
          <div className="flex items-start p-3 bg-red-50 border border-red-200 rounded-md">
            <AlertCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-red-800">
              <p className="font-medium">Upload Error:</p>
              <p>{error}</p>
            </div>
          </div>
        )}

        <div className="text-xs text-gray-500 space-y-1">
          <p><strong>Format:</strong> name, comprehension, focus, retention, attention, assessment_score, engagement_time</p>
          <p><strong>Data types:</strong> Comprehension, Focus, Retention, Attention (floating-point), Assessment Score, Engagement Time (integers)</p>
          <p><strong>Ranges:</strong> Academic scores (0-100), Attention (0-100), Engagement Time (minutes/day)</p>
        </div>
      </div>
    </div>
  )
}
