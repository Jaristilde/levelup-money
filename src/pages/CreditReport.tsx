import { useState } from 'react';
import { Upload, FileText, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const CreditReport = () => {
  const { t } = useLanguage();
  const [reportText, setReportText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!reportText.trim()) {
      toast.error('Please enter your credit report data');
      return;
    }

    setIsAnalyzing(true);
    
    // TODO: Connect to AI API
    setTimeout(() => {
      setAnalysis(
        'Based on your credit report:\n\n' +
        '• Your credit utilization is high at 85% - try to keep it below 30%\n' +
        '• You have 2 late payments in the last 6 months affecting your score\n' +
        '• Average credit age is good at 7 years\n' +
        '• Consider disputing the incorrect address on file\n\n' +
        'Next steps: Focus on paying down credit card balances and setting up automatic payments.'
      );
      setIsAnalyzing(false);
      toast.success('Analysis complete!');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8 md:pt-20">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            <FileText className="w-8 h-8 text-primary" />
            {t('creditReportTitle')}
          </h1>
          <p className="text-muted-foreground">
            Upload or paste your credit report for AI-powered insights
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Enter Your Credit Report Data</CardTitle>
            <CardDescription>
              Copy and paste information from your credit report, or type key details manually
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PDF, DOCX, or TXT files accepted
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or enter manually</span>
              </div>
            </div>

            <Textarea
              placeholder="Paste your credit report data here, or enter key information like:\n- Credit score\n- Account balances\n- Payment history\n- Credit inquiries\n- Personal information"
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
              className="min-h-[200px] font-mono text-sm"
            />

            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {isAnalyzing ? (
                <>Analyzing...</>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  {t('analyzeCredit')}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {analysis && (
          <Card className="border-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                AI Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap text-sm text-foreground bg-muted p-4 rounded-lg">
                  {analysis}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CreditReport;
