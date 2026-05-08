export function CalculatorStyles() {
  return (
    <style jsx global>{`
      .custom-range {
        -webkit-appearance: none;
        width: 100%;
        background: transparent;
      }
      .custom-range:focus {
        outline: none;
      }
      .custom-range::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 18px;
        width: 18px;
        border-radius: 50%;
        background: #f97316;
        cursor: pointer;
        margin-top: -7px;
        box-shadow: 0 2px 5px rgba(249, 115, 22, 0.4);
        border: 2px solid white;
        transition: transform 0.1s;
      }
      .custom-range::-webkit-slider-thumb:hover {
        transform: scale(1.2);
      }
      .custom-range::-webkit-slider-runnable-track {
        width: 100%;
        height: 4px;
        cursor: pointer;
        background: #cbd5e1;
        border-radius: 2px;
      }
      .custom-range::-moz-range-thumb {
        height: 14px;
        width: 14px;
        border-radius: 50%;
        background: #f97316;
        cursor: pointer;
        border: 2px solid white;
        box-shadow: 0 2px 5px rgba(249, 115, 22, 0.4);
      }
      .custom-range::-moz-range-track {
        width: 100%;
        height: 4px;
        cursor: pointer;
        background: #cbd5e1;
        border-radius: 2px;
      }

      @keyframes pulse-danger {
        0% {
          box-shadow: 0 0 20px rgba(239, 68, 68, 0.1), inset 0 0 10px rgba(239, 68, 68, 0.05);
        }
        100% {
          box-shadow: 0 0 40px rgba(239, 68, 68, 0.2), inset 0 0 20px rgba(239, 68, 68, 0.1);
        }
      }
      .danger-glow {
        box-shadow: 0 0 40px rgba(239, 68, 68, 0.15), inset 0 0 20px rgba(239, 68, 68, 0.05);
        border-color: rgba(239, 68, 68, 0.3) !important;
        animation: pulse-danger 3s infinite alternate;
      }
    `}</style>
  );
}
