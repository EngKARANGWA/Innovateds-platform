"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Bell, Moon, Trash2, Download, Shield } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: "en",
    autoSave: true,
    emailUpdates: false,
  })
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    const savedSettings = localStorage.getItem("userSettings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  const handleSettingChange = (key: string, value: boolean | string) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    localStorage.setItem("userSettings", JSON.stringify(newSettings))
  }

  const handleExportData = () => {
    const userData = localStorage.getItem("user")
    const quizResults = localStorage.getItem("quizResults")
    const userSettings = localStorage.getItem("userSettings")

    const exportData = {
      user: userData ? JSON.parse(userData) : null,
      quizResults: quizResults ? JSON.parse(quizResults) : [],
      settings: userSettings ? JSON.parse(userSettings) : {},
      exportDate: new Date().toISOString(),
    }

    const dataStr = JSON.stringify(exportData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)

    const link = document.createElement("a")
    link.href = url
    link.download = "innovatides-data.json"
    link.click()

    URL.revokeObjectURL(url)
  }

  const handleDeleteAccount = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("quizResults")
    localStorage.removeItem("userSettings")
    window.location.href = "/"
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account preferences and application settings</p>
      </div>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Notifications</span>
          </CardTitle>
          <CardDescription>Configure how you receive notifications and updates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Push Notifications</Label>
              <p className="text-sm text-gray-600">Receive notifications about quiz results and achievements</p>
            </div>
            <Switch
              checked={settings.notifications}
              onCheckedChange={(checked) => handleSettingChange("notifications", checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Updates</Label>
              <p className="text-sm text-gray-600">Receive weekly progress reports and new content notifications</p>
            </div>
            <Switch
              checked={settings.emailUpdates}
              onCheckedChange={(checked) => handleSettingChange("emailUpdates", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Moon className="h-5 w-5" />
            <span>Appearance</span>
          </CardTitle>
          <CardDescription>Customize the look and feel of your application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Dark Mode</Label>
              <p className="text-sm text-gray-600">Switch to dark theme for better viewing in low light</p>
            </div>
            <Switch
              checked={settings.darkMode}
              onCheckedChange={(checked) => handleSettingChange("darkMode", checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Language</Label>
              <p className="text-sm text-gray-600">Choose your preferred language</p>
            </div>
            <Select value={settings.language} onValueChange={(value) => handleSettingChange("language", value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Privacy & Security</span>
          </CardTitle>
          <CardDescription>Manage your data and privacy preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto-save Progress</Label>
              <p className="text-sm text-gray-600">Automatically save your quiz progress and results</p>
            </div>
            <Switch
              checked={settings.autoSave}
              onCheckedChange={(checked) => handleSettingChange("autoSave", checked)}
            />
          </div>

          <Separator />

          <div className="space-y-3">
            <Label>Data Management</Label>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={handleExportData} className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export Data</span>
              </Button>
            </div>
            <p className="text-sm text-gray-600">Download all your quiz results and account data</p>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-red-600">
            <Trash2 className="h-5 w-5" />
            <span>Danger Zone</span>
          </CardTitle>
          <CardDescription>Irreversible actions that will permanently affect your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!showDeleteConfirm ? (
            <div>
              <Button variant="destructive" onClick={() => setShowDeleteConfirm(true)}>
                Delete Account
              </Button>
              <p className="text-sm text-gray-600 mt-2">Permanently delete your account and all associated data</p>
            </div>
          ) : (
            <Alert variant="destructive">
              <Trash2 className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-3">
                  <p>
                    <strong>Are you sure you want to delete your account?</strong>
                  </p>
                  <p>
                    This action cannot be undone. All your quiz results, progress, and account data will be permanently
                    deleted.
                  </p>
                  <div className="flex space-x-2">
                    <Button variant="destructive" size="sm" onClick={handleDeleteAccount}>
                      Yes, Delete Account
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setShowDeleteConfirm(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
