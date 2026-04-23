import React from 'react';
import { Siren, ShieldCheck } from 'lucide-react';

function PanicButton({ isPanic, onActivate, onDeactivate }) {
  return (
    <div className="flex items-center gap-4">

      {isPanic ? (
        // Panic is ON — show a "calm down" button and a warning label
        <>
          <span className="flex items-center gap-2 text-red-600 font-bold animate-pulse text-lg">
            <Siren size={24} />
            THEFT MODE ACTIVE
          </span>
          <button
            onClick={onDeactivate}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2 rounded-lg transition-colors"
          >
            <ShieldCheck size={20} />
            Deactivate Panic
          </button>
        </>
      ) : (
        // Panic is OFF — show the big red panic button
        <button
          onClick={onActivate}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-lg transition-colors"
        >
          <Siren size={20} />
          Activate Panic Mode
        </button>
      )}

    </div>
  );
}

export default PanicButton;