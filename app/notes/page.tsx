"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-2 py-4 sm:px-4 md:px-8">
      <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow p-4 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-6 text-center">Learning Notes & Tutorial</h1>
        
        <h2 className="text-xl sm:text-2xl font-semibold text-blue-800 mt-6 mb-2">Food and Agriculture</h2>
        <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-gray-800 mb-4 text-base sm:text-lg">
          <li>
            <strong>Food irradiation:</strong> Radiation is used to sterilize food packaging. In the Netherlands, for example, milk cartons are freed from bacteria by irradiation (e.g. cobalt-60).
          </li>
          <li>
            <strong>Fertilizers:</strong> Fertilizers 'labelled' with a particular isotope, such as nitrogen-15 or phosphorus-32, provide a means of finding out how much is taken up by the plant and how much is lost, allowing better management of fertilizer application. Using N-15 also enables assessment of how much nitrogen is fixed from the air by soil and by root bacteria in legumes.
          </li>
          <li>
            <strong>Insect control:</strong> Radiation is used to control insect populations via the Sterile Insect Technique (SIT). This involves rearing large populations of insects that are sterilized through irradiation (gamma or X-rays), and introducing them into natural populations (e.g. cobalt-60).
          </li>
          <li>
            <strong>Plant mutation breeding:</strong> Irradiation can be used to induce mutations in plants with the goal to produce varieties that display improved product quality, have higher yields and yield stability, greater resilience to climate change and tolerance to environmental stresses (e.g. cobalt-60, caesium-137).
          </li>
        </ul>

        <h2 className="text-xl sm:text-2xl font-semibold text-blue-800 mt-6 mb-2">Nuclear Medicine (Diagnostic and Imaging)</h2>
        <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-gray-800 mb-4 text-base sm:text-lg">
          <li>
            <strong>Radionuclide diagnostics:</strong> Chemical compounds containing radionuclides are administered to a patient (e.g. Tc-99m).
          </li>
          <li>
            <strong>Therapy:</strong> Sealed radioactive sources are placed close to or inside the target (e.g. Radium-226, Caesium-137).
          </li>
        </ul>

        <h2 className="text-xl sm:text-2xl font-semibold text-blue-800 mt-6 mb-2">Industry</h2>
        <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-gray-800 mb-4 text-base sm:text-lg">
          <li>
            <strong>Nondestructive testing:</strong> For non-destructive testing of structures for environmental safety (e.g. safer dams, avoiding floods, and other environmental risks). Isotopes used: cobalt-60, iridium-192.
          </li>
          <li>
            <strong>Tracer techniques:</strong> Radioactive tracers help analyze fluid flow, leaks, blockages, or chemical reactions in pipelines, water systems, or factories (e.g. Technetium Tc-99 in water, Iodine-131 for chemical tracing).
          </li>
        </ul>

        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
          <Link href="/quiz" className="flex-1">
            <Button className="w-full bg-blue-900 hover:bg-blue-800">Go to Quiz</Button>
          </Link>
          <Link href="/" className="flex-1">
            <Button variant="outline" className="w-full">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}