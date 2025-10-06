import { useState } from 'react'

export interface FileEntry {
  file: File
  id?: string
  url?: string
  public_id?: string
  uploadStatus: 'pending' | 'uploading' | 'success' | 'error'
  error?: string
}

interface MetaDataFile {
  id: string
  url: string 
  public_id: string
}

export const useFileManager = () => {
  const [fileEntries, setFileEntries] = useState<FileEntry[]>([])

  // Add a new file (before upload)
  const addFile = (file: File) => {
    setFileEntries((prev) => [
      ...prev,
      {
        file,
        uploadStatus: 'pending' as const,
      },
    ])
  }

  // Update file metadata after successful upload
  const updateFileMetadata = (
    file: File,
    metadata: MetaDataFile,
  ) => {
    setFileEntries((prev) =>
      prev.map((entry) =>
        entry.file === file
          ? { ...entry, ...metadata, uploadStatus: 'success' as const }
          : entry,
      ),
    )
  }

  // Mark file as uploading
  const setFileUploading = (file: File) => {
    setFileEntries((prev) =>
      prev.map((entry) =>
        entry.file === file
          ? { ...entry, uploadStatus: 'uploading' as const }
          : entry,
      ),
    )
  }

  // Mark file upload as failed
  const setFileError = (file: File, error: string) => {
    setFileEntries((prev) =>
      prev.map((entry) =>
        entry.file === file
          ? { ...entry, uploadStatus: 'error' as const, error }
          : entry,
      ),
    )
  }

  // Get file entry by file object
  const getFileEntry = (file: File) => {
    return fileEntries.find((entry) => entry.file === file)
  }

  // Get file metadata (id, url, public_id) by file object
  const getFileMetadata = (file: File) => {
    const entry = fileEntries.find((entry) => entry.file === file)
    if (!entry) return null
    
    return {
      id: entry.id,
      url: entry.url,
      public_id: entry.public_id,
      uploadStatus: entry.uploadStatus,
    }
  }

  // Remove file from state
  const removeFileFromState = (file: File) => {
    setFileEntries((prev) => prev.filter((entry) => entry.file !== file))
  }

  // Get only the File objects (for FilePond)
  const getFiles = () => fileEntries.map((entry) => entry.file)

  // Clear all files
  const clearAllFiles = () => {
    setFileEntries([])
  }

  // Replace all files (useful for form reset)
  const setFiles = (files: File[]) => {
    setFileEntries(
      files.map((file) => ({
        file,
        uploadStatus: 'pending' as const,
      })),
    )
  }

  const getAll = () => {
    return fileEntries
  }

  return {
    fileEntries,
    addFile,
    updateFileMetadata,
    setFileUploading,
    setFileError,
    getFileEntry,
    getFileMetadata,
    removeFileFromState,
    getFiles,
    clearAllFiles,
    setFiles,
    getAll
  }
}