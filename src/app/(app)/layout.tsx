import { AppHeader } from '@/components/layout/app-header';

export default function AppGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-grow">
        {children}
      </main>
      <footer className="py-6 text-center text-muted-foreground text-sm border-t">
        <p>&copy; {new Date().getFullYear()} SnapRecipe. Cook with AI!</p>
      </footer>
    </div>
  );
}
