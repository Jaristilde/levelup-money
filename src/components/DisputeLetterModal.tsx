import { useState } from 'react';
import { X, Download, FileText, AlertCircle, CheckCircle, Loader2, Copy, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface DisputeLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type DisputeType =
  | 'late-payment'
  | 'incorrect-balance'
  | 'identity-theft'
  | 'account-not-mine'
  | 'duplicate-account'
  | 'paid-off'
  | 'mixed-file'
  | 'other';

type CreditBureau = 'experian' | 'equifax' | 'transunion' | 'all';

const DisputeLetterModal = ({ isOpen, onClose }: DisputeLetterModalProps) => {
  const [step, setStep] = useState<'form' | 'preview'>('form');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Form state
  const [disputeType, setDisputeType] = useState<DisputeType>('late-payment');
  const [bureau, setBureau] = useState<CreditBureau>('all');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [disputeDetails, setDisputeDetails] = useState('');
  const [desiredOutcome, setDesiredOutcome] = useState('');

  // User info
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [ssn, setSsn] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  const disputeTypes = [
    { value: 'late-payment', label: 'Late Payment Incorrectly Reported' },
    { value: 'incorrect-balance', label: 'Incorrect Balance or Credit Limit' },
    { value: 'identity-theft', label: 'Identity Theft / Fraudulent Account' },
    { value: 'account-not-mine', label: 'Account Does Not Belong to Me' },
    { value: 'duplicate-account', label: 'Duplicate Account Listing' },
    { value: 'paid-off', label: 'Account Paid Off But Still Showing' },
    { value: 'mixed-file', label: 'Mixed File (Wrong Person\'s Info)' },
    { value: 'other', label: 'Other Inaccurate Information' },
  ];

  const bureaus = [
    { value: 'all', label: 'All Three Bureaus' },
    { value: 'experian', label: 'Experian' },
    { value: 'equifax', label: 'Equifax' },
    { value: 'transunion', label: 'TransUnion' },
  ];

  const generateLetter = () => {
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const bureauAddresses = {
      experian: 'Experian\nP.O. Box 4500\nAllen, TX 75013',
      equifax: 'Equifax Information Services LLC\nP.O. Box 740256\nAtlanta, GA 30374',
      transunion: 'TransUnion LLC\nConsumer Dispute Center\nP.O. Box 2000\nChester, PA 19016'
    };

    const disputeTypeDescriptions = {
      'late-payment': 'I am writing to dispute a late payment that has been incorrectly reported on my credit report.',
      'incorrect-balance': 'I am writing to dispute an incorrect balance or credit limit that appears on my credit report.',
      'identity-theft': 'I am writing to report fraudulent activity and identity theft affecting my credit report.',
      'account-not-mine': 'I am writing to dispute an account that does not belong to me and appears on my credit report.',
      'duplicate-account': 'I am writing to dispute a duplicate account listing that appears on my credit report.',
      'paid-off': 'I am writing to dispute an account that has been paid in full but is still showing as active or unpaid.',
      'mixed-file': 'I am writing to dispute information that belongs to another person and has been mixed into my credit file.',
      'other': 'I am writing to dispute inaccurate information that appears on my credit report.',
    };

    const bureauAddress = bureau === 'all' ? bureauAddresses.experian : bureauAddresses[bureau];
    const disputeDescription = disputeTypeDescriptions[disputeType];

    return `${fullName}
${address}
${city}, ${state} ${zipCode}
Date of Birth: ${dateOfBirth}
SSN: XXX-XX-${ssn.slice(-4)}

${today}

${bureauAddress}

Re: Formal Dispute of Credit Report Information

Dear Sir or Madam:

${disputeDescription}

ACCOUNT INFORMATION:
Creditor/Account Name: ${accountName}
Account Number: ${accountNumber}

DISPUTE DETAILS:
${disputeDetails}

According to the Fair Credit Reporting Act (FCRA), I have the right to dispute incomplete or inaccurate information in my credit file. The information listed above is ${disputeType === 'identity-theft' ? 'fraudulent' : 'inaccurate'} and I am requesting that it be ${desiredOutcome || 'corrected or removed from my credit report'}.

${disputeType === 'identity-theft' ? 'This account was opened fraudulently and I am a victim of identity theft. I have filed a report with local law enforcement and the Federal Trade Commission.' : 'I have verified this information with the creditor and can provide supporting documentation if needed.'}

Under the FCRA, you are required to investigate this dispute within 30 days and provide me with written results of your investigation. Please correct or delete this information from my credit file as soon as possible.

DESIRED OUTCOME:
${desiredOutcome}

I have enclosed copies of supporting documents that verify my claim. Please investigate this matter and correct the inaccurate information promptly.

If you need any additional information from me, please contact me at the address listed above. I appreciate your immediate attention to this matter.

Sincerely,

${fullName}

Enclosures: Supporting documentation`;
  };

  const handleGenerateLetter = async () => {
    setLoading(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    setStep('preview');
  };

  const handleCopyLetter = () => {
    navigator.clipboard.writeText(generateLetter());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    // In production, this would generate an actual PDF
    const letter = generateLetter();
    const blob = new Blob([letter], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dispute-letter-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadWord = () => {
    // In production, this would generate an actual Word document
    const letter = generateLetter();
    const blob = new Blob([letter], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dispute-letter-${new Date().toISOString().split('T')[0]}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClose = () => {
    setStep('form');
    setLoading(false);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white rounded-3xl shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-blue to-brand-blue-light text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold font-poppins">Credit Dispute Letter Generator</h2>
              <p className="text-sm text-white/80 font-inter">Create a professional FCRA-compliant dispute letter</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6">
          {step === 'form' ? (
            <div className="space-y-6">
              {/* Info Alert */}
              <div className="bg-blue-50 border-2 border-brand-blue/20 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-900 font-semibold font-inter mb-1">
                    Know Your Rights
                  </p>
                  <p className="text-xs text-slate-700 font-inter">
                    Under the Fair Credit Reporting Act (FCRA), you have the right to dispute inaccurate information on your credit report. Credit bureaus must investigate within 30 days.
                  </p>
                </div>
              </div>

              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4 font-poppins flex items-center gap-2">
                  Your Information
                  <Badge className="bg-brand-blue/10 text-brand-blue border-0">Required</Badge>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 font-inter">Full Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all font-inter"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 font-inter">Date of Birth</label>
                    <input
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all font-inter"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2 font-inter">Street Address</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all font-inter"
                      placeholder="123 Main Street"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 font-inter">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all font-inter"
                      placeholder="New York"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 font-inter">State</label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all font-inter"
                      placeholder="NY"
                      maxLength={2}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 font-inter">ZIP Code</label>
                    <input
                      type="text"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all font-inter"
                      placeholder="10001"
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 font-inter">Last 4 Digits of SSN</label>
                    <input
                      type="text"
                      value={ssn}
                      onChange={(e) => setSsn(e.target.value)}
                      className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all font-inter"
                      placeholder="1234"
                      maxLength={4}
                    />
                  </div>
                </div>
              </div>

              {/* Dispute Information */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4 font-poppins">Dispute Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 font-inter">Credit Bureau</label>
                    <select
                      value={bureau}
                      onChange={(e) => setBureau(e.target.value as CreditBureau)}
                      className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all font-inter bg-white"
                    >
                      {bureaus.map(b => (
                        <option key={b.value} value={b.value}>{b.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 font-inter">Type of Dispute</label>
                    <select
                      value={disputeType}
                      onChange={(e) => setDisputeType(e.target.value as DisputeType)}
                      className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all font-inter bg-white"
                    >
                      {disputeTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2 font-inter">Account/Creditor Name</label>
                      <input
                        type="text"
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                        className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all font-inter"
                        placeholder="e.g., Chase Bank"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2 font-inter">Account Number (Last 4 Digits)</label>
                      <input
                        type="text"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all font-inter"
                        placeholder="XXXX-1234"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 font-inter">
                      Explain the Error in Detail
                    </label>
                    <textarea
                      value={disputeDetails}
                      onChange={(e) => setDisputeDetails(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all font-inter resize-none"
                      placeholder="Provide specific details about the error. Include dates, amounts, and any relevant information that supports your dispute."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 font-inter">
                      Desired Outcome
                    </label>
                    <textarea
                      value={desiredOutcome}
                      onChange={(e) => setDesiredOutcome(e.target.value)}
                      rows={2}
                      className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all font-inter resize-none"
                      placeholder="What do you want the credit bureau to do? (e.g., 'Remove this late payment from my credit report')"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleClose}
                  variant="outline"
                  className="flex-1 border-2 border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold rounded-xl h-12"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleGenerateLetter}
                  disabled={!fullName || !address || !city || !state || !zipCode || !accountName || !disputeDetails || loading}
                  className="flex-1 bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold rounded-xl h-12 shadow-lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating Letter...
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-2" />
                      Preview Letter
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Success Banner */}
              <div className="bg-gradient-to-r from-brand-green to-emerald-500 text-white rounded-xl p-4 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0" />
                <div>
                  <p className="font-semibold font-poppins">Letter Generated Successfully!</p>
                  <p className="text-sm text-white/90 font-inter">Review your dispute letter below and download when ready.</p>
                </div>
              </div>

              {/* Letter Preview */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-slate-900 font-poppins">Letter Preview</h3>
                  <Button
                    onClick={handleCopyLetter}
                    variant="outline"
                    size="sm"
                    className="border-brand-blue/30 text-brand-blue hover:bg-brand-blue/10"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Text
                      </>
                    )}
                  </Button>
                </div>
                <div className="bg-white border-2 border-slate-200 rounded-xl p-6 max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap font-inter text-sm text-slate-900 leading-relaxed">
                    {generateLetter()}
                  </pre>
                </div>
              </div>

              {/* Download Tips */}
              <div className="bg-brand-yellow/10 border-2 border-brand-yellow/30 rounded-xl p-4">
                <p className="text-sm font-semibold text-slate-900 mb-2 font-poppins">Next Steps:</p>
                <ul className="text-xs text-slate-700 space-y-1 font-inter">
                  <li>• Download and print your dispute letter</li>
                  <li>• Include copies (not originals) of supporting documents</li>
                  <li>• Send via certified mail with return receipt requested</li>
                  <li>• Keep copies of everything for your records</li>
                  <li>• Credit bureaus must respond within 30 days</li>
                </ul>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => setStep('form')}
                  variant="outline"
                  className="flex-1 border-2 border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold rounded-xl h-12"
                >
                  Back to Edit
                </Button>
                <Button
                  onClick={handleDownloadWord}
                  className="flex-1 bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold rounded-xl h-12 shadow-lg"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download as Word
                </Button>
                <Button
                  onClick={handleDownloadPDF}
                  className="flex-1 bg-brand-green hover:bg-brand-green/90 text-white font-semibold rounded-xl h-12 shadow-lg"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download as PDF
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default DisputeLetterModal;
