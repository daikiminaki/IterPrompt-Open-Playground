import { Session } from "@/lib/core/IModel";
import { PlaygroundIconButton, ImageUploadButton } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PanelInputProps {
  session: Session;
  onUpdate: (session: Session) => void;
  onSubmit: (userInput: string) => void;
  loading?: boolean;
}

export function PanelInput({ session, onUpdate, onSubmit, loading }: PanelInputProps) {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ ...session, userInput: e.target.value })
  }

  const handleSend = () => {
    onSubmit(session.userInput)
  }

  const handleUpload = (file: File) => {
    console.log(file)
  }

  return (
    <div className="w-full bg-gray-50">
      <Input 
        value={session.userInput}
        onChange={handleInputChange}
        onSubmit={handleSend}
        className="w-full"
        placeholder="Type your message here..."
        prefix={<ImageUploadButton onUpload={handleUpload} />}
        suffix={<PlaygroundIconButton 
          icon={<Send className="w-4 h-4" />} 
          tooltip="Send" 
          onClick={handleSend}
          disabled={loading}
        />}
        disabled={loading}
      />
    </div>
  )
}