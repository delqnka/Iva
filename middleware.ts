import { NextRequest, NextResponse } from 'next/server';

const ADMIN_PATH_PREFIXES = ['/admin', '/api/admin', '/api/stripe', '/api/upload'];

function getEngineUrl() {
  const raw = process.env.NEXT_PUBLIC_ENGINE_URL?.trim();
  if (!raw) return null;
  try {
    return new URL(raw);
  } catch {
    return null;
  }
}

function isAdminAssetRequest(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith('/_next/')) return false;

  const referer = request.headers.get('referer');
  if (!referer) return false;

  try {
    const refererUrl = new URL(referer);
    return refererUrl.pathname.startsWith('/admin');
  } catch {
    return false;
  }
}

function shouldProxy(pathname: string, request: NextRequest) {
  return (
    ADMIN_PATH_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)) ||
    isAdminAssetRequest(request)
  );
}

export function middleware(request: NextRequest) {
  const engineUrl = getEngineUrl();
  if (!engineUrl) {
    return NextResponse.next();
  }

  const { pathname, search } = request.nextUrl;
  if (!shouldProxy(pathname, request)) {
    return NextResponse.next();
  }

  const target = new URL(`${pathname}${search}`, engineUrl);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-clicka-host', request.headers.get('host') ?? request.nextUrl.host);
  requestHeaders.set('x-forwarded-host', request.headers.get('host') ?? request.nextUrl.host);
  requestHeaders.set('x-forwarded-proto', request.nextUrl.protocol.replace(':', ''));

  return NextResponse.rewrite(target, {
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    '/admin',
    '/admin/:path*',
    '/api/admin',
    '/api/admin/:path*',
    '/api/stripe/:path*',
    '/api/upload',
    '/_next/:path*',
  ],
};
