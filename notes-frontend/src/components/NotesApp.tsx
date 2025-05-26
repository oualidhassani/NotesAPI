"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import styles from "./NotesApp.module.css"

interface Note {
  id: number
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
  const [isBackendConnected, setIsBackendConnected] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Ensure component is mounted before rendering
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isMounted) {
      fetchNotes()
    }
  }, [isMounted])

  const fetchNotes = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Try to connect to Spring Boot backend
      const response = await axios.get("http://localhost:8080/api/notes", {
        timeout: 5000,
        headers: {
          "Content-Type": "application/json",
        },
      })

      const notesData = Array.isArray(response.data) ? response.data : []
      setNotes(notesData)
      setIsBackendConnected(true)

      console.log("✅ Connected to Spring Boot backend successfully!")
      console.log("📝 Loaded notes:", notesData)
    } catch (error: any) {
      console.error("❌ Error fetching notes:", error)
      setIsBackendConnected(false)

      // Check if it's a network error (backend not running)
      if (error.code === "ECONNABORTED" || error.message === "Network Error" || !error.response) {
        setError("Spring Boot backend not running. Using demo mode.")

        // Load sample data for demo purposes
        const sampleNotes = [
          {
            id: 1,
            title: "🚀 Welcome to Notes App",
            content: `This is a sample note showing in DEMO MODE.

Your Spring Boot backend is not running. Here's how to fix it:

1. Open terminal in your Spring Boot project folder
2. Run: ./mvnw spring-boot:run
3. Wait for "Started NotesapisApplication" message
4. Refresh this page

The backend should run on: http://localhost:8080`,
          },
          {
            id: 2,
            title: "📋 Backend Setup Checklist",
            content: `Make sure you have:

✅ Added NoteController.java
✅ Spring Boot app running on port 8080
✅ CORS configured for localhost:3000
✅ All dependencies installed

API Endpoints needed:
• GET /api/notes
• POST /api/notes  
• PUT /api/notes/{id}
• DELETE /api/notes/{id}`,
          },
          {
            id: 3,
            title: "🎯 Demo Features",
            content: `This demo shows all features:

✅ Create new notes
✅ Edit existing notes  
✅ Delete notes
✅ Search functionality
✅ Responsive design
✅ Error handling

Once your backend is running, all operations will persist to your database!`,
          },
        ]

        setNotes(sampleNotes)
        console.log("🔄 Loaded demo data since backend is not available")
      } else {
        setError("Failed to connect to backend")
        setNotes([])
      }
    } finally {
      setIsLoading(false)
    }
  }

  const createNote = async () => {
    if (!newNote.title.trim() || !newNote.content.trim()) {
      alert("Please fill in both title and content.")
      return
    }

    if (!isBackendConnected) {
      // Demo mode - create note locally
      const demoNote = {
        id: Date.now(),
        title: newNote.title,
        content: newNote.content,
      }
      setNotes((prevNotes) => [demoNote, ...prevNotes])
      setNewNote({ title: "", content: "" })
      setIsCreating(false)
      alert("✅ Note created in demo mode! Start your Spring Boot backend to persist data.")
      return
    }

    try {
      const response = await axios.post("http://localhost:8080/api/notes", newNote, {
        timeout: 5000,
        headers: {
          "Content-Type": "application/json",
        },
      })
      const createdNote = response.data
      setNotes((prevNotes) => [createdNote, ...prevNotes])
      setNewNote({ title: "", content: "" })
      setIsCreating(false)
      alert("✅ Note created successfully!")
    } catch (error) {
      console.error("Error creating note:", error)
      alert("❌ Failed to create note. Check if backend is running.")
    }
  }

  const updateNote = async () => {
    if (!editingNote || !editingNote.title.trim() || !editingNote.content.trim()) {
      alert("Please fill in both title and content.")
      return
    }

    if (!isBackendConnected) {
      // Demo mode - update note locally
      const updatedNote = { ...editingNote }
      setNotes((prevNotes) => prevNotes.map((note) => (note.id === editingNote.id ? updatedNote : note)))
      if (selectedNote?.id === editingNote.id) {
        setSelectedNote(updatedNote)
      }
      setEditingNote(null)
      setIsEditing(false)
      alert("✅ Note updated in demo mode! Start your Spring Boot backend to persist changes.")
      return
    }

    try {
      const response = await axios.put(`http://localhost:8080/api/notes/${editingNote.id}`, editingNote, {
        timeout: 5000,
        headers: {
          "Content-Type": "application/json",
        },
      })
      const updatedNote = response.data
      setNotes((prevNotes) => prevNotes.map((note) => (note.id === editingNote.id ? updatedNote : note)))
      if (selectedNote?.id === editingNote.id) {
        setSelectedNote(updatedNote)
      }
      setEditingNote(null)
      setIsEditing(false)
      alert("✅ Note updated successfully!")
    } catch (error) {
      console.error("Error updating note:", error)
      alert("❌ Failed to update note. Check if backend is running.")
    }
  }

  const deleteNote = async (noteId: number) => {
    if (!confirm("Are you sure you want to delete this note?")) {
      return
    }

    if (!isBackendConnected) {
      // Demo mode - delete note locally
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId))
      if (selectedNote?.id === noteId) {
        setSelectedNote(null)
      }
      alert("✅ Note deleted in demo mode! Start your Spring Boot backend to persist changes.")
      return
    }

    try {
      await axios.delete(`http://localhost:8080/api/notes/${noteId}`, {
        timeout: 5000,
        headers: {
          "Content-Type": "application/json",
        },
      })
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId))
      if (selectedNote?.id === noteId) {
        setSelectedNote(null)
      }
      alert("✅ Note deleted successfully!")
    } catch (error) {
      console.error("Error deleting note:", error)
      alert("❌ Failed to delete note. Check if backend is running.")
    }
  }

  const filteredNotes = Array.isArray(notes)
    ? notes.filter(
        (note) =>
          note.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.content?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : []

  // Don't render until component is mounted (prevents hydration errors)
  if (!isMounted) {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.spinner}></div>
        <span>Loading Notes App...</span>
      </div>
    )
  }

  return (
    <div className={styles.app}>
      {/* Connection Status Banner */}
      <div className={`${styles.statusBanner} ${isBackendConnected ? styles.connected : styles.disconnected}`}>
        {isBackendConnected ? (
          <span>🟢 Connected to Spring Boot backend</span>
        ) : (
          <span>🔴 Demo Mode - Spring Boot backend not running</span>
        )}
      </div>

      <div className={styles.mainLayout}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <h1 className={styles.title}>📝 My Notes</h1>
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>

          <div className={styles.createButtonContainer}>
            <button onClick={() => setIsCreating(true)} className={styles.createButton}>
              ➕ New Note
            </button>
          </div>

          <div className={styles.notesList}>
            {isLoading ? (
              <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <span>Loading notes...</span>
              </div>
            ) : error ? (
              <div className={styles.error}>
                <p>⚠️ {error}</p>
                <div className={styles.troubleshooting}>
                  <h4>🔧 Troubleshooting:</h4>
                  <ol>
                    <li>Open terminal in Spring Boot project</li>
                    <li>
                      Run: <code>./mvnw spring-boot:run</code>
                    </li>
                    <li>Wait for "Started NotesapisApplication"</li>
                    <li>Click "Try Again" below</li>
                  </ol>
                </div>
                <button onClick={fetchNotes} className={styles.retryButton}>
                  🔄 Try Again
                </button>
              </div>
            ) : filteredNotes.length === 0 ? (
              <div className={styles.emptyState}>
                <p>{searchTerm ? "No matching notes" : "No notes found"}</p>
                <small>{searchTerm ? "Try adjusting your search" : "Create your first note to get started"}</small>
              </div>
            ) : (
              filteredNotes.map((note) => (
                <div
                  key={note.id}
                  className={`${styles.noteCard} ${selectedNote?.id === note.id ? styles.noteCardSelected : ""}`}
                  onClick={() => setSelectedNote(note)}
                >
                  <h3 className={styles.noteTitle}>{note.title || "Untitled"}</h3>
                  <p className={styles.notePreview}>{note.content || "No content"}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          {selectedNote ? (
            <>
              <div className={styles.noteHeader}>
                <div className={styles.noteInfo}>
                  <h2 className={styles.noteMainTitle}>{selectedNote.title || "Untitled"}</h2>
                </div>
                <div className={styles.noteActions}>
                  <button
                    onClick={() => {
                      setEditingNote({ ...selectedNote })
                      setIsEditing(true)
                    }}
                    className={styles.editButton}
                  >
                    ✏️ Edit
                  </button>
                  <button onClick={() => deleteNote(selectedNote.id)} className={styles.deleteButton}>
                    🗑️ Delete
                  </button>
                </div>
              </div>
              <div className={styles.noteContent}>
                <div className={styles.noteText}>{selectedNote.content || "No content available"}</div>
              </div>
            </>
          ) : (
            <div className={styles.emptyMainContent}>
              <div className={styles.emptyMainState}>
                <h3>📄 No note selected</h3>
                <p>Choose a note from the sidebar to view its content</p>
                {error && (
                  <div className={styles.connectionError}>
                    <h4>🔧 Backend Setup Required:</h4>
                    <p>1. Open terminal in your Spring Boot project</p>
                    <p>
                      2. Run: <code>./mvnw spring-boot:run</code>
                    </p>
                    <p>3. Wait for "Started NotesapisApplication"</p>
                    <p>4. Refresh this page</p>
                    <button onClick={fetchNotes} className={styles.retryButton}>
                      🔄 Retry Connection
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Note Modal */}
      {isCreating && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>Create New Note {!isBackendConnected && "(Demo Mode)"}</h3>
              <button onClick={() => setIsCreating(false)} className={styles.closeButton}>
                ✕
              </button>
            </div>
            <div className={styles.modalBody}>
              <input
                type="text"
                placeholder="Note title..."
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                className={styles.modalInput}
              />
              <textarea
                placeholder="Write your note content here..."
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                rows={6}
                className={styles.modalTextarea}
              />
            </div>
            <div className={styles.modalFooter}>
              <button onClick={() => setIsCreating(false)} className={styles.cancelButton}>
                Cancel
              </button>
              <button onClick={createNote} className={styles.saveButton}>
                💾 Create Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Note Modal */}
      {isEditing && editingNote && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>Edit Note {!isBackendConnected && "(Demo Mode)"}</h3>
              <button onClick={() => setIsEditing(false)} className={styles.closeButton}>
                ✕
              </button>
            </div>
            <div className={styles.modalBody}>
              <input
                type="text"
                placeholder="Note title..."
                value={editingNote.title}
                onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
                className={styles.modalInput}
              />
              <textarea
                placeholder="Write your note content here..."
                value={editingNote.content}
                onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
                rows={12}
                className={styles.modalTextarea}
              />
            </div>
            <div className={styles.modalFooter}>
              <button onClick={() => setIsEditing(false)} className={styles.cancelButton}>
                Cancel
              </button>
              <button onClick={updateNote} className={styles.saveButton}>
                💾 Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
