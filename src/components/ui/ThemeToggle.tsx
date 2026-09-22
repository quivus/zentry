import { useTheme } from '../../hooks/useTheme'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  const hint = isDark ? 'Change to Light Mode' : 'Change to Dark Mode'

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={hint}
      aria-describedby="theme-mode-hint"
    >
      <span className="theme-toggle-track" data-mode={theme}>
        <span className="theme-toggle-thumb" />
      </span>
      <span id="theme-mode-hint" className="theme-toggle-hint" role="tooltip">
        {hint}
      </span>
    </button>
  )
}
