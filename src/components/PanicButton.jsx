// components/PanicButton.jsx
// A big button to activate or deactivate panic (theft) mode.
// When panic is ON the button turns green to allow turning it off.

function PanicButton({ isPanic, onActivate, onDeactivate }) {
  return (
    <div className="flex items-center gap-4">

      {isPanic ? (
        // Panic is ON — show a "calm down" button and a warning label
        <>
          <span className="text-red-600 font-bold animate-pulse text-lg">
            🚨 THEFT MODE ACTIVE
          </span>
          <button
            onClick={onDeactivate}
            className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2 rounded-lg"
          >
            ✅ Deactivate Panic
          </button>
        </>
      ) : (
        // Panic is OFF — show the big red panic button
        <button
          onClick={onActivate}
          className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-lg"
        >
          🚨 Activate Panic Mode
        </button>
      )}

    </div>
  )
}

export default PanicButton