import { Storage } from "@plasmohq/storage"
import { useEffect, useState } from "react"

export function StringField({
  label,
  value,
  setValue
}: {
  label: string
  value: string
  setValue: (value: string) => void
}) {
  return (
    <input
      className="block w-full bg-gray-800 text-white p-2 rounded-md shadow-md"
      type="text"
      value={value}
      placeholder={label}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}

export function PasswordField({
  label,
  value,
  setValue
}: {
  label: string
  value: string
  setValue: (value: string) => void
}) {
  return (
    <input
      className="block w-full bg-gray-800 text-white p-2 rounded-md shadow-md"
      type="password"
      value={value}
      placeholder={label}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}

export function StorageField({
  storageKey,
  label
}: {
  storageKey: string
  label: string
}) {
  const [state, setState] = useState("")
  const storage = new Storage()

  const UpdateState = (value: string) => {
    setState(value)
    storage.set(storageKey, value)
  }

  useEffect(() => {
    storage.get(storageKey).then((value) => {
      setState(value)
    })
  }, [])

  return (
    <input
      className="block w-full bg-gray-800 text-white p-2 rounded-md shadow-md"
      type="text"
      value={state}
      placeholder={label}
      onChange={(e) => UpdateState(e.target.value)}
    />
  )
}
