"use client"

import type React from "react"
import { memo, useState } from "react"
import { Handle, Position, type NodeProps } from "reactflow"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Building,
  Calendar,
  Award,
  BookOpen,
  Briefcase,
  Globe,
  Star,
  ChevronDown,
  ChevronRight,
} from "lucide-react"

const getNodeIcon = (type: string) => {
  switch (type) {
    case "Person":
      return <User className="h-4 w-4" />
    case "Organization":
      return <Building className="h-4 w-4" />
    case "Role":
      return <Briefcase className="h-4 w-4" />
    case "Degree":
      return <BookOpen className="h-4 w-4" />
    case "Certificate":
      return <Award className="h-4 w-4" />
    case "Duration":
      return <Calendar className="h-4 w-4" />
    case "Skill":
      return <Star className="h-4 w-4" />
    case "Language":
      return <Globe className="h-4 w-4" />
    default:
      return null
  }
}

const getNodeColor = (type: string) => {
  switch (type) {
    case "Person":
      return "bg-blue-100 border-blue-300 text-blue-800"
    case "Section":
      return "bg-purple-100 border-purple-300 text-purple-800"
    case "Role":
      return "bg-green-100 border-green-300 text-green-800"
    case "Degree":
      return "bg-orange-100 border-orange-300 text-orange-800"
    case "Certificate":
      return "bg-yellow-100 border-yellow-300 text-yellow-800"
    case "Skill":
      return "bg-pink-100 border-pink-300 text-pink-800"
    case "Project":
      return "bg-indigo-100 border-indigo-300 text-indigo-800"
    default:
      return "bg-gray-100 border-gray-300 text-gray-800"
  }
}

interface CustomNodeData {
  label: string
  type: string
  description?: string
  children?: any[]
  expanded?: boolean
}

function CustomNode({ data, selected }: NodeProps<CustomNodeData>) {
  const [isExpanded, setIsExpanded] = useState(data.expanded || false)
  const hasChildren = data.children && data.children.length > 0

  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsExpanded(!isExpanded)
  }

  return (
    <Card
      className={`min-w-[200px] max-w-[300px] ${selected ? "ring-2 ring-blue-500" : ""} ${getNodeColor(data.type)}`}
    >
      <CardContent className="p-3">
        <div className="flex items-start gap-2">
          {getNodeIcon(data.type)}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <h3 className="font-semibold text-sm leading-tight break-words">{data.label}</h3>
              {hasChildren && (
                <button onClick={handleToggleExpand} className="flex-shrink-0 p-1 hover:bg-white/50 rounded">
                  {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                </button>
              )}
            </div>

            {data.description && <p className="text-xs text-muted-foreground mt-1 break-words">{data.description}</p>}

            <Badge variant="secondary" className="text-xs mt-2">
              {data.type}
            </Badge>

            {isExpanded && hasChildren && (
              <div className="mt-2 space-y-1">
                {data.children?.slice(0, 3).map((child: any, index: number) => (
                  <div key={index} className="text-xs p-1 bg-white/50 rounded">
                    {child.label}
                  </div>
                ))}
                {data.children && data.children.length > 3 && (
                  <div className="text-xs text-muted-foreground">+{data.children.length - 3} more...</div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-gray-400" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 !bg-gray-400" />
    </Card>
  )
}

export default memo(CustomNode)
