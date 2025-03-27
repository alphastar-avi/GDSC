import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Dna, FlaskRoundIcon as Flask, Microscope, Pill } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Accelerating Drug Discovery with Generative AI
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Streamline your research with our AI-powered platform that helps you identify, analyze, and develop
                potential drug candidates faster than ever before.
              </p>
            </div>
            <Button size="lg" asChild>
              <Link href="/protein-input">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">How It Works</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Our platform simplifies the drug discovery process through a series of integrated steps
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mt-8">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
                <div className="rounded-full bg-primary/10 p-3">
                  <Dna className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Protein Input</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Enter your protein sequence in FASTA format or upload a file to begin the analysis.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
                <div className="rounded-full bg-primary/10 p-3">
                  <Microscope className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Structure Prediction</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Our AI predicts the 3D structure of your protein and identifies potential binding sites.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
                <div className="rounded-full bg-primary/10 p-3">
                  <Flask className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Molecule Generation</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Generate potential drug candidates that target the identified binding sites.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
                <div className="rounded-full bg-primary/10 p-3">
                  <Pill className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Candidate Review</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Review and analyze the generated molecules to identify the most promising candidates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Transform Your Research?</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Join the growing community of researchers using our platform to accelerate their drug discovery process.
              </p>
            </div>
            <Button size="lg" asChild>
              <Link href="/protein-input">
                Start Your Discovery Journey <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

