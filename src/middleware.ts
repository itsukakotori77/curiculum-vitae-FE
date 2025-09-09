import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token: string | undefined =
    request.cookies.get('accessToken')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path',
    '/curiculumVitae/:path',
    '/about/:path',
    '/faq/:path',
    '/example/:path*',
  ],
}
