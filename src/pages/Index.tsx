
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

interface UserPreferences {
  primaryColor?: string;
  secondaryColor?: string;
  termsAgreed?: boolean;
  facebookAuthorized?: boolean;
}

const Index = () => {
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    const saved = localStorage.getItem("userPreferences");
    return saved ? JSON.parse(saved) : {};
  });

  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem("userPreferences", JSON.stringify(preferences));
  }, [preferences]);

  const handlePreferenceChange = (key: keyof UserPreferences, value: any) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
    toast({
      title: "Preference saved",
      description: "Your settings have been updated.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container max-w-6xl px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-4">
            Welcome to Visual Automation
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create stunning product animations and social media content automatically.
            Let's personalize your experience.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {!preferences.primaryColor && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Brand Colors</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <Input
                      id="primaryColor"
                      type="color"
                      className="h-10"
                      onChange={(e) =>
                        handlePreferenceChange("primaryColor", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <Input
                      id="secondaryColor"
                      type="color"
                      className="h-10"
                      onChange={(e) =>
                        handlePreferenceChange("secondaryColor", e.target.value)
                      }
                    />
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {!preferences.termsAgreed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Terms & Conditions</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      onCheckedChange={(checked) =>
                        handlePreferenceChange("termsAgreed", checked)
                      }
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm text-muted-foreground"
                    >
                      I agree to the terms and conditions
                    </label>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {!preferences.facebookAuthorized && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Social Integration</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="facebook"
                      onCheckedChange={(checked) =>
                        handlePreferenceChange("facebookAuthorized", checked)
                      }
                    />
                    <Label htmlFor="facebook">Authorize Facebook Posting</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Allow us to post generated content directly to your Facebook page
                  </p>
                </div>
              </Card>
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <Button
            size="lg"
            onClick={() =>
              toast({
                title: "Welcome aboard!",
                description: "You're all set to start creating amazing content.",
              })
            }
          >
            Get Started
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
