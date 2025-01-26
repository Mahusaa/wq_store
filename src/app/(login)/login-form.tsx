'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { CircleIcon, Loader2, KeyIcon, AtSign } from 'lucide-react';

export function Login({ mode = 'signin' }: { mode?: 'signin' | 'signup' }) {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const pending = false

  return (
    <div className="min-h-[100dvh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link href="/" className="font-extrabold text-4xl">@wqstore</Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold font-mono">
          {mode === 'signin'
            ? 'Sign in to your account'
            : 'Create your account'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form className="space-y-6" >
          <div>
            <Label
              className="mb-3 mt-5 block text-xs font-medium text-primary"
              htmlFor="email"
            >
              Email
            </Label>
            <div className="relative">
              <Input
                className="peer block w-full  border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSign className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-primary" />
            </div>
          </div>
          <div className="mt-4">
            <Label
              className="mb-3 mt-5 block text-xs font-medium text-primary"
              htmlFor="password"
            >
              Password
            </Label>
            <div className="relative">
              <Input
                className="peer block w-full  border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-primary" />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full flex justify-center items-center py-2 px-4 shadow-sm text-sm font-medium"
              disabled={pending}
              variant="default"
            >
              {pending ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Loading...
                </>
              ) : mode === 'signin' ? (
                'Sign in'
              ) : (
                'Sign up'
              )}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm font-mono">
              <span className="px-2 text-primary bg-background">
                {mode === 'signin' ? 'New to our platform?' : 'Already have an account?'}
              </span>
            </div>
          </div>


          <Link
            href={`${mode === 'signin' ? '/sign-up' : '/sign-in'}${redirect ? `?redirect=${redirect}` : ''
              }`}
            className=""
          >
            <Button className="mt-6 w-full flex justify-center py-2 px-4 text-sm font-medium font-mono" variant="outline">
              {mode === 'signin'
                ? 'Create an account'
                : 'Sign in to existing account'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
