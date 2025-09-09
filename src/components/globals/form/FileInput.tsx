'use client'

import React, { forwardRef } from 'react'
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import { PropsWithRef } from 'react'

export interface FileInputProps extends PropsWithRef<any> {
  className?: string
  files?: any[]
  onUpdateFiles?: (files: any[]) => void
  allowMultiple?: boolean
  acceptedFileTypes?: string[]
  maxFiles?: number
  server?: string | object
  [key: string]: any
}

const FileInput: React.FC<FileInputProps> = forwardRef<
  any,
  FileInputProps
>(
  (
    {
      files = [],
      onUpdateFiles,
      allowMultiple = false,
      acceptedFileTypes = [],
      maxFiles = 1,
      maxFileSize = '5MB',
      server,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={className} {...props}>
        <FilePond
          ref={ref}
          files={files}
          onupdatefiles={onUpdateFiles}
          allowMultiple={allowMultiple}
          acceptedFileTypes={acceptedFileTypes}
          maxFiles={maxFiles}
          server={server}
          name="files"
          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        />
      </div>
    )
  },
)

FileInput.displayName = 'FileInput'

export default FileInput
