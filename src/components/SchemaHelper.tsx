/* eslint-disable react-refresh/only-export-components -- hooks et composants de schéma partagent leur module utilitaire */
import { useEffect } from 'react'

export function useAddSchema(schema: Record<string, unknown>) {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.innerHTML = JSON.stringify(schema)
    document.head.appendChild(script)
    return () => {
      document.head.removeChild(script)
    }
  }, [schema])
}

export function SchemaScript({ schema }: { schema: Record<string, unknown> }) {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.innerHTML = JSON.stringify(schema)
    document.head.appendChild(script)
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [schema])

  return null
}

export default SchemaScript
