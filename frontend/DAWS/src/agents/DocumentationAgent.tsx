import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

export default function DocumentationAgent() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateDocs = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setResult("");

    // Simulated delay — replace with backend call later
    setTimeout(() => {
      setResult(
        `### Generated Documentation\n\n${inputText}\n\n✔️ The Documentation Agent has processed your input.`
      );
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="p-6 flex flex-col gap-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">📄 Documentation Agent</h1>

      <Card className="shadow-lg">
        <CardContent className="p-4 flex flex-col gap-3">
          <label className="font-medium">
            Enter module / feature description
          </label>
          <Textarea
            placeholder="Describe your feature or paste code here…"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-40"
          />

          <Button
            onClick={handleGenerateDocs}
            disabled={loading}
            className="w-fit"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Generate Documentation
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card className="shadow-lg border border-muted">
          <CardContent className="p-4 whitespace-pre-wrap">
            {result}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
