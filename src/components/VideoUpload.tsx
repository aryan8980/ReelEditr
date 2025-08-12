import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Upload, X, Plus } from "lucide-react";

interface VideoUploadProps {
  onVideoUpload: (files: File[]) => void;
  videoFiles: File[];
}

const VideoUpload = ({ onVideoUpload, videoFiles }: VideoUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = (newFiles: FileList) => {
    const validFiles = Array.from(newFiles).filter(file => 
      file.type.startsWith('video/')
    );
    onVideoUpload([...videoFiles, ...validFiles]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const removeVideo = (index: number) => {
    const newFiles = videoFiles.filter((_, i) => i !== index);
    onVideoUpload(newFiles);
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="w-5 h-5 text-secondary" />
          Video Clips
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Zone */}
        <div
          className={`upload-zone ${isDragOver ? 'dragover' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="text-center space-y-3">
            <div className="p-4 rounded-full bg-secondary/10 w-fit mx-auto">
              <Plus className="w-8 h-8 text-secondary" />
            </div>
            <div>
              <p className="text-lg font-semibold mb-1">Add Video Clips</p>
              <p className="text-sm text-muted-foreground">
                Drop multiple videos or click to browse
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Supports MP4, MOV, AVI files
              </p>
            </div>
          </div>
        </div>

        {/* Video List */}
        {videoFiles.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">
              {videoFiles.length} video{videoFiles.length !== 1 ? 's' : ''} added
            </h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {videoFiles.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded bg-secondary/20">
                      <Video className="w-4 h-4 text-secondary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(1)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeVideo(index)}
                    className="hover:bg-destructive/20"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Video Previews */}
        {videoFiles.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">
              Previews
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {videoFiles.map((file, index) => (
                <div 
                  key={`preview-${file.name}-${index}`} 
                  className="relative rounded-lg overflow-hidden bg-black/20 aspect-video group"
                >
                  <video
                    src={URL.createObjectURL(file)}
                    className="w-full h-full object-contain"
                    controls
                    muted
                  />
                  <div className="absolute top-2 right-2">
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => removeVideo(index)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          multiple
          className="hidden"
          onChange={(e) => {
            const files = e.target.files;
            if (files) handleFileSelect(files);
          }}
        />
      </CardContent>
    </Card>
  );
};

export default VideoUpload;