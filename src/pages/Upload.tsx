import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Image, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  progress: number;
  status: "uploading" | "success" | "error";
}

const UploadPage = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileId ? { ...f, progress: 100, status: "success" } : f
          )
        );
      } else {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileId ? { ...f, progress: Math.min(progress, 95) } : f
          )
        );
      }
    }, 200);
  };

  const processFiles = (fileList: FileList) => {
    const newFiles: UploadedFile[] = Array.from(fileList)
      .filter((file) => file.type.startsWith("image/"))
      .map((file) => ({
        id: Math.random().toString(36).substring(7),
        file,
        preview: URL.createObjectURL(file),
        progress: 0,
        status: "uploading" as const,
      }));

    if (newFiles.length === 0) {
      toast({
        title: "Invalid file type",
        description: "Please upload image files only",
        variant: "destructive",
      });
      return;
    }

    setFiles((prev) => [...prev, ...newFiles]);
    newFiles.forEach((f) => simulateUpload(f.id));
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  };

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file) URL.revokeObjectURL(file.preview);
      return prev.filter((f) => f.id !== id);
    });
  };

  const handleAnalyze = () => {
    const successFiles = files.filter((f) => f.status === "success");
    if (successFiles.length === 0) {
      toast({
        title: "No images ready",
        description: "Please wait for uploads to complete or add images",
        variant: "destructive",
      });
      return;
    }

    // Placeholder: In a real app, this would send to Supabase storage and trigger AI inference
    toast({
      title: "Analysis started",
      description: `Analyzing ${successFiles.length} image(s)...`,
    });

    setTimeout(() => {
      navigate("/report");
    }, 1500);
  };

  const completedCount = files.filter((f) => f.status === "success").length;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Upload Drone Images
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Upload your drone-captured crop images for AI-powered disease detection. 
                We support JPG, PNG, and WebP formats.
              </p>
            </div>

            {/* Upload Zone */}
            <motion.div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              animate={{
                scale: isDragging ? 1.02 : 1,
                borderColor: isDragging ? "hsl(var(--primary))" : "hsl(var(--border))",
              }}
              className={`
                relative border-2 border-dashed rounded-2xl p-12
                transition-colors cursor-pointer
                ${isDragging ? "bg-primary/5" : "bg-card hover:bg-muted/50"}
              `}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileInput}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              <div className="flex flex-col items-center text-center">
                <motion.div
                  animate={{ y: isDragging ? -10 : 0 }}
                  className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6"
                >
                  <Upload className="w-10 h-10 text-primary" />
                </motion.div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                  Drag & drop your images here
                </h3>
                <p className="text-muted-foreground mb-4">
                  or click to browse from your device
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Image className="w-4 h-4" />
                  <span>JPG, PNG, WebP up to 10MB each</span>
                </div>
              </div>
            </motion.div>

            {/* Uploaded Files */}
            <AnimatePresence>
              {files.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-8"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-semibold text-foreground">
                      Uploaded Images ({completedCount}/{files.length})
                    </h3>
                    {completedCount > 0 && (
                      <Button onClick={handleAnalyze} className="bg-primary hover:bg-primary/90">
                        Analyze Images
                      </Button>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {files.map((file) => (
                      <motion.div
                        key={file.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="relative bg-card rounded-xl border border-border overflow-hidden group"
                      >
                        {/* Image Preview */}
                        <div className="aspect-video relative">
                          <img
                            src={file.preview}
                            alt={file.file.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

                        {/* Info */}
                        <div className="p-4">
                          <p className="text-sm font-medium text-foreground truncate mb-2">
                            {file.file.name}
                          </p>

                          {file.status === "uploading" ? (
                            <div className="space-y-2">
                              <Progress value={file.progress} className="h-2" />
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Loader2 className="w-3 h-3 animate-spin" />
                                <span>Uploading... {Math.round(file.progress)}%</span>
                              </div>
                            </div>
                          ) : file.status === "success" ? (
                            <div className="flex items-center gap-2 text-sm text-success">
                              <CheckCircle className="w-4 h-4" />
                              <span>Ready for analysis</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-sm text-destructive">
                              <AlertCircle className="w-4 h-4" />
                              <span>Upload failed</span>
                            </div>
                          )}
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFile(file.id)}
                          className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-12 p-6 bg-muted/50 rounded-2xl"
            >
              <h4 className="font-display font-semibold text-foreground mb-4">
                Tips for best results
              </h4>
              <ul className="grid md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Capture images during daylight hours for best clarity
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Fly drone at 10-20 meters for optimal crop detail
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Ensure images are not blurry or motion-affected
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Multiple angles improve detection accuracy
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UploadPage;
