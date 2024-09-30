"use client"

import React, { useState, useEffect } from "react"
import { Copy, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

export function PasswordGeneratorComponent() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(12)
  const [useNumbers, setUseNumbers] = useState(true)
  const [useSpecialChars, setUseSpecialChars] = useState(true)
  const [notification, setNotification] = useState("")

  const generatePassword = () => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const numbers = "0123456789"
    const specialChars = "!@#$%^&*()_+-=[]{}|;:,.<>?"

    let chars = charset
    if (useNumbers) chars += numbers
    if (useSpecialChars) chars += specialChars

    let newPassword = ""
    for (let i = 0; i < length; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setPassword(newPassword)
  }

  useEffect(() => {
    generatePassword()
  }, [length, useNumbers, useSpecialChars])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
    setNotification("Skopiowano!")
    setTimeout(() => setNotification(""), 3000)
  }

  const getStrengthColor = () => {
    if (length > 25) return "bg-lime-600"
    if (length >= 14) return "bg-lime-500"
    if (length >= 8) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getStrengthText = () => {
    if (length > 25) return "NAJLEPSZE"
    if (length >= 14) return "Silne"
    if (length >= 8) return "Dobre"
    return "Słabe"
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <Card className="w-full max-w-md bg-gray-800 text-gray-100 shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Generator Haseł</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-gray-700 p-4 rounded-md relative overflow-hidden group">
            <p className="text-xl font-mono break-all">{password}</p>
            <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                <Copy className="h-6 w-6" />
                <span className="sr-only">Kopiuj</span>
              </Button>
            </div>
          </div>
          {notification && (
            <div className="bg-green-500 text-white px-4 py-2 rounded-md text-center">
              {notification}
            </div>
          )}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="length">Długość: {length}</Label>
              <div className={`px-2 py-1 rounded text-xs font-semibold ${getStrengthColor()} text-gray-900`}>
                {getStrengthText()}
              </div>
            </div>
            <Slider
              id="length"
              min={4}
              max={32}
              step={1}
              value={[length]}
              onValueChange={(value) => setLength(value[0])}
              className="w-full"
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="useNumbers">Cyfry (1,2,3,4,5,6,7,8,9)</Label>
            <Switch
              id="useNumbers"
              checked={useNumbers}
              onCheckedChange={setUseNumbers}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="useSpecialChars">Znaki specjalne (!,@,#,$,%,^,&,*)</Label>
            <Switch
              id="useSpecialChars"
              checked={useSpecialChars}
              onCheckedChange={setUseSpecialChars}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={generatePassword}>
            <RefreshCw className="mr-2 h-4 w-4" /> Generuj Hasło
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
