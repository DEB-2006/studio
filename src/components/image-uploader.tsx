
'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UploadCloud, Camera, X } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ImageUploaderProps {
  onImageDataUriReady: (dataUri: string) => void;
  isLoading: boolean;
}

const fileToDataUri = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export function ImageUploader({ onImageDataUriReady, isLoading }: ImageUploaderProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 40 * 1024 * 1024) { // 40MB limit
        setError("File is too large. Maximum size is 40MB.");
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError("Invalid file type. Please upload an image (JPEG, PNG, WEBP, GIF).");
        return;
      }
      try {
        const dataUri = await fileToDataUri(file);
        setImagePreview(dataUri);
        onImageDataUriReady(dataUri);
      } catch (e) {
        setError('Failed to read image file.');
        console.error(e);
      }
    }
  };

  const startCamera = useCallback(async () => {
    setError(null);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setIsCameraOpen(true);
        }
      } catch (err) {
        console.error("Error accessing camera: ", err);
        setError("Could not access camera. Please ensure permissions are granted.");
        setIsCameraOpen(false);
      }
    } else {
      setError("Camera not supported on this device/browser.");
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraOpen(false);
  }, []);

  const captureImage = useCallback(() => {
    setError(null);
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUri = canvas.toDataURL('image/jpeg');
        setImagePreview(dataUri);
        onImageDataUriReady(dataUri);
        stopCamera();
      } else {
        setError("Could not capture image from camera.");
      }
    }
  }, [onImageDataUriReady, stopCamera]);

  const clearImage = () => {
    setImagePreview(null);
    setError(null);
    const fileInput = document.getElementById('imageUploadInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; 
    }
    // No need to call onImageDataUriReady with null, parent component should handle no image.
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UploadCloud className="text-primary" />
          Upload or Capture Image
        </CardTitle>
        <CardDescription>Add a photo of your ingredients.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isCameraOpen && (
          <div className="space-y-2">
            <video ref={videoRef} className="w-full rounded-md border" playsInline muted />
            <canvas ref={canvasRef} className="hidden" />
            <div className="flex gap-2">
              <Button onClick={captureImage} disabled={isLoading} className="w-full">
                <Camera className="mr-2 h-4 w-4" /> Capture
              </Button>
              <Button onClick={stopCamera} variant="outline" disabled={isLoading} className="w-full">
                <X className="mr-2 h-4 w-4" /> Close Camera
              </Button>
            </div>
          </div>
        )}

        {!isCameraOpen && !imagePreview && (
          <div className="space-y-4">
            <Input
              id="imageUploadInput"
              type="file"
              accept="image/png, image/jpeg, image/webp, image/gif"
              onChange={handleFileChange}
              disabled={isLoading}
              className="file:text-primary file:font-semibold hover:file:bg-primary/10"
            />
            <Button onClick={startCamera} variant="outline" className="w-full" disabled={isLoading}>
              <Camera className="mr-2 h-4 w-4" /> Open Camera
            </Button>
          </div>
        )}
        
        {imagePreview && !isCameraOpen && (
          <div className="space-y-2">
            <div className="relative w-full aspect-video border rounded-md overflow-hidden shadow-inner">
              <Image src={imagePreview} alt="Uploaded ingredients" layout="fill" objectFit="contain" />
            </div>
            <Button onClick={clearImage} variant="destructive" className="w-full" disabled={isLoading}>
              <X className="mr-2 h-4 w-4" /> Clear Image
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
