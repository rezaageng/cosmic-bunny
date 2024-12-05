import { type NextRequest, NextResponse } from 'next/server';

export const middleware = (req: NextRequest): NextResponse | undefined => {
  const token = req.cookies.get('token')?.value;
  const url = req.nextUrl.pathname;

  if (!token && !url.startsWith('/register') && !url.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (token && (url.startsWith('/register') || url.startsWith('/login'))) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|manifest.webmanifest|.*\\.(?:png|jpg)$).*)',
  ],
};
