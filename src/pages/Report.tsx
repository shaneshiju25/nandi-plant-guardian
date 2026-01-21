import { motion } from "framer-motion";
import { 
  FileBarChart, 
  Leaf, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Download,
  Share2,
  RefreshCw,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Placeholder data - would come from AI inference API
const mockReportData = {
  scanId: "SCAN-2024-001",
  timestamp: new Date().toISOString(),
  totalImages: 5,
  results: [
    {
      id: 1,
      imageUrl: "/placeholder.svg",
      cropName: "Rice (Oryza sativa)",
      disease: "Bacterial Leaf Blight",
      confidence: 94.5,
      healthyPercentage: 35,
      damagedPercentage: 65,
      status: "critical" as const,
      recommendations: [
        "Apply copper-based bactericides immediately",
        "Improve field drainage",
        "Remove infected plant debris",
      ],
    },
    {
      id: 2,
      imageUrl: "/placeholder.svg",
      cropName: "Wheat (Triticum aestivum)",
      disease: "None Detected",
      confidence: 98.2,
      healthyPercentage: 95,
      damagedPercentage: 5,
      status: "healthy" as const,
      recommendations: [
        "Continue regular monitoring",
        "Maintain current irrigation schedule",
      ],
    },
    {
      id: 3,
      imageUrl: "/placeholder.svg",
      cropName: "Tomato (Solanum lycopersicum)",
      disease: "Early Blight",
      confidence: 87.3,
      healthyPercentage: 60,
      damagedPercentage: 40,
      status: "warning" as const,
      recommendations: [
        "Apply fungicide treatment",
        "Increase plant spacing for airflow",
        "Avoid overhead watering",
      ],
    },
  ],
  summary: {
    totalCropsAnalyzed: 3,
    healthyCrops: 1,
    warningCrops: 1,
    criticalCrops: 1,
    overallHealthScore: 63,
  },
};

const statusConfig = {
  healthy: {
    icon: CheckCircle,
    label: "Healthy",
    className: "status-healthy border",
    color: "text-success",
  },
  warning: {
    icon: AlertTriangle,
    label: "Warning",
    className: "status-warning border",
    color: "text-warning",
  },
  critical: {
    icon: XCircle,
    label: "Critical",
    className: "status-critical border",
    color: "text-destructive",
  },
};

const ReportPage = () => {
  const { results, summary } = mockReportData;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                  Analysis Report
                </h1>
                <p className="text-muted-foreground">
                  Scan ID: {mockReportData.scanId} • {new Date(mockReportData.timestamp).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Rescan
                </Button>
                <Button variant="outline" className="gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
                <Button className="gap-2 bg-primary hover:bg-primary/90">
                  <Download className="w-4 h-4" />
                  Download PDF
                </Button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Overall Health</p>
                        <p className="text-3xl font-bold font-display text-foreground">
                          {summary.overallHealthScore}%
                        </p>
                      </div>
                      <div className={`p-3 rounded-xl ${summary.overallHealthScore >= 70 ? "bg-success/10" : summary.overallHealthScore >= 50 ? "bg-warning/10" : "bg-destructive/10"}`}>
                        {summary.overallHealthScore >= 70 ? (
                          <TrendingUp className="w-6 h-6 text-success" />
                        ) : (
                          <TrendingDown className="w-6 h-6 text-destructive" />
                        )}
                      </div>
                    </div>
                    <Progress value={summary.overallHealthScore} className="h-2 mt-3" />
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Healthy Crops</p>
                        <p className="text-3xl font-bold font-display text-success">
                          {summary.healthyCrops}
                        </p>
                      </div>
                      <div className="p-3 rounded-xl bg-success/10">
                        <CheckCircle className="w-6 h-6 text-success" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Warning</p>
                        <p className="text-3xl font-bold font-display text-warning">
                          {summary.warningCrops}
                        </p>
                      </div>
                      <div className="p-3 rounded-xl bg-warning/10">
                        <AlertTriangle className="w-6 h-6 text-warning" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Critical</p>
                        <p className="text-3xl font-bold font-display text-destructive">
                          {summary.criticalCrops}
                        </p>
                      </div>
                      <div className="p-3 rounded-xl bg-destructive/10">
                        <XCircle className="w-6 h-6 text-destructive" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Detailed Results */}
            <h2 className="text-2xl font-display font-bold text-foreground mb-6">
              Detailed Analysis
            </h2>

            <div className="space-y-6">
              {results.map((result, index) => {
                const status = statusConfig[result.status];
                const StatusIcon = status.icon;

                return (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Card className="overflow-hidden">
                      <div className="md:flex">
                        {/* Image */}
                        <div className="md:w-64 lg:w-80 flex-shrink-0">
                          <img
                            src={result.imageUrl}
                            alt={result.cropName}
                            className="w-full h-48 md:h-full object-cover"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-6">
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-display font-semibold text-foreground">
                                  {result.cropName}
                                </h3>
                                <Badge className={status.className}>
                                  <StatusIcon className="w-3 h-3 mr-1" />
                                  {status.label}
                                </Badge>
                              </div>
                              <p className={`text-lg ${result.disease === "None Detected" ? "text-muted-foreground" : status.color}`}>
                                {result.disease}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">Confidence</p>
                              <p className="text-2xl font-bold font-display text-foreground">
                                {result.confidence}%
                              </p>
                            </div>
                          </div>

                          {/* Health Bars */}
                          <div className="grid sm:grid-cols-2 gap-4 mb-6">
                            <div>
                              <div className="flex justify-between text-sm mb-2">
                                <span className="text-muted-foreground">Healthy Area</span>
                                <span className="font-medium text-success">{result.healthyPercentage}%</span>
                              </div>
                              <div className="h-3 bg-muted rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${result.healthyPercentage}%` }}
                                  transition={{ duration: 1, delay: 0.5 }}
                                  className="h-full bg-success rounded-full"
                                />
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-2">
                                <span className="text-muted-foreground">Damaged Area</span>
                                <span className="font-medium text-destructive">{result.damagedPercentage}%</span>
                              </div>
                              <div className="h-3 bg-muted rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${result.damagedPercentage}%` }}
                                  transition={{ duration: 1, delay: 0.5 }}
                                  className="h-full bg-destructive rounded-full"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Recommendations */}
                          <div>
                            <h4 className="text-sm font-semibold text-foreground mb-2">
                              Recommendations
                            </h4>
                            <ul className="space-y-1">
                              {result.recommendations.map((rec, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                  <Leaf className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                  {rec}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReportPage;
