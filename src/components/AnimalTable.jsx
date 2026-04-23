function statusColor(s) {
  if (s === 'safe')   return 'var(--safe)'
  if (s === 'alert')  return 'var(--danger)'
  return 'var(--accent)'
}

function AnimalTable({ animals, onDelete }) {
  const thStyle = { padding: '8px 14px', textAlign: 'left', fontFamily: 'var(--mono)', fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--muted)', fontWeight: 400, borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }
  const tdStyle = { padding: '10px 14px', fontFamily: 'var(--mono)', fontSize: '0.78rem', color: 'var(--text)', borderBottom: '1px solid var(--border)' }

  if (animals.length === 0)
    return <p style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', color: 'var(--muted)' }}>NO UNITS REGISTERED</p>

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {['ID', 'NAME', 'SPECIES', 'STATUS', 'LAT', 'LNG', ''].map(h => (
              <th key={h} style={thStyle}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {animals.map((a) => (
            <tr key={a.id}
              onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
              onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
              <td style={{ ...tdStyle, color: 'var(--muted)' }}>{a.id}</td>
              <td style={{ ...tdStyle, fontWeight: 600, color: '#fff' }}>{a.name}</td>
              <td style={tdStyle}>{a.species}</td>
              <td style={tdStyle}>
                <span style={{ color: statusColor(a.status), fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.08em' }}>
                  ⬤ {a.status.toUpperCase()}
                </span>
              </td>
              <td style={{ ...tdStyle, color: 'var(--muted)' }}>{parseFloat(a.latitude).toFixed(5)}</td>
              <td style={{ ...tdStyle, color: 'var(--muted)' }}>{parseFloat(a.longitude).toFixed(5)}</td>
              <td style={tdStyle}>
                <button onClick={() => onDelete(a.id)}
                  style={{ background: 'transparent', border: '1px solid var(--danger)', color: 'var(--danger)', fontFamily: 'var(--mono)', fontSize: '0.65rem', letterSpacing: '0.08em', padding: '4px 12px', borderRadius: 2, cursor: 'pointer' }}
                  onMouseOver={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
                  onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                  REMOVE
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AnimalTable