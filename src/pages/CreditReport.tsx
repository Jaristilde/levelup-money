import { useState } from 'react';
import { Upload, FileText, TrendingUp, Phone, ExternalLink, Lightbulb } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const CreditReport = () => {
  const { t, language, setLanguage } = useLanguage();
  const [reportText, setReportText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);

  const creditBureaus = [
    {
      name: 'Equifax',
      phone: '1-800-685-1111',
      url: 'https://www.annualcreditreport.com',
      color: 'text-[#DA291C]',
    },
    {
      name: 'Experian',
      phone: '1-888-397-3742',
      url: 'https://www.annualcreditreport.com',
      color: 'text-[#003087]',
    },
    {
      name: 'TransUnion',
      phone: '1-800-916-8800',
      url: 'https://www.annualcreditreport.com',
      color: 'text-[#0094D9]',
    },
  ];

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
      <div className="max-w-4xl mx-auto px-4 py-4 md:py-6 space-y-6 md:space-y-8">
        <div className="mb-4 md:mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            <FileText className="w-6 h-6 md:w-8 md:h-8 text-primary" />
            {t('creditReportTitle')}
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Upload or paste your credit report for AI-powered insights
          </p>
        </div>

        {/* Credit Bureau Section */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-start justify-between gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                {t('freeCreditReportTitle')}
              </h2>
              <p className="text-sm md:text-base text-muted-foreground">
                {t('freeCreditReportSubtitle')}
              </p>
            </div>
            <Select value={language} onValueChange={(val) => setLanguage(val as 'en' | 'es')}>
              <SelectTrigger className="w-full md:w-[180px] border-2 min-h-[44px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">🇺🇸 English</SelectItem>
                <SelectItem value="es">🇪🇸 Español</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Credit Bureaus Table */}
          <Card className="border-2">
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {creditBureaus.map((bureau) => (
                  <div
                    key={bureau.name}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 md:p-6 gap-4 hover:bg-accent/5 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0 w-full sm:w-auto">
                      <div className="w-12 h-12 rounded-full bg-background border-2 border-border flex items-center justify-center flex-shrink-0">
                        <span className={`font-bold text-xl ${bureau.color}`}>
                          {bureau.name[0]}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-bold text-base md:text-lg ${bureau.color}`}>
                          {bureau.name}
                        </h3>
                        <a
                          href={`tel:${bureau.phone}`}
                          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors min-h-[44px] sm:min-h-0"
                        >
                          <Phone className="w-3 h-3" />
                          {bureau.phone}
                        </a>
                      </div>
                    </div>
                    <Button
                      asChild
                      className="flex-shrink-0 bg-primary hover:bg-primary/90 w-full sm:w-auto min-h-[44px]"
                    >
                      <a
                        href={bureau.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 justify-center"
                      >
                        {t('viewReport')}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Educational Notice */}
          <Card className="border-2 border-warning/30 bg-warning/5">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Lightbulb className="w-6 h-6 text-warning flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">
                    {t('didYouKnow')}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t('legalNotice')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
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
              className="w-full bg-primary hover:bg-primary/90 min-h-[48px]"
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
