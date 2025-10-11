import { Settings as SettingsIcon, Languages, Bell, Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const Settings = () => {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8 md:pt-20">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            <SettingsIcon className="w-8 h-8 text-primary" aria-hidden="true" />
            {t('settings')}
          </h1>
          <p className="text-muted-foreground">
            Manage your app preferences
          </p>
        </header>

        <div className="space-y-4">
          <section aria-labelledby="language-settings-heading">
            <Card>
              <CardHeader>
                <CardTitle id="language-settings-heading" className="flex items-center gap-2">
                  <Languages className="w-5 h-5" aria-hidden="true" />
                  Language / Idioma
                </CardTitle>
                <CardDescription>
                  Choose your preferred language
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3" role="group" aria-labelledby="language-settings-heading">
                <Button
                  variant={language === 'en' ? 'default' : 'outline'}
                  onClick={() => setLanguage('en')}
                  className="w-full justify-start"
                  aria-label="Switch to English"
                  aria-pressed={language === 'en'}
                >
                  English
                </Button>
                <Button
                  variant={language === 'es' ? 'default' : 'outline'}
                  onClick={() => setLanguage('es')}
                  className="w-full justify-start"
                  aria-label="Cambiar a Español"
                  aria-pressed={language === 'es'}
                >
                  Español
                </Button>
              </CardContent>
            </Card>
          </section>

          <section aria-labelledby="notifications-settings-heading">
            <Card>
              <CardHeader>
                <CardTitle id="notifications-settings-heading" className="flex items-center gap-2">
                  <Bell className="w-5 h-5" aria-hidden="true" />
                  Notifications
                </CardTitle>
                <CardDescription>
                  Manage your notification preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="payment-reminders">Payment Reminders</Label>
                  <Switch id="payment-reminders" aria-label="Toggle payment reminders" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="goal-updates">Goal Progress Updates</Label>
                  <Switch id="goal-updates" aria-label="Toggle goal progress updates" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="credit-alerts">Credit Score Alerts</Label>
                  <Switch id="credit-alerts" aria-label="Toggle credit score alerts" />
                </div>
              </CardContent>
            </Card>
          </section>

          <section aria-labelledby="privacy-settings-heading">
            <Card>
              <CardHeader>
                <CardTitle id="privacy-settings-heading" className="flex items-center gap-2">
                  <Shield className="w-5 h-5" aria-hidden="true" />
                  Privacy & Security
                </CardTitle>
                <CardDescription>
                  Your data protection settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start" aria-label="View privacy policy">
                  Privacy Policy
                </Button>
                <Button variant="outline" className="w-full justify-start" aria-label="View terms of service">
                  Terms of Service
                </Button>
                <Button variant="outline" className="w-full justify-start text-destructive" aria-label="Delete your account">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;
