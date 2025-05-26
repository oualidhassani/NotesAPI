"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Plus, Search, Edit3, Trash2, FileText, BookOpen, Loader2, Save, AlertCircle } from "lucide-react"

interface Note {
  id: number // Your backend uses long, but TypeScript uses number for JSON
  title: string
  content: string
}

export default function NotesApp() {
  const [notes, setNotes] = useState<Note[]>([])
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [newNote, setNewNote] = useState({ title: "", content: "" })
  const [error, setError] = useState<string | null>(null)

  // Fetch notes from Spring Boot backend
  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Try to connect to Spring Boot backend
      const response = await axios.get("http://localhost:8080/api/notes", {
        timeout: 5000, // 5 second timeout
      })

      // Ensure the response data is an array
      const notesData = Array.isArray(response.data) ? response.data : []
      setNotes(notesData)

      if (notesData.length === 0) {
        console.log("No notes found or empty response")
      }
    } catch (error: any) {
      console.error("Error fetching notes:", error)

      // Check if it's a network error (backend not running)
      if (error.code === "ECONNABORTED" || error.message === "Network Error" || !error.response) {
        setError("Cannot connect to Spring Boot backend. Using demo mode with sample data.")

        // Load sample data for demo purposes
        const sampleNotes = [
          {
            id: 1,
            title: "Welcome to Notes App",
            content:
              "This is a sample note. Your Spring Boot backend is not running, so we're showing demo data.\n\nTo connect to your real backend:\n1. Start your Spring Boot server on port 8080\n2. Add the NoteController class\n3. Refresh this page",
          },
          {
            id: 2,
            title: "Spring Boot Setup",
            content:
              "Make sure your Spring Boot application has these endpoints:\n\nGET /api/notes - Get all notes\nPOST /api/notes - Create a note\nPUT /api/notes/{id} - Update a note\nDELETE /api/notes/{id} - Delete a note\n\nDon't forget to add @CrossOrigin annotation!",
          },
          {
            id: 3,
            title: "Features",
            content:
              "✅ Create, edit, and delete notes\n✅ Search functionality\n✅ Responsive design\n✅ Real-time updates\n✅ Error handling\n✅ Loading states\n\nOnce your backend is running, all these features will work with your real data!",
          },
        ]

        setNotes(sampleNotes)

        toast({
          title: "Demo Mode",
          description:
            "Spring Boot backend not found. Showing sample data. Start your backend server to use real data.",
          variant: "destructive",
        })
      } else {
        // Other types of errors
        setError("Failed to fetch notes. Please check your backend connection.")
        setNotes([])
        toast({
          title: "Connection Error",
          description:
            "Unable to connect to the backend. Please ensure your Spring Boot server is running on port 8080.",
          variant: "destructive",
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const createNote = async () => {
    if (!newNote.title.trim() || !newNote.content.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in both title and content.",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await axios.post("http://localhost:8080/api/notes", newNote, {
        timeout: 5000,
      })
      const createdNote = response.data
      setNotes((prevNotes) => [createdNote, ...prevNotes])
      setNewNote({ title: "", content: "" })
      setIsCreating(false)
      toast({
        title: "Success",
        description: "Note created successfully!",
      })
    } catch (error: any) {
      console.error("Error creating note:", error)

      // If backend is not available, create note locally for demo
      if (error.code === "ECONNABORTED" || error.message === "Network Error" || !error.response) {
        const demoNote = {
          id: Date.now(), // Use timestamp as ID for demo
          title: newNote.title,
          content: newNote.content,
        }

        setNotes((prevNotes) => [demoNote, ...prevNotes])
        setNewNote({ title: "", content: "" })
        setIsCreating(false)

        toast({
          title: "Demo Mode",
          description: "Note created locally. Start your Spring Boot backend to persist data.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to create note. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const updateNote = async () => {
    if (!editingNote || !editingNote.title.trim() || !editingNote.content.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in both title and content.",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await axios.put(`http://localhost:8080/api/notes/${editingNote.id}`, editingNote, {
        timeout: 5000,
      })
      const updatedNote = response.data
      setNotes((prevNotes) => prevNotes.map((note) => (note.id === editingNote.id ? updatedNote : note)))
      if (selectedNote?.id === editingNote.id) {
        setSelectedNote(updatedNote)
      }
      setEditingNote(null)
      setIsEditing(false)
      toast({
        title: "Success",
        description: "Note updated successfully!",
      })
    } catch (error: any) {
      console.error("Error updating note:", error)

      // If backend is not available, update note locally for demo
      if (error.code === "ECONNABORTED" || error.message === "Network Error" || !error.response) {
        const updatedNote = { ...editingNote }
        setNotes((prevNotes) => prevNotes.map((note) => (note.id === editingNote.id ? updatedNote : note)))
        if (selectedNote?.id === editingNote.id) {
          setSelectedNote(updatedNote)
        }
        setEditingNote(null)
        setIsEditing(false)

        toast({
          title: "Demo Mode",
          description: "Note updated locally. Start your Spring Boot backend to persist changes.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to update note. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const deleteNote = async (noteId: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/notes/${noteId}`, {
        timeout: 5000,
      })
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId))
      if (selectedNote?.id === noteId) {
        setSelectedNote(null)
      }
      toast({
        title: "Success",
        description: "Note deleted successfully!",
      })
    } catch (error: any) {
      console.error("Error deleting note:", error)

      // If backend is not available, delete note locally for demo
      if (error.code === "ECONNABORTED" || error.message === "Network Error" || !error.response) {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId))
        if (selectedNote?.id === noteId) {
          setSelectedNote(null)
        }

        toast({
          title: "Demo Mode",
          description: "Note deleted locally. Start your Spring Boot backend to persist changes.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to delete note. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  // Safely filter notes - ensure notes is always an array
  const filteredNotes = Array.isArray(notes)
    ? notes.filter(
        (note) =>
          note.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.content?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : []

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-80 border-r bg-muted/30">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">My Notes</h1>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Create Note Button */}
        <div className="p-4 border-b">
          <Dialog open={isCreating} onOpenChange={setIsCreating}>
            <DialogTrigger asChild>
              <Button className="w-full gap-2">
                <Plus className="h-4 w-4" />
                New Note
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Note</DialogTitle>
                <DialogDescription>Add a new note to your collection.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Note title..."
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                />
                <Textarea
                  placeholder="Write your note content here..."
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  rows={6}
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreating(false)}>
                  Cancel
                </Button>
                <Button onClick={createNote} className="gap-2">
                  <Save className="h-4 w-4" />
                  Create Note
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Notes List */}
        <ScrollArea className="flex-1">
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="ml-2 text-sm text-muted-foreground">Loading notes...</span>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 text-destructive opacity-50" />
              <p className="text-destructive font-medium mb-2">Connection Error</p>
              <p className="text-sm text-muted-foreground mb-4">{error}</p>
              <Button onClick={fetchNotes} variant="outline" size="sm">
                Try Again
              </Button>
            </div>
          ) : filteredNotes.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="font-medium mb-2">{searchTerm ? "No matching notes" : "No notes found"}</p>
              <p className="text-sm">
                {searchTerm ? "Try adjusting your search terms" : "Create your first note to get started"}
              </p>
            </div>
          ) : (
            <div className="p-2">
              {filteredNotes.map((note) => (
                <Card
                  key={note.id}
                  className={`mb-2 cursor-pointer transition-colors hover:bg-muted/50 ${
                    selectedNote?.id === note.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedNote(note)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium truncate">{note.title || "Untitled"}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground line-clamp-2">{note.content || "No content"}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {selectedNote ? (
          <>
            {/* Header */}
            <div className="p-6 border-b bg-muted/30">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">{selectedNote.title || "Untitled"}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <Dialog open={isEditing} onOpenChange={setIsEditing}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => setEditingNote({ ...selectedNote })}
                      >
                        <Edit3 className="h-4 w-4" />
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Edit Note</DialogTitle>
                        <DialogDescription>Make changes to your note.</DialogDescription>
                      </DialogHeader>
                      {editingNote && (
                        <div className="space-y-4">
                          <Input
                            placeholder="Note title..."
                            value={editingNote.title}
                            onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
                          />
                          <Textarea
                            placeholder="Write your note content here..."
                            value={editingNote.content}
                            onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
                            rows={12}
                          />
                        </div>
                      )}
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                        <Button onClick={updateNote} className="gap-2">
                          <Save className="h-4 w-4" />
                          Save Changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2 text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the note "
                          {selectedNote.title || "Untitled"}".
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteNote(selectedNote.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>

            {/* Content */}
            <ScrollArea className="flex-1 p-6">
              <div className="max-w-4xl mx-auto">
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                    {selectedNote.content || "No content available"}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No note selected</h3>
              <p>Choose a note from the sidebar to view its content</p>
              {error && (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-destructive">Spring Boot backend connection issue</p>
                  <Button onClick={fetchNotes} variant="outline" size="sm" className="mt-2">
                    Retry Connection
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <Toaster />
    </div>
  )
}
