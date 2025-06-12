"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Brain, User, Building, Newspaper } from "lucide-react"
import MindmapCanvas from "@/components/mindmap-canvas"
import FileUpload from "@/components/file-upload"

export default function HomePage() {
  const [showMindmap, setShowMindmap] = useState(false)
  const [profileType, setProfileType] = useState("")
  const [profileName, setProfileName] = useState("")
  const [uploadMode, setUploadMode] = useState(false)
  const [resumeData, setResumeData] = useState<any>(null)

  const handleGenerateMindmap = () => {
    if (profileName && profileType) {
      setShowMindmap(true)
    }
  }

  const handleBackToHome = () => {
    setShowMindmap(false)
    setProfileName("")
    setProfileType("")
    setResumeData(null)
  }

  if (showMindmap) {
    return (
      <MindmapCanvas
        profileName={profileName}
        profileType={profileType}
        onBack={handleBackToHome}
        resumeData={resumeData}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Brain className="h-16 w-16 text-blue-600" />
          </div>
          <CardTitle className="text-3xl font-bold">Mindmap Profiler</CardTitle>
          <CardDescription className="text-lg">
            Create interactive mindmaps to explore and profile entities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Button variant={!uploadMode ? "default" : "outline"} onClick={() => setUploadMode(false)}>
              Manual Entry
            </Button>
            <Button variant={uploadMode ? "default" : "outline"} onClick={() => setUploadMode(true)}>
              Upload Resume JSON
            </Button>
          </div>

          {uploadMode ? (
            <FileUpload
              onDataLoaded={(data) => {
                setProfileName(data.name)
                setProfileType("person")
                setResumeData(data)
                setShowMindmap(true)
              }}
            />
          ) : (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">What would you like to profile?</label>
                <Input
                  placeholder="Enter name (e.g., Dr. Jane Doe, Google, AI Ethics)"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Profile Type</label>
                <Select value={profileType} onValueChange={setProfileType}>
                  <SelectTrigger className="text-lg">
                    <SelectValue placeholder="Select profile type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="person">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Person
                      </div>
                    </SelectItem>
                    <SelectItem value="organization">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        Organization
                      </div>
                    </SelectItem>
                    <SelectItem value="topic">
                      <div className="flex items-center gap-2">
                        <Newspaper className="h-4 w-4" />
                        News Topic
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleGenerateMindmap}
                disabled={!profileName || !profileType}
                className="w-full text-lg py-6"
                size="lg"
              >
                Generate Mindmap
              </Button>
            </>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <Card className="p-4 text-center">
              <User className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <h3 className="font-semibold">Person Profiles</h3>
              <p className="text-sm text-muted-foreground">Explore relationships, career, and achievements</p>
            </Card>
            <Card className="p-4 text-center">
              <Building className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <h3 className="font-semibold">Organizations</h3>
              <p className="text-sm text-muted-foreground">Visualize structure, leadership, and timeline</p>
            </Card>
            <Card className="p-4 text-center">
              <Newspaper className="h-8 w-8 mx-auto mb-2 text-orange-600" />
              <h3 className="font-semibold">News Topics</h3>
              <p className="text-sm text-muted-foreground">Map events, actors, and consequences</p>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
