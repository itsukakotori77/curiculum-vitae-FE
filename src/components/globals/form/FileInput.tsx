'use client'

import React, { forwardRef, useState, useRef } from 'react'
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import {
  Cropper,
  CropperRef,
  CropperPreview,
} from 'react-advanced-cropper'
import 'react-advanced-cropper/dist/style.css'
import { PropsWithRef } from 'react'
import { canvasToBlob, joinClass } from '@/utils/common'
import Modal from '../modal'
import Button from '@/components/CultUI/Button'

registerPlugin(FilePondPluginImagePreview)

export interface FileInputProps extends PropsWithRef<any> {
  className?: string
  files?: any[]
  onUpdateFiles?: (files: any[]) => void
  allowMultiple?: boolean
  acceptedFileTypes?: string[]
  maxFiles?: number
  server?: string | object
  labelIdle?: string
  isValid?: boolean
  isInvalid?: boolean
  enableCrop?: boolean
  cropAspectRatio?: number | null
  cropMinWidth?: number
  cropMinHeight?: number
  cropMaxWidth?: number
  cropMaxHeight?: number
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
      labelIdle,
      isValid,
      isInvalid,
      enableCrop = false,
      cropAspectRatio,
      cropMinWidth = 100,
      cropMinHeight = 100,
      cropMaxWidth,
      cropMaxHeight,
      ...props
    },
    ref,
  ) => {
    const [cropModalOpen, setCropModalOpen] = useState(false)
    const [currentImage, setCurrentImage] = useState<string>('')
    const [pendingFile, setPendingFile] = useState<File | null>(null)
    const [filePondFiles, setFilePondFiles] = useState<any[]>([])
    const [isProcessingCrop, setIsProcessingCrop] = useState(false)
    const [coordinates, setCoordinates] = useState<any>(null)
    const [processedFiles, setProcessedFiles] = useState<Set<string>>(
      new Set(),
    )
    const cropperRef = useRef<CropperRef>(null)
    const filePondRef = useRef<any>(null)
    const lastProcessedFileRef = useRef<string | null>(null)

    // Create a unique file identifier
    const getFileId = (file: File) =>
      `${file.name}-${file.size}-${file.lastModified}`

    // Handle FilePond file updates
    const handleFilePondUpdate = (fileItems: any[]) => {
      const newFiles = fileItems.map((fileItem) => fileItem.file)

      // Prevent processing during crop operations
      if (isProcessingCrop) {
        console.log(
          '⚠️ Skipping update because crop is already processing',
        )
        return
      }

      // Check if we need to trigger cropping for any new image files
      if (enableCrop) {
        console.log('🔍 Enable crop active, checking files...')
        const newImageFile = newFiles.find((file) => {
          if (
            !(file instanceof File) ||
            !file.type.startsWith('image/')
          ) {
            console.log('⏭️ Not an image file:', file)
            return false
          }

          const fileId = getFileId(file)
          const isProcessed = processedFiles.has(fileId)
          const isLastProcessed =
            fileId === lastProcessedFileRef.current
          const isAlreadyInFiles = files.some(
            (existingFile: any) =>
              existingFile instanceof File &&
              getFileId(existingFile) === fileId,
          )

          console.log(
            `Checking ${file.name} → processed=${isProcessed}, last=${isLastProcessed}, already=${isAlreadyInFiles}`,
          )

          return !isProcessed && !isLastProcessed && !isAlreadyInFiles
        })

        if (newImageFile) {
          console.log(
            '✅ Found new image file for cropping:',
            newImageFile.name,
          )
          const fileId = getFileId(newImageFile)
          lastProcessedFileRef.current = fileId
          setIsProcessingCrop(true)
          setPendingFile(newImageFile)

          const reader = new FileReader()
          reader.onload = () => {
            setCurrentImage(reader.result as string)
            setCropModalOpen(true)
          }
          reader.readAsDataURL(newImageFile)

          console.log('🛑 Returning early to prevent onUpdateFiles')
          return // Don't update files yet
        } else {
          console.log(
            '❌ No new image file found, continuing to next step',
          )
        }
      }

      console.log('➡️ Updating files with onUpdateFiles')
      onUpdateFiles?.(newFiles)
    }

    const handleCropConfirm = async () => {
      if (!cropperRef.current || !pendingFile) return

      try {
        const canvas = cropperRef.current.getCanvas()
        if (!canvas) return

        const croppedBlob = await canvasToBlob(canvas)

        const croppedFile = new File(
          [croppedBlob],
          pendingFile.name,
          {
            type: 'image/jpeg',
          },
        )

        console.log('Cropped file created:', croppedFile)

        // Mark original and cropped as processed BEFORE updating parent
        const originalFileId = getFileId(pendingFile)
        const croppedFileId = getFileId(croppedFile)

        const newProcessedFiles = new Set(processedFiles)
        newProcessedFiles.add(originalFileId)
        newProcessedFiles.add(croppedFileId)
        setProcessedFiles(newProcessedFiles)

        // Prevent FilePond from reopening modal again
        lastProcessedFileRef.current = croppedFileId

        // Update the files array with the cropped file
        let updatedFiles = [...files]
        if (allowMultiple) {
          updatedFiles.push(croppedFile)
        } else {
          updatedFiles = [croppedFile]
        }

        // Close modal and reset states
        setCropModalOpen(false)
        setCurrentImage('')
        setPendingFile(null)

        // Update parent state first
        onUpdateFiles?.(updatedFiles)

        // Use setTimeout to sync FilePond
        setTimeout(() => {
          setFilePondFiles(updatedFiles)
          setIsProcessingCrop(false)
        }, 0)
      } catch (error) {
        console.error('Error cropping image:', error)
        handleCropCancel()
      }
    }

    const handleCropCancel = () => {
      setCropModalOpen(false)
      setCurrentImage('')
      setPendingFile(null)
      setIsProcessingCrop(false)
      lastProcessedFileRef.current = null

      // Reset FilePond to show current files
      setFilePondFiles([...files])
    }

    const handleSkipCrop = () => {
      if (!pendingFile) return

      console.log('Skipping crop for file:', pendingFile.name)

      // Mark file as processed
      const fileId = getFileId(pendingFile)
      const newProcessedFiles = new Set(processedFiles)
      newProcessedFiles.add(fileId)
      setProcessedFiles(newProcessedFiles)

      // Add the original file without cropping
      let updatedFiles = [...files]
      if (allowMultiple) {
        updatedFiles.push(pendingFile)
      } else {
        updatedFiles = [pendingFile]
      }

      // Close modal and reset states
      setCropModalOpen(false)
      setCurrentImage('')
      setPendingFile(null)

      // Update parent state first
      onUpdateFiles?.(updatedFiles)

      // Use setTimeout to ensure FilePond updates after parent state
      setTimeout(() => {
        setFilePondFiles(updatedFiles)
        setIsProcessingCrop(false) // Reset processing flag after FilePond update
      }, 0)
    }

    // Initialize filePondFiles with files prop
    if (
      filePondFiles.length === 0 &&
      files.length > 0 &&
      !isProcessingCrop
    ) {
      setFilePondFiles([...files])
    }

    // Stencil props for cropping constraints
    const stencilProps = {
      aspectRatio: cropAspectRatio,
      movable: true,
      resizable: true,
      lines: true,
      handlers: true,
      // overlayClassName: 'cropper-overlay',
    }

    return (
      <>
        <div
          className={joinClass(
            'w-full py-2 px-3 border-2 cursor-pointer border-black rounded-lg outline-none focus:border-primary/60',
            'disabled:bg-gray-200 disabled:text-gray-400 shadow-[3px_3px_0px_rgba(0,0,0,1)] bg-white',
            isInvalid
              ? 'border-error'
              : isValid
                ? 'border-success'
                : 'border-black',
            className,
          )}
          {...props}
        >
          <FilePond
            ref={(el) => {
              filePondRef.current = el
              if (typeof ref === 'function') {
                ref(el)
              } else if (ref) {
                ref.current = el
              }
            }}
            files={filePondFiles}
            onupdatefiles={handleFilePondUpdate}
            allowMultiple={allowMultiple}
            acceptedFileTypes={acceptedFileTypes}
            maxFiles={maxFiles}
            server={server}
            name="files"
            imagePreviewMinHeight={100}
            onremovefile={(fileItem: any) => {
              if (!fileItem) return
              const fileId = fileItem.id
            
              // Remove from processedFiles set
              const newProcessedFiles = new Set(processedFiles)
              newProcessedFiles.delete(fileId)
              setProcessedFiles(newProcessedFiles)
            
              // Update FilePond files state
              const updatedFiles = filePondFiles.filter((f) => f !== fileItem.file)
              setFilePondFiles(updatedFiles)
            
              // Sync with parent
              onUpdateFiles?.(updatedFiles)
            }}
            className=""
            labelIdle={
              labelIdle ||
              'Drag & Drop your files or <span class="filepond--label-action font-bold"> Browse </span>'
            }
            instantUpload={false}
          />
        </div>

        {/* Crop Modal */}
        <Modal
          isOpen={cropModalOpen}
          handleClose={() => setCropModalOpen(false)}
        >
          <div className="bg-white rounded-lg max-w-6xl max-h-[95vh] w-full overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Crop Image</h3>
              <p className="text-sm text-gray-600 mt-1">
                Adjust the crop area and click "Apply Crop" to
                continue, or "Skip Crop" to use the original image.
              </p>
            </div>

            <div className="flex-1 overflow-hidden p-4">
              {currentImage && (
                <div className="w-full min-h-[400px] max-h-[60vh]">
                  <div className="flex gap-4 h-full">
                    {/* Cropper (left) */}
                    <div className="flex-1 border rounded-xl overflow-hidden">
                      <Cropper
                        ref={cropperRef}
                        src={currentImage}
                        className="w-full h-full"
                        stencilProps={stencilProps}
                        backgroundWrapperProps={{
                          scaleImage: true,
                          moveImage: true,
                        }}
                        minWidth={cropMinWidth}
                        minHeight={cropMinHeight}
                        maxWidth={cropMaxWidth}
                        maxHeight={cropMaxHeight}
                        onChange={(cropper) => {
                          setCoordinates(cropper.getCoordinates())
                        }}
                      />
                    </div>

                    {/* Preview (right) */}
                    <div className="w-1/3 border rounded-xl flex items-center justify-center bg-gray-50">
                      <CropperPreview
                        cropper={cropperRef}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-200 flex gap-2 justify-between">
              <Button
                type="button"
                intent="default"
                onClick={handleCropCancel}
                className="w-40"
              >
                Cancel
              </Button>
              <div className="flex gap-2">
                <Button
                  type="button"
                  intent="info"
                  onClick={handleSkipCrop}
                  className="w-40"
                >
                  Skip Crop
                </Button>
                <Button
                  type="button"
                  intent="success"
                  onClick={handleCropConfirm}
                  className="w-40"
                >
                  Apply Crop
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </>
    )
  },
)

FileInput.displayName = 'FileInput'

export default FileInput
