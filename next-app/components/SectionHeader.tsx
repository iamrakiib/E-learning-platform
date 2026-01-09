type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
};

export default function SectionHeader({ eyebrow, title, subtitle, center = false }: Props) {
  return (
    <div style={{ textAlign: center ? 'center' : 'left' }}>
      {eyebrow ? <span className="section-eyebrow">{eyebrow}</span> : null}
      <h2 className="section-title">{title}</h2>
      {subtitle ? (
        <p className="section-subtitle" style={{ margin: center ? '1rem auto 0' : '1rem 0 0' }}>{subtitle}</p>
      ) : null}
    </div>
  );
}