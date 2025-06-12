"use client"

import type React from "react"

import { useState } from "react"
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
  Mail,
  Users,
  CheckSquare,
} from "lucide-react"
import type { MindmapNodeData } from "@/lib/sample-data"

interface MindmapNodeProps {
  node: MindmapNodeData
  darkMode: boolean
  onContextMenu: (e: React.MouseEvent, nodeId: string) => void
  onMouseDown?: (e: React.MouseEvent, nodeId: string) => void
  isDragging?: boolean
}

const getNodeIcon = (type: string) => {
  switch (type) {
    case "Person":
      return User
    case "Organization":
      return Building
    case "Role":
      return Briefcase
    case "Degree":
      return BookOpen
    case "Certificate":
      return Award
    case "Duration":
      return Calendar
    case "Skill":
      return Star
    case "Language":
      return Globe
    case "Contact":
      return Mail
    case "Task":
      return CheckSquare
    case "Reference":
      return Users
    default:
      return null
  }
}

const getNodeColor = (type: string, darkMode: boolean) => {
  const colors = {
    Person: darkMode ? "#3b82f6" : "#dbeafe",
    Section: darkMode ? "#8b5cf6" : "#ede9fe",
    Role: darkMode ? "#10b981" : "#d1fae5",
    Degree: darkMode ? "#f59e0b" : "#fef3c7",
    Certificate: darkMode ? "#eab308" : "#fef9c3",
    Skill: darkMode ? "#ec4899" : "#fce7f3",
    Project: darkMode ? "#6366f1" : "#e0e7ff",
    Contact: darkMode ? "#06b6d4" : "#cffafe",
    Task: darkMode ? "#84cc16" : "#ecfccb",
    Reference: darkMode ? "#f97316" : "#fed7aa",
    default: darkMode ? "#6b7280" : "#f3f4f6",
  }
  return colors[type as keyof typeof colors] || colors.default
}

export default function MindmapNode({
  node,
  darkMode,
  onContextMenu,
  onMouseDown,
  isDragging = false,
}: MindmapNodeProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const IconComponent = getNodeIcon(node.type)
  const nodeColor = getNodeColor(node.type, darkMode)
  const textColor = darkMode ? "#ffffff" : "#1f2937"
  const borderColor = darkMode ? "#4b5563" : "#d1d5db"

  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsExpanded(!isExpanded)
  }

  const maxWidth = 280 // Increased from 200
  const padding = 20 // Increased from 12
  const lineHeight = 20 // Increased from 16
  const headerHeight = 32 // Increased from 24

  // Calculate text dimensions with better spacing
  const words = node.label.split(" ")
  const lines: string[] = []
  let currentLine = ""

  words.forEach((word) => {
    const testLine = currentLine ? `${currentLine} ${word}` : word
    if (testLine.length * 9 > maxWidth - padding * 2) {
      // Increased character width
      if (currentLine) {
        lines.push(currentLine)
        currentLine = word
      } else {
        lines.push(word)
      }
    } else {
      currentLine = testLine
    }
  })
  if (currentLine) lines.push(currentLine)

  const textHeight = lines.length * lineHeight
  const descriptionLines = node.description
    ? node.description.split(" ").reduce(
        (acc: string[], word) => {
          const lastLine = acc[acc.length - 1] || ""
          if ((lastLine + " " + word).length * 8 > maxWidth - padding * 2) {
            // Better character spacing
            acc.push(word)
          } else {
            acc[acc.length - 1] = lastLine ? `${lastLine} ${word}` : word
          }
          return acc
        },
        [""],
      )
    : []

  const descriptionHeight = isExpanded && node.description ? descriptionLines.length * 18 + 12 : 0 // Increased spacing
  const nodeHeight = headerHeight + textHeight + descriptionHeight + padding * 2 + 8 // Added extra padding

  return (
    <g
      transform={`translate(${node.x}, ${node.y})`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onContextMenu={(e) => onContextMenu(e, node.id)}
      onMouseDown={(e) => onMouseDown?.(e, node.id)}
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
    >
      {/* Drop shadow and gradient definitions */}
      <defs>
        <filter id={`shadow-${node.id}`} x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.3" />
        </filter>
        <linearGradient id={`gradient-${node.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={nodeColor} stopOpacity="1" />
          <stop offset="100%" stopColor={nodeColor} stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Node background with gradient and shadow */}
      <rect
        x={-maxWidth / 2}
        y={-nodeHeight / 2}
        width={maxWidth}
        height={nodeHeight}
        fill={`url(#gradient-${node.id})`}
        stroke={isHovered || isDragging ? "#3b82f6" : borderColor}
        strokeWidth={isHovered || isDragging ? 3 : 1}
        rx={12}
        ry={12}
        filter={`url(#shadow-${node.id})`}
        style={{
          transition: "all 0.2s ease-in-out",
          transform: isHovered || isDragging ? "scale(1.02)" : "scale(1)",
        }}
      />

      {/* Glowing border effect when hovered */}
      {(isHovered || isDragging) && (
        <rect
          x={-maxWidth / 2}
          y={-nodeHeight / 2}
          width={maxWidth}
          height={nodeHeight}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="1"
          rx={12}
          ry={12}
          opacity="0.5"
          strokeDasharray="4,4"
        >
          <animate attributeName="stroke-dashoffset" values="0;8" dur="1s" repeatCount="indefinite" />
        </rect>
      )}

      {/* Icon with better positioning */}
      {IconComponent && (
        <g transform={`translate(${-maxWidth / 2 + 20}, ${-nodeHeight / 2 + 20})`}>
          <IconComponent size={18} color={textColor} />
        </g>
      )}

      {/* Expand/Collapse button with better positioning */}
      {node.description && (
        <g
          transform={`translate(${maxWidth / 2 - 24}, ${-nodeHeight / 2 + 20})`}
          onClick={handleToggleExpand}
          style={{ cursor: "pointer" }}
        >
          <circle r={10} fill={darkMode ? "#374151" : "#f3f4f6"} stroke={borderColor} />
          {isExpanded ? (
            <ChevronDown size={14} x={-7} y={-7} color={textColor} />
          ) : (
            <ChevronRight size={14} x={-7} y={-7} color={textColor} />
          )}
        </g>
      )}

      {/* Node title with better spacing */}
      <g
        transform={`translate(${-maxWidth / 2 + padding + (IconComponent ? 32 : 0)}, ${-nodeHeight / 2 + padding + 20})`}
      >
        {lines.map((line, index) => (
          <text key={index} x={0} y={index * lineHeight} fill={textColor} fontSize="15" fontWeight="600">
            {line}
          </text>
        ))}
      </g>

      {/* Node description with better spacing */}
      {isExpanded && node.description && (
        <g
          transform={`translate(${-maxWidth / 2 + padding}, ${-nodeHeight / 2 + padding + headerHeight + textHeight + 16})`}
        >
          {descriptionLines.map((line, index) => (
            <text key={index} x={0} y={index * 18} fill={darkMode ? "#d1d5db" : "#6b7280"} fontSize="13">
              {line}
            </text>
          ))}
        </g>
      )}

      {/* Node type badge with better positioning */}
      <g transform={`translate(${-maxWidth / 2 + padding}, ${nodeHeight / 2 - 24})`}>
        <rect
          width={node.type.length * 8 + 12}
          height={18}
          fill={darkMode ? "#374151" : "#e5e7eb"}
          rx={9}
          ry={9}
          opacity="0.9"
        />
        <text x={6} y={13} fill={darkMode ? "#d1d5db" : "#6b7280"} fontSize="11" fontWeight="500">
          {node.type}
        </text>
      </g>

      {/* Tooltip on hover */}
      {isHovered && node.description && !isExpanded && (
        <g transform={`translate(0, ${-nodeHeight / 2 - 40})`}>
          <rect
            x={-100}
            y={-20}
            width={200}
            height={30}
            fill={darkMode ? "#1f2937" : "#ffffff"}
            stroke={borderColor}
            rx={8}
            ry={8}
            opacity="0.95"
            filter={`url(#shadow-${node.id})`}
          />
          <text x={0} y={-5} fill={textColor} fontSize="12" textAnchor="middle">
            {node.description.length > 30 ? `${node.description.substring(0, 30)}...` : node.description}
          </text>
        </g>
      )}
    </g>
  )
}
