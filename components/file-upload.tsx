"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, FileText, AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface FileUploadProps {
  onDataLoaded: (data: any) => void
}

export default function FileUpload({ onDataLoaded }: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (file: File) => {
    if (!file.name.endsWith(".json")) {
      setError("Please upload a JSON file")
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const text = await file.text()
      const jsonData = JSON.parse(text)

      // Handle both single object and array formats
      const resumeData = Array.isArray(jsonData) ? jsonData[0] : jsonData

      if (!resumeData.name) {
        throw new Error("Invalid resume format: missing name field")
      }

      setSuccess(true)
      setTimeout(() => {
        onDataLoaded(resumeData)
      }, 1000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to parse JSON file")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-4">
      <Card
        className={`border-2 border-dashed transition-colors cursor-pointer ${
          isDragOver
            ? "border-blue-500 bg-blue-50"
            : success
              ? "border-green-500 bg-green-50"
              : "border-gray-300 hover:border-gray-400"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        <CardContent className="flex flex-col items-center justify-center py-12 px-6">
          {isLoading ? (
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="text-sm text-muted-foreground">Processing resume data...</p>
            </div>
          ) : success ? (
            <div className="flex flex-col items-center gap-4 text-green-600">
              <CheckCircle className="h-12 w-12" />
              <p className="text-lg font-semibold">Resume loaded successfully!</p>
              <p className="text-sm text-muted-foreground">Generating mindmap...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <Upload className="h-12 w-12 text-gray-400" />
              <div className="text-center">
                <p className="text-lg font-semibold">Upload Resume JSON</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Drag and drop your JSON file here, or click to browse
                </p>
              </div>
              <Button variant="outline" className="mt-2">
                <FileText className="h-4 w-4 mr-2" />
                Choose File
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <input ref={fileInputRef} type="file" accept=".json" onChange={handleFileInputChange} className="hidden" />

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="text-sm text-muted-foreground">
        <p className="font-medium mb-2">Supported format:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>JSON files with resume data structure</li>
          <li>Must contain: name, education, workExperience, skills</li>
          <li>Supports both single object and array formats</li>
        </ul>
      </div>
    </div>
  )
}
