
// src/app/(app)/donation/page.tsx
'use client';

import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Coffee, DollarSign, Heart } from 'lucide-react';
import Image from 'next/image';
// Removed unused Button component as BMC provides its own

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
                {/* The Buy Me A Coffee button is usually injected by their script, often as a fixed/floating element.
                    So, we don't need a specific button here unless their integration guide says otherwise for this setup. */}
              </div>
              <hr />
              <div>
                <h3 className="font-semibold mb-2 text-foreground">Donate with Crypto</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  You can display a QR code for your crypto wallet address.
                  Replace the placeholder image and address below.
                </p>
                <div className="flex flex-col items-center p-4 border rounded-md bg-muted/50">
                   <Image
                    src="https://placehold.co/150x150.png" // Replace with your actual QR code image file (e.g., /my-crypto-qr.png)
                    alt="Crypto QR Code Placeholder"
                    width={150}
                    height={150}
                    data-ai-hint="QR code crypto"
                    className="rounded-md"
                  />
                  <p className="text-xs mt-2 text-muted-foreground break-all">
                    BTC: 1YourBitcoinAddressHere...
                  </p>
                   <p className="text-xs mt-1 text-muted-foreground break-all">
                    ETH: 0xYourEthereumAddressHere...
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
