"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ProgressIndicator } from "@/components/progress-indicator"
import { ArrowRight, Download, FileDown, FileText, Home, Printer, Star } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Image from "next/image"

export default function ResultsSummary() {
  const router = useRouter()
  const [feedback, setFeedback] = useState("")
  const [rating, setRating] = useState("4")

  return (
    <div className="container py-8 max-w-6xl">
      <div className="mb-8">
        <ProgressIndicator
          currentStep={4}
          totalSteps={4}
          labels={["Protein Target", "Structure Analysis", "Molecule Generation", "Results"]}
        />
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold">Results Summary</h2>
        <p className="text-muted-foreground">Overview of your drug discovery session</p>
      </div>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="molecules">Top Molecules</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Protein Structure</CardTitle>
                <CardDescription>Predicted 3D structure with binding sites</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-muted rounded-md flex items-center justify-center">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Protein Structure"
                    width={300}
                    height={300}
                    className="object-contain"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <div className="text-sm text-muted-foreground">
                  <p>Confidence Score: 92%</p>
                  <p>3 binding sites identified</p>
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Session Statistics</CardTitle>
                <CardDescription>Key metrics from your discovery session</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted p-4 rounded-md text-center">
                      <p className="text-3xl font-bold">6</p>
                      <p className="text-sm text-muted-foreground">Molecules Generated</p>
                    </div>
                    <div className="bg-muted p-4 rounded-md text-center">
                      <p className="text-3xl font-bold">3</p>
                      <p className="text-sm text-muted-foreground">Binding Sites</p>
                    </div>
                    <div className="bg-muted p-4 rounded-md text-center">
                      <p className="text-3xl font-bold">0.92</p>
                      <p className="text-sm text-muted-foreground">Top Score</p>
                    </div>
                    <div className="bg-muted p-4 rounded-md text-center">
                      <p className="text-3xl font-bold">342.4</p>
                      <p className="text-sm text-muted-foreground">Avg. Mol. Weight</p>
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-md">
                    <h4 className="font-medium mb-2">Score Distribution</h4>
                    <div className="h-24 flex items-end gap-2">
                      <div className="bg-primary h-[80%] w-full rounded-t-sm"></div>
                      <div className="bg-primary h-[70%] w-full rounded-t-sm"></div>
                      <div className="bg-primary h-[65%] w-full rounded-t-sm"></div>
                      <div className="bg-primary h-[55%] w-full rounded-t-sm"></div>
                      <div className="bg-primary h-[45%] w-full rounded-t-sm"></div>
                      <div className="bg-primary h-[40%] w-full rounded-t-sm"></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>0.7</span>
                      <span>0.75</span>
                      <span>0.8</span>
                      <span>0.85</span>
                      <span>0.9</span>
                      <span>0.95</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Session Summary</CardTitle>
              <CardDescription>Overview of the drug discovery process</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>
                  The protein structure prediction was completed with high confidence (92%). Three potential binding
                  sites were identified, with Site 1 showing the highest druggability score (0.87).
                </p>
                <p>
                  Based on the binding site analysis, 6 candidate molecules were generated. The top candidate (Compound
                  A-123) achieved a docking score of 0.92 and demonstrates favorable drug-like properties with a
                  molecular weight of 342.4 g/mol and LogP of 2.3.
                </p>
                <p>
                  The generated molecules show promising binding interactions with the target protein, particularly at
                  binding Site 1, forming key hydrogen bonds with GLY32 and ALA45 residues.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-2">
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Export Report
                </Button>
                <Button variant="outline">
                  <Printer className="mr-2 h-4 w-4" />
                  Print Summary
                </Button>
              </div>
              <Button variant="outline">
                <FileDown className="mr-2 h-4 w-4" />
                Download All Data
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="molecules" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((index) => (
              <Card key={index}>
                <CardHeader className="p-4 pb-0">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">
                      Compound {String.fromCharCode(64 + index)}-{index * 123}
                    </CardTitle>
                    <div className="flex">
                      {Array.from({ length: 5 - index + 1 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                  <CardDescription>
                    {index === 1
                      ? "ATP-competitive kinase inhibitor"
                      : index === 2
                        ? "Allosteric modulator"
                        : "Covalent inhibitor"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex justify-center mb-2">
                    <Image
                      src={`/placeholder.svg?height=150&width=150`}
                      alt={`Compound ${index}`}
                      width={150}
                      height={150}
                      className="object-contain"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Score</p>
                      <p className="font-medium">{(0.93 - index * 0.03).toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Mol. Weight</p>
                      <p className="font-medium">{340 + index * 30} g/mol</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">LogP</p>
                      <p className="font-medium">{(2.3 + index * 0.4).toFixed(1)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Binding Site</p>
                      <p className="font-medium">Site {index}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download Structure
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Comparative Analysis</CardTitle>
              <CardDescription>Comparison of top candidate molecules</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>
                  The top three candidates show promising binding affinities to the target protein. Compound A-123
                  demonstrates the highest docking score (0.92) and optimal drug-like properties, making it the most
                  promising candidate for further development.
                </p>
                <p>
                  Compound B-456 shows good binding affinity (0.87) but has a higher molecular weight, which may affect
                  its bioavailability. However, its unique binding mode at Site 2 could offer advantages for
                  specificity.
                </p>
                <p>
                  Compound C-789, while having a slightly lower score (0.85), features a covalent binding mechanism that
                  could provide longer target engagement and potentially overcome resistance mechanisms.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Session Feedback</CardTitle>
              <CardDescription>Help us improve our drug discovery platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>How would you rate your experience?</Label>
                  <RadioGroup defaultValue="4" value={rating} onValueChange={setRating} className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <div key={value} className="flex flex-col items-center gap-1">
                        <RadioGroupItem value={value.toString()} id={`rating-${value}`} className="sr-only" />
                        <Label
                          htmlFor={`rating-${value}`}
                          className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                            rating === value.toString()
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-muted hover:border-primary hover:text-primary cursor-pointer"
                          }`}
                        >
                          {value}
                        </Label>
                        <span className="text-xs text-muted-foreground">
                          {value === 1
                            ? "Poor"
                            : value === 2
                              ? "Fair"
                              : value === 3
                                ? "Good"
                                : value === 4
                                  ? "Great"
                                  : "Excellent"}
                        </span>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feedback">Additional Comments</Label>
                  <Textarea
                    id="feedback"
                    placeholder="Share your thoughts on the results and suggestions for improvement..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="min-h-[150px]"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Submit Feedback</Button>
            </CardFooter>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => router.push("/")}>
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Button>
            <Button onClick={() => router.push("/protein-input")}>
              Start New Session
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

