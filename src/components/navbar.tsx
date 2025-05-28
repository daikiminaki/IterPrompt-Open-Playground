import Link from 'next/link'

const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/features' },
  { label: 'Documentation', href: '/docs' },
]

const actionButtons = [
  { label: 'Sign In', href: '/', variant: 'text' },
  { label: 'Try on IterPrompt', href: 'https://www.iterprompt.com/', variant: 'primary', target: '_blank' },
]

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm z-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-900">Open Playground</span>
            </Link>
          </div>

          {/* Navigation Menu
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div> */}

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {actionButtons.map((button) => (
              <Link
                key={button.label}
                href={button.href}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  button.variant === 'primary'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                target={button.target || '_self'}
              >
                {button.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              {item.label}
            </Link>
          ))}
          {actionButtons.map((button) => (
            <Link
              key={button.label}
              href={button.href}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                button.variant === 'primary'
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {button.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
