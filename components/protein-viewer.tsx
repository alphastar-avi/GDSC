"use client"

import { useRef, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, PerspectiveCamera } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { RotateCw } from "lucide-react"

export function ProteinViewer() {
  const controlsRef = useRef(null)
  const [viewMode, setViewMode] = useState("cartoon")
  const [showBindingSites, setShowBindingSites] = useState(true)

  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset()
    }
  }

  return (
    <div className="relative h-full w-full">
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            size="sm"
            className={viewMode === "cartoon" ? "bg-primary text-primary-foreground" : ""}
            onClick={() => setViewMode("cartoon")}
          >
            Cartoon
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className={viewMode === "surface" ? "bg-primary text-primary-foreground" : ""}
            onClick={() => setViewMode("surface")}
          >
            Surface
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className={viewMode === "sticks" ? "bg-primary text-primary-foreground" : ""}
            onClick={() => setViewMode("sticks")}
          >
            Sticks
          </Button>
        </div>
        <Button variant="outline" size="sm" onClick={() => setShowBindingSites(!showBindingSites)}>
          {showBindingSites ? "Hide" : "Show"} Binding Sites
        </Button>
      </div>

      <div className="absolute bottom-2 right-2 z-10">
        <Button variant="outline" size="icon" onClick={resetCamera}>
          <RotateCw className="h-4 w-4" />
        </Button>
      </div>

      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 100]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={0.5} />

        {/* Placeholder protein model - in a real app, this would be the actual protein structure */}
        <mesh>
          <sphereGeometry args={[20, 32, 32]} />
          <meshStandardMaterial color="#6366f1" transparent opacity={0.7} />
        </mesh>

        {/* Binding site highlights */}
        {showBindingSites && (
          <>
            <mesh position={[15, 15, 15]}>
              <sphereGeometry args={[5, 16, 16]} />
              <meshStandardMaterial color="#ef4444" transparent opacity={0.8} />
            </mesh>
            <mesh position={[-10, 10, 15]}>
              <sphereGeometry args={[4, 16, 16]} />
              <meshStandardMaterial color="#f97316" transparent opacity={0.8} />
            </mesh>
            <mesh position={[5, -15, 10]}>
              <sphereGeometry args={[4.5, 16, 16]} />
              <meshStandardMaterial color="#eab308" transparent opacity={0.8} />
            </mesh>
          </>
        )}

        <OrbitControls ref={controlsRef} enableDamping dampingFactor={0.1} />
        <Environment preset="studio" />
      </Canvas>
    </div>
  )
}

