
// src/app/(app)/donation/page.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Coffee, DollarSign, Heart } from 'lucide-react';
import Image from 'next/image';

export default function DonationPage() {
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
                <h3 className="font-semibold mb-2 text-foreground">One-time Donation (Placeholder)</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Integrate your preferred payment processor here (e.g., Stripe, PayPal).
                </p>
                <Button className="w-full" size="lg" disabled>
                  Donate with [PaymentProvider]
                </Button>
              </div>
              <hr />
              <div>
                <h3 className="font-semibold mb-2 text-foreground">Donate with Crypto (Placeholder)</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  You can display a QR code for your crypto wallet address.
                </p>
                <div className="flex flex-col items-center p-4 border rounded-md bg-muted/50">
                   <Image
                    src="https://placehold.co/150x150.png"
                    alt="Crypto QR Code Placeholder"
                    width={150}
                    height={150}
                    data-ai-hint="QR code"
                    className="rounded-md"
                  />
                  <p className="text-xs mt-2 text-muted-foreground">Your Crypto Address Here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
