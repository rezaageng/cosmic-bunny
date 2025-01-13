import { type NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/services';

export const middleware = async (
  req: NextRequest,
): Promise<NextResponse | undefined> => {
  const token = req.cookies.get('token')?.value;
  const url = req.nextUrl.pathname;

  if (token) {
    const response = await getCurrentUser({ token });

    if (!response.data) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    const role = response.data.role;

    if (
      role === 'admin' &&
      (url.startsWith('/login') || url.startsWith('/register'))
    ) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    if (
      role === 'user' &&
      (url.startsWith('/login') || url.startsWith('/register'))
    ) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    if (role === 'user' && url.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  if (
    !token &&
    (url.startsWith('/wishlist') ||
      url.startsWith('/cart') ||
      url.startsWith('/library') ||
      url.startsWith('/dashboard') ||
      url.startsWith('/user'))
  ) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|manifest.webmanifest|.*\\.(?:png|jpg)$).*)',
  ],
};
