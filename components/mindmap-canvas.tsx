"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Search, Download, Moon, Sun, ZoomIn, ZoomOut, RotateCcw, Maximize } from "lucide-react"
import MindmapNode from "./mindmap-node"
import ContextMenu from "./context-menu"
import { generateSampleData, type MindmapNodeData } from "@/lib/sample-data"

interface MindmapCanvasProps {
  profileName: string
  profileType: string
  onBack: () => void
  resumeData?: any
}

export default function MindmapCanvas({ profileName, profileType, onBack, resumeData }: MindmapCanvasProps) {
  const [nodes, setNodes] = useState<MindmapNodeData[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [darkMode, setDarkMode] = useState(false)
  const [zoom, setZoom] = useState(0.6) // Start with smaller zoom to see everything
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [draggedNode, setDraggedNode] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [contextMenu, setContextMenu] = useState<{
    show: boolean
    x: number
    y: number
    nodeId: string | null
  }>({ show: false, x: 0, y: 0, nodeId: null })

  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Initialize with sample data
  useEffect(() => {
    const initializeNodes = async () => {
      if (resumeData) {
        try {
          const response = await fetch("/api/process-resume", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(resumeData),
          })

          const result = await response.json()
          if (result.success) {
            setNodes(result.nodes)
          } else {
            console.error("Failed to process resume:", result.error)
            const initialNodes = generateSampleData(profileName, profileType)
            setNodes(initialNodes)
          }
        } catch (error) {
          console.error("Error processing resume:", error)
          const initialNodes = generateSampleData(profileName, profileType)
          setNodes(initialNodes)
        }
      } else {
        const initialNodes = generateSampleData(profileName, profileType)
        setNodes(initialNodes)
      }
      setTimeout(() => fitView(), 500)
    }

    initializeNodes()
  }, [profileName, profileType, resumeData])

  const handleNodeMouseDown = useCallback(
    (e: React.MouseEvent, nodeId: string) => {
      e.stopPropagation()
      const node = nodes.find((n) => n.id === nodeId)
      if (!node) return

      setDraggedNode(nodeId)
      const rect = containerRef.current?.getBoundingClientRect()
      if (rect) {
        const x = (e.clientX - rect.left - pan.x) / zoom
        const y = (e.clientY - rect.top - pan.y) / zoom
        setDragOffset({
          x: x - node.x,
          y: y - node.y,
        })
      }
    },
    [nodes, pan, zoom],
  )

  const handleNodeDrag = useCallback(
    (e: React.MouseEvent) => {
      if (!draggedNode) return

      const rect = containerRef.current?.getBoundingClientRect()
      if (rect) {
        const x = (e.clientX - rect.left - pan.x) / zoom - dragOffset.x
        const y = (e.clientY - rect.top - pan.y) / zoom - dragOffset.y

        setNodes((prev) => prev.map((node) => (node.id === draggedNode ? { ...node, x, y } : node)))
      }
    },
    [draggedNode, pan, zoom, dragOffset],
  )

  const handleNodeMouseUp = useCallback(() => {
    setDraggedNode(null)
  }, [])

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === svgRef.current) {
        setIsDragging(true)
        setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
        setContextMenu({ show: false, x: 0, y: 0, nodeId: null })
      }
    },
    [pan],
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (draggedNode) {
        handleNodeDrag(e)
      } else if (isDragging) {
        setPan({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        })
      }
    },
    [isDragging, dragStart, draggedNode, handleNodeDrag],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    handleNodeMouseUp()
  }, [handleNodeMouseUp])

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? 0.9 : 1.1
    setZoom((prev) => Math.max(0.1, Math.min(3, prev * delta)))
  }, [])

  const handleZoomIn = () => setZoom((prev) => Math.min(3, prev * 1.2))
  const handleZoomOut = () => setZoom((prev) => Math.max(0.1, prev / 1.2))
  const handleResetView = () => {
    setZoom(0.6)
    setPan({ x: 0, y: 0 })
  }

  const handleSearch = useCallback(() => {
    if (!searchTerm) return
    const foundNode = nodes.find((node) => node.label.toLowerCase().includes(searchTerm.toLowerCase()))
    if (foundNode) {
      const centerX = (containerRef.current?.clientWidth || 800) / 2
      const centerY = (containerRef.current?.clientHeight || 600) / 2
      setPan({
        x: centerX - foundNode.x * zoom,
        y: centerY - foundNode.y * zoom,
      })
    }
  }, [searchTerm, nodes, zoom])

  const handleNodeContextMenu = useCallback((e: React.MouseEvent, nodeId: string) => {
    e.preventDefault()
    e.stopPropagation()
    setContextMenu({
      show: true,
      x: e.clientX,
      y: e.clientY,
      nodeId,
    })
  }, [])

  const handleAddChildNode = useCallback(
    (parentId: string) => {
      const parentNode = nodes.find((n) => n.id === parentId)
      if (!parentNode) return

      const newNode: MindmapNodeData = {
        id: `node_${Date.now()}`,
        label: "New Node",
        type: "custom",
        description: "Click to edit",
        x: parentNode.x + 300,
        y: parentNode.y + 150,
        parentId,
      }

      setNodes((prev) => [...prev, newNode])
      setContextMenu({ show: false, x: 0, y: 0, nodeId: null })
    },
    [nodes],
  )

  const handleDeleteNode = useCallback((nodeId: string) => {
    setNodes((prev) => prev.filter((node) => node.id !== nodeId && node.parentId !== nodeId))
    setContextMenu({ show: false, x: 0, y: 0, nodeId: null })
  }, [])

  const handleEditNode = useCallback((nodeId: string, newLabel: string) => {
    setNodes((prev) => prev.map((node) => (node.id === nodeId ? { ...node, label: newLabel } : node)))
  }, [])

  const exportMindmap = useCallback(() => {
    const mindmapData = {
      nodes,
      profileName,
      profileType,
      exportDate: new Date().toISOString(),
    }

    const dataStr = JSON.stringify(mindmapData, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = `${profileName.replace(/\s+/g, "_")}_mindmap.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }, [nodes, profileName, profileType])

  const renderConnections = () => {
    return nodes
      .filter((node) => node.parentId)
      .map((node) => {
        const parent = nodes.find((n) => n.id === node.parentId)
        if (!parent) return null

        // Calculate control points for smooth curves
        const dx = node.x - parent.x
        const dy = node.y - parent.y

        // Create curved path
        const controlPoint1X = parent.x + dx * 0.3
        const controlPoint1Y = parent.y
        const controlPoint2X = node.x - dx * 0.3
        const controlPoint2Y = node.y

        const pathData = `M ${parent.x} ${parent.y} C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${node.x} ${node.y}`

        return (
          <g key={`connection-${node.id}`}>
            {/* Shadow/glow effect */}
            <path d={pathData} stroke={darkMode ? "#1f2937" : "#f3f4f6"} strokeWidth="6" fill="none" opacity="0.3" />
            {/* Main connection line */}
            <path
              d={pathData}
              stroke={darkMode ? "#6366f1" : "#3b82f6"}
              strokeWidth="2"
              fill="none"
              opacity="0.8"
              strokeLinecap="round"
            />
            {/* Animated flow effect */}
            <path
              d={pathData}
              stroke={darkMode ? "#8b5cf6" : "#6366f1"}
              strokeWidth="1"
              fill="none"
              strokeDasharray="5,5"
              opacity="0.6"
            >
              <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite" />
            </path>
          </g>
        )
      })
  }

  const fitView = useCallback(() => {
    if (nodes.length === 0) return

    let minX = Number.POSITIVE_INFINITY,
      minY = Number.POSITIVE_INFINITY,
      maxX = Number.NEGATIVE_INFINITY,
      maxY = Number.NEGATIVE_INFINITY

    nodes.forEach((node) => {
      minX = Math.min(minX, node.x - 150) // Account for node width
      minY = Math.min(minY, node.y - 100) // Account for node height
      maxX = Math.max(maxX, node.x + 150)
      maxY = Math.max(maxY, node.y + 100)
    })

    const width = maxX - minX
    const height = maxY - minY

    const containerWidth = containerRef.current?.clientWidth || 1200
    const containerHeight = containerRef.current?.clientHeight || 800

    // Add padding around the content
    const padding = 100
    const zoomX = (containerWidth - padding * 2) / width
    const zoomY = (containerHeight - padding * 2) / height
    const newZoom = Math.min(zoomX, zoomY, 1) // Don't zoom in more than 100%

    const centerX = containerWidth / 2
    const centerY = containerHeight / 2
    const contentCenterX = minX + width / 2
    const contentCenterY = minY + height / 2

    const newPanX = centerX - contentCenterX * newZoom
    const newPanY = centerY - contentCenterY * newZoom

    setZoom(newZoom)
    setPan({ x: newPanX, y: newPanY })
  }, [nodes])

  return (
    <div className={`h-screen w-full ${darkMode ? "dark bg-gray-900" : "bg-gradient-to-br from-slate-50 to-blue-50"}`}>
      {/* Top Controls */}
      <div className="absolute top-4 left-4 z-10">
        <div className="flex items-center gap-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-white/20">
          <Button variant="outline" size="sm" onClick={onBack} className="hover:bg-blue-50">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        </div>
      </div>

      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-white/20">
          <h2 className="text-lg font-semibold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {profileName} - {profileType.charAt(0).toUpperCase() + profileType.slice(1)}
          </h2>
        </div>
      </div>

      <div className="absolute top-4 right-4 z-10">
        <div className="flex items-center gap-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-white/20">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search nodes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="w-40 bg-white/50"
            />
            <Button size="sm" onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          <Button variant="outline" size="sm" onClick={exportMindmap} className="hover:bg-green-50">
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>

          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4" />
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            <Moon className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="absolute bottom-4 left-4 z-10">
        <div className="flex flex-col gap-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-white/20">
          <Button size="sm" onClick={handleZoomIn} className="hover:bg-blue-50">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button size="sm" onClick={handleZoomOut} className="hover:bg-blue-50">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button size="sm" onClick={handleResetView} className="hover:bg-blue-50">
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button size="sm" onClick={fitView} className="hover:bg-green-50">
            <Maximize className="h-4 w-4" />
          </Button>
          <div className="text-xs text-center text-muted-foreground font-medium">{Math.round(zoom * 100)}%</div>
        </div>
      </div>

      {/* Main Canvas - Much larger virtual space */}
      <div
        ref={containerRef}
        className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <svg
          ref={svgRef}
          className="w-full h-full"
          viewBox="0 0 3000 2000" // Much larger virtual canvas
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: "0 0",
          }}
        >
          {/* Render connections */}
          <g>{renderConnections()}</g>

          {/* Render nodes */}
          {nodes.map((node) => (
            <MindmapNode
              key={node.id}
              node={node}
              darkMode={darkMode}
              onContextMenu={handleNodeContextMenu}
              onMouseDown={handleNodeMouseDown}
              isDragging={draggedNode === node.id}
            />
          ))}
        </svg>
      </div>

      {/* Context Menu */}
      {contextMenu.show && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          nodeId={contextMenu.nodeId}
          onAddChild={handleAddChildNode}
          onDelete={handleDeleteNode}
          onEdit={handleEditNode}
          onClose={() => setContextMenu({ show: false, x: 0, y: 0, nodeId: null })}
        />
      )}
    </div>
  )
}
