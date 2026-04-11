'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Upload, Image as ImageIcon, X } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import LoadingOverlay from './LoadingOverlay'
import { cn } from '@/lib/utils'

const formSchema = z.object({
  pdfFile: z.any().refine((file) => file instanceof File, 'PDF file is required'),
  coverImage: z.any().optional(),
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author name is required'),
  voice: z.string().min(1, 'Please choose a voice'),
})

const voices = {
  male: [
    { id: 'dave', name: 'Dave', description: 'Young male, British-Essex, casual & conversational' },
    { id: 'daniel', name: 'Daniel', description: 'Middle-aged male, British, authoritative but warm' },
    { id: 'chris', name: 'Chris', description: 'Male, casual & easy-going' },
  ],
  female: [
    { id: 'rachel', name: 'Rachel', description: 'Young female, American, calm & clear' },
    { id: 'sarah', name: 'Sarah', description: 'Young female, American, soft & approachable' },
  ],
}

const UploadForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [coverImage, setCoverImage] = useState<File | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      author: '',
      voice: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    console.log(values)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsSubmitting(false)
  }

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPdfFile(file)
      form.setValue('pdfFile', file)
    }
  }

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCoverImage(file)
      form.setValue('coverImage', file)
    }
  }

  return (
    <>
      {isSubmitting && <LoadingOverlay />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* PDF File Upload */}
          <FormField
            control={form.control}
            name="pdfFile"
            render={() => (
              <FormItem>
                <FormLabel className="form-label">Book PDF File</FormLabel>
                <FormControl>
                  <div className={cn("upload-dropzone", pdfFile && "upload-dropzone-uploaded")}>
                    <input
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      id="pdf-upload"
                      onChange={handlePdfChange}
                    />
                    <label htmlFor="pdf-upload" className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                      {pdfFile ? (
                        <div className="flex items-center gap-2">
                          <span className="upload-dropzone-text">{pdfFile.name}</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault()
                              setPdfFile(null)
                              form.setValue('pdfFile', null as any)
                            }}
                            className="upload-dropzone-remove"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload className="upload-dropzone-icon" />
                          <span className="upload-dropzone-text">Click to upload PDF</span>
                          <span className="upload-dropzone-hint">PDF file (max 50MB)</span>
                        </>
                      )}
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Cover Image Upload */}
          <FormField
            control={form.control}
            name="coverImage"
            render={() => (
              <FormItem>
                <FormLabel className="form-label">Cover Image (Optional)</FormLabel>
                <FormControl>
                  <div className={cn("upload-dropzone", coverImage && "upload-dropzone-uploaded")}>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="cover-upload"
                      onChange={handleCoverChange}
                    />
                    <label htmlFor="cover-upload" className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                      {coverImage ? (
                        <div className="flex items-center gap-2">
                          <span className="upload-dropzone-text">{coverImage.name}</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault()
                              setCoverImage(null)
                              form.setValue('coverImage', undefined)
                            }}
                            className="upload-dropzone-remove"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <ImageIcon className="upload-dropzone-icon" />
                          <span className="upload-dropzone-text">Click to upload cover image</span>
                          <span className="upload-dropzone-hint">Leave empty to auto-generate from PDF</span>
                        </>
                      )}
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Title Input */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Title</FormLabel>
                <FormControl>
                  <Input placeholder="ex: Rich Dad Poor Dad" className="form-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Author Input */}
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Author Name</FormLabel>
                <FormControl>
                  <Input placeholder="ex: Robert Kiyosaki" className="form-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Voice Selector */}
          <FormField
            control={form.control}
            name="voice"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <FormLabel className="form-label">Choose Assistant Voice</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="space-y-6"
                  >
                    <div>
                      <h4 className="text-sm text-gray-500 mb-3">Male Voices</h4>
                      <div className="voice-selector-options flex-wrap">
                        {voices.male.map((voice) => (
                          <div key={voice.id} className="relative flex-1 min-w-[200px]">
                            <RadioGroupItem
                              value={voice.id}
                              id={voice.id}
                              className="peer sr-only"
                            />
                            <label
                              htmlFor={voice.id}
                              className={cn(
                                "voice-selector-option voice-selector-option-default h-full flex flex-col items-start text-left p-4",
                                field.value === voice.id && "voice-selector-option-selected"
                              )}
                            >
                              <div className="flex items-center gap-3 mb-1">
                                <div className={cn(
                                  "w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center",
                                  field.value === voice.id && "border-[var(--accent-warm)]"
                                )}>
                                  {field.value === voice.id && (
                                    <div className="w-2 h-2 rounded-full bg-[var(--accent-warm)]" />
                                  )}
                                </div>
                                <span className="font-bold text-[#212a3b]">{voice.name}</span>
                              </div>
                              <span className="text-xs text-[#3d485e] leading-relaxed block">{voice.description}</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm text-gray-500 mb-3">Female Voices</h4>
                      <div className="voice-selector-options flex-wrap">
                        {voices.female.map((voice) => (
                          <div key={voice.id} className="relative flex-1 min-w-[200px]">
                            <RadioGroupItem
                              value={voice.id}
                              id={voice.id}
                              className="peer sr-only"
                            />
                            <label
                              htmlFor={voice.id}
                              className={cn(
                                "voice-selector-option voice-selector-option-default h-full flex flex-col items-start text-left p-4",
                                field.value === voice.id && "voice-selector-option-selected"
                              )}
                            >
                              <div className="flex items-center gap-3 mb-1">
                                <div className={cn(
                                  "w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center",
                                  field.value === voice.id && "border-[var(--accent-warm)]"
                                )}>
                                  {field.value === voice.id && (
                                    <div className="w-2 h-2 rounded-full bg-[var(--accent-warm)]" />
                                  )}
                                </div>
                                <span className="font-bold text-[#212a3b]">{voice.name}</span>
                              </div>
                              <span className="text-xs text-[#3d485e] leading-relaxed block">{voice.description}</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="form-btn">
            Begin Synthesis
          </Button>
        </form>
      </Form>
    </>
  )
}

export default UploadForm
