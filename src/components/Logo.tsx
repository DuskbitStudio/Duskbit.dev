interface LogoProps {
  className?: string
  /** Accessible name. Omit when the logo sits next to visible brand text. */
  label?: string
}

/** The locked mark: brackets in currentColor, bit always #F26B3A. */
export function Logo({ className, label }: LogoProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 9.5 7"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <path fill="currentColor" d="M0 0H2.5V1H1V6H2.5V7H0Z M9.5 0H7V1H8.5V6H7V7H9.5Z" />
      <rect className="logo-bit" x="3.25" y="2" width="3" height="3" fill="#F26B3A" />
    </svg>
  )
}
