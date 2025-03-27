"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ProgressIndicator } from "@/components/progress-indicator"
import { Download, RotateCw, ArrowRight, Loader2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ProteinViewer } from "@/components/protein-viewer"

export default function StructurePrediction() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [predictionComplete, setPredictionComplete] = useState(false)

  // Simulate loading and prediction process
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      setPredictionComplete(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="container py-8 max-w-6xl">
      <div className="mb-8">
        <ProgressIndicator
          currentStep={2}
          totalSteps={4}
          labels={["Protein Target", "Structure Analysis", "Molecule Generation", "Results"]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Protein Structure Visualization</CardTitle>
              <CardDescription>
                3D model of the predicted protein structure with binding sites highlighted
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="relative h-[500px] w-full rounded-md bg-muted">
                {loading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      <p className="text-sm text-muted-foreground">Predicting protein structure...</p>
                    </div>
                  </div>
                ) : (
                  <ProteinViewer />
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-2">
                <Button variant="outline" disabled={loading}>
                  <Download className="mr-2 h-4 w-4" />
                  Download PDB
                </Button>
                <Button variant="outline" disabled={loading}>
                  <RotateCw className="mr-2 h-4 w-4" />
                  Re-run Prediction
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>Analysis Status</CardTitle>
              <CardDescription>Structure prediction and binding site analysis</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Structure Prediction</h4>
                    {loading ? (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        Processing
                      </Badge>
                    ) : (
                      <Badge>Complete</Badge>
                    )}
                  </div>
                  {!loading && (
                    <div className="text-sm text-muted-foreground">
                      <p>Confidence Score: 92%</p>
                      <p>Resolution: 2.4Å</p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Binding Site Analysis</h4>
                    {loading ? (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        Waiting
                      </Badge>
                    ) : (
                      <Badge>Complete</Badge>
                    )}
                  </div>
                  {!loading && (
                    <div>
                      <Tabs defaultValue="site1">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="site1">Site 1</TabsTrigger>
                          <TabsTrigger value="site2">Site 2</TabsTrigger>
                          <TabsTrigger value="site3">Site 3</TabsTrigger>
                        </TabsList>
                        <TabsContent value="site1" className="space-y-2">
                          <div className="rounded-md bg-muted p-3 text-sm">
                            <p>
                              <strong>Druggability Score:</strong> 0.87
                            </p>
                            <p>
                              <strong>Volume:</strong> 432 Å³
                            </p>
                            <p>
                              <strong>Key Residues:</strong> GLY32, ALA45, TRP67
                            </p>
                          </div>
                        </TabsContent>
                        <TabsContent value="site2" className="space-y-2">
                          <div className="rounded-md bg-muted p-3 text-sm">
                            <p>
                              <strong>Druggability Score:</strong> 0.72
                            </p>
                            <p>
                              <strong>Volume:</strong> 318 Å³
                            </p>
                            <p>
                              <strong>Key Residues:</strong> HIS78, ARG92, GLU103
                            </p>
                          </div>
                        </TabsContent>
                        <TabsContent value="site3" className="space-y-2">
                          <div className="rounded-md bg-muted p-3 text-sm">
                            <p>
                              <strong>Druggability Score:</strong> 0.65
                            </p>
                            <p>
                              <strong>Volume:</strong> 275 Å³
                            </p>
                            <p>
                              <strong>Key Residues:</strong> LEU124, VAL128, PHE132
                            </p>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                disabled={!predictionComplete}
                onClick={() => router.push("/molecule-generation")}
              >
                Proceed to Molecule Generation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

