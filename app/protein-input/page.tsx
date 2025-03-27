"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ProgressIndicator } from "@/components/progress-indicator"
import { Upload, AlertCircle, Info } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function ProteinInput() {
  const router = useRouter()
  const [sequence, setSequence] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation for FASTA format
    if (!sequence.trim()) {
      setError("Please enter a protein sequence")
      return
    }

    if (!sequence.match(/^>.+\n[A-Za-z\n]+$/)) {
      setError("Please enter a valid FASTA format sequence")
      return
    }
    const dt = await fetch("/api/validate-sequence", {}
    // If validation passes, proceed to next step
    router.push("/structure-prediction")
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      setSequence(content)
    }
    reader.readAsText(file)
  }

  return (
    <div className="container py-8 max-w-4xl">
      <div className="mb-8">
        <ProgressIndicator
          currentStep={1}
          totalSteps={4}
          labels={["Protein Target", "Structure Analysis", "Molecule Generation", "Results"]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Protein Sequence Input</CardTitle>
              <CardDescription>Enter your protein sequence in FASTA format or upload a file</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <Textarea
                    placeholder=">Protein_Name
MTTQAPTFTQPLQSVVVLEGSTATFEAHISGFPVPEVSWFRDGQVISTSTLPGVQISFSD
GRAKLTIPAVTKANSGRYSLKATNGSGQATSTAELLVKAETAPPNFVQRLQSMTVRQGSQ
VRLQVRVTGIPTPVVKFYRDGAEIQSSLDFQISQEGDLYSLLIAEAYPEDSGTYSVNATN
SVGRATSTAELLVQGEEEVPAKKTKTIVSTAQISESRQTRIEKKIEAHFDARSIATVEMV"
                    value={sequence}
                    onChange={(e) => {
                      setSequence(e.target.value)
                      setError("")
                    }}
                    className="font-mono h-64 resize-none"
                  />

                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      accept=".fasta,.txt"
                      id="file-upload"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("file-upload")?.click()}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload File
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setSequence("")}>
                      Clear
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" disabled>
                Back
              </Button>
              <Button onClick={handleSubmit}>Submit Sequence</Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Quick Tips
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Helpful information about FASTA format</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium">FASTA Format</h4>
                  <p className="text-muted-foreground mt-1">
                    FASTA format begins with a &gt; symbol, followed by a description, then the sequence on the next
                    line.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium">Example</h4>
                  <pre className="bg-muted p-2 rounded-md text-xs font-mono mt-1 overflow-x-auto">
                    {">P53_HUMAN\nMEEPQSDPSV"}
                  </pre>
                </div>

                <div>
                  <h4 className="font-medium">Supported Sources</h4>
                  <ul className="list-disc list-inside text-muted-foreground mt-1">
                    <li>UniProt</li>
                    <li>NCBI Protein</li>
                    <li>PDB</li>
                    <li>Custom sequences</li>
                  </ul>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Sequence Length</AlertTitle>
                  <AlertDescription>
                    For optimal performance, protein sequences should be between 50-1500 amino acids.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

