"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ProgressIndicator } from "@/components/progress-indicator"
import { ArrowRight, Download, Filter, RefreshCw, Star, StarHalf, StarOff } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

// Sample molecule data
const molecules = [
  {
    id: 1,
    name: "Compound A-123",
    score: 0.92,
    weight: 342.4,
    logP: 2.3,
    description: "ATP-competitive kinase inhibitor",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Compound B-456",
    score: 0.87,
    weight: 412.6,
    logP: 3.1,
    description: "Allosteric modulator with hydrogen bonding",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Compound C-789",
    score: 0.85,
    weight: 378.2,
    logP: 1.8,
    description: "Covalent inhibitor targeting Cys residues",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Compound D-012",
    score: 0.81,
    weight: 298.1,
    logP: 2.7,
    description: "Fragment-based design with high ligand efficiency",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    name: "Compound E-345",
    score: 0.78,
    weight: 456.3,
    logP: 4.2,
    description: "Peptide-mimetic with improved stability",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    name: "Compound F-678",
    score: 0.76,
    weight: 321.7,
    logP: 2.5,
    description: "Scaffold-hopping derivative with reduced toxicity",
    image: "/placeholder.svg?height=200&width=200",
  },
]

export default function MoleculeGeneration() {
  const router = useRouter()
  const [selectedMolecule, setSelectedMolecule] = useState(null)
  const [sortBy, setSortBy] = useState("score")
  const [scoreFilter, setScoreFilter] = useState([0.7, 1.0])

  // Sort molecules based on selected criteria
  const sortedMolecules = [...molecules]
    .sort((a, b) => {
      if (sortBy === "score") return b.score - a.score
      if (sortBy === "weight") return a.weight - b.weight
      if (sortBy === "logP") return a.logP - b.logP
      return 0
    })
    .filter((m) => m.score >= scoreFilter[0] && m.score <= scoreFilter[1])

  // Function to render star rating based on score
  const renderStars = (score) => {
    const fullStars = Math.floor(score * 5)
    const hasHalfStar = score * 5 - fullStars >= 0.5
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="h-4 w-4 fill-primary text-primary" />
        ))}
        {hasHalfStar && <StarHalf className="h-4 w-4 fill-primary text-primary" />}
        {[...Array(emptyStars)].map((_, i) => (
          <StarOff key={`empty-${i}`} className="h-4 w-4 text-muted-foreground" />
        ))}
      </div>
    )
  }

  return (
    <div className="container py-8 max-w-6xl">
      <div className="mb-8">
        <ProgressIndicator
          currentStep={3}
          totalSteps={4}
          labels={["Protein Target", "Structure Analysis", "Molecule Generation", "Results"]}
        />
      </div>

      <div className="mb-6 flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Generated Molecules</h2>
          <p className="text-muted-foreground">Review and analyze potential drug candidates</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Card className="p-3 flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Score Range:</span>
            <div className="w-32">
              <Slider
                defaultValue={[0.7, 1.0]}
                max={1}
                min={0}
                step={0.01}
                value={scoreFilter}
                onValueChange={setScoreFilter}
              />
            </div>
            <span className="text-xs text-muted-foreground">
              {scoreFilter[0].toFixed(2)} - {scoreFilter[1].toFixed(2)}
            </span>
          </Card>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="score">Sort by Score</SelectItem>
              <SelectItem value="weight">Sort by Molecular Weight</SelectItem>
              <SelectItem value="logP">Sort by LogP</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Generate New Set
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedMolecules.map((molecule) => (
          <Card key={molecule.id} className="overflow-hidden">
            <CardHeader className="p-4 pb-0">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{molecule.name}</CardTitle>
                  <CardDescription className="line-clamp-1">{molecule.description}</CardDescription>
                </div>
                <Badge className="ml-2">{molecule.score.toFixed(2)}</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex justify-center mb-2">
                <Image
                  src={molecule.image || "/placeholder.svg"}
                  alt={molecule.name}
                  width={150}
                  height={150}
                  className="object-contain"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Mol. Weight</p>
                  <p className="font-medium">{molecule.weight} g/mol</p>
                </div>
                <div>
                  <p className="text-muted-foreground">LogP</p>
                  <p className="font-medium">{molecule.logP}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground">Rating</p>
                  {renderStars(molecule.score)}
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="default" className="flex-1">
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>{molecule.name}</DialogTitle>
                    <DialogDescription>{molecule.description}</DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex justify-center">
                      <Image
                        src={molecule.image || "/placeholder.svg"}
                        alt={molecule.name}
                        width={200}
                        height={200}
                        className="object-contain"
                      />
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium">Properties</h4>
                        <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                          <div>
                            <p className="text-muted-foreground">Docking Score</p>
                            <p className="font-medium">{molecule.score.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Mol. Weight</p>
                            <p className="font-medium">{molecule.weight} g/mol</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">LogP</p>
                            <p className="font-medium">{molecule.logP}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">H-Bond Donors</p>
                            <p className="font-medium">3</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">H-Bond Acceptors</p>
                            <p className="font-medium">5</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Rotatable Bonds</p>
                            <p className="font-medium">4</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium">Binding Interactions</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Forms hydrogen bonds with GLY32, ALA45 and hydrophobic interactions with TRP67.
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-3 w-3" />
                          Download SDF
                        </Button>
                        <Button size="sm">Save for Review</Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="outline" className="flex-1">
                Save
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <Button onClick={() => router.push("/results-summary")}>
          Proceed to Results Summary
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

