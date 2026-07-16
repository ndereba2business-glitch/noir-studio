export default function GlassBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '8px 16px',
        borderRadius: '999px',
        background: 'rgba(240,237,230,0.03)',
        border: '1px solid rgba(240,237,230,0.08)',
        backdropFilter: 'blur(8px)',
        fontFamily: 'var(--font-dm-sans), sans-serif',
        fontSize: '11px',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'rgba(240,237,230,0.6)',
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#c9a96e' }} />
      {children}
    </span>
  )
}