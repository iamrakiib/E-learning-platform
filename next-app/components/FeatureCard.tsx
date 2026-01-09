type FeatureCardProps = {
  title: string;
  description: string;
  eyebrow?: string;
  action?: string;
};

export default function FeatureCard({ title, description, eyebrow, action }: FeatureCardProps) {
  return (
    <article className="glow-card">
      {eyebrow && <div className="pill">{eyebrow}</div>}
      <h3 style={{ margin: '0.75rem 0 0.35rem' }}>{title}</h3>
      <p style={{ color: 'var(--muted)', lineHeight: 1.5, margin: '0 0 0.5rem' }}>{description}</p>
      {action && (
        <span style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.95rem' }}>
          {action} →
        </span>
      )}
    </article>
  );
}
