import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

function AlertBox({ alerts }) {
  if (alerts.length === 0) return null
  return (
    <div>
      {alerts.map((message, index) => (
        <div key={index} className="flex items-center gap-3 px-4 py-3 mb-2"
          style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid var(--danger)', borderLeft: '4px solid var(--danger)', borderRadius: 4, fontFamily: 'var(--mono)', fontSize: '0.8rem', color: '#fca5a5' }}>
          <ExclamationTriangleIcon style={{ height: 16, width: 16, color: 'var(--danger)', flexShrink: 0 }} />
          {message}
        </div>
      ))}
    </div>
  )
}

export default AlertBox