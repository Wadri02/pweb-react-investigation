import type { ReactNode } from 'react'

interface Props {
  hook: string
  description: string
  when: string
  children: ReactNode
  badge?: string
  note?: string
}

export function ExampleWrapper({ hook, description, when, children, badge, note }: Props) {
  return (
    <div className="example-wrapper">
      <div className="example-header">
        <h2>
          <code className="hook-name">{hook}</code>
          {badge && <span className="badge badge--react19">{badge}</span>}
        </h2>
        <p className="example-description">{description}</p>
      </div>
      <div className="example-body">
        {children}
      </div>
      {note && (
        <div className="example-note">
          {note}
        </div>
      )}
      <div className="example-footer">
        <span className="when-label">Cuándo usarlo:</span> {when}
      </div>
    </div>
  )
}
