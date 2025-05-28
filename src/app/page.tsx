import PlaygroundMain from "@/components/playground/PlaygroundMain";
import PlaygroundLayout from "@/components/playground/PlaygroundLayout";
import Navbar from "@/components/navbar";
import PlaygroundSider from "@/components/playground/PlaygroundSider";

export default function Home() {
  return (
    <div className="flex flex-col h-screen font-[family-name:var(--font-geist-sans)] overflow-hidden">
      <Navbar />
      <PlaygroundLayout>
        <PlaygroundSider />
        <PlaygroundMain />
      </PlaygroundLayout>
    </div>
  );
}
