import { useState } from 'react';
import { FileCheck, Download, Copy } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const DisputeLetter = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    accountNumber: '',
    bureauName: '',
    issueDescription: '',
  });
  const [generatedLetter, setGeneratedLetter] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!formData.name || !formData.issueDescription) {
      toast.error('Please fill in at least your name and issue description');
      return;
    }

    setIsGenerating(true);
    
    // TODO: Connect to AI API
    setTimeout(() => {
      const letter = `${formData.name}
${formData.address}

${new Date().toLocaleDateString()}

${formData.bureauName || '[Credit Bureau Name]'}
Dispute Department

Re: Formal Dispute of Credit Report Information

Dear Sir or Madam,

I am writing to dispute the following information in my credit file. The items I dispute are:

Account: ${formData.accountNumber || '[Account Number]'}

${formData.issueDescription}

I am requesting that this item be removed [or request another specific change] to correct the information.

Enclosed are copies of [use this sentence to describe any enclosed documentation, such as payment records, court documents] supporting my position. Please investigate this matter and correct the disputed item as soon as possible.

Sincerely,
${formData.name}`;

      setGeneratedLetter(letter);
      setIsGenerating(false);
      toast.success('Letter generated successfully!');
    }, 1500);
  };

  const handleCopy = () => {
    if (generatedLetter) {
      navigator.clipboard.writeText(generatedLetter);
      toast.success('Letter copied to clipboard!');
    }
  };

  const handleDownload = () => {
    if (generatedLetter) {
      const blob = new Blob([generatedLetter], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'credit-dispute-letter.txt';
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Letter downloaded!');
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8 md:pt-20">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            <FileCheck className="w-8 h-8 text-primary" />
            {t('disputeLetterTitle')}
          </h1>
          <p className="text-muted-foreground">
            {t('disputeLetterSubtitle')}
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Fill in Your Information</CardTitle>
            <CardDescription>
              Complete the form below to generate a professional dispute letter
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Your Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Your Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="123 Main St, City, ST 12345"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                  placeholder="XXXX-XXXX-XXXX"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bureauName">Credit Bureau Name</Label>
                <Input
                  id="bureauName"
                  value={formData.bureauName}
                  onChange={(e) => setFormData({ ...formData, bureauName: e.target.value })}
                  placeholder="Equifax, Experian, or TransUnion"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="issueDescription">Describe the Issue *</Label>
              <Textarea
                id="issueDescription"
                value={formData.issueDescription}
                onChange={(e) => setFormData({ ...formData, issueDescription: e.target.value })}
                placeholder="Describe what is incorrect on your credit report and why it should be corrected..."
                className="min-h-[120px]"
              />
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {isGenerating ? 'Generating...' : 'Generate Dispute Letter'}
            </Button>
          </CardContent>
        </Card>

        {generatedLetter && (
          <Card className="border-primary">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Your Dispute Letter</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopy}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDownload}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap text-sm text-foreground bg-muted p-4 rounded-lg font-mono">
                {generatedLetter}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DisputeLetter;
