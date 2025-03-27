"use client";

import { useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";

const ProteinViewer = () => {
  const searchParams = useSearchParams();
  const para = useParams();
  const ur = para?.glb
  const url = "https://alphafold.ebi.ac.uk/files/"+ur+".pdb"
  useEffect(() => {
    if (url) {
      import("ngl").then((NGL) => {
        const stage = new NGL.Stage("viewport");
        stage.loadFile(decodeURIComponent(url), { defaultRepresentation: true });
      });
    }
  }, [url]);

  if (!url) {
    return <p className="text-center text-red-500">No protein URL provided.</p>;
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-xl font-bold mb-4">Protein 3D Structure</h1>
      <div id="viewport" className="w-full h-[500px] border rounded-lg shadow-lg" />
    </div>
  );
};

export default ProteinViewer;
