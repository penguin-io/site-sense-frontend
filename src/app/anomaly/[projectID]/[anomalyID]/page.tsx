// src/app/anomaly/[anomalyID]/@page.tsx
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
// import { Video } from "@/components/ui/video"

const AnomalyDetailPage = ({ params }: { params: { anomalyID: string, projectID :string } }) => {
  // Mock data
  const anomaly = {
    id: params.anomalyID,
    type: 'Safety Violation',
    timestamp: '2024-03-15 14:30:00',
    projectName : "New Highway",
    severity: 'High',
    status: 'Unresolved',
    videoUrl: '/sample-video.mp4',
    worksite: 'Site Alpha',
    zone: 'Zone 3',
    description: 'Worker without safety harness observed',
    comment : [
      {
        id: 0,
        content: "Rain, nothing to be concerned about",
        author: "Penguinz0"
      }
    ]
  };

  function handleResolve() {
      console.log("Resolved Anomaly")
  }

  return (
    <div className="container max-w-7xl py-8">
      <div className="mb-6">
        <Link href="/anomalyID">
          <Button variant="ghost" className="pl-0">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Anomalies
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        {/* Main Content */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <h1 className="text-3xl font-bold tracking-tight">
              {anomaly.type}
            </h1>
            <Badge variant={
              anomaly.severity === 'High' ? 'destructive' : 
              anomaly.severity === 'Medium' ? 'warning' : 'default'
            }>
              {anomaly.severity}
            </Badge>
          </div>

          {/* <Video
            src={anomaly.videoUrl}
            className="w-full rounded-lg shadow-md"
          /> */}

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{anomaly.description}</p>
              
              <Separator className="my-6" />

              <div className="grid grid-cols-2 gap-4">
                <DetailItem label="Worksite" value={anomaly.worksite} />
                <DetailItem label="Project" value={anomaly.projectName} />
                <DetailItem label="Zone" value={anomaly.zone} />
                <DetailItem label="Timestamp" value={anomaly.timestamp} />
                <DetailItem label="Status" value={
                  <Badge variant={anomaly.status === 'Resolved' ? 'default' : 'destructive'}>
                    {anomaly.status}
                  </Badge>
                } />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" onClick={handleResolve()}>Mark as Resolved</Button>
              <Button variant="secondary" className="w-full">
                Flag as False Positive
              </Button>
              <Button variant="outline" className="w-full">
                Add Comment
              </Button>
              
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Related Anomalies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RelatedAnomalyItem />
              <RelatedAnomalyItem />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Helper components
const DetailItem = ({ label, value }: { 
  label: string; 
  value: string | React.ReactNode 
}) => (
  <div>
    <p className="text-sm font-medium text-muted-foreground">{label}</p>
    <div className="mt-1 text-sm">{value}</div>
  </div>
);

const RelatedAnomalyItem = () => (
  <div className="p-4 border rounded-lg">
    <div className="flex justify-between items-start">
      <div>
        <p className="font-medium">Unauthorized Access</p>
        <p className="text-sm text-muted-foreground mt-1">
          Zone 2 • 2024-03-14 09:45:00
        </p>
      </div>
      <Badge variant="warning">Medium</Badge>
    </div>
  </div>
);

export default AnomalyDetailPage;