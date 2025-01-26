import Link from 'next/link';
import { Button } from '~/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[100dvh]">
      <div className="max-w-md space-y-8 p-4 text-center">
        <h1 className="text-4xl font-bold font-mono tracking-tight">
          Page Not Found
        </h1>
        <p className="text-base font-mono">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link
          href="/"
          className="mx-auto flex justify-center text-sm "
        >
          <Button variant="default" className="max-w-48 py-2 px-4 font-medium font-mono text-sm">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
