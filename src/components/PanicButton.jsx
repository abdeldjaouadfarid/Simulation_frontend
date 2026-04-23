import { Siren, ShieldCheck } from 'lucide-react'

function PanicButton({ isPanic, onActivate, onDeactivate }) {
  return (
    <div className="flex items-center gap-4">
      {isPanic ? (
        <>
          <span style={{ fontFamily: 'var(--mono)', color: 'var(--danger)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em' }}
            className="animate-pulse flex items-center gap-2">
            <Siren size={16} /> THEFT MODE ACTIVE
          </span>
          <button onClick={onDeactivate}
            style={{ background: 'transparent', border: '1px solid var(--safe)', color: 'var(--safe)', fontFamily: 'var(--mono)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.08em', padding: '8px 20px', borderRadius: 3, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(34,197,94,0.1)'}
            onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
            <ShieldCheck size={14} /> DEACTIVATE
          </button>
        </>
      ) : (
        <button onClick={onActivate}
          className="panic-pulse"
          style={{ background: 'var(--danger)', border: 'none', color: '#fff', fontFamily: 'var(--mono)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em', padding: '10px 24px', borderRadius: 3, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
          onMouseOver={e => e.currentTarget.style.background = '#dc2626'}
          onMouseOut={e => e.currentTarget.style.background = 'var(--danger)'}>
          <Siren size={14} /> ACTIVATE PANIC
        </button>
      )}
    </div>
  )
}

export default PanicButton