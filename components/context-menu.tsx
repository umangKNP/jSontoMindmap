"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Edit, Trash2, Eye, Link, Palette } from "lucide-react"

interface ContextMenuProps {
  x: number
  y: number
  nodeId: string | null
  onAddChild: (nodeId: string) => void
  onDelete: (nodeId: string) => void
  onEdit: (nodeId: string, newLabel: string) => void
  onClose: () => void
}

export default function ContextMenu({ x, y, nodeId, onAddChild, onDelete, onEdit, onClose }: ContextMenuProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState("")
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  const handleEdit = () => {
    if (nodeId && editValue.trim()) {
      onEdit(nodeId, editValue.trim())
      setIsEditing(false)
      setEditValue("")
      onClose()
    }
  }

  const handleAddChild = () => {
    if (nodeId) {
      onAddChild(nodeId)
    }
  }

  const handleDelete = () => {
    if (nodeId) {
      onDelete(nodeId)
    }
  }

  if (isEditing) {
    return (
      <Card ref={menuRef} className="fixed z-50 shadow-lg" style={{ left: x, top: y }}>
        <CardContent className="p-3 space-y-2">
          <Input
            placeholder="Enter new label"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleEdit()}
            autoFocus
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleEdit}>
              Save
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setIsEditing(false)
                setEditValue("")
              }}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card ref={menuRef} className="fixed z-50 shadow-lg min-w-[180px]" style={{ left: x, top: y }}>
      <CardContent className="p-2">
        <div className="space-y-1">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            onClick={() => {
              console.log("View details for node:", nodeId)
              onClose()
            }}
          >
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>

          <Button variant="ghost" size="sm" className="w-full justify-start" onClick={handleAddChild}>
            <Plus className="h-4 w-4 mr-2" />
            Add Child Node
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            onClick={() => {
              setIsEditing(true)
              setEditValue("")
            }}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Node
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            onClick={() => {
              console.log("Link node:", nodeId)
              onClose()
            }}
          >
            <Link className="h-4 w-4 mr-2" />
            Link to Node
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            onClick={() => {
              console.log("Customize color for node:", nodeId)
              onClose()
            }}
          >
            <Palette className="h-4 w-4 mr-2" />
            Customize Style
          </Button>

          <hr className="my-1" />

          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Node
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
