import { useState } from 'react'

const inputStyle = {
  background: 'var(--bg)',
  border: '1px solid var(--border)',
  color: 'var(--text)',
  fontFamily: 'var(--mono)',
  fontSize: '0.78rem',
  padding: '8px 10px',
  borderRadius: 3,
  width: '100%',
  outline: 'none',
}
const labelStyle = {
  fontFamily: 'var(--mono)',
  fontSize: '0.62rem',
  letterSpacing: '0.1em',
  color: 'var(--muted)',
  marginBottom: 4,
  display: 'block',
}

function AddAnimalForm({ onAdd }) {
  const [name,      setName]      = useState('')
  const [species,   setSpecies]   = useState('')
  const [longitude, setLongitude] = useState('4.4300')
  const [latitude,  setLatitude]  = useState('35.6600')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !species) return
    onAdd({ name, species, longitude, latitude })
    setName('')
    setSpecies('')
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-end' }}>
      {[
        { label: 'UNIT NAME', value: name, set: setName, type: 'text', placeholder: 'e.g. Leo', width: 130 },
        { label: 'SPECIES',   value: species, set: setSpecies, type: 'text', placeholder: 'e.g. Lion', width: 130 },
        { label: 'LONGITUDE', value: longitude, set: setLongitude, type: 'number', width: 120 },
        { label: 'LATITUDE',  value: latitude,  set: setLatitude,  type: 'number', width: 120 },
      ].map(({ label, value, set, type, placeholder, width }) => (
        <div key={label} style={{ display: 'flex', flexDirection: 'column', width }}>
          <label style={labelStyle}>{label}</label>
          <input type={type} step={type === 'number' ? '0.0001' : undefined}
            placeholder={placeholder} value={value}
            onChange={e => set(e.target.value)}
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'var(--accent)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
            required={type === 'text'} />
        </div>
      ))}
      <button type="submit"
        style={{ background: 'var(--accent)', border: 'none', color: '#0d0f12', fontFamily: 'var(--mono)', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', padding: '9px 20px', borderRadius: 3, cursor: 'pointer', alignSelf: 'flex-end' }}
        onMouseOver={e => e.currentTarget.style.opacity = '0.85'}
        onMouseOut={e => e.currentTarget.style.opacity = '1'}>
        + REGISTER
      </button>
    </form>
  )
}

export default AddAnimalForm