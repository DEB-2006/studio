
// src/app/(app)/donation/page.tsx
'use client';

import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coffee, DollarSign, Heart, Smartphone, CreditCard } from 'lucide-react';
import Image from 'next/image';

export default function DonationPage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js";
    script.setAttribute('data-name', 'bmc-button');
    // IMPORTANT: Replace 'YOUR_BUYMEACOFFEE_USERNAME' with your actual Buy Me A Coffee username
    script.setAttribute('data-slug', 'YOUR_BUYMEACOFFEE_USERNAME');
    script.setAttribute('data-color', '#FFDD00'); // Default BMC color, you can customize
    script.setAttribute('data-emoji', '☕');
    script.setAttribute('data-font', 'Arial'); // Using a common font
    script.setAttribute('data-text', 'Buy me a coffee');
    script.setAttribute('data-outline-color', '#000000');
    script.setAttribute('data-font-color', '#000000');
    script.setAttribute('data-coffee-color', '#ffffff');
    script.async = true;

    document.body.appendChild(script);

    // Cleanup function to remove the script and the widget if the component unmounts
    return () => {
      document.body.removeChild(script);
      const bmcWidget = document.getElementById('bmc-wbtn');
      if (bmcWidget) {
        bmcWidget.remove();
      }
      // BMC sometimes adds a style tag, attempt to remove it too
      const bmcStyle = document.querySelector('style[data-id="bmc-style"]');
      if (bmcStyle) {
        bmcStyle.remove();
      }
    };
  }, []);

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
      <header className="text-center py-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-primary flex items-center justify-center gap-3">
          <Heart className="w-10 h-10" /> Support SnapRecipe
        </h1>
        <p className="mt-3 text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto">
          Help us keep the AI chef cooking and bring more delicious features to your kitchen!
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8 items-start max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coffee className="text-primary" /> Why Your Support Matters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              SnapRecipe is a passion project dedicated to making cooking easier and more fun with the power of AI.
            </p>
            <p>
              Your generous donations help us cover server costs, API usage (for the AI magic!), and dedicate more time to developing new features, improving existing ones, and ensuring SnapRecipe remains a valuable tool for everyone.
            </p>
            <p>
              Every contribution, no matter the size, makes a big difference and is deeply appreciated!
            </p>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground italic">Thank you for being part of our community!</p>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="text-primary" /> Make a Donation
              </CardTitle>
              <CardDescription>Choose your preferred way to contribute.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2 text-foreground">Buy Me a Coffee</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Click the "Buy me a coffee" button (usually appears in a corner of the screen) to make a one-time donation.
                </p>
                {/* The Buy Me A Coffee button is injected by their script. */}
              </div>
              <hr />
               <div>
                <h3 className="font-semibold mb-2 text-foreground flex items-center gap-2">
                  <CreditCard size={20} className="text-blue-500" /> Pay with Card (via Payment Processor)
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Use a secure payment processor like Stripe or PayPal.
                  You would replace the button below with the integration code from your chosen provider.
                </p>
                <Button className="w-full" size="lg" disabled>
                  Donate with Card (Setup Required)
                </Button>
                 <p className="text-xs text-muted-foreground mt-1">
                  This is a placeholder. You'll need to integrate a service like Stripe or PayPal here.
                </p>
              </div>
              <hr />
              <div>
                <h3 className="font-semibold mb-2 text-foreground flex items-center gap-2">
                  <Smartphone size={20} className="text-green-500" /> Google Pay
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  You can send a donation via Google Pay to the following identifier:
                </p>
                <div className="p-3 border rounded-md bg-muted/50">
                  <p className="text-sm font-medium text-foreground break-all">
                    {/* Replace with your actual Google Pay email/phone */}
                    your.email@example.com OR +1234567890 
                  </p>
                </div>
              </div>
              <hr />
              <div>
                <h3 className="font-semibold mb-2 text-foreground">Donate with Crypto</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Scan the QR code or copy an address below.
                </p>
                <div className="flex flex-col items-center p-4 border rounded-md bg-muted/50">
                   <Image
                    src="https://placehold.co/150x150.png" // Replace with your actual QR code image file for your primary crypto (e.g., /btc-qr.png)
                    alt="Crypto QR Code Placeholder"
                    width={150}
                    height={150}
                    data-ai-hint="QR code crypto"
                    className="rounded-md"
                  />
                  <p className="text-xs mt-2 text-muted-foreground break-all">
                    {/* Replace with your actual Bitcoin address */}
                    BTC: 1YourBitcoinAddressHere...
                  </p>
                   <p className="text-xs mt-1 text-muted-foreground break-all">
                    {/* Replace with your actual Ethereum address */}
                    ETH: 0xYourEthereumAddressHere...
                  </p>
                  {/* Add more crypto addresses if needed */}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
