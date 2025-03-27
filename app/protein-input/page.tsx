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
    e.preventDefault();
  
    if (!sequence.trim()) {
      setError("Please enter a protein sequence");
      return;
    }
  
    

  
    try {
      const response = await fetch(`https://alphafold.ebi.ac.uk/api/prediction/${sequence}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
      });
      const data = await response.json();
      const glb = data[0].pdbUrl.split("/").pop().replace(".pdb", "");
      console.log(glb);

      router.push(`/structure-prediction/${glb}`)
      
    } catch (error) {
      setError("Error fetching protein structure");
      console.error(error);
    }
    //const dt = await fetch("/api/validate-sequence", {}
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



/*"use client"

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

    // Basic validation for UniProt format
    const uniprotRegex = /^ID\s+.+\nAC\s+.+\nDE\s+.+\nGN\s+.+\nOS\s+.+\nSQ\s+SEQUENCE\s+\d+\s+AA;.*\n([\sA-Z]+)$/

    if (!sequence.trim()) {
      setError("Please enter a protein sequence in UniProt format")
      return
    }

    if (!uniprotRegex.test(sequence)) {
      setError("Invalid UniProt format. Please check your input.")
      return
    }

    // Proceed to next step
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
              <CardTitle>Protein Sequence Input (UniProt Format)</CardTitle>
              <CardDescription>Enter your protein sequence in **UniProt format** or upload a file</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <Textarea
                    placeholder={`ID   P53_HUMAN               Reviewed;         393 AA.\nAC   P04637;\nDE   RecName: Full=Cellular tumor antigen p53;\nGN   Name=TP53;\nOS   Homo sapiens (Human).\nSQ   SEQUENCE   393 AA;  43561 MW;  96A5E7B6F2F1B0D1 CRC64;\n     MEEPQSDPSV EPPLSQETFQ WVLENGQGHI PPGMNFLSAD WHLGTHLQMS CSGPWLVPDI\n     EQTSPSSKRR ISGGSDENRH SPRRHSVEAG SRQSVPPVVK FYRDGAEIQS SLDFQISQEG\n     DLYSLLIAEA YPEDSGTYSV NATNSVGRAT STAELLVQGE EEVPAKKTKT IVSTAQISES\n     RQTRIEKKIE AHFDARSIAT VEMV`}
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
                      accept=".txt"
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
                      <p>Helpful information about UniProt format</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium">UniProt Format</h4>
                  <p className="text-muted-foreground mt-1">
                    UniProt format contains metadata like ID, AC, DE, GN, OS, and a SEQUENCE block.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium">Example</h4>
                  <pre className="bg-muted p-2 rounded-md text-xs font-mono mt-1 overflow-x-auto">
                    {"ID   P53_HUMAN\nAC   P04637;\nDE   RecName: Full=Cellular tumor antigen p53;"}
                  </pre>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Sequence Length</AlertTitle>
                  <AlertDescription>
                    For optimal performance, sequences should be between 50-1500 amino acids.
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
*/