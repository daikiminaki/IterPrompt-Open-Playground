'use client'

import { SiderIconButton } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { usePlayground } from "@/contexts/PlaygroundContext";
import { KeyRound } from "lucide-react";
import { ApiKeyForm } from "@/components/playground/settings/ApiKeyForm";
import { toast } from "sonner";

export default function ApiKeyDrawer() {
  const { apiKeys, setApiKeys, openApiKeyDrawer, setOpenApiKeyDrawer } = usePlayground()

  return (
    <Drawer open={openApiKeyDrawer} onOpenChange={setOpenApiKeyDrawer} direction="right">
      <DrawerTrigger asChild>
        <SiderIconButton
          icon={<KeyRound className="w-5 h-5" />}
          tooltip="API Keys"
          onClick={() => {}}
        />
      </DrawerTrigger>
      <DrawerContent >
        <DrawerHeader>
          <DrawerTitle>API Keys</DrawerTitle>
          <DrawerDescription>Manage your API keys</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <ApiKeyForm 
            apiKeys={apiKeys} 
            setApiKeys={setApiKeys} 
            onSave={() => {
              toast.success("API keys saved")
              setOpenApiKeyDrawer(false)
            }} 
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
