export interface IFileEntry {
  file: File
  id?: string
  url?: string
  public_id?: string
  uploadStatus: 'pending' | 'uploading' | 'success' | 'error'
  error?: string
}

export interface MetadataFile {
  id: string
  url: string
  public_id: string
}

export interface IFileManagerStore {
  fileEntries: IFileEntry[]

  addFile: (file: File) => void
  updateFileMetadata: (file: File, metadata: MetadataFile) => void
  setFileUploading: (file: File) => void
  setFileError: (file: File, error: string) => void
  getFileEntry: (file: File) => IFileEntry | undefined
  getFileMetadata: (file: File) => {
    id?: string
    url?: string
    public_id?: string
    uploadStatus: 'pending' | 'uploading' | 'success' | 'error'
  } | null
  removeFileFromState: (file: File) => void
  getFiles: () => File[]
  clearAllFiles: () => void
  setFiles: (file: File[]) => void
}
